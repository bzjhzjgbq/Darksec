import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import UserFavoriteList from "../components/user/UserFavoriteList";
import UserProfileHero from "../components/user/UserProfileHero";
import UserProjectList from "../components/user/UserProjectList";
import UserStatsGrid from "../components/user/UserStatsGrid";
import { useTheme } from "../contexts/ThemeContext";
import { currentUserProfile } from "../data/mockUsers";

const tabs = [
  { id: "overview", label: "个人中心" },
  { id: "collections", label: "我的收藏" },
  { id: "friends", label: "好友" },
  { id: "settings", label: "设置" },
];

const myProjects = [
  {
    id: "campus-home",
    category: "课程项目",
    status: "进行中",
    name: "校园主页中心",
    summary: "围绕学生主页、收藏分类和个性化主题做前端界面升级。",
  },
  {
    id: "weather-lab",
    category: "竞赛项目",
    status: "待答辩",
    name: "智慧气象可视化",
    summary: "面向校园科创展示的气象数据可视化与仪表板界面。",
  },
];

const favoriteArticles = [
  {
    id: "fav-1",
    tag: "课程资料",
    author: "周沐晨",
    title: "前端工程化课程复盘",
  },
  {
    id: "fav-2",
    tag: "竞赛灵感",
    author: "顾言",
    title: "挑战杯答辩页面整理模板",
  },
];

const favoriteProjects = [
  {
    id: "fav-project-1",
    category: "校园服务",
    author: { name: "姜栀" },
    name: "学生服务小程序界面稿",
  },
  {
    id: "fav-project-2",
    category: "作品集",
    author: { name: "陈星" },
    name: "交互式课程作品展",
  },
];

const accentOptions = [
  { label: "薄雾绿", value: "mist" },
  { label: "深海蓝", value: "navy" },
  { label: "晨曦橙", value: "sunset" },
];

function SettingsPanel() {
  const { preferences, setSurfaceTheme, setAccentTheme } = useTheme();

  return (
    <Card className="p-5">
      <p className="eyebrow">Personalization</p>
      <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-slate-950">个性化</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        参考 GitHub 的主题思路，先支持浅色与深色，再保留背景倾向的个性化色板。
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/85 p-4">
          <p className="text-sm font-medium text-slate-900">界面主题</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              variant={preferences.surface === "light" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setSurfaceTheme("light")}
            >
              浅色主题
            </Button>
            <Button
              variant={preferences.surface === "dark" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setSurfaceTheme("dark")}
            >
              深色主题
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/85 p-4">
          <p className="text-sm font-medium text-slate-900">背景色调</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {accentOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setAccentTheme(option.value)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition duration-200 ${
                  preferences.accent === option.value
                    ? "border-slate-900 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function UserCenterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const tabContent = useMemo(() => {
    if (currentTab === "collections") {
      return (
        <div className="space-y-6">
          <Card className="p-5">
            <p className="eyebrow">Collections Group</p>
            <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-slate-950">
              收藏分类
            </h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {currentUserProfile.collectionGroups.map((group) => (
                <div key={group.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-sm font-medium text-slate-900">{group.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{group.desc}</p>
                </div>
              ))}
            </div>
          </Card>
          <UserFavoriteList articles={favoriteArticles} projects={favoriteProjects} />
        </div>
      );
    }

    if (currentTab === "friends") {
      return (
        <Card className="p-5">
          <p className="eyebrow">Friends</p>
          <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-slate-950">好友</h3>
          <div className="mt-5 grid gap-3">
            {currentUserProfile.friendList.map((friend) => (
              <div
                key={friend.name}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{friend.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{friend.major}</p>
                </div>
                <span className="text-xs text-slate-500">{friend.note}</span>
              </div>
            ))}
          </div>
        </Card>
      );
    }

    if (currentTab === "settings") {
      return <SettingsPanel />;
    }

    return (
      <div className="space-y-6">
        <UserStatsGrid stats={currentUserProfile.stats} />
        <UserProjectList projects={myProjects} title="我的项目" />
        <Card className="p-5">
          <p className="eyebrow">Campus Notes</p>
          <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-slate-950">近期动态</h3>
          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-sm font-medium text-slate-900">个人主页中心升级</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                正在补齐竞赛、好友、收藏分类与个性化主题，主页将更适合作为个人展示入口。
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-sm font-medium text-slate-900">挑战杯答辩页面整理</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                梳理演示页结构、竞赛逻辑和作品封面，为后续提交做统一风格准备。
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }, [currentTab]);

  return (
    <PageReveal>
      <PageContainer className="space-y-6">
        <UserProfileHero user={currentUserProfile} />

        <Reveal>
          <div className="flex flex-wrap gap-2 rounded-[22px] border border-slate-200 bg-white/88 p-2 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_10px_24px_rgba(15,23,42,0.04)]">
            {tabs.map((tab) => {
              const active = currentTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSearchParams(tab.id === "overview" ? {} : { tab: tab.id })}
                  className={`rounded-2xl px-4 py-2.5 text-sm font-medium transition duration-200 ${
                    active
                      ? "bg-slate-950 text-white shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Reveal>{tabContent}</Reveal>

          <Reveal delay={0.06} className="space-y-4 xl:sticky xl:top-24 xl:self-start">
            <Card className="p-5">
              <p className="eyebrow">Identity</p>
              <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-slate-950">
                我的信息
              </h3>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-xs text-slate-500">昵称</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">{currentUserProfile.nickname}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-xs text-slate-500">个人站点</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">{currentUserProfile.website}</p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <p className="eyebrow">Quick Tags</p>
              <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-slate-950">
                我的方向
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {currentUserProfile.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </PageContainer>
    </PageReveal>
  );
}
