import { useMemo, useState } from "react";

const sortOptions = [
  { value: "latest", label: "最新" },
  { value: "hot", label: "最热" },
  { value: "recommended", label: "推荐" },
];

const collapsedTagCount = 18;

export default function ArticleFilterBar({
  search,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  tags,
  activeTag,
  onTagChange,
  sort,
  onSortChange,
}) {
  const [showAllTags, setShowAllTags] = useState(false);
  const visibleTags = useMemo(
    () => (showAllTags ? tags : tags.slice(0, collapsedTagCount)),
    [showAllTags, tags]
  );

  return (
    <div className="surface p-5 sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_220px]">
        <label className="space-y-2">
          <span className="field-label">搜索文章</span>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="搜索标题、摘要、作者或标签"
            className="field"
          />
        </label>

        <label className="space-y-2">
          <span className="field-label">排序</span>
          <select value={sort} onChange={(event) => onSortChange(event.target.value)} className="field">
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 space-y-2">
        <span className="field-label">分类</span>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const selected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition duration-200 focus-visible:shadow-[0_0_0_4px_rgba(148,163,184,0.12)] ${
                  selected
                    ? "bg-slate-950 text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between gap-3">
          <span className="field-label">标签</span>
          {tags.length > collapsedTagCount ? (
            <button
              type="button"
              onClick={() => setShowAllTags((prev) => !prev)}
              className="text-xs font-medium text-emerald-700 transition duration-200 hover:text-emerald-800"
            >
              {showAllTags ? "收起" : "全部"}
            </button>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {["全部", ...visibleTags].map((tag) => {
            const selected = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onTagChange(tag)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition duration-200 ${
                  selected
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-900"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
