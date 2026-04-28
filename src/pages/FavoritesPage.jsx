import { useMemo, useState } from "react";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import UserPageLayout from "../components/user/UserPageLayout";
import { articles } from "../data/mockArticles";
import { competitions } from "../data/mockCompetitions";
import { projects } from "../data/mockProjects";
import { currentUserProfile } from "../data/mockUsers";

const tabs = ["收藏文章", "收藏项目", "收藏竞赛"];

const glassCardClass =
  "rounded-[28px] border border-white/28 bg-white/20 px-5 py-5 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_24px_50px_rgba(15,23,42,0.10)] backdrop-blur-[24px]";

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const content = useMemo(() => {
    if (activeTab === "收藏文章") {
      return articles.filter((item) => currentUserProfile.favoriteArticleIds.includes(item.id));
    }
    if (activeTab === "收藏项目") {
      return projects.filter((item) => currentUserProfile.favoriteProjectIds.includes(item.id));
    }
    return competitions.filter((item) => currentUserProfile.favoriteCompetitionIds.includes(item.id));
  }, [activeTab]);

  return (
    <UserPageLayout
      title="我的收藏"
      description="按类别整理内容，沿用个人主页的同一张背景，再把内容放进轻盈的玻璃面板里。"
      contentClassName="bg-white/10"
    >
      <div className="flex h-full flex-col gap-8">
        <div className="flex flex-wrap items-center gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-xl"
                    : "bg-white/10 text-white/78 backdrop-blur-xl hover:bg-white/16 hover:text-white"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="grid gap-4">
          {content.length ? (
            content.map((item) => {
              if (activeTab === "收藏文章") {
                return (
                  <article key={item.id} className={glassCardClass}>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{item.tag}</Badge>
                      <Badge>{item.category}</Badge>
                      <span className="text-xs text-slate-600">{item.publishedAt}</span>
                    </div>
                    <h2 className="mt-4 text-[24px] font-semibold tracking-[-0.04em] text-slate-950">{item.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">{item.excerpt}</p>
                  </article>
                );
              }

              if (activeTab === "收藏项目") {
                return (
                  <article key={item.id} className={glassCardClass}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="text-[24px] font-semibold tracking-[-0.04em] text-slate-950">{item.name}</h2>
                      <Badge>{item.status}</Badge>
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">{item.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.techStack.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </article>
                );
              }

              return (
                <article key={item.id} className={glassCardClass}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-[24px] font-semibold tracking-[-0.04em] text-slate-950">{item.title}</h2>
                      <p className="mt-2 text-sm text-slate-600">{item.time}</p>
                    </div>
                    <Badge>{item.status}</Badge>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">{item.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </article>
              );
            })
          ) : (
            <EmptyState eyebrow="当前为空" title="这个分类下还没有收藏" description="后续接上真实接口后，这里会直接按类别读取你的收藏内容。" />
          )}
        </div>
      </div>
    </UserPageLayout>
  );
}
