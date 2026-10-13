# Engineering Decisions

This file records meaningful code changes made during Codex sessions. Update it
in the same change set as the code so each decision stays tied to its
implementation. Small mechanical edits, such as formatting-only changes, do not
need separate entries unless they affect behavior or project conventions.

## 2026-10-13 — Establish a project decision log

### What changed

Added `decisions.md` as the repository's ongoing record for meaningful code
changes. Each future entry will state what changed, why the approach was chosen,
and why its library or method was preferred over relevant alternatives.

### Why this approach

Keeping decisions beside the source makes implementation reasoning visible to
future contributors and reviewable in the same diff as the related code. Updating
the log with each change also avoids an inaccurate reconstruction at the end of a
long session.

### Why this method over alternatives

A plain Markdown file needs no new dependency, works with the repository's
existing Git workflow, and remains readable in editors and code hosts. A separate
wiki, issue tracker, or generated decision-log tool would add access, tooling, or
synchronization overhead without improving this project's current workflow.

## 2026-10-13 — Harden browser delivery and deter casual image copying

### What changed

Added strict response headers, tightened enquiry origin and payload checks, and
validated the Turnstile response hostname. Protected preview images now block
drag and context-menu actions and show an on-page Illam preview watermark.

### Why this approach

Security headers reduce browser attack surface. Server checks bind future form
submissions to the configured site and reject oversized input early. Image
controls deter casual saving while keeping native image semantics and the
keyboard-accessible comparison control.

### Why this method over alternatives

Embedding images as data URLs increases page size and still exposes the bytes.
Signed URLs also cannot prevent saving after a public browser receives an image.
Visible watermarking plus interaction deterrents provide honest, low-complexity
protection without claiming impossible download prevention.
