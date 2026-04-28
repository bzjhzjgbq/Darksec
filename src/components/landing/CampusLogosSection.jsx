const labels = ["课程学习", "竞赛组队", "项目合作", "文章沉淀", "实验室交流", "校园主页"];

export default function CampusLogosSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {labels.map((label, index) => (
          <div
            key={label}
            className={`flex h-20 items-center justify-center rounded-2xl border text-sm font-medium shadow-[0_12px_36px_rgba(15,23,42,0.18)] ${
              index % 3 === 1
                ? "border-sky-300/20 bg-sky-400/10 text-sky-100"
                : "border-white/10 bg-white/5 text-slate-300"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}
