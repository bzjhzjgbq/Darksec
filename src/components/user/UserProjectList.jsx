import Badge from "../ui/Badge";
import EmptyState from "../ui/EmptyState";

export default function UserProjectList({ projects, title = "我的项目" }) {
  if (!projects.length) {
    return (
      <EmptyState
        eyebrow="Projects"
        title="还没有项目记录"
        description="这里会展示你的课程作品、练习项目和竞赛页面。"
      />
    );
  }

  return (
    <section className="surface p-5">
      <div>
        <p className="eyebrow">Projects</p>
        <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">{title}</h3>
      </div>
      <div className="mt-4 space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition duration-200 hover:border-slate-300 hover:bg-white"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <Badge>{project.category}</Badge>
              <span>{project.status}</span>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-900">{project.name}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{project.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
