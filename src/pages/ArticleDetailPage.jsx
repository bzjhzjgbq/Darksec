import { Link, useParams } from "react-router-dom";
import MarkdownRenderer from "../components/article/MarkdownRenderer";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { articles } from "../data/mockArticles";

const localArticlesKey = "darksec_articles";

function readLocalArticles() {
  try {
    return JSON.parse(localStorage.getItem(localArticlesKey) || "[]");
  } catch {
    return [];
  }
}

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getHeadings(content) {
  return content
    .split("\n")
    .map((line) => {
      const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
      if (!match) return null;
      return {
        level: match[1].length,
        title: match[2],
        id: slugify(match[2]),
      };
    })
    .filter(Boolean);
}

function Stat({ label, value }) {
  return (
    <div className="stat-pill">
      {label} <span className="ml-1 text-slate-900">{value}</span>
    </div>
  );
}

export default function ArticleDetailPage() {
  const { articleId } = useParams();
  const allArticles = [...readLocalArticles(), ...articles];
  const article = allArticles.find((item) => item.id === articleId);

  if (!article) {
    return (
      <PageReveal>
        <PageContainer>
          <Reveal>
            <Card strong className="p-10 text-center">
              <h1 className="headline-lg">文章不存在</h1>
              <p className="mt-4 body-md">这篇文章可能已被移除，或你访问了无效链接。</p>
              <Link to="/articles" className="mt-6 inline-block">
                <Button>返回文章列表</Button>
              </Link>
            </Card>
          </Reveal>
        </PageContainer>
      </PageReveal>
    );
  }

  const headings = getHeadings(article.content);
  const related = allArticles
    .filter((item) => item.id !== article.id)
    .filter((item) => item.category === article.category || item.tags.some((tag) => article.tags.includes(tag)))
    .slice(0, 3);

  return (
    <PageReveal>
      <PageContainer className="space-y-5">
        <Reveal className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/articles" className="transition hover:text-slate-900">
            文章
          </Link>
          <span>/</span>
          <span className="text-slate-900">{article.title}</span>
        </Reveal>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <Reveal className="space-y-5">
            <article className="surface-strong overflow-hidden">
              <header className="border-b border-slate-100 px-6 py-7 sm:px-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{article.category}</Badge>
                  {article.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h1 className="mt-5 text-[34px] font-semibold leading-tight tracking-[-0.05em] text-slate-950 sm:text-[44px]">
                  {article.title}
                </h1>
                <p className="mt-4 body-md">{article.excerpt}</p>

                <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{article.author}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {article.role} / {article.publishedAt} / {article.readTime}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Stat label="阅读" value={article.views.toLocaleString()} />
                    <Stat label="评论" value={article.comments} />
                    <Stat label="点赞" value={article.likes} />
                  </div>
                </div>
              </header>

              <div className="px-6 py-7 sm:px-8">
                <MarkdownRenderer content={article.content} />
              </div>
            </article>

            <section className="surface p-5 sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow">Related</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">相关推荐</h2>
                </div>
                <Link to="/articles">
                  <Button variant="secondary">查看更多</Button>
                </Link>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    to={`/articles/${item.id}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition duration-200 hover:border-slate-300 hover:bg-white"
                  >
                    <p className="text-sm font-semibold leading-6 text-slate-950">{item.title}</p>
                    <p className="mt-2 text-xs text-slate-500">{item.category}</p>
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal className="space-y-4 xl:sticky xl:top-24 xl:self-start" delay={0.08}>
            <aside className="surface p-5">
              <p className="eyebrow">Contents</p>
              <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">目录</h2>
              <nav className="mt-4 space-y-2">
                {headings.length ? (
                  headings.map((heading) => (
                    <a
                      key={`${heading.id}-${heading.title}`}
                      href={`#${heading.id}`}
                      className={`block rounded-xl px-3 py-2 text-sm leading-5 text-slate-600 transition duration-200 hover:bg-slate-50 hover:text-slate-950 ${
                        heading.level === 3 ? "ml-3" : ""
                      }`}
                    >
                      {heading.title}
                    </a>
                  ))
                ) : (
                  <p className="body-sm">这篇文章暂无可提取目录。</p>
                )}
              </nav>
            </aside>

            <aside className="surface p-5">
              <p className="eyebrow">Action</p>
              <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-slate-950">继续创作</h2>
              <p className="mt-3 body-sm">有新的经验想沉淀下来，可以直接发布到社区文章流。</p>
              <Link to="/articles/new" className="mt-4 block">
                <Button className="w-full">发布文章</Button>
              </Link>
            </aside>
          </Reveal>
        </div>
      </PageContainer>
    </PageReveal>
  );
}
