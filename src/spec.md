# Specification

## Summary
**Goal:** Build a single-page romantic Valentine prompt with an evasive “No” button and a “Yes” result view that reveals a meme image.

**Planned changes:**
- Create a centered, responsive Valentine prompt screen that asks “Will you be my Valentine?” with exactly two buttons: “Yes” and “No”.
- Implement evasive behavior for the “No” button so it moves away on pointer hover/approach and on touch attempts (e.g., iPad), preventing successful activation.
- On “Yes” click, replace the prompt UI with a result view that displays a static meme image containing the text “Good Choice Doctor Zara Ji”, and hide/disable the buttons.
- Apply a cohesive pink-and-white romantic theme with large, touch-friendly buttons optimized for iPad Chrome.
- Add the meme image as a static asset under `frontend/public/assets/generated` and load it directly from the frontend.

**User-visible outcome:** The user sees a romantic Valentine question with “Yes” and an unclickable evasive “No”; tapping “Yes” shows a meme image saying “Good Choice Doctor Zara Ji”.
