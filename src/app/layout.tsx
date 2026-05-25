import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anamil El Aouras Wa El Zibane",
  description:
    "Heritage archive, online store, and cultural platform — Mchounèche, Biskra, Algeria",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
