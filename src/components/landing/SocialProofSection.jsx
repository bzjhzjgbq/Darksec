const members = [
  {
    name: "小顾同学",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "风起南信",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "南信云观测员",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "夜航者",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "竞赛搭子",
    avatar:
      "https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=300&q=80",
  },
];

export default function SocialProofSection() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 pb-4 pt-7">
      <div className="relative h-20 w-[360px] overflow-hidden">
        {members.map((member, index) => (
          <div
            key={member.name}
            className="landing-avatar-collider absolute left-1/2 top-1/2"
            style={{ animationDelay: `${index * -2}s` }}
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="relative h-14 w-14 rounded-full border border-white/70 object-cover shadow-[0_12px_30px_rgba(2,6,23,0.34)]"
            />
          </div>
        ))}
      </div>

      <p className="text-sm text-slate-300">
        <span className="text-base font-semibold text-sky-300">1000+</span>{" "}
        校园用户正在关注课程交流、项目协作与竞赛动态。
      </p>
    </section>
  );
}
