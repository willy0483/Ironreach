import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ironreach",
  description:
    "Ironreach is a modern chat platform designed for seamless communication and collaboration. Create servers, join channels, and connect with friends or communities through text, voice, and video. With real-time messaging, customizable roles, and powerful moderation tools, Ironreach makes it easy to stay connected and organized—whether you're gaming, studying, or working together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>{children}</body>
    </html>
  );
}
