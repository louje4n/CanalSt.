Refactor Instructions: CanalSt. Project Stabilization & Organization
1. Objective
Refactor the current monolithic CanalSt.jsx file into a modular, scalable React project structure.
Constraint: All CSS styles, visual layouts, SVG paths, and functional logic must remain identical to the original iteration. No "vibe" or UI changes are permitted.

2. Target File Structure
Create the following directory tree and move the logic accordingly:

Plaintext
src/
├── assets/             # SVGs and static images
├── components/         # Shared UI components
│   ├── ui/             # Atomic components (AuthBadge, MarketSignals, etc.)
│   ├── branding/       # Silhouette.jsx, StudioPlate.jsx
│   └── navigation/     # Nav.jsx, StatusBars.jsx
├── data/               # Static data and constants
│   └── listings.js     # LISTINGS, HERO, ROTATION, GRID
├── styles/             # Global CSS
│   └── App.css         # Move the CSS constant here
├── views/              # Major application screens
│   ├── Archive.jsx
│   ├── Curator.jsx
│   ├── Sell.jsx
│   ├── Profile.jsx
│   └── PDV.jsx         # Product Detail View
└── App.jsx             # Main State Controller (formerly CanalSt.jsx)
3. Step-by-Step Execution Plan
Step 1: Data & Styles Extraction
Data: Move LISTINGS, HERO, ROTATION, and GRID to src/data/listings.js. Export them.

Styles: Extract the content of the CSS constant into src/styles/App.css. Import this file into main.jsx. Delete the <style>{CSS}</style> tag from the main component.

Step 2: Component Decoupling
Silhouette & StudioPlate: Create src/components/branding/StudioPlate.jsx. Move the Silhouette and StudioPlate components there. Ensure props like l (listing) and type are passed correctly.

UI Elements: Create src/components/ui/ and extract AuthBadge and MarketSignals.

Helper Functions: Move sigColor and toggle to a utility file or keep them in the components where they are most used.

Step 3: View Isolation
Extract the following functional components into their own files in src/views/:

Archive.jsx: Ensure it receives openPdv as a prop.

Curator.jsx: Move search/filter logic here.

Sell.jsx: Keep the "AI Auto-List" simulation logic (timers/steps) intact.

Profile.jsx: Move the user profile/menu logic here.

PDV.jsx: This is critical. Ensure the photo carousel and technical specifications table are fully functional.

Step 4: Main Controller Refactor (App.jsx)
Rename CanalSt.jsx to App.jsx.

This file should strictly handle Global State:

tab (current view)

pdv (selected product for detail view)

query/lin/era/sizeF/priceMax (for filtering)

The return statement should be a clean conditional render inside the "device frame" div.

4. Technical Constraints for the AI
Prop-Drilling: Pass state and setter functions (e.g., setPdv, setTab) as props to the new View components.

Inline Styles: Keep the inline styles (style={{ ... }}) exactly as they are in the source. Do not attempt to convert them all to CSS classes yet.

Fonts: Ensure the Google Fonts import remains in the CSS to preserve Bebas Neue and Space Mono.

Icons: Keep the inline SVG icons within their respective components to avoid broken asset links.

5. Verification Checklist
After the refactor, the following must be true:

[ ] The app renders within the "iPhone" frame with shadows and the notch.

[ ] Tapping the "AI AUTO-LIST" button still triggers the 3.4s analysis simulation.

[ ] Tapping a listing opens the PDV and the "Back" button returns to the previous tab.

[ ] The "Curator" filters (Aesthetic Lineage, Era, Size) correctly update the results count.
