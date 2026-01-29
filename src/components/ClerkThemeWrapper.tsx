"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "@/components/ThemeProvider";

export default function ClerkThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        variables: {
          colorPrimary: "#2563eb",
        },
        elements: {
          modalBackdrop: "backdrop-blur-[2px] bg-black/30",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
