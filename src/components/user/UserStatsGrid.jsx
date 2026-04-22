export default function UserStatsGrid({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="surface interactive-surface px-5 py-5">
          <p className="text-[28px] font-semibold tracking-[-0.04em] text-slate-950">{stat.value}</p>
          <p className="mt-1 text-sm font-medium text-slate-700">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
