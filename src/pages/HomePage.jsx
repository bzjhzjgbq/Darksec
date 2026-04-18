import { Link } from "react-router-dom";
import ActiveUserList from "../components/home/ActiveUserList";
import FeaturedArticleList from "../components/home/FeaturedArticleList";
import FeaturedProjectGrid from "../components/home/FeaturedProjectGrid";
import HeroPanel from "../components/home/HeroPanel";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import Reveal from "../components/motion/Reveal";
import Button from "../components/ui/Button";
import SectionHeader from "../components/ui/SectionHeader";
import { featuredProjects } from "../data/mockProjects";

const homeStats = [
  { label: "Community Projects", value: "1,280+", detail: "Fresh work shared every week" },
  { label: "Active Builders", value: "8,600+", detail: "Frontend, backend, AI and product" },
  { label: "This Week", value: "126", detail: "New projects and deep-dive discussions" },
];

const pulseCards = [
  {
    title: "Today Trending",
    value: "AI Workflows",
    meta: "Discussion heat +24%",
    tone: "from-slate-900 via-slate-800 to-slate-700",
  },
  {
    title: "New Launches",
    value: "18",
    meta: "Past 24 hours",
    tone: "from-blue-600 via-sky-500 to-cyan-400",
  },
  {
    title: "Fresh Threads",
    value: "342",
    meta: "Projects, open source and engineering practice",
    tone: "from-emerald-600 via-teal-500 to-cyan-400",
  },
];

const homeArticles = [
  {
    id: "home-article-1",
    title: "How design systems stay maintainable as a community platform grows",
    excerpt:
      "A practical look at the visual and interaction layers that become fragile first, plus a rollout path teams can actually sustain.",
    author: "Aster Chen",
    role: "Frontend Engineer",
    readTime: "8 min",
    tag: "Design System",
    publishedAt: "2026-04-12",
  },
  {
    id: "home-article-2",
    title: "How indie developers can shape a public project page that attracts early users",
    excerpt:
      "A project page is more than a showcase. It helps people understand the problem, the builder and the direction of the product.",
    author: "Lin Yue",
    role: "Full-stack Developer",
    readTime: "6 min",
    tag: "Project Growth",
    publishedAt: "2026-04-10",
  },
  {
    id: "home-article-3",
    title: "Why information hierarchy matters more than visual flair in a dev community",
    excerpt:
      "Patterns pulled from GitHub, Linear and Notion that explain why calm structure wins over noisy presentation on content platforms.",
    author: "Serein",
    role: "AI Product Builder",
    readTime: "10 min",
    tag: "Content Design",
    publishedAt: "2026-04-08",
  },
];

const activeUsers = [
  {
    id: "lin-yue",
    name: "Lin Yue",
    role: "Full-stack Developer",
    summary: "Shares practical work on collaborative tools and AI product design.",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
    score: "98",
    tags: ["AI Product", "Collaboration", "Full-stack"],
  },
  {
    id: "aster-chen",
    name: "Aster Chen",
    role: "Frontend Engineer",
    summary: "Focused on component systems, interface quality and design engineering.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    score: "94",
    tags: ["Component Systems", "Design System", "Frontend"],
  },
  {
    id: "serein",
    name: "Serein",
    role: "AI Product Builder",
    summary: "Explores generative applications and multi-modal workflow prototypes.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    score: "91",
    tags: ["AI Workflow", "Multimodal", "Prototype"],
  },
];

export default function HomePage() {
  return (
    <PageReveal className="space-y-10 pb-2">
      <PageContainer>
        <HeroPanel stats={homeStats} pulseCards={pulseCards} />
      </PageContainer>

      <PageContainer className="space-y-10">
        <Reveal as="section" className="space-y-6">
          <SectionHeader
            eyebrow="Trending Projects"
            title="热门项目"
            description="Put the most worthwhile projects right after the hero so content discovery and community heat connect naturally."
            action={
              <Link to="/projects">
                <Button variant="secondary">查看全部项目</Button>
              </Link>
            }
          />
          <FeaturedProjectGrid projects={featuredProjects.slice(0, 3)} />
        </Reveal>

        <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <Reveal className="space-y-6">
            <SectionHeader
              eyebrow="Featured Articles"
              title="热门文章"
              description="The homepage should also carry deeper reading, not just project showcase cards, so the platform feels like a real community."
              action={
                <Link to="/articles">
                  <Button variant="secondary">前往文章模块</Button>
                </Link>
              }
            />
            <FeaturedArticleList articles={homeArticles} />
          </Reveal>

          <Reveal className="space-y-6" delay={0.08}>
            <SectionHeader
              eyebrow="Active Users"
              title="活跃用户"
              description="Bringing creators onto the homepage makes the platform feel human and lived-in instead of looking like a static content shelf."
            />
            <ActiveUserList users={activeUsers} />
          </Reveal>
        </section>
      </PageContainer>
    </PageReveal>
  );
}
