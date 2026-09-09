# Workshop visual alignment — 2026-09-09

Aligned the Workshop with the supplied Clear-to-Trade Portal references: white workspace, serif headings, pale blue case and discussion panels, blue selected stage tiles, and yellow primary navigation. The shared navy header remains consistent with Scenario Studio and Demo.

The new presentation layer is scoped to the Workshop iframe and its host spacing. Chapter content, notes persistence, export and print logic, and the detailed-scenario bridge are unchanged. Scenario Template is outside this change.

## Verification

- Visually checked at 922 px, 1440 px, and 390 px viewport widths.
- English and Chinese Workshop content fit the narrow viewport without horizontal overflow.
- Verified chapter navigation, previous/next controls, final-stage discussion summary, expandable notes, and detailed scenario entry and return.
- Export and print controls remain present; their existing JavaScript was not changed.
- Browser console reported no errors during the checks.
- JavaScript syntax and Git whitespace checks passed.

Preview: `http://127.0.0.1:8899/prototype/index.html?locale=en-US&studio=journey&beat=0`
