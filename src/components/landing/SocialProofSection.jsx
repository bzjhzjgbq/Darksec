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
];

export default function SocialProofSection() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 pt-8">
      <div className="flex items-center justify-center">
        {members.map((member, index) => (
          <img
            key={member.name}
            src={member.avatar}
            alt={member.name}
            className={`h-12 w-12 rounded-full border border-white/80 object-cover shadow-[0_8px_24px_rgba(59,130,246,0.25)] ${index ? "-ml-2" : ""}`}
          />
        ))}
      </div>
      <p className="text-sm text-slate-300">
        <span className="text-base font-semibold text-sky-300">1000+</span> 校园用户正在关注课程交流、项目协作与竞赛动态
      </p>
    </section>
  );
}
