import Badge from "../ui/Badge";
import EmptyState from "../ui/EmptyState";

export default function UserFavoriteList({ articles, projects }) {
  if (!articles.length && !projects.length) {
    return (
      <EmptyState
        eyebrow="Collections"
        title="还没有收藏记录"
        description="你收藏的文章、项目和灵感会统一整理在这里。"
      />
    );
  }

  return (
    <section className="surface p-5">
      <p className="eyebrow">Collections</p>
      <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">我的收藏</h3>

      <div className="mt-4 space-y-4">
        <div>
          <p className="mb-3 text-sm font-medium text-slate-700">收藏文章</p>
          <div className="space-y-3">
            {articles.map((article) => (
              <div
                key={article.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition duration-200 hover:border-slate-300 hover:bg-white"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <Badge>{article.tag}</Badge>
                  <span>{article.author}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-slate-900">{article.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-slate-700">收藏项目</p>
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition duration-200 hover:border-slate-300 hover:bg-white"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <Badge>{project.category}</Badge>
                  <span>{project.author.name}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-slate-900">{project.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
