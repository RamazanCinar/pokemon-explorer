# Pokémon Explorer

A Next.js project using Tailwind CSS, Storybook, and Playwright to showcase Pokémon data from the PokeAPI.

## Prerequisites

- [Next.js](https://nextjs.org/) version 15
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RamazanCinar/pokemon-explorer.git
   cd pokemon-explorer
   ```
2. Insall dependencies:
 ```bash
   npm install
   ```

   ## Running the project
   Start the Next.js development server on http://localhost:3000:
   ```bash
   npm run dev
   ```
   ## Running Storybook
   To view your components in isolation via Storybook (usually available at http://localhost:6006):
   ```bash
   npm run storybook
   ```
   ## Running Playwright Tests
   Make sure Storybook is running, then run the Playwright tests with:
   ```bash
   npx playwright test
   ```
   This command will run your tests that interact with your components in Storybook.
Project Structure
	•	/app – Contains your Next.js app and pages.
	•	/components – Contains reusable UI components (e.g., PokemonCard, Header, Footer).
	•	/stories – Contains Storybook stories for your components.
	•	/tests – Contains Playwright tests.
	•	/types – Contains TypeScript types and interfaces used in the project.
