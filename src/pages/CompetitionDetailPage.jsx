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
              <h1 className="text-2xl font-semibold text-[#eff6f1]">娌℃湁鎵惧埌瀵瑰簲绔炶禌</h1>
              <p className="mt-4 text-sm leading-7 text-[#9dafa6]">
                褰撳墠璇︽儏椤典娇鐢ㄦ湰鍦?mock 鏁版嵁锛屽鏋滀綘璁块棶浜嗘棤鏁堥摼鎺ワ紝鍙互杩斿洖绔炶禌鍒楄〃閲嶆柊鏌ョ湅銆?              </p>
              <Link
                to="/competitions"
                className="mt-6 inline-flex border border-[#425149] px-4 py-2 text-sm text-[#dce6e0] transition hover:border-[#6a8d7c]"
              >
                杩斿洖绔炶禌鍒楄〃
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
              绔炶禌鍒楄〃
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

              <DetailRow label="绔炶禌绫诲埆" value={competition.category} />
              <DetailRow label="绔炶禌绾у埆" value={competition.level} />
              <DetailRow label="涓诲姙鍗曚綅 / 璐熻矗閮ㄩ棬" value={`${competition.organizer} / ${competition.department}`} />
              <DetailRow label="閫傚悎浜虹兢" value={competition.audience} />
              <DetailRow label="鏃堕棿鎻愮ず" value={`${competition.periodLabel}锛屾姤鍚嶆埅姝㈠弬鑰?${competition.deadline}`} />
              <DetailRow label="淇℃伅鏉ユ簮" value={competition.sourceTags.join(" / ")} />

              <div className="border-b border-[#2d3733] py-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#71847b]">鍙傝€冭祫鏂?/p>
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
                  杩斿洖鍒楄〃
                </Link>
              </div>
            </div>

            <aside className="border-l border-[#2c3632] bg-[#171e1b] px-5 py-6">
              <div className="border-b border-[#33403a] pb-3">
                <p className="text-sm font-semibold text-[#eef5f0]">鍙傝禌寤鸿</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#a8b7b1]">{competition.highlight}</p>

              <div className="mt-6 border-t border-[#2d3733] pt-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[#71847b]">鏍囩</p>
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
