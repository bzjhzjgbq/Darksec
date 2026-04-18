import { useMemo, useState } from "react";
import ArticleFilterBar from "../components/article/ArticleFilterBar";
import ArticleHero from "../components/article/ArticleHero";
import ArticleListCard from "../components/article/ArticleListCard";
import ArticleSidebar from "../components/article/ArticleSidebar";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import EmptyState from "../components/ui/EmptyState";
import SectionHeader from "../components/ui/SectionHeader";
import { articles } from "../data/mockArticles";

export default function ArticlesPage() {
  const categories = useMemo(
    () => ["全部", ...new Set(articles.map((article) => article.category))],
    []
  );
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const keyword = search.trim().toLowerCase();
      const matchesKeyword =
        !keyword ||
        [article.title, article.excerpt, article.author, article.tag, article.category]
          .join(" ")
          .toLowerCase()
          .includes(keyword);
      const matchesCategory =
        activeCategory === categories[0] || article.category === activeCategory;
      return matchesKeyword && matchesCategory;
    });
  }, [search, activeCategory, categories]);

  const recommended = [...articles].sort((a, b) => b.likes - a.likes).slice(0, 3);
  const tags = [...new Set(articles.map((article) => article.tag))].slice(0, 6);
  const authors = [...new Map(articles.map((article) => [article.author, article])).values()].slice(0, 4);

  return (
    <PageReveal>
      <PageContainer className="space-y-6">
        <ArticleHero categories={categories} />

        <Reveal>
          <ArticleFilterBar
            search={search}
            onSearchChange={setSearch}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </Reveal>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Reveal className="space-y-4">
            <SectionHeader
              eyebrow="Articles"
              title="文章列表"
              description={`当前共展示 ${filteredArticles.length} 篇文章，优先强调标题、摘要、作者与阅读反馈。`}
            />
            {filteredArticles.length ? (
              filteredArticles.map((article) => <ArticleListCard key={article.id} article={article} />)
            ) : (
              <EmptyState
                eyebrow="No Results"
                title="没有找到匹配的文章"
                description="可以尝试调整搜索词或切换分类，页面会继续保留当前的推荐与标签浏览。"
              />
            )}
          </Reveal>

          <Reveal className="space-y-4 xl:sticky xl:top-24 xl:self-start" delay={0.08}>
            <ArticleSidebar recommended={recommended} tags={tags} authors={authors} />
          </Reveal>
        </div>
      </PageContainer>
    </PageReveal>
  );
}
