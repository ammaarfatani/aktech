type RecordPage = {path:string;status:string;approvedBy:string;kind:string;canonical:string;title:string;description:string;h1:string;primaryKeyword:string;secondaryKeywords:string[];intent:string;introduction:string;context:string;benefits:string[];stack:string[];portfolio:string[];process:string[];faqs:{question:string;answer:string}[];related:string[];cta:string;service:string;updated:string};
export function validatePages(pages: RecordPage[], existing: string[], portfolio: string[]) {
 const paths = new Set(existing), titles = new Set<string>(), descriptions = new Set<string>();
 const validRoutes=new Set([...existing,...pages.filter(p=>p.status === "published").map(p=>p.path)]);
 for(const page of pages) {
  if(!/^\/(services|locations|industries|technologies|solutions)\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(page.path) || paths.has(page.path)) throw new Error(`Duplicate or invalid route: ${page.path}`);
  paths.add(page.path);
  if(page.canonical !== `https://aktech.tech${page.path}`) throw new Error(`Invalid canonical: ${page.path}`);
  if(!["draft","review","published"].includes(page.status)) throw new Error("Invalid publication state");
  if(!["service","location","industry","technology","solution"].includes(page.kind)) throw new Error("Invalid page kind");
  if(page.status !== "published") continue;
  for(const field of ["approvedBy","title","description","h1","primaryKeyword","intent","introduction","context","cta","service"] as const) if(!page[field]?.trim()) throw new Error(`Missing ${field}: ${page.path}`);
  if(titles.has(page.title) || descriptions.has(page.description)) throw new Error("Duplicate metadata");
  titles.add(page.title);descriptions.add(page.description);
  if(page.introduction.length < 160 || page.context.length < 160 || page.benefits.length < 3 || page.process.length < 3 || !page.stack.length || !page.secondaryKeywords.length || page.faqs.length < 2 || page.related.length < 1) throw new Error(`Incomplete content: ${page.path}`);
  if([...page.benefits,...page.process,...page.stack,...page.secondaryKeywords].some(text=>!text.trim()) || page.faqs.some(f=>!f.question.trim() || !f.answer.trim())) throw new Error("Empty content item");
  if(!/^\d{4}-\d{2}-\d{2}$/.test(page.updated) || !Number.isFinite(Date.parse(page.updated)) || new Date(page.updated).toISOString().slice(0,10)!==page.updated) throw new Error("Invalid update date");
  if(page.portfolio.some(slug=>!portfolio.includes(slug))) throw new Error("Unknown portfolio reference");
  if(page.related.some(path=>!validRoutes.has(path))) throw new Error("Broken or unpublished related link");
 }
 return true;
}
