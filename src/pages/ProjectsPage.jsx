import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import ProjectFilterBar from "../components/project/ProjectFilterBar";
import ProjectListCard from "../components/project/ProjectListCard";
import ProjectSidebarList from "../components/project/ProjectSidebarList";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import {
  featuredProjects,
  projectCategories,
  projects,
  projectStatuses,
} from "../data/mockProjects";

const sortOptions = [
  { value: "popular", label: "最受欢迎" },
  { value: "latest", label: "最近发布" },
  { value: "views", label: "浏览最多" },
];

function buildPopularTags(items) {
  const counter = new Map();
  items.forEach((project) => {
    project.techStack.forEach((tag) => {
      counter.set(tag, (counter.get(tag) || 0) + 1);
    });
  });

  return [...counter.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));
}

function buildActiveAuthors(items) {
  return [...items]
    .sort((a, b) => b.likes + b.views - (a.likes + a.views))
    .slice(0, 4)
    .map((project) => ({
      name: project.author.name,
      avatar: project.author.avatar,
      role: project.category,
      score: project.likes,
    }));
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(projectCategories[0]);
  const [status, setStatus] = useState(projectStatuses[0]);
  const [sortBy, setSortBy] = useState(sortOptions[0].value);

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const keyword = search.trim().toLowerCase();
      const matchesKeyword =
        !keyword ||
        [project.name, project.summary, project.techStack.join(" "), project.author.name]
          .join(" ")
          .toLowerCase()
          .includes(keyword);
      const matchesCategory = category === projectCategories[0] || project.category === category;
      const matchesStatus = status === projectStatuses[0] || project.status === status;
      return matchesKeyword && matchesCategory && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "latest") return new Date(b.publishedAt) - new Date(a.publishedAt);
      if (sortBy === "views") return b.views - a.views;
      return b.likes + b.favorites - (a.likes + a.favorites);
    });
  }, [search, category, status, sortBy]);

  const summary = [
    { label: "社区项目", value: `${projects.length}+`, note: "持续收录真实开发作品" },
    { label: "本周热门", value: `${featuredProjects.length}`, note: "首页高热推荐项目" },
    { label: "筛选维度", value: `${projectCategories.length - 1}`, note: "分类、状态与排序组合浏览" },
  ];

  const popularTags = useMemo(() => buildPopularTags(projects), []);
  const activeAuthors = useMemo(() => buildActiveAuthors(projects), []);

  return (
    <PageReveal className="space-y-6">
      <PageContainer>
        <Reveal as="section" className="surface-strong relative overflow-hidden px-6 py-7 sm:px-8 lg:px-10 lg:py-9">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-emerald-100/70 blur-3xl" />
            <div className="absolute left-4 top-8 h-40 w-40 rounded-full bg-sky-100/45 blur-3xl" />
          </div>

          <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_360px] xl:items-end">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-3 py-1.5 text-xs font-medium text-emerald-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Project Directory
              </div>

              <h1 className="mt-5 max-w-4xl text-[38px] font-semibold leading-[1.04] tracking-[-0.05em] text-slate-950 sm:text-[46px] lg:text-[54px]">
                发现值得深入了解的开发者项目
              </h1>

              <p className="mt-5 max-w-2xl text-[15px] leading-8 text-slate-600 sm:text-base">
                这里是 DarkSec 当前最核心的内容板块。我们把项目标题、作者、发布时间、技术栈和互动数据放在更清晰的位置，让浏览体验更像成熟社区产品，而不是简单的卡片堆叠。
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/projects/new">
                  <Button className="px-5 py-3 shadow-sm">发布项目</Button>
                </Link>
                <Link to="/articles">
                  <Button variant="secondary" className="px-5 py-3 shadow-sm">
                    查看技术文章
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {summary.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur-sm"
                >
                  <p className="text-[28px] font-semibold tracking-[-0.05em] text-slate-950">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">{item.label}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </PageContainer>

      <PageContainer className="space-y-5">
        <Reveal>
          <ProjectFilterBar
            search={search}
            onSearchChange={setSearch}
            categories={projectCategories}
            category={category}
            onCategoryChange={setCategory}
            statuses={projectStatuses}
            status={status}
            onStatusChange={setStatus}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortOptions={sortOptions}
          />
        </Reveal>

        <Reveal className="surface flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-slate-950">
              项目列表
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              共筛选到 {filteredProjects.length} 个项目，默认按热度优先排序。
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge>内容优先布局</Badge>
            <Badge>支持搜索 / 分类 / 状态 / 排序</Badge>
            <Badge>响应式社区页面</Badge>
          </div>
        </Reveal>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Reveal className="space-y-4">
            {filteredProjects.length ? (
              filteredProjects.map((project) => <ProjectListCard key={project.id} project={project} />)
            ) : (
              <EmptyState
                eyebrow="No Results"
                title="当前筛选条件下没有项目"
                description="试试清空关键词、切换分类或状态，热门推荐和标签仍然可以帮助你继续浏览。"
              />
            )}
          </Reveal>

          <Reveal className="space-y-4 xl:sticky xl:top-24 xl:self-start" delay={0.08}>
            <ProjectSidebarList
              projects={featuredProjects}
              tags={popularTags}
              authors={activeAuthors}
            />
          </Reveal>
        </div>
      </PageContainer>
    </PageReveal>
  );
}
