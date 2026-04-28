import { Link } from "react-router-dom";
import Badge from "../ui/Badge";

function Stat({ label, value }) {
  return (
    <div className="stat-pill">
      {label} <span className="ml-1 text-slate-900">{value}</span>
    </div>
  );
}

export default function ArticleListCard({ article }) {
  return (
    <article className="group surface interactive-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <Badge>{article.category}</Badge>
        <span>{article.publishedAt}</span>
        <span>/</span>
        <span>{article.readTime}</span>
      </div>

      <Link to={`/articles/${article.id}`} className="mt-4 block">
        <h3 className="text-[24px] font-semibold tracking-[-0.04em] text-slate-950 transition duration-200 group-hover:text-emerald-700">
          {article.title}
        </h3>
      </Link>

      <p className="mt-3 text-[15px] leading-7 text-slate-600">{article.excerpt}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-900">{article.author}</p>
          <p className="text-xs text-slate-500">{article.role}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Stat label="阅读" value={article.views.toLocaleString()} />
          <Stat label="评论" value={article.comments} />
          <Stat label="点赞" value={article.likes} />
        </div>
      </div>
    </article>
  );
}
