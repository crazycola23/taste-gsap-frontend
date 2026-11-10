import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

const script = resolve(dirname(fileURLToPath(import.meta.url)), '../skills/taste-gsap-frontend/scripts/audit-motion.mjs');
function audit(source, args = []) {
  const dir = mkdtempSync(join(tmpdir(), 'taste-gsap-audit-'));
  try {
    const file = join(dir, 'component.tsx');
    writeFileSync(file, source);
    const result = spawnSync(process.execPath, [script, '--strict', '--json', ...args, file], { encoding: 'utf8' });
    return { ...result, issues: result.stdout ? JSON.parse(result.stdout).issues : [] };
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

test('mounting and creating a context do not count as teardown', () => {
  const r = audit('useLayoutEffect(() => { const ctx = gsap.context(() => gsap.to(el, {x: 12}), root); });');
  assert.equal(r.status, 1);
  assert.ok(r.issues.some(x => x.code === 'NO_CLEANUP'));
});
test('breakpoint-only matchMedia does not satisfy reduced motion', () => {
  const r = audit('useGSAP(() => { gsap.matchMedia().add("(min-width: 800px)", () => gsap.to(el, {x: 20})); });');
  assert.ok(r.issues.some(x => x.code === 'NO_REDUCED_MOTION'));
});
test('inline scrollTrigger is audited without a plugin import in the same file', () => {
  const r = audit('tl.to(el, {x: 20, scrollTrigger: {trigger: el}});');
  assert.ok(r.issues.some(x => x.code === 'NO_REDUCED_MOTION'));
  assert.ok(r.issues.some(x => x.code === 'NO_CLEANUP'));
});
test('a cleaned-up scoped reduced-motion timeline passes', () => {
  const r = audit('const ctx = gsap.context(() => { const mm = gsap.matchMedia(); mm.add("(prefers-reduced-motion: no-preference)", () => gsap.from(el, {scale: .98})); }, root); return () => ctx.revert();');
  assert.equal(r.status, 0);
  assert.deepEqual(r.issues, []);
});
test('an analytics-only scroll listener does not demand GSAP', () => {
  const r = audit('window.addEventListener("scroll", () => analytics.record(window.scrollY), {passive: true});');
  assert.equal(r.status, 0);
});
test('unknown options fail visibly instead of silently weakening a check', () => {
  const r = audit('', ['--strcit']);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /Unknown option/);
});
