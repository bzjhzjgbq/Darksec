import { motion, useReducedMotion } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function ArticleHero({ categories }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="surface-strong relative overflow-hidden px-6 py-7 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute left-10 top-10 h-36 w-36 rounded-full bg-sky-100/40 blur-3xl" />
      </div>

      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-end"
      >
        <div className="max-w-3xl">
          <p className="eyebrow">Article Hub</p>
          <motion.h1
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 headline-lg"
          >
            沉浸技术实践、产品思考与社区经验
          </motion.h1>
          <p className="mt-4 body-md">
            文章页强调阅读效率和编辑感，让标题、摘要、作者、标签和热度信息更清晰地支持内容浏览。
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.slice(0, 4).map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <div className="surface-soft px-4 py-4">
            <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">120+</p>
            <p className="mt-1 text-sm font-medium text-slate-700">技术文章</p>
            <p className="mt-2 text-xs text-slate-500">覆盖前端、产品与 AI 工程实践</p>
          </div>
          <div className="surface-soft px-4 py-4">
            <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">18k+</p>
            <p className="mt-1 text-sm font-medium text-slate-700">累计阅读</p>
            <p className="mt-2 text-xs text-slate-500">来自社区真实内容的阅读反馈</p>
          </div>
          <div className="surface-soft px-4 py-4">
            <Button variant="secondary" className="w-full">
              订阅文章更新
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
