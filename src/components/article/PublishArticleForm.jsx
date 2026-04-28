import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { articleCategories, articleTags } from "../../data/mockArticles";
import Button from "../ui/Button";
import Card from "../ui/Card";

const draftKey = "darksec_article_draft";
const articlesKey = "darksec_articles";
const collapsedTagCount = 18;

const initialState = {
  title: "",
  category: articleCategories[1],
  tags: "",
  excerpt: "",
  content: `# 文章标题

在这里写下你的技术实践、项目经验或社区观察。

## 背景

说明这个问题为什么值得讨论。

## 示例代码

\`\`\`js
function helloDevSphere() {
  return "Keep building.";
}
\`\`\`
`,
};

function FieldLabel({ title, hint }) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-800">{title}</p>
      {hint ? <p className="mt-1 text-xs leading-5 text-slate-500">{hint}</p> : null}
    </div>
  );
}

function readStoredList() {
  try {
    return JSON.parse(localStorage.getItem(articlesKey) || "[]");
  } catch {
    return [];
  }
}

export default function PublishArticleForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [notice, setNotice] = useState("");
  const [showAllTags, setShowAllTags] = useState(false);
  const visibleTags = showAllTags ? articleTags : articleTags.slice(0, collapsedTagCount);

  useEffect(() => {
    try {
      const draft = JSON.parse(localStorage.getItem(draftKey) || "null");
      if (draft) {
        setForm({ ...initialState, ...draft });
        setNotice("已恢复本地草稿。");
      }
    } catch {
      setNotice("");
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function normalizeTags() {
    return form.tags
      .split(/[,，\s]+/)
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 6);
  }

  function handleSaveDraft() {
    localStorage.setItem(draftKey, JSON.stringify(form));
    setNotice("草稿已保存到本地浏览器。");
  }

  function handlePublish(event) {
    event.preventDefault();
    const now = new Date();
    const article = {
      id: `local-${now.getTime()}`,
      title: form.title.trim() || "未命名文章",
      excerpt: form.excerpt.trim() || "作者暂未填写摘要。",
      author: "DarkSec User",
      role: "Community Member",
      readTime: "约 5 分钟",
      category: form.category,
      tags: normalizeTags().length ? normalizeTags() : ["社区投稿"],
      publishedAt: now.toISOString().slice(0, 10),
      views: 0,
      likes: 0,
      comments: 0,
      recommended: false,
      content: form.content,
    };

    localStorage.setItem(articlesKey, JSON.stringify([article, ...readStoredList()]));
    localStorage.removeItem(draftKey);
    navigate(`/articles/${article.id}`);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
      <Card className="px-6 py-6 sm:px-7">
        <div className="border-b border-slate-100 pb-6">
          <p className="eyebrow">Publish Article</p>
          <h1 className="mt-3 headline-lg">发布技术文章</h1>
          <p className="mt-3 body-md">
            使用 Markdown 编写文章内容，补充分类、标签和摘要。当前为前端 mock 流程，发布内容会保存到浏览器本地。
          </p>
        </div>

        <form className="mt-6 grid gap-5" onSubmit={handlePublish}>
          <label className="space-y-2">
            <FieldLabel title="标题" hint="建议直接说明文章主题或解决的问题" />
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="field"
              placeholder="例如：如何设计一个清爽的技术社区文章页"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <FieldLabel title="分类" />
              <select name="category" value={form.category} onChange={handleChange} className="field">
                {articleCategories.slice(1).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <FieldLabel title="标签" hint="多个标签用逗号或空格分隔" />
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="field"
                placeholder={articleTags.slice(0, 4).join(", ")}
              />
            </label>
          </div>

          <label className="space-y-2">
            <FieldLabel title="摘要" hint="会展示在文章列表页，控制在 80 字以内更清爽" />
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows="3"
              className="field"
              placeholder="用一小段话概括文章价值。"
            />
          </label>

          <label className="space-y-2">
            <FieldLabel title="Markdown 正文" hint="支持标题、列表、引用、表格、代码块等常用 Markdown 语法" />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="18"
              className="field font-mono text-[13px] leading-6"
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <p className="text-xs text-slate-500">{notice || "保存草稿和发布均为本地前端演示，不会写入服务器。"}</p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={handleSaveDraft}>
                保存草稿
              </Button>
              <Button type="submit">发布文章</Button>
            </div>
          </div>
        </form>
      </Card>

      <div className="space-y-4 xl:sticky xl:top-24 xl:self-start">
        <Card className="p-5">
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">发布建议</h2>
          <div className="mt-4 space-y-3 body-sm">
            <p>标题尽量具体，帮助读者快速判断文章方向。</p>
            <p>摘要先讲文章能解决什么问题，再补充技术关键词。</p>
            <p>代码块请标注语言，例如 ```js 或 ```bash，详情页会自动高亮。</p>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">常用标签</h2>
            {articleTags.length > collapsedTagCount ? (
              <button
                type="button"
                onClick={() => setShowAllTags((prev) => !prev)}
                className="text-xs font-medium text-emerald-700 transition duration-200 hover:text-emerald-800"
              >
                {showAllTags ? "收起" : "全部"}
              </button>
            ) : null}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {visibleTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    tags: prev.tags.includes(tag) ? prev.tags : `${prev.tags}${prev.tags ? ", " : ""}${tag}`,
                  }))
                }
                className="tag-chip"
              >
                {tag}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
