Project Blueprint: Job Application Tracker
The development process is broken down into four main phases, each with smaller, iterative steps. This ensures a stable foundation before adding complexity.
Phase 1: Core Application Foundation (CRUD & Data)
This phase focuses on the absolute essentials: defining the data, storing it, and performing basic Create, Read, Update, and Delete (CRUD) operations. We will ignore theming and gamification for now.
Step 1.1: Project Setup. Initialize a new React project using Vite with TypeScript. Set up basic folder structure (components, hooks, types, assets).
Step 1.2: Data Model & Storage Hook. Define the TypeScript types for a JobApplication. Create a custom hook (useJobApplications) to abstract all localStorage interactions (read, add, update, delete). This is the most critical part of the foundation and will be unit-tested thoroughly.
Step 1.3: Display Applications. Create a simple ApplicationList component that uses the useJobApplications hook to display all stored applications in a basic, unstyled list.
Step 1.4: Add New Application. Create an ApplicationForm component. Implement the logic to add a new application using the hook. This will involve form state management and validation.
Step 1.5: Delete Application. Add a "Delete" button to each item in the ApplicationList and wire it to the deleteApplication function in the hook.
Step 1.6: Update Application. Implement the update/edit functionality. This will involve creating a modal or a separate page for editing, pre-filling the ApplicationForm with existing data, and calling the updateApplication function from the hook.
Phase 2: UI/UX, Theming, and Dashboard
With the core functionality working, we now apply the visual theme and build the dashboard.
Step 2.1: 8-Bit Theming. Integrate pixel fonts, a color palette (with dark mode), and basic CSS for a retro feel. Create a few reusable "pixel" components (e.g., PixelButton, PixelContainer).
Step 2.2: Style Core Components. Apply the new 8-bit theme to the ApplicationList and ApplicationForm, making them visually consistent with the spec.
Step 2.3: Dashboard & Charting Setup. Create a Dashboard component. Integrate a charting library (e.g., Chart.js) and create a wrapper component for a styled, 8-bit-themed chart.
Step 2.4: Implement Dashboard Charts. Add the "Applications per Month" bar chart and the "Status Funnel" spider web chart, including the necessary data processing logic.
Phase 3: Gamification Engine
Now we layer the gamification system on top of the existing, functional application.
Step 3.1: Gamification Service. Create a non-UI hook or service (useGamification) to manage all gamification logic: XP, levels, and achievements. It will be responsible for calculating level progression and checking achievement criteria. This will be unit-tested.
Step 3.2: Integrate XP Rewards. Modify the useJobApplications hook to call functions from the useGamification service whenever an application is added, updated, or deleted, awarding or penalizing XP accordingly.
Step 3.3: Gamification UI. Create UI elements to display the current Level and XP progression bar, likely in the main app header or sidebar.
Step 3.4: Achievement System. Define the 20 achievements and their unlock logic within the gamification service. Implement the animated achievement unlock modal, complete with sound effects. Trigger this modal from the service when an achievement is unlocked.
Phase 4: Advanced Features & Final Polish
The final phase adds advanced filtering, onboarding, and ensures the app is robust.
Step 4.1: Search and Filtering. Add UI controls for keyword search and filtering by date range and salary. Implement the logic to filter the displayed list of applications.
Step 4.2: Sorting. Add controls to sort the application list alphabetically by company name or job title.
Step 4.3: Onboarding Tutorial. Create a simple "first launch" tutorial modal that explains the app's key features.
Step 4.4: Final Review & Documentation. Thoroughly test all features, add autosave for forms, handle edge cases (like storage limits), and write the final README.md.
LLM Prompts for Implementation
Here are the step-by-step prompts for a code-generation LLM. Each prompt builds upon the code generated by the previous one.
Prompt 1: Project Setup & Structure
You are an expert React developer. Your task is to set up a new web application project for a "Job Application Tracker" as specified.

**Instructions:**
1.  Provide the shell commands to create a new React project named `job-tracker-app` using Vite with the `react-ts` template.
2.  After project creation, list the commands to install the following essential libraries: `zustand` for state management, `react-router-dom` for potential future routing, and `vitest` + `@testing-library/react` for testing.
3.  Describe the initial directory structure inside `src`. Create the following empty directories:
    *   `src/components`
    *   `src/hooks`
    *   `src/store`
    *   `src/types`
    *   `src/assets/fonts`
    *   `src/assets/sounds`
    *   `src/assets/images`
4.  Replace the contents of `App.tsx` with a basic placeholder component that displays an `<h1>` with the text "Job Application Tracker".
5.  Remove the default boilerplate CSS from `App.css` and `index.css`. Add a simple body rule to `index.css` to set a dark background color (`#1a1a1a`) and a default text color (`#f0f0f0`).
Use code with caution.
Text
Prompt 2: Data Model and Local Storage Hook
Based on the project set up in the previous step, we will now create the core data model and the hook for managing data persistence in `localStorage`. This is a critical step that should not involve any UI yet.

**Instructions:**
1.  **Define Types:** In `src/types/index.ts`, create and export the following TypeScript types and enums based on the spec:
    *   `ApplicationStatus`: An enum for 'Applied', 'Interviewing', 'Offer', 'Rejected', 'Ghosted'.
    *   `JobType`: An enum for 'Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance', 'Temporary'.
    *   `JobApplication`: A type interface for a single application, including all fields from the spec (`id: string`, `company`, `jobTitle`, `dateApplied`, `status`, `link`, `salaryRange`, `contactInfo`, `notes`, `jobType`). The `id` should be a unique identifier (e.g., using `Date.now()` or a simple UUID).

2.  **Create Global Store:** In `src/store/applicationStore.ts`, use `zustand` to create a store for managing the job applications. The store should be persisted to `localStorage`.
    *   The store's state should contain an array of `JobApplication` objects: `applications: JobApplication[]`.
    *   The store should expose the following actions:
        *   `addApplication(application: Omit<JobApplication, 'id'>)`: Adds a new application with a unique ID.
        *   `updateApplication(id: string, updates: Partial<JobApplication>)`: Updates an existing application by its ID.
        *   `deleteApplication(id: string)`: Removes an application by its ID.
    *   Use Zustand's `persist` middleware to save the entire store to `localStorage` under the key `job-application-tracker-data`.

3.  **Create Test File:** Create `src/store/applicationStore.test.ts`. Write unit tests for the store using `vitest`.
    *   Before each test, clear `localStorage` and reset the store's state.
    *   Test the `addApplication` action: verify the application is added to the state and `localStorage`.
    *   Test the `updateApplication` action: verify an application's properties are correctly updated in the state and `localStorage`.
    *   Test the `deleteApplication` action: verify an application is correctly removed from the state and `localStorage`.

4.  **Integrate with App:** In `App.tsx`, import the store and use it to log the current applications to the console. This verifies that the store is initialized and reading from `localStorage` correctly on startup.
Use code with caution.
Text
Prompt 3: Display the List of Applications
With our data store and types defined and tested, the next step is to display the applications in the UI.

**Instructions:**
1.  **Create Component:** In `src/components/`, create a new component file named `ApplicationList.tsx`.
2.  **Component Logic:**
    *   The `ApplicationList` component should import and use our `applicationStore` from Zustand.
    *   It should retrieve the `applications` array from the store.
    *   It should map over the `applications` array and render a `div` for each application.
    *   For now, display only the `company`, `jobTitle`, and `status` for each application in a simple, unstyled format.
    *   If there are no applications, it should display a message like "No applications yet. Add one to get started!".
3.  **Create Test File:** Create `src/components/ApplicationList.test.tsx`.
    *   Write a test that renders the component with an empty store and verifies the "No applications yet" message is displayed.
    *   Write a test that pre-populates the store with a few mock applications and verifies that they are rendered correctly on the screen.
4.  **Integrate into App:** In `App.tsx`, import and render the `ApplicationList` component below the main `<h1>` heading. Remove the `console.log` from the previous step.
Use code with caution.
Text
Prompt 4: Add New Application Form & Logic
Now that we can see our applications, we need a way to add new ones. We will build the form and wire it up to our store.

**Instructions:**
1.  **Create Form Component:** In `src/components/`, create `ApplicationForm.tsx`.
2.  **Form UI:**
    *   Build a form with controlled input fields for all the `JobApplication` properties specified in the spec (Company, Job Title, Date Applied, Status, Link, etc.).
    *   Use `<input type="date">` for the date, `<select>` for enums (`ApplicationStatus`, `JobType`), and `<textarea>` for notes.
    *   Implement basic client-side form validation: mark `company`, `jobTitle`, `dateApplied`, and `status` as required.
3.  **Form Logic:**
    *   Use the `useState` hook within `ApplicationForm` to manage the form's state.
    *   On form submission, call the `addApplication` action from our `applicationStore`.
    *   After successful submission, clear the form fields.
4.  **Create Test File:** Create `src/components/ApplicationForm.test.tsx`.
    *   Write tests to ensure the form renders correctly with all its fields.
    *   Write a test that simulates filling out the form and submitting it. Verify that the `addApplication` function (which you'll need to mock) is called with the correct data.
5.  **Integrate into App:** In `App.tsx`, render the `ApplicationForm` component above the `ApplicationList`. This will create the primary user interface for the app.
Use code with caution.
Text
Prompt 5: Delete and Update Functionality
The app now supports adding and viewing. Let's complete the core CRUD functionality by adding delete and update capabilities.

**Instructions:**
1.  **Add Delete Button:**
    *   In `ApplicationList.tsx`, for each application rendered, add a "Delete" button.
    *   When clicked, this button should call the `deleteApplication` action from the `applicationStore`, passing the correct application `id`.
    *   Add a `window.confirm` dialog before deleting to prevent accidental clicks.

2.  **Implement Update Logic:**
    *   We will use a modal for editing. Let's use `zustand` to manage the modal's state. In `src/store/uiStore.ts`, create a simple store to manage which application is being edited. It should have a state `editingApplicationId: string | null` and actions `startEditing(id: string)` and `stopEditing()`.
    *   In `ApplicationList.tsx`, add an "Edit" button next to the "Delete" button. On click, it should call `startEditing(application.id)`.
    *   In `App.tsx`, listen to the `uiStore`. If `editingApplicationId` is not null, render the `ApplicationForm` in an "edit mode" (perhaps inside a modal overlay).
    *   Modify `ApplicationForm.tsx` to accept an optional `applicationId` prop. If the prop is provided, the form should:
        *   Fetch the application's data from the `applicationStore`.
        *   Pre-fill the form fields with that data using a `useEffect`.
        *   Change the submit button text to "Update Application".
        *   On submission, call the `updateApplication` action instead of `addApplication`.
        *   After updating, it should call the `stopEditing()` action from the `uiStore` to close the modal.

3.  **Update Tests:**
    *   In `ApplicationList.test.tsx`, add a test to verify the delete button calls the `deleteApplication` action.
    *   In `ApplicationForm.test.tsx`, add tests for the new "edit mode," verifying the form pre-fills correctly and calls `updateApplication` on submit.
Use code with caution.
Text
Prompt 6: 8-Bit Theming and Component Styling
The core functionality is complete and tested. Now, let's implement the 8-bit visual theme.

**Instructions:**
1.  **Assets:** Assume we have a pixel font file (e.g., `PressStart2P-Regular.ttf`) in `src/assets/fonts`.
2.  **Global Styles:** In `index.css`, use `@font-face` to import the pixel font. Apply it to the `body` and set up CSS custom properties for our 8-bit color palette (e.g., `--pixel-bg`, `--pixel-fg`, `--pixel-accent`, `--pixel-border-color`). Define a default dark theme.
3.  **Reusable Components:**
    *   Create `src/components/ui/PixelButton.tsx`: A `<button>` component styled with a pixelated border, no border-radius, and the pixel font.
    *   Create `src/components/ui/PixelContainer.tsx`: A `<div>` component with a pixelated border style (e.g., using `border-image` or pseudo-elements for a retro look).
4.  **Style Core Components:**
    *   Refactor `ApplicationForm.tsx` and `ApplicationList.tsx`.
    *   Replace standard `<button>`s with our new `PixelButton`.
    *   Wrap the form and the list items in `PixelContainer` for a consistent look.
    *   Style all inputs, selects, and text areas to match the 8-bit theme (e.g., solid borders, no border-radius, monospaced/pixel font).
5.  **Dark Mode Toggle:** Add a simple toggle button (a `PixelButton`) in `App.tsx` that adds/removes a `dark-mode` class to the root `<html>` element. Update `index.css` with a `.dark-mode {}` block that redefines the color custom properties.
6.  **Update Tests:** Run existing tests to ensure no functionality was broken during the refactor. UI snapshot tests would be beneficial here if you want to add them.
Use code with caution.
Text
Prompt 7: Dashboard and Charts
With the app styled, let's build the statistics dashboard.

**Instructions:**
1.  **Install Charting Library:** Provide the command to install `chart.js` and `react-chartjs-2`.
2.  **Create Dashboard Component:** Create `src/components/Dashboard.tsx`. This component will contain our charts.
3.  **Data Processing Logic:**
    *   Inside `Dashboard.tsx`, fetch the `applications` from the `applicationStore`.
    *   Create a helper function that processes this data for the "Applications per Month" chart. It should group applications by month and count them.
    *   Create another helper function that processes data for the "Status Funnel". It should count the number of applications in each status (`Applied`, `Interviewing`, `Offer`).
4.  **Implement Charts:**
    *   Use the `Bar` component from `react-chartjs-2` to create the "Applications per Month" chart.
    *   Use the `Radar` component to create the "Status Funnel" chart.
    *   Configure the options for both charts to match the 8-bit theme: disable animations (or make them snappy), use the pixel font for labels, and use colors from our CSS custom properties.
5.  **Integrate:** Add a new "Dashboard" view. You can use a simple state toggle in `App.tsx` to switch between the main "Applications" view and the "Dashboard" view.
6.  **Testing:** Create `src/components/Dashboard.test.tsx`. Write tests that provide mock application data and verify that the chart components receive the correctly processed data props.
Use code with caution.
Text
Prompt 8: Gamification Engine (XP & Levels)
The app is now fully featured. Let's add the gamification layer, starting with the core engine for XP and levels.

**Instructions:**
1.  **Gamification Store:** Create `src/store/gamificationStore.ts` using Zustand, also persisted to `localStorage`.
    *   **State:** The store should manage `xp: number`.
    *   **Derived State:** It should have a way to calculate the current `level` and `progress` to the next level based on the `xp`. Let's define a simple formula: `level = Math.floor(xp / 100)`. `progress` would be `(xp % 100) / 100`.
    *   **Actions:**
        *   `addXp(amount: number)`: Adds a specified amount of XP to the total.
        *   `triggerAction(actionType, payload?)`: A central function to handle XP awards.

2.  **Define XP Rules:** In the same file, define an enum or constant for XP values (e.g., `XP_VALUES = { ADD_APP: 10, UPDATE_STATUS: 5, ... }`).
3.  **Integrate with Application Store:**
    *   Modify the `applicationStore.ts`. When actions like `addApplication`, `updateApplication`, and `deleteApplication` are called, they should also call the `addXp` action from the `gamificationStore` with the correct XP amount.
    *   For status updates, check if the status changed to 'Interviewing' or 'Offer' and award the bonus XP.
4.  **UI for XP/Level:**
    *   Create a new component `src/components/GamificationHeader.tsx`.
    *   This component will display the current Level (e.g., "LVL 5") and a visual XP progress bar.
    *   Render this component at the top of `App.tsx`.
5.  **Testing:**
    *   Create `src/store/gamificationStore.test.ts`. Unit test the XP and level calculation logic.
    *   Update tests in `src/store/applicationStore.test.ts` to verify that `addXp` (mocked) is called correctly when applications are manipulated.
Use code with caution.
Text
Prompt 9: Achievements System and Final Polish
This is the final major feature. We'll build the achievement system, including the unlock logic and the animated modal.

**Instructions:**
1.  **Achievement Definitions:**
    *   In `src/store/gamificationStore.ts`, define a list of 20 achievements. Each achievement object should have an `id`, `name`, `description`, and a `check` function. The `check` function will take the current `applications` array and the gamification state as arguments and return `true` if the achievement is unlocked.
    *   Example achievement: `{ id: 'first_app', name: 'Job Seeker', description: 'Add your first application', check: (apps) => apps.length >= 1 }`.
    *   The store's state should also include an array of unlocked achievement IDs: `unlockedAchievements: string[]`.

2.  **Achievement Check Logic:**
    *   In the `gamificationStore`, create a function `checkAchievements()` that iterates through all defined achievements.
    *   For each achievement, if it's not already in `unlockedAchievements` and its `check()` function returns true, add its ID to the `unlockedAchievements` array and trigger an event or state change to show the unlock modal. You can add a `newlyUnlocked: string | null` to the `uiStore` for this.

3.  **Integrate Achievement Checks:** Call `checkAchievements()` after any action that could unlock one (e.g., after adding an application, updating a status, or gaining XP).

4.  **Achievement Modal:**
    *   Create `src/components/AchievementUnlockedModal.tsx`.
    *   This component should be styled with the 8-bit theme and have an entrance/exit animation (e.g., slides in, pauses, slides out).
    *   It should display the unlocked achievement's name and description.
    *   Use the Web Audio API or HTML5 `<audio>` to play a short 8-bit sound effect (assume `achievement.wav` is in `src/assets/sounds`).
    *   In `App.tsx`, listen to the `uiStore`'s `newlyUnlocked` state. If it's not null, render the modal with the corresponding achievement's data.

5.  **Final Polish:**
    *   Implement the onboarding tutorial as a simple modal that shows if a specific flag in `localStorage` is not set. After showing, set the flag.
    *   Implement search, filter, and sort UI and logic in `ApplicationList.tsx` by adding state for filter values and applying `.filter()` and `.sort()` to the applications array before rendering.
    *   Write a comprehensive `README.md` file that explains the project, its features, the tech stack, and how to run it locally.
