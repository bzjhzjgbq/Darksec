import { Link, useParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { projects } from "../data/mockProjects";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <PageReveal>
        <PageContainer>
          <Reveal>
            <Card strong className="p-10 text-center">
              <h1 className="headline-lg">项目不存在</h1>
              <p className="mt-4 body-md">该项目可能已被删除，或者你访问了无效链接。</p>
              <Link to="/projects" className="mt-6 inline-block">
                <Button>返回项目列表</Button>
              </Link>
            </Card>
          </Reveal>
        </PageContainer>
      </PageReveal>
    );
  }

  return (
    <PageReveal>
      <PageContainer className="space-y-4">
        <Reveal className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/projects" className="transition hover:text-slate-900">
            项目
          </Link>
          <span>/</span>
          <span className="text-slate-900">{project.name}</span>
        </Reveal>

        <Reveal>
          <Card className="overflow-hidden p-0">
            <img src={project.cover} alt={project.name} className="h-64 w-full object-cover" />
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                <Badge>{project.category}</Badge>
                <Badge>{project.status}</Badge>
              </div>
              <h1 className="mt-4 text-[34px] font-semibold tracking-[-0.05em] text-slate-950">
                {project.name}
              </h1>
              <p className="mt-4 text-sm leading-8 text-slate-600">{project.content}</p>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
                  <p className="text-xs text-slate-500">技术栈</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.techStack.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
                  <p className="text-xs text-slate-500">项目亮点</p>
                  <div className="mt-3 space-y-2">
                    {project.highlights.map((item) => (
                      <p key={item} className="text-sm text-slate-700">
                        · {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                <div className="text-sm text-slate-500">
                  作者：{project.author.name} · 发布时间：{project.publishedAt} · 浏览：{project.views}
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Button variant="secondary" size="sm">
                      GitHub
                    </Button>
                  </a>
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    <Button size="sm">在线演示</Button>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>
      </PageContainer>
    </PageReveal>
  );
}
