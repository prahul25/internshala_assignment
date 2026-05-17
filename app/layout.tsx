import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Internshala Open Internships — Discover Top Internships",
  description:
    "Find the best internships across India. Explore opportunities in tech, marketing, design, and more at top companies.",
  openGraph: {
    title: "Internshala Open Internships",
    description: "Discover top internships across India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-background text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  );
}
