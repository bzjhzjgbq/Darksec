import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function Stat({ label, value }) {
  return (
    <div className="stat-pill">
      {label} <span className="ml-1 text-slate-900">{value}</span>
    </div>
  );
}

export default function ProjectListCard({ project }) {
  return (
    <article className="group surface interactive-surface overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <Badge>{project.category}</Badge>
            <Badge className="bg-white">{project.status}</Badge>
            <span>发布于 {project.publishedAt}</span>
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Link to={`/projects/${project.id}`} className="block">
                <h3 className="text-[24px] font-semibold tracking-[-0.04em] text-slate-950 transition duration-200 group-hover:text-slate-700">
                  {project.name}
                </h3>
              </Link>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600">
                {project.summary}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <img
                src={project.author.avatar}
                alt={project.author.name}
                className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-200"
              />
              <div>
                <p className="text-sm font-medium text-slate-900">{project.author.name}</p>
                <p className="text-xs text-slate-500">项目作者</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Stat label="点赞" value={project.likes} />
              <Stat label="收藏" value={project.favorites} />
              <Stat label="浏览" value={project.views} />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 bg-slate-50/70 p-5 sm:p-6 lg:border-l lg:border-t-0">
          <img
            src={project.cover}
            alt={project.name}
            className="card-media h-44 w-full rounded-[22px] border border-slate-200 object-cover object-center shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
          />

          <div className="mt-4 grid gap-2">
            <Link to={`/projects/${project.id}`}>
              <Button variant="secondary" size="lg" className="w-full">
                查看详情
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
