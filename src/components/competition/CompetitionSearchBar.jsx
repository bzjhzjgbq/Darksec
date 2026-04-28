export default function CompetitionSearchBar({
  query,
  resultCount,
  onQueryChange,
  onClear,
}) {
  return (
    <div className="border-b border-[#2c3632] pb-5">
      <div className="rounded-[18px] border border-[#36413d] bg-[#1a211f] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#7fa28f]">🔍</span>
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="搜索竞赛名称、主办单位、负责部门或标签关键词"
            className="h-8 flex-1 bg-transparent text-sm text-[#eef4ef] outline-none placeholder:text-[#6d8178]"
          />
          {query ? (
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-[#8aa093] transition hover:text-[#d9e5df]"
            >
              清空
            </button>
          ) : null}
          <span className="text-xs text-[#73877d]">结果 {resultCount} 项</span>
        </div>
      </div>
    </div>
  );
}
