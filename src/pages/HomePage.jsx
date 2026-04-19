import HeroPanel from "../components/home/HeroPanel";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";

const homeStats = [
  { label: "社区项目", value: "1,280+", detail: "每周持续更新真实开发项目" },
  { label: "活跃开发者", value: "8,600+", detail: "覆盖前端、后端、AI 与产品方向" },
  { label: "本周新增", value: "126", detail: "新项目与深度讨论持续出现" },
];

export default function HomePage() {
  return (
    <PageReveal className="pb-2">
      <PageContainer>
        <HeroPanel stats={homeStats} />
      </PageContainer>
    </PageReveal>
  );
}
