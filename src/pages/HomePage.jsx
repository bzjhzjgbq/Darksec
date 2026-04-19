import { Link } from "react-router-dom";
import ActiveUserList from "../components/home/ActiveUserList";
import HeroPanel from "../components/home/HeroPanel";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionHeader from "../components/ui/SectionHeader";
import { featuredProjects } from "../data/mockProjects";

const homeStats = [
  { label: "社区项目", value: "1,280+", detail: "每周持续更新真实项目" },
  { label: "活跃开发者", value: "8,600+", detail: "覆盖前端、后端、AI 与产品方向" },
  { label: "本周新增", value: "126", detail: "新项目与深度讨论持续出现" },
];

const pulseCards = [
  {
    title: "今日趋势",
    value: "AI 工作流",
    meta: "讨论热度 +24%",
    tone: "from-slate-900 via-slate-800 to-slate-700",
  },
  {
    title: "最新发布",
    value: "18",
    meta: "过去 24 小时",
    tone: "from-blue-600 via-sky-500 to-cyan-400",
  },
  {
    title: "新增话题",
    value: "342",
    meta: "围绕项目、开源与工程实践",
    tone: "from-emerald-600 via-teal-500 to-cyan-400",
  },
];

const articlePreviews = [
  {
    id: "home-article-1",
    title: "设计系统如何在开发者社区增长过程中保持可维护",
    author: "Aster Chen",
    tag: "设计系统",
    publishedAt: "2026-04-12",
  },
  {
    id: "home-article-2",
    title: "独立开发者如何打造能吸引早期用户的公开项目页",
    author: "Lin Yue",
    tag: "项目增长",
    publishedAt: "2026-04-10",
  },
];

const activeUsers = [
  {
    id: "lin-yue",
    name: "Lin Yue",
    role: "Full-stack Developer",
    summary: "持续分享协作工具与 AI 产品设计的实践经验。",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
    score: "98",
    tags: ["AI 产品", "协作工具", "全栈"],
  },
  {
    id: "aster-chen",
    name: "Aster Chen",
    role: "Frontend Engineer",
    summary: "长期关注组件系统、界面质量与设计工程化。",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    score: "94",
    tags: ["组件系统", "设计系统", "前端工程"],
  },
  {
    id: "serein",
    name: "Serein",
    role: "AI Product Builder",
    summary: "探索生成式应用与多模态工作流原型。",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    score: "91",
    tags: ["AI 工作流", "多模态", "产品原型"],
  },
];

function PreviewPanel({ eyebrow, title, description, action, children }) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <p className="eyebrow">{eyebrow}</p>
          <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-slate-950">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
        </div>
        <div className="shrink-0">{action}</div>
      </div>
      <div className="mt-5">{children}</div>
    </Card>
  );
}

export default function HomePage() {
  return (
    <PageReveal className="space-y-10 pb-2">
      <PageContainer>
        <HeroPanel stats={homeStats} pulseCards={pulseCards} />
      </PageContainer>

      <PageContainer className="space-y-10">
        <Reveal as="section">
          <div className="grid gap-6 xl:grid-cols-2">
            <PreviewPanel
              eyebrow="Projects"
              title="项目入口"
              description="首页只保留轻量预览，帮助你快速进入项目频道，详细内容交给项目页承载。"
              action={
                <Link to="/projects">
                  <Button variant="secondary">查看全部项目</Button>
                </Link>
              }
            >
              <div className="space-y-3">
                {featuredProjects.slice(0, 2).map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="block rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 transition duration-200 hover:border-slate-300 hover:bg-white"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <Badge>{project.category}</Badge>
                      <span>{project.status}</span>
                    </div>
                    <p className="mt-3 text-sm font-medium text-slate-900">{project.name}</p>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                      {project.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </PreviewPanel>

            <PreviewPanel
              eyebrow="Articles"
              title="文章入口"
              description="首页提供少量阅读预览，方便进入文章中心继续浏览系统化内容。"
              action={
                <Link to="/articles">
                  <Button variant="secondary">查看全部文章</Button>
                </Link>
              }
            >
              <div className="space-y-3">
                {articlePreviews.map((article) => (
                  <Link
                    key={article.id}
                    to="/articles"
                    className="block rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 transition duration-200 hover:border-slate-300 hover:bg-white"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <Badge>{article.tag}</Badge>
                      <span>{article.publishedAt}</span>
                    </div>
                    <p className="mt-3 text-sm font-medium text-slate-900">{article.title}</p>
                    <p className="mt-2 text-sm text-slate-500">作者：{article.author}</p>
                  </Link>
                ))}
              </div>
            </PreviewPanel>
          </div>
        </Reveal>

        <Reveal as="section" className="space-y-6" delay={0.06}>
          <SectionHeader
            eyebrow="Active Developers"
            title="活跃开发者"
            description="把持续输出的开发者放到首页，能让平台更有温度，也更像真实发生交流的社区。"
          />
          <ActiveUserList users={activeUsers} />
        </Reveal>
      </PageContainer>
    </PageReveal>
  );
}
