import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vamsi Yerramsetti — Portfolio",
  description: "Machine Learning Engineer (MLOps) — production-grade ML systems, GenAI, and data products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain">
        {children}
      </body>
    </html>
  );
}
