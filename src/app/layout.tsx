import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "GrowSphere",
  description: "GrowSphere - Gardening made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextTopLoader color="#1a9f42" height={4} speed={500} />
      <body className={``}>{children}</body>
    </html>
  );
}
