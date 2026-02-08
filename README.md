# Hidden Clauses

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.1-black?logo=next.js&logoColor=white" alt="Next.js" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://ai.google.dev/"><img src="https://img.shields.io/badge/Google%20Gemini-AI-8E75B2?logo=google&logoColor=white" alt="Google Gemini" /></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-Deployment-000000?logo=vercel&logoColor=white" alt="Vercel" /></a>
</p>

## Sobre el Proyecto

**Hidden Clauses** es una herramienta esencial diseñada para empoderar a los usuarios frente a la complejidad legal. Utilizando la potencia de la Inteligencia Artificial de **Google Gemini**, nuestra aplicación analiza contratos en formato PDF para detectar, resaltar y explicar cláusulas potencialmente abusivas, riesgosas o confusas "letras pequeñas" que a menudo pasan desapercibidas.

El objetivo es simple pero vital: **Leer lo que nadie lee para proteger lo que todos firman.**

Esta aplicación fue construida como parte de un Hackathon, demostrando cómo la IA puede tener un impacto real y positivo en la seguridad jurídica cotidiana de las personas.

## Características Principales

*   **Análisis Inteligente de Contratos:** Sube tu PDF y deja que la IA escanee cada párrafo en busca de términos desfavorables.
*   **Comparación de Documentos:** Sube dos versiones de un contrato para identificar cambios sutiles pero críticos entre ellas.
*   **Chat con tu Contrato:** ¿Tienes dudas específicas? Pregúntale directamente al documento y obtén respuestas basadas en el contexto legal del archivo.
*   **Detección de Datos Sensibles:** Identificación automática de información personal (PII) antes del análisis para proteger la privacidad.
*   **Interfaz Moderna e Intuitiva:** Diseñada con las últimas tecnologías web para una experiencia de usuario fluida y agradable.

## Tecnologías Utilizadas

Este proyecto aprovecha un stack tecnológico moderno y robusto:

*   **Frontend & Framework:** [Next.js 16](https://nextjs.org/) con [React 19](https://react.dev/) para un rendimiento óptimo y renderizado del lado del servidor.
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para un código seguro y escalable.
*   **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/) para un diseño rápido, responsivo y visualmente atractivo.
*   **Inteligencia Artificial:** [Google Gemini API](https://ai.google.dev/) (`gemini-1.5-flash`) para el procesamiento de lenguaje natural y análisis legal.
*   **Manejo de PDF:** `react-pdf` para la visualización y `pdf-parse` (o similar) para la extracción de texto.
*   **Iconografía:** [Lucide React](https://lucide.dev/) para iconos limpios y consistentes.

## Comenzando

Sigue estos pasos para ejecutar el proyecto localmente.

### Prerrequisitos

*   Node.js (versión LTS recomendada)
*   npm

### Instalación

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/JhanME/hidden-clauses.git
    cd hidden-clauses
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**
    Crea un archivo `.env.local` en la raíz del proyecto y añade tu clave API de Google Gemini:
    ```env
    GEMINI_API_KEY=tu_clave_api_aqui
    ```

4.  **Ejecutar el servidor de desarrollo**
    ```bash
    npm run dev
    ```

5.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Equipo

*   **Andres** - [GitHub](https://github.com/AndresRJ18)
*   **Wilmer** - [GitHub](https://github.com/sebastianherrera77)
*   **Jhan** - [GitHub](https://github.com/JhanME)

---
<p align="center">
  Hecho en el Gemini 3 Hackathon
</p>
