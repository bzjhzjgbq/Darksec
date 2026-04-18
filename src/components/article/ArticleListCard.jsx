import Badge from "../ui/Badge";

export default function ArticleListCard({ article }) {
  return (
    <article className="group surface interactive-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <Badge>{article.tag}</Badge>
        <span>{article.category}</span>
        <span>·</span>
        <span>{article.publishedAt}</span>
      </div>

      <h3 className="mt-4 text-[24px] font-semibold tracking-[-0.04em] text-slate-950">
        {article.title}
      </h3>

      <p className="mt-3 text-[15px] leading-7 text-slate-600">{article.excerpt}</p>

      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-900">{article.author}</p>
          <p className="text-xs text-slate-500">{article.role}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="stat-pill">
            阅读 <span className="ml-1 text-slate-900">{article.views}</span>
          </div>
          <div className="stat-pill">
            点赞 <span className="ml-1 text-slate-900">{article.likes}</span>
          </div>
          <div className="stat-pill">
            时长 <span className="ml-1 text-slate-900">{article.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
