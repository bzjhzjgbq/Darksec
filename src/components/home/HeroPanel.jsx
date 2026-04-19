import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";

const valuePoints = [
  {
    title: "更快判断项目价值",
    description: "用清晰的项目卡片、技术信息和互动反馈，降低筛选成本。",
  },
  {
    title: "更自然进入深度内容",
    description: "项目、文章与开发者信息彼此连通，浏览路径更顺滑。",
  },
];

const hotTags = ["AI 工具", "设计系统", "开源组件", "协作工具"];

export default function HeroPanel({ stats, pulseCards }) {
  const reduceMotion = useReducedMotion();

  return (
    <Card strong className="relative overflow-hidden px-6 py-7 sm:px-8 lg:px-10 lg:py-9">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute left-0 top-8 h-40 w-40 rounded-full bg-sky-100/50 blur-3xl" />
      </div>

      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_380px] xl:items-start"
      >
        <div className="max-w-4xl">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-3 py-1.5 text-xs font-medium text-emerald-700 shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            社区持续活跃中
          </motion.div>

          <motion.h1
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-4xl text-[42px] font-semibold leading-[1.02] tracking-[-0.06em] text-slate-950 sm:text-[54px] lg:text-[64px]"
          >
            连接项目、文章与开发者的现代社区首页
          </motion.h1>

          <motion.p
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-[16px] leading-8 text-slate-600 sm:text-[17px]"
          >
            DarkSec 让项目展示、技术沉淀与开发者表达发生在同一个清晰、可信、适合持续浏览的产品环境里。
          </motion.p>

          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Link to="/projects">
              <Button className="px-5 py-3 shadow-sm">浏览项目社区</Button>
            </Link>
            <Link to="/projects/new">
              <Button variant="secondary" className="px-5 py-3 shadow-sm">
                发布项目
              </Button>
            </Link>
          </motion.div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.24 + index * 0.05,
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
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#0f766e_140%)] p-6 text-white shadow-[0_28px_72px_rgba(15,23,42,0.18)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                Live Overview
              </p>
              <p className="mt-2 text-sm text-slate-400">社区内容热度概览</p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-slate-200">
              实时
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {pulseCards.map((card) => (
              <motion.div
                key={card.title}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition duration-200 hover:bg-white/[0.08]"
              >
                <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${card.tone}`} />
                <p className="mt-4 text-sm text-slate-300">{card.title}</p>
                <p className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-white">
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-slate-400">{card.meta}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
              User Value
            </p>
            <div className="mt-4 space-y-4">
              {valuePoints.map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                Hot Tags
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {hotTags.map((tag) => (
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
        </div>
      </motion.div>
    </Card>
  );
}
