import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Space Age Group | Real Estate Developers, Vadodara",
  description:
    "Space Age Group is a trusted real estate developer in Vadodara, Gujarat — delivering premium residential and commercial projects since decades.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {/* pt accounts for fixed ribbon (36px) + navbar (72px) = 108px */}
        <main style={{ paddingTop: "var(--header-total)" }}>
          {children}
        </main>
      </body>
    </html>
  );
}