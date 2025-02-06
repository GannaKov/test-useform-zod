import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "./layout/header/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Test App",
  description: "useForm Zod",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
