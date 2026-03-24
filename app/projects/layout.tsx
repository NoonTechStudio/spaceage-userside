import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Space Age Group",
  description:
    "Explore premium residential and commercial projects by Space Age Group in Vadodara.",
};

/**
 * Pulls the projects pages up so the full-screen hero carousels sit
 * directly behind the transparent glassmorphism navbar.
 */
export default function ProjectsLayout({
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
