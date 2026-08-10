#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const tempDir = fs.mkdtempSync(path.join(root, ".audit-test-"));
const badFile = path.join(tempDir, "bad.tsx");
const goodFile = path.join(tempDir, "good.tsx");

fs.writeFileSync(badFile, `
window.addEventListener("scroll", () => window.scrollY);
gsap.to(".hero", { x: 100, repeat: -1 });
ScrollTrigger.create({ trigger: ".story" });
gsap.to(".other", { repeat: -1, onUpdate: () => setProgress(1) });
`);

fs.writeFileSync(goodFile, `
const root = useRef(null);
useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.to(root.current, { x: 10, scrollTrigger: { trigger: root.current } });
  });
}, { scope: root });
`);

const script = path.join(root, "scripts", "audit-motion.mjs");
const badRun = spawnSync(process.execPath, [script, "--json", badFile], { encoding: "utf8" });
assert.equal(badRun.status, 0);
const badResult = JSON.parse(badRun.stdout);
assert.ok(badResult.issues.some((issue) => issue.code === "RAW_SCROLL"));
assert.ok(badResult.issues.some((issue) => issue.code === "NO_REDUCED_MOTION"));
assert.ok(badResult.issues.some((issue) => issue.code === "MULTIPLE_LOOPS"));
const badStrictRun = spawnSync(process.execPath, [script, "--strict", "--json", badFile], { encoding: "utf8" });
assert.equal(badStrictRun.status, 1);

const goodRun = spawnSync(process.execPath, [script, "--strict", "--json", goodFile], { encoding: "utf8" });
assert.equal(goodRun.status, 0);
const goodResult = JSON.parse(goodRun.stdout);
assert.equal(goodResult.issues.length, 0);

fs.rmSync(tempDir, { recursive: true, force: true });
console.log("audit-motion tests passed");
