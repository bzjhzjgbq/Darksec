export default function EmptyState({ eyebrow = "暂无结果", title, description }) {
  return (
    <div className="empty-state">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-sm font-semibold text-emerald-700">
        DS
      </div>
      <p className="mt-5 eyebrow">{eyebrow}</p>
      <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-slate-950">{title}</h3>
      <p className="mt-3 max-w-md body-sm">{description}</p>
    </div>
  );
}
