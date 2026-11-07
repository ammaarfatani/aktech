"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { INSIGHT_CATEGORIES, insightCover, publishedInsights, type InsightArticle } from "@/data/insights";

export function InsightsIndex() {
  const articles = publishedInsights();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const featured = articles[0];

  const visible = useMemo(() => {
    return articles.filter((article) => {
      const matchCategory = category === "All" || article.category === category;
      const haystack = `${article.title} ${article.description} ${article.tags.join(" ")}`.toLowerCase();
      return matchCategory && haystack.includes(query.trim().toLowerCase());
    });
  }, [articles, category, query]);

  const showFeatured = Boolean(featured && category === "All" && !query.trim());
  const grid = showFeatured ? visible.filter((article) => article.slug !== featured?.slug) : visible;

  if (!articles.length) return null;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles"
          className="flex-1 rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E0000B]/15"
        />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {["All", ...INSIGHT_CATEGORIES].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] ${
              category === item ? "bg-[#111111] text-white" : "bg-black/5"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {showFeatured && featured && <FeaturedCard article={featured} />}

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {grid.map((article) => (
          <li key={article.slug}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeaturedCard({ article }: { article: InsightArticle }) {
  return (
    <Link href={`/insights/${article.slug}`} className="mt-10 grid overflow-hidden rounded-[2rem] border border-black/8 bg-[#141414] text-white lg:grid-cols-2">
      <Cover article={article} className="min-h-[220px]" />
      <div className="p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E0000B]">Featured · {article.category}</p>
        <h2 className="mt-4 font-heading text-3xl font-extrabold">{article.title}</h2>
        <p className="mt-4 text-white/70">{article.description}</p>
        <p className="mt-6 text-xs uppercase tracking-[0.16em] text-white/50">
          {article.date} · {article.readingTime} read
        </p>
      </div>
    </Link>
  );
}

function ArticleCard({ article }: { article: InsightArticle }) {
  return (
    <Link href={`/insights/${article.slug}`} className="block overflow-hidden rounded-[1.75rem] border border-black/8 hover:border-[#E0000B]/30">
      <Cover article={article} className="h-40" />
      <div className="p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E0000B]">{article.category}</p>
        <h2 className="mt-2 font-heading text-xl font-extrabold">{article.title}</h2>
        <p className="mt-2 text-sm text-[#4B5563]">{article.description}</p>
        <p className="mt-4 text-xs text-[#6B7280]">
          {article.date} · {article.readingTime} read
        </p>
      </div>
    </Link>
  );
}

function Cover({ article, className }: { article: InsightArticle; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#111111] ${className ?? ""}`}>
      <Image src={insightCover(article.category)} alt="" fill unoptimized className="object-cover" />
    </div>
  );
}
