import Link from "next/link";
import { publishedInsights } from "@/data/insights";

export function InsightsPreview() {
  const articles = publishedInsights().slice(0, 3);
  return (
    <section className="border-t border-black/5 bg-white py-24 px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#E0000B]">Insights</p>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">Notes worth publishing.</h2>
          </div>
          <Link href="/insights" className="text-xs font-bold uppercase tracking-[0.18em] hover:text-[#E0000B]">
            View insights
          </Link>
        </div>
        {articles.length === 0 ? (
          <p className="mt-10 max-w-xl text-[#4B5563]">
            The editorial section is ready. Articles appear here only after they have been written and marked as published.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.slug} href={`/insights/${article.slug}`} className="rounded-3xl border border-black/8 p-6 hover:border-[#E0000B]/30">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E0000B]">{article.category}</p>
                <h3 className="mt-3 font-heading text-xl font-extrabold">{article.title}</h3>
                <p className="mt-2 text-sm text-[#4B5563]">{article.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
