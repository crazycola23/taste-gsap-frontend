#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const SOURCE_EXTENSIONS = new Set([
  ".css", ".scss", ".sass", ".less", ".html", ".js", ".jsx", ".mjs",
  ".ts", ".tsx", ".vue", ".svelte",
]);

const IGNORED_DIRECTORIES = new Set([
  ".git", ".next", ".nuxt", ".svelte-kit", "node_modules", "dist", "build",
  "coverage", ".turbo", ".cache",
]);

const SELF_FILES = new Set(["audit-motion.mjs", "audit-motion.test.mjs"]);

function usage() {
  console.log(`Usage: node scripts/audit-motion.mjs [--strict] [--json] <path ...>

Scans source files for common GSAP and scroll-motion hazards. Warnings are
non-blocking by default; --strict exits with status 1 when warnings exist.`);
}

function collectFiles(inputPath) {
  const absolute = path.resolve(inputPath);
  if (!fs.existsSync(absolute)) {
    throw new Error(`Path does not exist: ${inputPath}`);
  }

  const stat = fs.statSync(absolute);
  if (stat.isFile()) {
    return SOURCE_EXTENSIONS.has(path.extname(absolute).toLowerCase()) ? [absolute] : [];
  }

  const files = [];
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    if (entry.isDirectory() && IGNORED_DIRECTORIES.has(entry.name)) continue;
    const child = path.join(absolute, entry.name);
    if (entry.isDirectory()) files.push(...collectFiles(child));
    else if (SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) files.push(child);
  }
  return files;
}

function hasAny(source, patterns) {
  return patterns.some((pattern) => pattern.test(source));
}

function analyze(filePath, source) {
  const file = path.basename(filePath);
  if (SELF_FILES.has(file)) return [];

  const issues = [];
  const add = (code, message, line = 1) => issues.push({ file: filePath, line, code, message });
  const lineOf = (pattern) => {
    const match = pattern.exec(source);
    return match ? source.slice(0, match.index).split("\n").length : 1;
  };

  const hasGsap = /\bgsap\s*\.|\bScrollTrigger\b|\buseGSAP\b/.test(source);
  const hasCleanup = hasAny(source, [
    /gsap\.context\s*\(/, /\buseGSAP\s*\(/, /\.revert\s*\(/, /\.kill\s*\(/,
    /onBeforeUnmount\s*\(/, /onUnmounted\s*\(/, /onMount\s*\(/, /useLayoutEffect\s*\(/,
  ]);

  const rawScrollHandler = /(?:addEventListener\s*\(\s*["'`]scroll|window\.onscroll)/;
  const scrollReadLoop = /(?:\bscrollY\b|\bpageYOffset\b)[\s\S]{0,160}(?:requestAnimationFrame|set[A-Z][A-Za-z0-9_]*\s*\()/;
  const rawScroll = rawScrollHandler.test(source) ? rawScrollHandler : scrollReadLoop;
  if (rawScroll.test(source)) {
    add("RAW_SCROLL", "Prefer ScrollTrigger or an Observer instead of a hand-rolled scroll loop.", lineOf(rawScroll));
  }

  if (hasGsap && !hasCleanup) {
    const lifecycle = /\bgsap\s*\.|\bScrollTrigger\b|\buseGSAP\b/;
    add("NO_CLEANUP", "GSAP or ScrollTrigger code has no obvious scoped lifecycle cleanup.", lineOf(lifecycle));
  }

  const hasScrollTrigger = /\bScrollTrigger\b/.test(source);
  const reducedMotion = /prefers-reduced-motion|reduceMotion|reducedMotion|matchMedia\s*\(/;
  if (hasScrollTrigger && !reducedMotion.test(source)) {
    add("NO_REDUCED_MOTION", "Scroll-driven motion should provide a reduced-motion or static fallback.", lineOf(/\bScrollTrigger\b/));
  }

  const unscopedSelector = /gsap\.(?:to|from|fromTo|set)\s*\(\s*["'`][.#]/;
  const hasScopeHint = /\b(scope|root|ref|context|toArray)\b/.test(source);
  if (unscopedSelector.test(source) && !hasScopeHint) {
    add("UNSCOPED_SELECTOR", "Scope GSAP selectors to the component root or use element references.", lineOf(unscopedSelector));
  }

  const stateInUpdate = /onUpdate\s*:[\s\S]{0,320}\bset[A-Z][A-Za-z0-9_]*\s*\(/;
  if (stateInUpdate.test(source)) {
    add("STATE_IN_UPDATE", "Avoid per-frame application state updates inside animation callbacks.", lineOf(stateInUpdate));
  }

  const infiniteLoops = source.match(/\brepeat\s*:\s*-1\b/g)?.length ?? 0;
  if (infiniteLoops > 1) {
    add("MULTIPLE_LOOPS", `Found ${infiniteLoops} infinite loops; keep one continuous marquee or justify more.`, lineOf(/\brepeat\s*:\s*-1\b/));
  }

  return issues;
}

function main() {
  const args = process.argv.slice(2);
  const strict = args.includes("--strict");
  const json = args.includes("--json");
  const paths = args.filter((arg) => !arg.startsWith("--"));

  if (args.includes("--help") || args.includes("-h")) {
    usage();
    return;
  }

  const inputs = paths.length ? paths : [process.cwd()];
  const files = [...new Set(inputs.flatMap(collectFiles))].sort();
  const issues = files.flatMap((filePath) => {
    const source = fs.readFileSync(filePath, "utf8");
    return analyze(filePath, source);
  });

  if (json) {
    console.log(JSON.stringify({ filesScanned: files.length, issues }, null, 2));
  } else {
    console.log(`Motion audit: scanned ${files.length} source file(s).`);
    if (!issues.length) {
      console.log("No motion hazards detected by the static checks.");
    } else {
      for (const issue of issues) {
        console.log(`${path.relative(process.cwd(), issue.file)}:${issue.line} [${issue.code}] ${issue.message}`);
      }
      console.log(`Found ${issues.length} warning(s).`);
    }
  }

  if (strict && issues.length) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 2;
}
