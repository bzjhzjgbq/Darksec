import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";

const slides = [
  {
    id: "community-home",
    eyebrow: "DarkSec Home",
    title: "连接开发者的现代社区",
    description: "让项目展示、技术沉淀与开发者表达发生在同一个清晰可信的平台中。",
    primaryAction: { label: "浏览项目社区", to: "/projects" },
    secondaryAction: { label: "阅读技术文章", to: "/articles" },
    visual: "overview",
  },
  {
    id: "projects",
    eyebrow: "Projects",
    title: "发现值得持续关注的开发者项目",
    description: "浏览真实项目进展、技术栈与互动数据，快速判断价值。",
    primaryAction: { label: "查看项目目录", to: "/projects" },
    secondaryAction: { label: "发布项目", to: "/projects/new" },
    visual: "projects",
  },
  {
    id: "articles",
    eyebrow: "Articles",
    title: "沉浸式阅读技术实践与产品思考",
    description: "高质量文章内容，帮助开发者持续成长。",
    primaryAction: { label: "进入文章中心", to: "/articles" },
    secondaryAction: { label: "探索开发者", to: "/users" },
    visual: "articles",
  },
  {
    id: "developers",
    eyebrow: "Community",
    title: "加入真正有内容的开发者社区",
    description: "不是灌水论坛，而是创造价值的地方。",
    primaryAction: { label: "加入社区", to: "/register" },
    secondaryAction: { label: "探索开发者", to: "/users" },
    visual: "community",
  },
];

const visualPanels = {
  overview: {
    heading: "实时总览",
    subheading: "项目、内容与开发者在同一节奏下协同更新",
  },
  projects: {
    heading: "项目数据卡片",
    subheading: "从热度、状态和技术栈快速理解项目价值",
  },
  articles: {
    heading: "热门内容卡片",
    subheading: "通过阅读体验和主题聚合提升知识发现效率",
  },
  community: {
    heading: "开发者与趋势",
    subheading: "关注活跃创作者与正在形成的话题方向",
  },
};

const overviewMetrics = [
  { label: "本周新项目", value: "126", detail: "持续更新真实构建进展" },
  { label: "深度文章", value: "48", detail: "覆盖工程、产品与 AI 实践" },
  { label: "活跃开发者", value: "8.6k", detail: "稳定输出项目与思考" },
];

const projectCards = [
  { name: "Ops Canvas", stack: "Next.js · Prisma · AI", status: "持续迭代", score: "+24%" },
  { name: "Signal Board", stack: "React · Vite · Tailwind", status: "刚刚发布", score: "312 收藏" },
];

const articleCards = [
  { title: "如何让设计系统在增长阶段保持一致", tag: "设计系统", meta: "12 分钟阅读" },
  { title: "独立开发者的公开项目页应该呈现什么", tag: "项目展示", meta: "8 分钟阅读" },
  { title: "AI 工作流产品的交互节奏如何收敛", tag: "产品体验", meta: "6 分钟阅读" },
];

const communityUsers = [
  { name: "Lin Yue", role: "Full-stack Developer", score: "98" },
  { name: "Aster Chen", role: "Frontend Engineer", score: "94" },
  { name: "Serein", role: "AI Product Builder", score: "91" },
];

const trendTags = ["AI 工具", "设计系统", "开源组件", "工程效率", "多模态", "产品原型"];

function OverviewVisual() {
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {overviewMetrics.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4">
            <p className="text-[22px] font-semibold tracking-[-0.04em] text-white">{item.value}</p>
            <p className="mt-1 text-xs font-medium text-slate-200">{item.label}</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white">内容关系图</p>
            <p className="mt-1 text-xs text-slate-400">项目、文章与开发者在同一首页中自然连接</p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-slate-200">
            Live
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Projects</p>
            <p className="mt-3 text-sm leading-6 text-slate-100">真实项目进展、技术栈与互动数据集中呈现。</p>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Articles</p>
              <p className="mt-2 text-sm text-slate-100">沉淀方法、复盘和工程经验。</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Developers</p>
              <p className="mt-2 text-sm text-slate-100">让持续输出的人被更多人看见。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectVisual() {
  return (
    <div className="flex h-full flex-col justify-between gap-3">
      <div className="space-y-3">
        {projectCards.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{item.name}</p>
                <p className="mt-1 text-xs text-slate-300">{item.stack}</p>
              </div>
              <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-xs text-emerald-100">
                {item.score}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
              <span>{item.status}</span>
              <span>查看详情</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {overviewMetrics.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3">
            <p className="text-lg font-semibold text-white">{item.value}</p>
            <p className="mt-1 text-xs text-slate-300">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArticleVisual() {
  return (
    <div className="flex h-full flex-col gap-3">
      {articleCards.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <Badge className="border-white/10 bg-white/10 text-slate-100 hover:bg-white/15">
              {item.tag}
            </Badge>
            <span className="text-xs text-slate-300">{item.meta}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-white">{item.title}</p>
        </div>
      ))}
    </div>
  );
}

function CommunityVisual() {
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="space-y-3">
        {communityUsers.map((user) => (
          <div
            key={user.name}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm"
          >
            <div>
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="mt-1 text-xs text-slate-300">{user.role}</p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-slate-100">
              {user.score}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Trend Tags</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {trendTags.map((tag) => (
            <Badge
              key={tag}
              className="border-white/10 bg-white/10 text-slate-100 hover:border-white/20 hover:bg-white/15"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideVisual({ visual }) {
  if (visual === "projects") return <ProjectVisual />;
  if (visual === "articles") return <ArticleVisual />;
  if (visual === "community") return <CommunityVisual />;
  return <OverviewVisual />;
}

export default function HeroPanel({ stats }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = slides[activeIndex];
  const activePanel = useMemo(() => visualPanels[activeSlide.visual], [activeSlide.visual]);

  useEffect(() => {
    if (reduceMotion || isPaused) return undefined;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, reduceMotion]);

  const goToSlide = (index) => setActiveIndex(index);
  const goToPrev = () => setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  const goToNext = () => setActiveIndex((current) => (current + 1) % slides.length);

  return (
    <Card
      strong
      className="relative overflow-hidden px-6 py-7 sm:px-8 lg:px-10 lg:py-9"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute left-0 top-8 h-40 w-40 rounded-full bg-sky-100/50 blur-3xl" />
      </div>

      <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.04fr)_390px] xl:items-stretch">
        <div className="flex min-h-[580px] min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-3 py-1.5 text-xs font-medium text-emerald-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              持续更新的开发者社区
            </div>
            <div className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
              {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </div>
          </div>

          <div className="mt-6 flex min-h-[252px] flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-[252px] flex-col"
              >
                <p className="eyebrow">{activeSlide.eyebrow}</p>
                <div className="mt-3 h-[148px]">
                  <h1 className="max-w-[12ch] text-[38px] font-semibold leading-[1.06] tracking-[-0.055em] text-slate-950 sm:text-[46px] lg:text-[52px]">
                    {activeSlide.title}
                  </h1>
                </div>
                <div className="h-[72px] max-w-2xl">
                  <p className="text-[16px] leading-8 text-slate-600 sm:text-[17px]">
                    {activeSlide.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-auto space-y-6 pt-4">
            <div className="flex h-12 flex-wrap gap-3">
              <Link to={activeSlide.primaryAction.to}>
                <Button className="px-5 py-3 shadow-sm">{activeSlide.primaryAction.label}</Button>
              </Link>
              <Link to={activeSlide.secondaryAction.to}>
                <Button variant="secondary" className="px-5 py-3 shadow-sm">
                  {activeSlide.secondaryAction.label}
                </Button>
              </Link>
            </div>

            <div className="grid min-h-[126px] gap-3 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.42,
                    delay: 0.16 + index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
                >
                  <p className="text-[30px] font-semibold tracking-[-0.05em] text-slate-950">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">{stat.label}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{stat.detail}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex h-10 items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`切换到第 ${index + 1} 张 Banner`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === index ? "w-7 bg-slate-950" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrev}
                  aria-label="上一张"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/85 text-lg text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="下一张"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/85 text-lg text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.975, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.988, y: -8 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[580px] flex-col rounded-[30px] border border-slate-200 bg-[linear-gradient(145deg,#0f172a_0%,#111827_52%,#0f766e_145%)] p-6 text-white shadow-[0_28px_72px_rgba(15,23,42,0.18)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                  {activePanel.heading}
                </p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  {activePanel.subheading}
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-slate-200">
                {isPaused ? "已暂停" : "自动播放"}
              </div>
            </div>

            <div className="mt-5 flex-1">
              <SlideVisual visual={activeSlide.visual} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
}
