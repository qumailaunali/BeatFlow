import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeatFlow — AI FMCG Distribution (Beyond Tracking. Start Predicting.)",
  description: "BeatFlow is a Pakistani AI-powered FMCG distribution platform offering smart routing, demand prediction, and offline-first mobile order booking.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-text">
        {children}
      </body>
    </html>
  );
}


