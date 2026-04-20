import { Link } from "react-router-dom";
import Badge from "../ui/Badge";

export default function ArticleSidebar({ recommended, tags, authors, onTagSelect }) {
  return (
    <div className="space-y-4">
      <section className="surface p-5">
        <p className="eyebrow">Recommended</p>
        <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">编辑推荐</h3>
        <div className="mt-4 space-y-3">
          {recommended.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.id}`}
              className="block rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition duration-200 hover:border-slate-300 hover:bg-white"
            >
              <p className="text-sm font-medium leading-6 text-slate-900">{article.title}</p>
              <p className="mt-2 text-xs leading-6 text-slate-500">
                {article.author} / {article.readTime}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="surface p-5">
        <p className="eyebrow">Tags</p>
        <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">热门标签</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button key={tag} type="button" onClick={() => onTagSelect?.(tag)}>
              <Badge>{tag}</Badge>
            </button>
          ))}
        </div>
      </section>

      <section className="surface p-5">
        <p className="eyebrow">Authors</p>
        <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">活跃作者</h3>
        <div className="mt-4 space-y-3">
          {authors.map((author) => (
            <div
              key={author.author}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-xs font-semibold text-white">
                {author.author.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">{author.author}</p>
                <p className="truncate text-xs text-slate-500">{author.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
