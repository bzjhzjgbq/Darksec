import Badge from "../ui/Badge";
import EmptyState from "../ui/EmptyState";

export default function UserArticleList({ articles }) {
  if (!articles.length) {
    return (
      <EmptyState
        eyebrow="Learning Notes"
        title="还没有学习日志"
        description="你的课程复盘、技术笔记和竞赛总结会展示在这里。"
      />
    );
  }

  return (
    <div className="grid gap-4">
      {articles.map((article) => (
        <article key={article.id} className="surface interactive-surface p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <Badge>{article.tag}</Badge>
            <span>{article.publishedAt}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
          <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.03em] text-slate-950">
            {article.title}
          </h3>
          <p className="mt-3 body-sm">{article.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
