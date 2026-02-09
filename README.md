# Hidden Clauses

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.1-black?logo=next.js&logoColor=white" alt="Next.js" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" /></a>
  <a href="https://git-scm.com/"><img src="https://img.shields.io/badge/Git-Version_Control-F05032?logo=git&logoColor=white" alt="Git" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://ai.google.dev/"><img src="https://img.shields.io/badge/Google_Gemini-AI-9F55FF?logo=google&logoColor=white" alt="Google Gemini" /></a>
  <a href="https://code.visualstudio.com/"><img src="https://img.shields.io/badge/VSCode-Editor-007ACC?logo=visualstudiocode&logoColor=white" alt="VSCode" /></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-Deployment-000000?logo=vercel&logoColor=white" alt="Vercel" /></a>
</p>

## About the Project

**Hidden Clauses** is an essential tool designed to empower users in the face of legal complexity. Utilizing the power of **Google Gemini** Artificial Intelligence, our application analyzes contracts in PDF format to detect, highlight, and explain potentially abusive, risky, or confusing clauses—the "fine print" that often goes unnoticed.

The goal is simple but vital: **Read what no one reads to protect what everyone signs.**

This application was built as part of a Hackathon, demonstrating how AI can have a real and positive impact on people's everyday legal security.

## Main Features

*   **Intelligent Contract Analysis:** Upload your PDF and let the AI scan every paragraph for unfavorable terms.
*   **Document Comparison:** Upload two versions of a contract to identify subtle but critical changes between them.
*   **Chat with your Contract:** Have specific doubts? Ask the document directly and get answers based on the legal context of the file.
*   **Sensitive Data Detection:** Automatic identification of personally identifiable information (PII) before analysis to protect privacy.
*   **Modern and Intuitive Interface:** Designed with the latest web technologies for a smooth and pleasant user experience.

## Technologies Used

This project leverages a modern and robust tech stack:

*   **Frontend & Framework:** [Next.js 16](https://nextjs.org/) with [React 19](https://react.dev/) for optimal performance and server-side rendering.
*   **Language:** [TypeScript](https://www.typescriptlang.org/) for safe and scalable code.
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) for fast, responsive, and visually appealing design.
*   **Artificial Intelligence:** [Google Gemini API](https://ai.google.dev/) for natural language processing and legal analysis.
*   **PDF Handling:** `react-pdf` for visualization and `pdf-parse` (or similar) for text extraction.
*   **Iconography:** [Lucide React](https://lucide.dev/) for clean and consistent icons.

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/JhanME/hidden-clauses.git
    cd hidden-clauses
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure environment variables**
    Create a `.env.local` file in the root of the project and add your Google Gemini API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Team

*   **Andres** - [GitHub](https://github.com/AndresRJ18)
*   **Wilmer** - [GitHub](https://github.com/sebastianherrera77)
*   **Jhan** - [GitHub](https://github.com/JhanME)

---
<p align="center">
  Made in the Gemini 3 Hackathon
</p>
