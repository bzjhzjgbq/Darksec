export default function CompetitionTipsPanel({ tips }) {
  return (
    <section className="bg-[#212a26] px-4 py-5">
      <div className="border-b border-[#3d4b45] pb-3">
        <p className="text-sm font-semibold text-[#ecf4ef]">鎺ㄨ崘鍏虫敞鏂瑰悜</p>
      </div>

      <div className="mt-4 space-y-3">
        {tips.map((tip) => (
          <div key={tip} className="flex gap-3 text-sm leading-6 text-[#aebdb7]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#6fa48d]" />
            <p>{tip}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 border-t border-[#34413c] pt-4 text-xs leading-6 text-[#80938b]">
        淇℃伅鏉ユ簮浠ユ暀鑲查儴璁ゅ彲绔炶禌鍚嶅崟鍜屽鏍?2026 骞寸珵璧涚洰褰曚负涓伙紝鍙﹁ˉ鍏呭皯閲忔帹鑽愯禌浜嬫柟渚跨瓫閫夈€?      </p>
    </section>
  );
}
