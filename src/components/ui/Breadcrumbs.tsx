import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/shared/JsonLd";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <BreadcrumbJsonLd items={items.map((item) => ({ name: item.name, item: item.href }))} />
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#6B7280]">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {last ? (
                  <span className="text-[#111111] font-medium">{item.name}</span>
                ) : (
                  <Link href={item.href} className="hover:text-[#E0000B] transition-colors">
                    {item.name}
                  </Link>
                )}
                {!last && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
