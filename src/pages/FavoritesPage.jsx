import { useMemo, useState } from "react";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import UserPageLayout from "../components/user/UserPageLayout";
import { articles } from "../data/mockArticles";
import { competitions } from "../data/mockCompetitions";
import { projects } from "../data/mockProjects";
import { currentUserProfile } from "../data/mockUsers";

const tabs = ["收藏文章", "收藏项目", "收藏竞赛"];

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
      description="收藏页按文章、项目、竞赛进行分类，每一类卡片样式都不同，方便你演示分类展示效果。"
    >
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <Card className="p-4">
          <p className="eyebrow">收藏分组</p>
          <div className="mt-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition duration-200 ${
                  activeTab === tab
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                <span>{tab}</span>
                <span>›</span>
              </button>
            ))}
          </div>
        </Card>

        <div className="grid gap-4">
          {content.length ? (
            content.map((item) => {
              if (activeTab === "收藏文章") {
                return (
                  <Card key={item.id} className="border-l-4 border-l-sky-400 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{item.tag}</Badge>
                      <span className="text-xs text-slate-500">{item.publishedAt}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.excerpt}</p>
                  </Card>
                );
              }

              if (activeTab === "收藏项目") {
                return (
                  <Card key={item.id} className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-950">{item.name}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
                      </div>
                      <Badge>{item.status}</Badge>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.techStack.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </Card>
                );
              }

              return (
                <Card key={item.id} className="bg-[linear-gradient(135deg,#f8fafc_0%,#eef4ff_100%)] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-slate-950">{item.title}</p>
                      <p className="mt-2 text-sm text-slate-500">{item.time}</p>
                    </div>
                    <Badge>{item.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </Card>
              );
            })
          ) : (
            <EmptyState
              eyebrow="当前为空"
              title="这个分类下还没有收藏"
              description="收藏当前仍以 mock 展示为主，等后端接口补齐后可以继续替换。"
            />
          )}
        </div>
      </div>
    </UserPageLayout>
  );
}
