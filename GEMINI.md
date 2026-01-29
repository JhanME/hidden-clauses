# GEMINI.md

## Project Overview

This is a Next.js application that allows users to upload a PDF contract and get an analysis of the clauses. The analysis is done by the Gemini API, which identifies potentially harmful or warning clauses. The application is designed to help users understand the risks associated with a contract before signing it.

## Main Technologies

*   **Framework:** Next.js
*   **Language:** TypeScript
*   **UI:** React, Tailwind CSS
*   **API:** Google Generative AI (Gemini)
*   **PDF Viewer:** react-pdf

## Architecture

The application is divided into a frontend and a backend, both handled by Next.js.

*   **Frontend:** The frontend is a single-page application that provides the user interface for uploading the PDF file and displaying the analysis results. It is built with React and Tailwind CSS. The main components are:
    *   `LandingPage`: The main landing page of the application.
    *   `AnalyzePage`: The page where the user can upload a PDF file and see the analysis results.
    *   `PdfUploader`: A component that allows the user to select a PDF file.
    *   `PdfViewer`: A component that displays the PDF file.
    *   `AnalysisPanel`: A component that displays the analysis results from the Gemini API.

*   **Backend:** The backend is a Next.js API route that handles the file upload, calls the Gemini API, and returns the analysis to the frontend.
    *   `/api/analyze`: This API route receives the PDF file, sends it to the Gemini API with a detailed prompt, and returns the analysis in JSON format.

## Building and Running

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the application.

4.  **Build the application:**
    ```bash
    npm run build
    ```

5.  **Start the production server:**
    ```bash
    npm run start
    ```

## Development Conventions

*   **Code Style:** The project uses ESLint to enforce a consistent code style. You can run the linter with `npm run lint`.
*   **Type Checking:** The project is written in TypeScript and uses `tsconfig.json` for type checking.
*   **File Structure:** The source code is organized into the following directories:
    *   `src/app`: Contains the pages and API routes of the application.
    *   `src/components`: Contains the React components used in the application.
    *   `src/lib`: Contains the helper functions and type definitions.
