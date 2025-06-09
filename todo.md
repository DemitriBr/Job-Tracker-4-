# Job Application Tracker - Project TODO

This checklist breaks down the development of the Job Application Tracker into iterative phases and steps. Check off items as they are completed.

---

## Phase 1: Core Application Foundation (CRUD & Data)

**Goal:** Establish the fundamental data handling and manipulation logic without any UI styling or gamification.

-   [ ] **1.1: Project Setup**
    -   [ ] Initialize new React + TypeScript project using Vite (`job-tracker-app`).
    -   [ ] Install dependencies: `zustand`, `react-router-dom`, `vitest`, `@testing-library/react`, `chart.js`, `react-chartjs-2`.
    -   [ ] Create initial directory structure (`components`, `hooks`, `store`, `types`, `assets/*`).
    -   [ ] Clean up boilerplate `App.tsx` with a simple `<h1>`.
    -   [ ] Clean up boilerplate CSS and set a basic dark background in `index.css`.

-   [ ] **1.2: Data Model & Storage Store**
    -   [ ] Define `ApplicationStatus` enum in `src/types/index.ts`.
    -   [ ] Define `JobType` enum in `src/types/index.ts`.
    -   [ ] Define `JobApplication` interface in `src/types/index.ts`.
    -   [ ] Create `src/store/applicationStore.ts` using Zustand.
    -   [ ] Implement state for `applications: JobApplication[]`.
    -   [ ] Implement `addApplication` action.
    -   [ ] Implement `updateApplication` action.
    -   [ ] Implement `deleteApplication` action.
    -   [ ] Configure Zustand `persist` middleware to save to `localStorage`.
    -   [ ] **TESTING**: Create `applicationStore.test.ts`.
        -   [ ] Write unit test for `addApplication`.
        -   [ ] Write unit test for `updateApplication`.
        -   [ ] Write unit test for `deleteApplication`.
        -   [ ] Verify data persistence in `localStorage` mock.

-   [ ] **1.3: Display Applications List**
    -   [ ] Create `src/components/ApplicationList.tsx`.
    -   [ ] Fetch and display applications from `applicationStore`.
    -   [ ] Render basic application details (Company, Title, Status).
    -   [ ] Handle the "No applications yet" empty state.
    -   [ ] **TESTING**: Create `ApplicationList.test.ts`.
        -   [ ] Write test for the empty state message.
        -   [ ] Write test to verify a list of mock applications is rendered.
    -   [ ] Integrate `ApplicationList` into `App.tsx`.

-   [ ] **1.4: Add New Application Form**
    -   [ ] Create `src/components/ApplicationForm.tsx`.
    -   [ ] Build form with all required input fields (`input`, `select`, `textarea`).
    -   [ ] Implement controlled components using `useState`.
    -   [ ] Implement `onSubmit` handler to call `addApplication`.
    -   [ ] Implement logic to clear the form after submission.
    -   [ ] Add basic `required` attribute validation on key fields.
    -   [ ] **TESTING**: Create `ApplicationForm.test.ts`.
        -   [ ] Write test to ensure form renders correctly.
        -   [ ] Write test to simulate form fill and submission, mocking `addApplication`.
    -   [ ] Integrate `ApplicationForm` into `App.tsx`.

-   [ ] **1.5: Delete & Update Functionality**
    -   [ ] Add a "Delete" button to each item in `ApplicationList`.
    -   [ ] Wire the delete button to the `deleteApplication` action, including a `window.confirm`.
    -   [ ] Create `src/store/uiStore.ts` to manage modal/editing state (`editingApplicationId`).
    -   [ ] Add an "Edit" button to each item in `ApplicationList` to set `editingApplicationId`.
    -   [ ] Modify `ApplicationForm` to accept an `applicationId` prop for "edit mode".
    -   [ ] In edit mode, pre-fill form with existing data.
    -   [ ] In edit mode, `onSubmit` should call `updateApplication`.
    -   [ ] In `App.tsx`, conditionally render the form as a modal when `editingApplicationId` is set.
    -   [ ] **TESTING**: Update `ApplicationList.test.ts` to test the delete and edit buttons.
    -   [ ] **TESTING**: Update `ApplicationForm.test.ts` to test edit mode (pre-filling and updating).

## Phase 2: UI/UX, Theming, and Dashboard

**Goal:** Apply the 8-bit visual style and build the data visualization dashboard.

-   [ ] **2.1: 8-Bit Theming & Base Components**
    -   [ ] Add pixel font file to `src/assets/fonts`.
    -   [ ] Set up `@font-face` and CSS custom properties for color palette in `index.css`.
    -   [ ] Create `src/components/ui/PixelButton.tsx`.
    -   [ ] Create `src/components/ui/PixelContainer.tsx`.
    -   [ ] Implement a dark mode toggle button and corresponding CSS in `index.css`.

-   [ ] **2.2: Style Core Components**
    -   [ ] Refactor `ApplicationList` to use `PixelContainer` and `PixelButton`.
    -   [ ] Refactor `ApplicationForm` to use `PixelContainer`, `PixelButton`, and styled form elements.
    -   [ ] Style the edit modal with the 8-bit theme.
    -   [ ] Ensure UI is responsive on mobile and desktop.
    -   [ ] **TESTING**: Manually review UI on different screen sizes. Run existing tests to catch regressions.

-   [ ] **2.3: Dashboard & Charts**
    -   [ ] Create `src/components/Dashboard.tsx`.
    -   [ ] In `Dashboard.tsx`, create helper function to process data for the "Applications per Month" chart.
    -   [ ] In `Dashboard.tsx`, create helper function to process data for the "Status Funnel" chart.
    -   [ ] Implement the "Applications per Month" bar chart using `react-chartjs-2`.
    -   [ ] Implement the "Status Funnel" radar chart using `react-chartjs-2`.
    -   [ ] Style charts to match the 8-bit theme (fonts, colors, tooltips).
    -   [ ] Add a view toggle in `App.tsx` to switch between the list and dashboard.
    -   [ ] **TESTING**: Create `Dashboard.test.ts`.
        -   [ ] Write tests to verify data processing logic for charts.

## Phase 3: Gamification Engine

**Goal:** Implement the XP, level, and achievement systems.

-   [ ] **3.1: Gamification Engine (XP & Levels)**
    -   [ ] Create `src/store/gamificationStore.ts` using Zustand with persistence.
    -   [ ] Implement state for `xp: number`.
    -   [ ] Implement derived state/selectors for `level` and `progress`.
    -   [ ] Implement `addXp(amount)` action.
    -   [ ] Define XP value constants (`XP_VALUES`).
    -   [ ] Integrate XP rewards: Modify `applicationStore` to call `addXp` on add, update, and delete actions.
    -   [ ] Add logic to award bonus XP for "Interviewing" and "Offer" statuses.
    -   [ ] **TESTING**: Create `gamificationStore.test.ts` to test XP and level calculations.
    -   [ ] **TESTING**: Update `applicationStore.test.ts` to verify `addXp` is called.

-   [ ] **3.2: Gamification UI & Achievements**
    -   [ ] Create `src/components/GamificationHeader.tsx` to display Level and XP bar.
    -   [ ] Integrate `GamificationHeader` into `App.tsx`.
    -   [ ] Define the 20 achievements (id, name, description, `check` function) in `gamificationStore.ts`.
    -   [ ] Add `unlockedAchievements: string[]` to the gamification store state.
    -   [ ] Implement a `checkAchievements()` function in the store.
    -   [ ] Call `checkAchievements()` after relevant user actions.
    -   [ ] Add an audio file for achievement unlocks to `src/assets/sounds`.
    -   [ ] Create `src/components/AchievementUnlockedModal.tsx`.
    -   [ ] Style the modal and add entrance/exit animations.
    -   [ ] Add sound effect playback to the modal.
    -   [ ] Use `uiStore` to trigger the achievement modal from the `gamificationStore`.

## Phase 4: Advanced Features & Final Polish

**Goal:** Add final features, polish the experience, and prepare for "release".

-   [ ] **4.1: Search, Filter, and Sort**
    -   [ ] Add state management for search term and filter values in the component displaying the list.
    -   [ ] Add a text input for keyword search (Company, Title, Notes).
    -   [ ] Add UI controls for filtering by date range and salary.
    -   [ ] Add UI controls for sorting alphabetically (by Company or Title).
    -   [ ] Implement the filtering and sorting logic on the `applications` array before rendering.

-   [ ] **4.2: Onboarding & Autosave**
    -   [ ] Create an `OnboardingModal` component.
    -   [ ] Implement logic to show the modal only on the user's first visit (using a `localStorage` flag).
    -   [ ] Implement form autosave for `ApplicationForm` to prevent data loss on refresh (e.g., by saving draft to `sessionStorage` or a separate `localStorage` key).

-   [ ] **4.3: Final Review & Documentation**
    -   [ ] Perform a final round of manual testing across all features.
    -   [ ] Test on latest versions of Chrome, Firefox, Safari, and Edge.
    -   [ ] Load test with 500+ dummy applications to check for performance issues.
    -   [ ] Implement graceful error handling for storage quota limits (if possible).
    -   [ ] Create a detailed `README.md` with project overview, features, setup instructions, and tech stack.
    -   [ ] Create sample test data file for QA purposes (`sample-data.json`).
    -   [ ] Clean up code, remove console logs, and add comments where necessary.
