# Hidden Clauses

Hidden Clauses is a web application that allows you to analyze PDF contracts to identify potentially harmful or unfavorable clauses. It is built with Next.js, React, and TypeScript, and it uses the Google Gemini API to perform the analysis.

## Technologies Used

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E44AD?style=for-the-badge&logo=google&logoColor=white)

## Important Information

*   **Project Overview:** This application helps users understand the risks of a contract before signing it by providing an AI-powered analysis of the document.
*   **Application Link:** [You can access the application here](https://hidden-clauses.vercel.app/) (placeholder link).
*   **Key Features:**
    *   PDF contract analysis using the Google Gemini API.
    *   Identification of potentially harmful or unfavorable clauses.
    *   A user-friendly interface for uploading and viewing the analysis.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/JhanME/hidden-clauses.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Create a `.env.local` file in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
