"use client";

import { FileUp, Search, CheckCircle, ShieldAlert } from "lucide-react";

const steps = [
    {
        icon: <FileUp className="h-8 w-8" />,
        title: "1. Carga tu Contrato",
        description: "Sube tu archivo PDF en segundos. Tu documento se procesa en memoria para garantizar máxima privacidad.",
    },
    {
        icon: <ShieldAlert className="h-8 w-8" />,
        title: "2. Protección Inteligente",
        description: "Automáticamente detectamos y filtramos datos sensibles antes de iniciar el análisis para proteger tu identidad.",
    },
    {
        icon: <Search className="h-8 w-8" />,
        title: "3. Análisis Profundo",
        description: "Nuestra IA impulsada por Gemini examina cada cláusula buscando riesgos ocultos y términos abusivos.",
    },
    {
        icon: <CheckCircle className="h-8 w-8" />,
        title: "4. Claridad Instantánea",
        description: "Recibe un informe detallado con alertas visuales y explicaciones claras sobre lo que estás firmando.",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-zinc-50/50 dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">
                        ¿Cómo funciona?
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Cuatro pasos simples para asegurar tu tranquilidad legal.
                    </p>
                </div>

                <div className="relative">
                    {/* Connector line for desktop */}
                    <div className="absolute top-12 left-0 hidden w-full md:block">
                        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white border border-zinc-200 shadow-sm dark:bg-zinc-950 dark:border-zinc-800">
                                    <div className="text-blue-600 dark:text-blue-400">
                                        {step.icon}
                                    </div>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-500 dark:text-zinc-400 max-w-xs">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
