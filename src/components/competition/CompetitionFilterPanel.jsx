export default function CompetitionFilterPanel({
  groups,
  filters,
  onChange,
  getOptionCount,
}) {
  return (
    <aside className="h-full pr-6">
      <div className="border-b border-[#2c3632] pb-4">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[#6c8378]">筛选栏</p>
        <h2 className="mt-2 text-lg font-semibold text-[#edf4ef]">竞赛维度</h2>
        <p className="mt-2 text-sm leading-6 text-[#94a69e]">
          通过级别、类别、状态和来源快速定位适合当前阶段的竞赛。
        </p>
      </div>

      <div className="competition-scrollbar mt-5 max-h-[calc(100vh-180px)] space-y-6 overflow-y-auto pb-4 pr-2">
        {groups.map((group) => (
          <section key={group.key}>
            <h3 className="mb-2 text-sm font-medium text-[#cdd8d2]">{group.title}</h3>
            <div className="space-y-1">
              {group.options.map((option) => {
                const isActive = filters[group.key] === option;
                const count = getOptionCount(group.key, option);

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onChange(group.key, option)}
                    className={`flex w-full items-center justify-between border-l-2 px-3 py-2 text-left text-sm transition duration-200 ${
                      isActive
                        ? "border-[#6fa48d] bg-[#202825] text-[#eef6f1]"
                        : "border-transparent text-[#90a39a] hover:border-[#44534d] hover:bg-[#1b2320] hover:text-[#d9e3de]"
                    }`}
                  >
                    <span>{option}</span>
                    <span className="text-xs text-[#6f857a]">{count}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}
