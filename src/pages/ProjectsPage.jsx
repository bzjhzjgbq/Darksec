import { useMemo, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import ProjectCategorySidebar from "../components/project/ProjectCategorySidebar";
import ProjectListCard from "../components/project/ProjectListCard";
import EmptyState from "../components/ui/EmptyState";
import { projectCategories, projects } from "../data/mockProjects";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(projectCategories[0]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const keyword = search.trim().toLowerCase();
      const matchesKeyword =
        !keyword ||
        [project.name, project.summary, project.techStack.join(" "), project.author.name]
          .join(" ")
          .toLowerCase()
          .includes(keyword);
      const matchesCategory = category === projectCategories[0] || project.category === category;
      return matchesKeyword && matchesCategory;
    });
  }, [search, category]);

  return (
    <PageReveal className="space-y-5">
      <PageContainer className="space-y-5">
        <Reveal>
          <div className="rounded-[24px] border border-slate-200 bg-white/92 px-4 py-3 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
            <label className="flex h-12 items-center gap-3 rounded-2xl border border-[#dbe7f5] bg-[#eef5ff] px-4">
              <span className="text-base">🔍</span>
              <input
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                placeholder="搜索项目名称、简介、作者或技术栈"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
          <Reveal>
            <div className="border-r border-slate-200 pr-5 lg:pr-6">
              <ProjectCategorySidebar
                categories={projectCategories}
                activeCategory={category}
                onCategoryChange={setCategory}
                projects={projects}
              />
            </div>
          </Reveal>

          <div className="space-y-4">
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                <div>
                  <p className="text-[13px] font-medium text-slate-500">项目列表</p>
                  <p className="mt-1 text-sm text-slate-500">
                    当前分类：<span className="font-semibold text-slate-900">{category}</span>
                    <span className="mx-2 text-slate-300">|</span>
                    共 {filteredProjects.length} 个项目
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4">
              {filteredProjects.length ? (
                filteredProjects.map((project, index) => (
                  <Reveal key={project.id} delay={index * 0.03}>
                    <ProjectListCard project={project} />
                  </Reveal>
                ))
              ) : (
                <EmptyState
                  eyebrow="没有结果"
                  title="当前条件下没有项目"
                  description="试试调整搜索词，或者切换左侧项目分组。"
                />
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </PageReveal>
  );
}
