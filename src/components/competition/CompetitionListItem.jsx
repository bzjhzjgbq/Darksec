import { Link } from "react-router-dom";

function MetaItem({ label, value }) {
  return (
    <div className="min-w-[140px]">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#70837b]">{label}</p>
      <p className="mt-1 text-sm text-[#d7e2dc]">{value}</p>
    </div>
  );
}

export default function CompetitionListItem({ competition, highlighted = false }) {
  return (
    <article
      id={`competition-${competition.id}`}
      className={`rounded-[20px] border px-5 py-5 transition duration-200 ${
        highlighted
          ? "border-[#587568] bg-[#202926]"
          : "border-[#2d3733] bg-[#181f1c] hover:border-[#41524a] hover:bg-[#1c2421]"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-[#3a4842] px-2.5 py-1 text-[#9db2a8]">
              {competition.level}
            </span>
            <span className="rounded-full border border-[#3a4842] px-2.5 py-1 text-[#9db2a8]">
              {competition.category}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 ${
                competition.status === "报名中"
                  ? "bg-[#24392f] text-[#9bd1b4]"
                  : competition.status === "进行中"
                    ? "bg-[#283333] text-[#a9c8c0]"
                    : competition.status === "即将开始"
                      ? "bg-[#2b3327] text-[#c3cf9f]"
                      : "bg-[#262c29] text-[#8e9d96]"
              }`}
            >
              {competition.status}
            </span>
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-[#f2f7f3]">
            {competition.title}
          </h3>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-[#a8b8b1]">
            {competition.summary}
          </p>
        </div>

        <Link
          to={`/competitions/${competition.id}`}
          className="rounded-full border border-[#405048] px-4 py-2 text-sm text-[#dce6e0] transition hover:border-[#688a7a] hover:text-white"
        >
          查看详情
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#27302d] pt-4">
        <MetaItem label="负责部门" value={competition.department} />
        <MetaItem label="主办单位" value={competition.organizer} />
        <MetaItem label="面向对象" value={competition.audience} />
        <MetaItem label="赛程提示" value={competition.periodLabel} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {competition.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#33403b] px-2.5 py-1 text-xs text-[#90a69c]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-xs text-[#6e8478]">来源：{competition.sourceTags.join(" / ")}</div>
      </div>
    </article>
  );
}
