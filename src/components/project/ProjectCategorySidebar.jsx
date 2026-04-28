const categoryIcons = ["🧩", "🏫", "📘", "🏆", "💻", "📊"];

export default function ProjectCategorySidebar({
  categories,
  activeCategory,
  onCategoryChange,
  projects,
}) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="pr-5 lg:pr-6">
        <p className="eyebrow">项目分组</p>
        <div className="mt-4 space-y-1.5">
          {categories.map((item, index) => {
            const count =
              index === 0 ? projects.length : projects.filter((project) => project.category === item).length;
            const active = activeCategory === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => onCategoryChange(item)}
                className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition duration-200 ${
                  active ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-xl text-base ${
                      active ? "bg-white/12" : "bg-slate-100"
                    }`}
                  >
                    {categoryIcons[index] ?? "📁"}
                  </span>
                  <span className="text-sm font-semibold">{item}</span>
                </span>
                <span className={`text-sm font-semibold ${active ? "text-white" : "text-slate-400"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
