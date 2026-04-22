import CompetitionListItem from "./CompetitionListItem";

export default function CompetitionList({ competitions, highlightedId }) {
  if (!competitions.length) {
    return (
      <div className="px-5 py-10 text-sm leading-7 text-[#94a69e]">
        没有找到符合当前筛选条件的竞赛。可以先清空搜索词，或放宽竞赛状态、来源等条件后再查看。
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4">
      {competitions.map((competition) => (
        <CompetitionListItem
          key={competition.id}
          competition={competition}
          highlighted={highlightedId === competition.id}
        />
      ))}
    </div>
  );
}
