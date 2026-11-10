import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, relative, extname, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lock = JSON.parse(readFileSync(resolve(root, 'upstream.lock.json'), 'utf8'));
const base = resolve(root, lock.destinationDirectory);
const text = new Set(['.md', '.json', '.js', '.mjs', '.html', '.css', '.svg', '.yaml', '.yml']);
assert.match(lock.commit, /^[a-f0-9]{40}$/);
assert.ok(lock.files.length > 0, 'empty upstream inventory');
const targets = new Set();
for (const entry of lock.files) {
  assert.ok(!targets.has(entry.target), `duplicate target ${entry.target}`);
  targets.add(entry.target);
  const file = resolve(base, entry.target);
  const rel = relative(base, file);
  assert.ok(rel && !rel.startsWith('..') && !isAbsolute(rel), `unsafe target ${entry.target}`);
  assert.ok(existsSync(file), `missing upstream file ${entry.target}`);
  let bytes = readFileSync(file);
  if (text.has(extname(file))) bytes = Buffer.from(bytes.toString('utf8').replace(/\r\n/g, '\n'));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), entry.sha256,
    `upstream drift: ${entry.target}; review and record an intentional update`);
}
assert.ok(targets.has('references/taste-workflow.md'));
assert.ok(targets.has('assets/starter.html'));
assert.ok(targets.has('scripts/gate.mjs'));
console.log(`ok - ${lock.files.length} complete upstream files match ${lock.version} @ ${lock.commit.slice(0, 7)}`);
