"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: number;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  src: string;
}

const POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "designing-your-dream-home",
    category: "Design",
    date: "Mar 12, 2025",
    readTime: "5 min read",
    title: "Designing Your Dream Home: A Comprehensive Step-by-Step Guide",
    excerpt:
      "From floor plans to finishing touches — discover the essential steps that transform an idea into a home you'll love for generations.",
    src: "/images/About.jpg",
  },
  {
    id: 2,
    slug: "sustainable-construction-innovations",
    category: "Sustainability",
    date: "Apr 2, 2025",
    readTime: "4 min read",
    title: "Innovations Shaping the Future of Sustainable Construction",
    excerpt:
      "Green building materials, net-zero designs, and smart systems are redefining how India builds. Here's what's driving the change.",
    src: "/images/About.jpg",
  },
  {
    id: 3,
    slug: "choosing-the-right-builder",
    category: "Real Estate",
    date: "May 18, 2025",
    readTime: "6 min read",
    title: "Essential Factors for Choosing the Right Builder in Vadodara",
    excerpt:
      "With hundreds of developers in the market, knowing what to look for can save you time, money, and heartache. We break it all down.",
    src: "/images/About.jpg",
  },
];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const delays = ["delay-100", "delay-200", "delay-300"];

  return (
    <article
      className={`blog-card reveal-up ${delays[index]} group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 flex flex-col`}
    >
      <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: "16/9" }}>
        <div className="blog-card-img absolute inset-0">
          <Image
            src={post.src}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <span className="absolute top-4 left-4 z-10 text-[11px] font-semibold tracking-wider uppercase bg-white text-gray-700 px-3 py-1.5 rounded-md shadow-sm">
          {post.category}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-7">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="font-bold text-gray-900 text-lg leading-snug mb-3 group-hover:text-[#0d9488] transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-6">
          {post.excerpt}
        </p>
        <Link
          href={`/blogs/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d9488]"
        >
          Read More
          <svg
            className="transition-transform duration-200 group-hover:translate-x-1"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default function BlogsSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="blogs" className="w-full bg-gray-50 py-24 md:py-32">
      <div className="section-container">
        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="reveal-left flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#0d9488]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#0d9488]">
                Our Latest News
              </span>
            </div>
            <h2 className="reveal-left delay-100 text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Blog posts &amp;
              <br />
              <span className="text-[#0d9488]">articles.</span>
            </h2>
          </div>
          <div className="reveal-right">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#0d9488] border border-[#0d9488]/40 hover:bg-[#0d9488] hover:text-white transition-all duration-200"
            >
              View All Posts
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Blog grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {POSTS.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* ── Newsletter ── */}
        <div className="reveal-up delay-400 mt-16 bg-white rounded-2xl border border-gray-200 px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-bold text-gray-900 text-lg mb-1">Stay in the loop</h4>
            <p className="text-sm text-gray-500">
              Get the latest construction trends and project updates delivered to your inbox.
            </p>
          </div>
          <form className="flex w-full sm:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 sm:w-60 px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 outline-none focus:border-[#0d9488] transition-colors bg-white"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#0d9488] text-white text-sm font-semibold hover:bg-[#0f766e] transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
