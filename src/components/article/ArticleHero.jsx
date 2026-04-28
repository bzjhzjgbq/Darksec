import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function ArticleHero({ categories, totalArticles }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="surface-strong relative overflow-hidden px-6 py-7 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,251,241,0.55),transparent_34%)]" />

      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-end"
      >
        <div className="max-w-3xl">
          <p className="eyebrow">Article Hub</p>
          <motion.h1
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 headline-lg"
          >
            技术文章、项目经验与社区实践
          </motion.h1>
          <p className="mt-4 body-md">
            聚合来自开发者社区的工程实践、产品思考和开源经验。用清晰的分类、标签和数据反馈，帮助读者更快找到值得阅读的内容。
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.slice(1, 5).map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>

        <div className="surface-soft p-4">
          <p className="text-3xl font-semibold tracking-[-0.04em] text-slate-950">{totalArticles}</p>
          <p className="mt-1 text-sm font-medium text-slate-700">当前收录文章</p>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            支持筛选、搜索、分页、Markdown 阅读和代码块高亮。
          </p>
          <Link to="/articles/new" className="mt-4 block">
            <Button className="w-full">发布文章</Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
