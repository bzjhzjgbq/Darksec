import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { articles } from "../data/mockArticles";
import { competitions } from "../data/mockCompetitions";
import { featuredProjects } from "../data/mockProjects";
import { users } from "../data/mockUsers";

const campusSlides = [
  {
    src: "/home-carousel/nuist-gate.jpg",
    alt: "南京信息工程大学校门",
    title: "从校园入口开始浏览",
    subtitle: "把原来大段标题替换成轮播图，让首页更直观地呈现南信大的校园辨识度。",
  },
  {
    src: "/home-carousel/nuist-yifu.jpg",
    alt: "南京信息工程大学逸夫楼",
    title: "教学与活动空间一览",
    subtitle: "首页继续承接文章、项目和竞赛内容，但主视觉先用校园影像建立整体氛围。",
  },
  {
    src: "/home-carousel/nuist-lab.jpg",
    alt: "南京信息工程大学科研活动现场",
    title: "科研活动与校园动态",
    subtitle: "适合继续展示实验室资讯、学术活动和社区热点，让首页更有校园感。",
  },
  {
    src: "/home-carousel/nuist-center.jpg",
    alt: "南京信息工程大学创新中心活动",
    title: "竞赛协作与项目实践",
    subtitle: "让社区首页既有内容入口，也能承接南信大团队协作和创新实践的场景。",
  },
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % campusSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <PageReveal className="pb-2">
      <PageContainer className="mx-auto max-w-[1240px] space-y-8">
        <Reveal>
          <Card strong className="relative overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-16 top-4 h-64 w-64 rounded-full bg-emerald-100/80 blur-3xl" />
              <div className="absolute left-2 top-10 h-52 w-52 rounded-full bg-sky-100/80 blur-3xl" />
              <div className="absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-amber-100/70 blur-3xl" />
            </div>

            <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_360px] xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                    南京信息工程大学 · 校园技术社区
                  </span>
                  <Badge>欢迎进入社区</Badge>
                </div>

                <div className="mt-6 overflow-hidden rounded-[30px] border border-sky-100/90 bg-white/75 shadow-[0_26px_72px_rgba(15,23,42,0.12)] backdrop-blur">
                  <div className="relative h-[280px] sm:h-[340px] lg:h-[360px]">
                    {campusSlides.map((slide, index) => {
                      const isActive = index === activeSlide;

                      return (
                        <div
                          key={slide.src}
                          className={`absolute inset-0 transition-all duration-700 ${
                            isActive ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                          }`}
                        >
                          <img src={slide.src} alt={slide.alt} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.06)_0%,rgba(15,23,42,0.18)_44%,rgba(15,23,42,0.82)_100%)]" />
                          <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-100/90">
                              校园影像
                            </p>
                            <h1 className="mt-3 max-w-[12ch] text-[30px] font-semibold leading-[1.08] tracking-[-0.05em] sm:text-[38px] lg:text-[48px]">
                              {slide.title}
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-100/90 sm:text-[15px]">
                              {slide.subtitle}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    <div className="absolute right-4 top-4 rounded-full border border-white/25 bg-slate-950/35 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      {String(activeSlide + 1).padStart(2, "0")} / {campusSlides.length}
                    </div>

                    <div className="absolute bottom-4 right-4 flex gap-2">
                      {campusSlides.map((slide, index) => (
                        <button
                          key={slide.title}
                          type="button"
                          aria-label={`查看第 ${index + 1} 张轮播图`}
                          onClick={() => setActiveSlide(index)}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            index === activeSlide ? "w-8 bg-white" : "w-2.5 bg-white/45 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="mt-6 max-w-2xl text-[16px] leading-8 text-slate-600 sm:text-[17px]">
                  这里是进入社区后的主站首页。你可以继续查看文章、项目实践、竞赛信息，以及同学们的个人主页和成长内容。
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/articles">
                    <Button size="lg">查看文章</Button>
                  </Link>
                  <Link to="/projects">
                    <Button size="lg" variant="secondary">
                      浏览项目
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="rounded-[30px] bg-[linear-gradient(135deg,#0f172a_0%,#172554_46%,#0f766e_135%)] p-6 text-white shadow-[0_26px_72px_rgba(15,23,42,0.18)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">社区速览</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-2xl font-semibold">{articles.length}</p>
                    <p className="mt-2 text-sm text-slate-200">文章沉淀</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-2xl font-semibold">{featuredProjects.length}</p>
                    <p className="mt-2 text-sm text-slate-200">推荐项目</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                    <p className="text-2xl font-semibold">{competitions.length}</p>
                    <p className="mt-2 text-sm text-slate-200">竞赛信息</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>

        <section className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="border border-[#dcebd7] bg-[#f2f8ef] p-6 shadow-[0_18px_46px_rgba(125,159,114,0.12)]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-slate-950">项目推荐</h2>
                <Link to="/projects" className="text-sm text-slate-500 hover:text-slate-900">
                  查看全部
                </Link>
              </div>
              <div className="mt-4 grid gap-3">
                {featuredProjects.slice(0, 3).map((project) => (
                  <div
                    key={project.id}
                    className="rounded-2xl border border-[#d9e8d2] bg-white/78 p-4 shadow-[0_10px_24px_rgba(115,146,102,0.08)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-slate-900">{project.name}</p>
                      <Badge>{project.category}</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{project.summary}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.04}>
            <Card className="border border-[#f1e1b4] bg-[#fff8e7] p-6 shadow-[0_18px_46px_rgba(194,163,74,0.1)]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-slate-950">文章推荐</h2>
                <Link to="/articles" className="text-sm text-slate-500 hover:text-slate-900">
                  查看全部
                </Link>
              </div>
              <div className="mt-4 grid gap-3">
                {articles.slice(0, 3).map((article) => (
                  <div
                    key={article.id}
                    className="rounded-2xl border border-[#f2e5c0] bg-white/78 p-4 shadow-[0_10px_24px_rgba(194,163,74,0.08)]"
                  >
                    <Badge>{article.tag}</Badge>
                    <p className="mt-3 text-sm font-medium text-slate-900">{article.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{article.excerpt}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <Reveal>
            <Card className="border border-[#f0d2dd] bg-[#fff1f5] p-6 shadow-[0_18px_46px_rgba(208,131,158,0.1)]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-slate-950">竞赛动态</h2>
                <Link to="/competitions" className="text-sm text-slate-500 hover:text-slate-900">
                  查看竞赛页
                </Link>
              </div>
              <div className="mt-4 grid gap-3">
                {competitions.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-[#f2dce4] bg-white/80 p-4 shadow-[0_10px_24px_rgba(208,131,158,0.08)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-slate-900">{item.title}</p>
                      <Badge>{item.status}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{item.summary}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.06}>
            <Card className="border border-[#d8e7f6] bg-[#eef6ff] p-6 shadow-[0_18px_46px_rgba(107,152,205,0.12)]">
              <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-slate-950">活跃成员</h2>
              <div className="mt-4 space-y-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 rounded-2xl border border-[#dbe9f8] bg-white/80 p-4 shadow-[0_10px_24px_rgba(107,152,205,0.08)]"
                  >
                    <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-2xl object-cover" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900">{user.nickname}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {user.levelTitle} · {user.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </section>
      </PageContainer>
    </PageReveal>
  );
}
