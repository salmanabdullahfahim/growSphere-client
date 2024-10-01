import type { Metadata } from "next";
import "./globals.css";
import Progressbar from "@/utils/ProgressBar";
import { Toaster } from "sonner";

import { Providers } from "@/Context/Providers";

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
      <body>
        <Providers>
          <Progressbar>{children}</Progressbar>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
