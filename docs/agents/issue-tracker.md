# Issue tracker: GitHub

Issues and specs live in SamuelNittala/swiggy-jev-poc.
Use the authenticated `gh` CLI. Explicitly target this repository
with `--repo SamuelNittala/swiggy-jev-poc` for issue commands.

## Conventions

- Create: `gh issue create --title "..." --body-file <file>`.
- Read: `gh issue view <number> --comments`.
- List: `gh issue list --state open`, with appropriate label filters.
- Comment: `gh issue comment <number> --body-file <file>`.
- Label: `gh issue edit <number> --add-label "..."`.
- Remove a label: `gh issue edit <number> --remove-label "..."`.
- Close: `gh issue close <number> --comment "..."`.

Include the repository flag in these commands.
Use a temporary Markdown file for multiline bodies.

When a skill says "publish to the issue tracker", create a GitHub
issue. When it says "fetch the relevant ticket", read the issue
body and comments.

## Pull requests as a triage surface

PRs as a request surface: no.

## Wayfinding operations

- Map: one issue labelled `wayfinder:map`.
- Tickets: child issues linked through GitHub sub-issues, labelled
  `wayfinder:research`, `wayfinder:prototype`, `wayfinder:grilling`,
  or `wayfinder:task`.
- Create missing workflow labels before applying them.
- Use `gh api` for sub-issue and dependency operations.
- Blocking: use native GitHub issue dependencies. Dependency
  endpoints require the blocker's numeric database ID, not its
  issue number or node ID.
- If sub-issues are unavailable, use a task list in the map and
  a `Part of #<map>` reference in each child.
- If native dependencies are unavailable, record a `Blocked by`
  line in the child and check each blocker’s state.
- Next ticket: the first open, unassigned child in map order
  whose blockers are all closed.
- Claim: assign the chosen ticket to the authenticated developer
  before doing work.
- Resolve: post a resolution comment, close the ticket, then add
  a short summary and link to the map's Decisions so far.
