export default function RecentCompetitions({ competitions, onSelect }) {
  return (
    <section className="border-b border-[#2e3934] pb-5">
      <div className="border-b border-[#38443f] pb-3">
        <p className="text-sm font-semibold text-[#eef5f0]">近期比赛</p>
      </div>

      <div className="mt-3 space-y-2">
        {competitions.map((competition) => (
          <button
            key={competition.id}
            type="button"
            onClick={() => onSelect(competition.id)}
            className="flex w-full items-center justify-between gap-3 border-b border-[#28312d] py-2 text-left transition hover:text-white"
          >
            <span className="truncate text-sm text-[#cfdbd5]">{competition.title}</span>
            <span className="shrink-0 text-xs text-[#7f9489]">
              {competition.status === "报名中" ? "报名中" : competition.periodLabel}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
