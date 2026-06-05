import type { Metadata } from "next";
import "./globals.css";
import { outfit } from "@/components/ui/fonts";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Cloud Raze",
  description:
    "Cloud Raze is a modern weather app that delivers clear, real-time forecasts, current conditions, and location-based weather insights in a fast, easy-to-use interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full`}
    >
      <body className={`${outfit.variable} font-sans antialiased min-h-full flex flex-col`} cz-shortcut-listen="true">
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
