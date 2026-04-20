import CompetitionListItem from "./CompetitionListItem";

export default function CompetitionList({ competitions, highlightedId }) {
  if (!competitions.length) {
    return (
      <div className="px-5 py-10 text-sm leading-7 text-[#94a69e]">
        娌℃湁鎵惧埌绗﹀悎褰撳墠绛涢€夋潯浠剁殑绔炶禌銆傚彲浠ュ厛娓呯┖鎼滅储璇嶏紝鎴栨斁瀹界珵璧涚姸鎬併€佹潵婧愮瓑鏉′欢鍚庡啀鏌ョ湅銆?      </div>
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
