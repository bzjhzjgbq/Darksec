import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import { getCompetitionById } from "../api/competitionApi";

function DetailRow({ label, value }) {
  return (
    <div className="border-b border-[#2d3733] py-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-[#71847b]">{label}</p>
      <p className="mt-2 text-sm leading-7 text-[#d7e2dc]">{value}</p>
    </div>
  );
}

export default function CompetitionDetailPage() {
  const { competitionId } = useParams();
  const [competition, setCompetition] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getCompetitionById(competitionId);
      setCompetition(data);
    }

    load();
  }, [competitionId]);

  if (!competition) {
    return (
      <PageReveal>
        <section className="min-h-[calc(100vh-76px)] bg-[#161d1a] text-white">
          <PageContainer className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="border border-[#2d3733] bg-[#181f1c] px-6 py-10 text-center">
              <h1 className="text-2xl font-semibold text-[#eff6f1]">没有找到对应竞赛</h1>
              <p className="mt-4 text-sm leading-7 text-[#9dafa6]">
                当前详情页使用本地 mock 数据，如果你访问了无效链接，可以返回竞赛列表重新查看。
              </p>
              <Link
                to="/competitions"
                className="mt-6 inline-flex border border-[#425149] px-4 py-2 text-sm text-[#dce6e0] transition hover:border-[#6a8d7c]"
              >
                返回竞赛列表
              </Link>
            </div>
          </PageContainer>
        </section>
      </PageReveal>
    );
  }

  return (
    <PageReveal>
      <section className="min-h-[calc(100vh-76px)] bg-[#161d1a] text-white">
        <PageContainer className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="border-b border-[#2c3632] pb-4 text-sm text-[#8ea198]">
            <Link to="/competitions" className="transition hover:text-white">
              竞赛列表
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#d9e5df]">{competition.title}</span>
          </div>

          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="bg-[#181f1c] px-2 py-6 sm:px-0 sm:pr-8">
              <div className="border-b border-[#2d3733] pb-5">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="border border-[#3b4742] px-2 py-1 text-[#9db2a8]">
                    {competition.level}
                  </span>
                  <span className="border border-[#3b4742] px-2 py-1 text-[#9db2a8]">
                    {competition.category}
                  </span>
                  <span className="border border-[#3b4742] px-2 py-1 text-[#9db2a8]">
                    {competition.schoolCategory}
                  </span>
                  <span className="bg-[#24392f] px-2 py-1 text-[#9fd1b6]">{competition.status}</span>
                </div>
                <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#f0f7f2]">
                  {competition.title}
                </h1>
                <p className="mt-4 max-w-4xl text-sm leading-8 text-[#aabbb3]">
                  {competition.description}
                </p>
              </div>

              <DetailRow label="竞赛类别" value={competition.category} />
              <DetailRow label="竞赛级别" value={competition.level} />
              <DetailRow label="主办单位 / 负责部门" value={`${competition.organizer} / ${competition.department}`} />
              <DetailRow label="适合人群" value={competition.audience} />
              <DetailRow label="时间提示" value={`${competition.periodLabel}，报名截止参考 ${competition.deadline}`} />
              <DetailRow label="信息来源" value={competition.sourceTags.join(" / ")} />

              <div className="border-b border-[#2d3733] py-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#71847b]">参考资料</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {competition.references.map((item) => (
                    <span key={item} className="border border-[#3a4741] px-2 py-1 text-xs text-[#91a69c]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5">
                <Link
                  to="/competitions"
                  className="inline-flex border border-[#425149] px-4 py-2 text-sm text-[#dce6e0] transition hover:border-[#6a8d7c]"
                >
                  返回列表
                </Link>
              </div>
            </div>

            <aside className="border-l border-[#2c3632] bg-[#171e1b] px-5 py-6">
              <div className="border-b border-[#33403a] pb-3">
                <p className="text-sm font-semibold text-[#eef5f0]">参赛建议</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#a8b7b1]">{competition.highlight}</p>

              <div className="mt-6 border-t border-[#2d3733] pt-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[#71847b]">标签</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {competition.tags.map((tag) => (
                    <span key={tag} className="border border-[#3a4741] px-2 py-1 text-xs text-[#91a69c]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </PageContainer>
      </section>
    </PageReveal>
  );
}
