import type { Metadata } from "next";
import { Inter, Actor } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });
const font = Actor({ adjustFontFallback: true, weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
