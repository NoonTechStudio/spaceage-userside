import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Space Age Group",
  description:
    "A prominent name in Vadodara real estate since 1992 — Space Age Group combines luxury, affordability, and transparency to craft homes that last a lifetime.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginTop: "calc(-1 * var(--header-total))" }}>
      {children}
    </div>
  );
}
