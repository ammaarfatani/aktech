import Link from "next/link";

export function InsightBody({ body }: { body: string[] }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed text-[#4B5563]">
      {body.map((block) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={block} className="pt-4 font-heading text-2xl font-extrabold text-[#111111]">
              {block.slice(3)}
            </h2>
          );
        }
        return <p key={block.slice(0, 48)}>{renderInline(block)}</p>;
      })}
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <span key={index}>{part}</span>;
    return (
      <Link key={index} href={match[2]} className="font-semibold text-[#E0000B] hover:underline">
        {match[1]}
      </Link>
    );
  });
}
