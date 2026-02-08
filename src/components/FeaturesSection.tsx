"use client";

import { Shield, Scale, MessageSquare, Zap } from "lucide-react";

const features = [
    {
        icon: <Shield className="h-6 w-6" />,
        title: "Risk Analysis",
        description: "Our AI scans every clause to identify potential risks, hidden fees, and abusive terms.",
    },
    {
        icon: <Scale className="h-6 w-6" />,
        title: "Intelligent Comparison",
        description: "Upload two versions of a contract and detect subtle differences that could change the agreement.",
    },
    {
        icon: <MessageSquare className="h-6 w-6" />,
        title: "Chat with your Document",
        description: "Have doubts? Ask our chat assistant directly about any point in the contract.",
    },
    {
        icon: <Zap className="h-6 w-6" />,
        title: "Instant Results",
        description: "Get a detailed breakdown in seconds, without waiting and with clear explanations.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 dark:bg-blue-500/5 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-y-1/4 translate-x-1/4 dark:bg-purple-500/5 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">
                        Everything you need to sign with confidence
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Professional tools designed to protect your interests without legal complications.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative rounded-2xl border border-zinc-200 bg-white/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50"
                        >
                            <div
                                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 dark:bg-cyan-600 dark:shadow-cyan-600/30"
                            >
                                {feature.icon}
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
