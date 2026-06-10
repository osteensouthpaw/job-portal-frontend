import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import AuthProvider from "./AuthProvider";
import "./globals.css";
import QueryProvider from "./QueryProvider";

export const metadata: Metadata = {
  title: "Job Portal",
  description: "A job portal for job seekers and employers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-muted dark:bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="text-zinc-700 dark:text-zinc-300 ">
            <QueryProvider>
              <AuthProvider>{children}</AuthProvider>
            </QueryProvider>
            <Toaster richColors position="top-right" />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
