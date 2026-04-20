import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ArticleFilterBar from "../components/article/ArticleFilterBar";
import ArticleHero from "../components/article/ArticleHero";
import ArticleListCard from "../components/article/ArticleListCard";
import ArticleSidebar from "../components/article/ArticleSidebar";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import SectionHeader from "../components/ui/SectionHeader";
import { articleCategories, articleTags, articles } from "../data/mockArticles";

const pageSize = 4;
const localArticlesKey = "darksec_articles";

function readLocalArticles() {
  try {
    return JSON.parse(localStorage.getItem(localArticlesKey) || "[]");
  } catch {
    return [];
  }
}

function getArticleScore(article) {
  return article.views * 0.2 + article.likes * 2 + article.comments * 3;
}

export default function ArticlesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(articleCategories[0]);
  const [activeTag, setActiveTag] = useState("全部");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const allArticles = useMemo(() => [...readLocalArticles(), ...articles], []);

  const tags = useMemo(
    () => [...new Set([...articleTags, ...allArticles.flatMap((article) => article.tags)])],
    [allArticles]
  );

  const filteredArticles = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return allArticles
      .filter((article) => {
        const matchesKeyword =
          !keyword ||
          [article.title, article.excerpt, article.author, article.category, ...article.tags]
            .join(" ")
            .toLowerCase()
            .includes(keyword);
        const matchesCategory = activeCategory === "全部" || article.category === activeCategory;
        const matchesTag = activeTag === "全部" || article.tags.includes(activeTag);
        return matchesKeyword && matchesCategory && matchesTag;
      })
      .sort((a, b) => {
        if (sort === "hot") return getArticleScore(b) - getArticleScore(a);
        if (sort === "recommended") return Number(b.recommended) - Number(a.recommended) || getArticleScore(b) - getArticleScore(a);
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      });
  }, [activeCategory, activeTag, allArticles, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleArticles = filteredArticles.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const recommended = [...allArticles].sort((a, b) => getArticleScore(b) - getArticleScore(a)).slice(0, 3);
  const authors = [...new Map(allArticles.map((article) => [article.author, article])).values()].slice(0, 4);

  function resetToFirstPage(nextAction) {
    nextAction();
    setPage(1);
  }

  return (
    <PageReveal>
      <PageContainer className="space-y-6">
        <ArticleHero categories={articleCategories} totalArticles={allArticles.length} />

        <Reveal>
          <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200/80 bg-white px-5 py-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="eyebrow">Articles</p>
              <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[34px]">
                文章列表
              </h1>
            </div>
            <Link to="/articles/new">
              <Button>发布文章</Button>
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <ArticleFilterBar
            search={search}
            onSearchChange={(value) => resetToFirstPage(() => setSearch(value))}
            categories={articleCategories}
            activeCategory={activeCategory}
            onCategoryChange={(value) => resetToFirstPage(() => setActiveCategory(value))}
            tags={tags}
            activeTag={activeTag}
            onTagChange={(value) => resetToFirstPage(() => setActiveTag(value))}
            sort={sort}
            onSortChange={(value) => resetToFirstPage(() => setSort(value))}
          />
        </Reveal>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Reveal className="space-y-4">
            <SectionHeader
              eyebrow="Browse"
              title="社区精选文章"
              description={`当前展示 ${filteredArticles.length} 篇文章，支持分类、标签、搜索和排序。`}
            />
            {visibleArticles.length ? (
              visibleArticles.map((article) => <ArticleListCard key={article.id} article={article} />)
            ) : (
              <EmptyState
                eyebrow="No Results"
                title="没有找到匹配的文章"
                description="可以调整搜索词、分类或标签筛选，换一个方向继续浏览。"
              />
            )}

            <div className="surface flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                第 <span className="font-medium text-slate-900">{currentPage}</span> / {totalPages} 页
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" disabled={currentPage === 1} onClick={() => setPage((prev) => prev - 1)}>
                  上一页
                </Button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPage(item)}
                    className={`h-11 min-w-11 rounded-2xl border px-3 text-sm font-medium transition duration-200 ${
                      item === currentPage
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <Button
                  variant="secondary"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  下一页
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal className="space-y-4 xl:sticky xl:top-24 xl:self-start" delay={0.08}>
            <ArticleSidebar
              recommended={recommended}
              tags={tags.slice(0, 8)}
              authors={authors}
              onTagSelect={(tag) => resetToFirstPage(() => setActiveTag(tag))}
            />
          </Reveal>
        </div>
      </PageContainer>
    </PageReveal>
  );
}
