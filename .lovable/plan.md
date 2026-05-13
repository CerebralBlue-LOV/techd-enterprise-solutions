## Goal
Keep the “Why TechD” section the same height when users switch between notes, so the page no longer jumps.

## Plan
1. Refactor the note-switching pattern in both `WhyPracticeSection` and `ServiceWhySection` so the ledger keeps a stable layout instead of removing the active note from the list.
2. Keep all note slots rendered in a fixed order and style the active item as selected/inactive-for-click rather than filtering it out, which prevents the ledger content from reflowing.
3. Replace the current quote-only height reservation with a more reliable stable container strategy so the featured quote area also stays visually consistent during the cross-fade.
4. Verify the behavior on the solutions and services versions of the section in preview to confirm there is no vertical jump when switching among the longest and shortest notes.

## Technical details
- Files to update:
  - `src/sections/solutions/WhyPracticeSection.tsx`
  - `src/sections/services/ServiceWhySection.tsx`
- Likely implementation:
  - stop deriving a `rest` array that excludes the active note
  - render the full `points` array in the ledger
  - disable pointer interaction for the active note and give it a selected visual state
  - keep existing motion/fade behavior, but ensure the quote wrapper uses a stable reserved height without adding excessive empty space
- No brand/color changes; stay within existing tokens and typography.