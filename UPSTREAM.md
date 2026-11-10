# Upstream maintenance

Source: https://github.com/Leonxlnx/taste-skill
Version: **2.5.1**
Commit: **f6b76575f949707b4e3c37cd86cb44b0b98643e8**
Source folder: `skills/taste-skill/`
Destination: `skills/taste-gsap-frontend/`

## Ownership

`upstream.lock.json` lists all 1,631 upstream files with SHA-256 digests of canonical
Git bytes. Text checks normalize CRLF; binary assets are compared byte for byte.
Every upstream file is carried. The only path mapping is upstream `SKILL.md` to
`references/taste-workflow.md`, preserved verbatim including archival frontmatter.
This snapshot has no patched upstream files.

Fork-owned files are the active `SKILL.md`, agent metadata, integration/app/content/
design/motion-mode/GSAP/QA references, motion audit, evaluations and repository packaging.
Do not overwrite them during a sync. The upstream original still refers to its own
install name and Stop hook; those are not the active fork's metadata.

## Update process

1. Fetch upstream and record the exact commit/version. Review its changelog, workflow,
   requirements and changed asset/tool contracts.
2. Copy every tracked file in its skill folder to the mapped destination, preserving
   canonical bytes. Use the previous inventory to identify retired upstream files;
   remove only those, after checking for local changes. Stop on new paths that
   collide with fork-owned files and merge deliberately.
3. Review integration conflicts: Static/Subtle versus motion quotas, native scrolling
   versus custom scenes, animation ownership, authentic copy/contacts, framework
   rendering and app-screen scope. Update fork references and packaging, not the
   archived source to conceal the differences.
4. Regenerate the inventory from the pinned Git revision. Run frontmatter, encoding,
   inventory, recursive syntax and audit regression checks. Run a representative
   kit model in a real browser; distinguish imported upstream failures from regressions.
5. Update versions, README and changelog. Review the diff and push only after validation.

The inventory is a provenance and completeness check, not a security signature or a
claim that every imported demo has passed a browser test.
