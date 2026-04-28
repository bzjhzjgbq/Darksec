const features = [
  {
    icon: "📝",
    title: "课程与文章沉淀",
    content: "沉淀课程笔记、学习经验和技术分享，形成可持续复用的校园内容资产。",
  },
  {
    icon: "💻",
    title: "项目实践展示",
    content: "展示课程设计、实验室作品和校园服务项目，让开发成果有稳定出口。",
  },
  {
    icon: "🏆",
    title: "竞赛协作入口",
    content: "围绕数学建模、挑战杯、程序设计等赛事提供组队与经验交流入口。",
  },
  {
    icon: "🤝",
    title: "校内协同交流",
    content: "连接学生、社团、实验室和竞赛团队，提升校内协作效率。",
  },
  {
    icon: "🌦️",
    title: "南信大特色场景",
    content: "结合南京信息工程大学的气象、科创、课程与团队合作场景进行内容组织。",
  },
  {
    icon: "👤",
    title: "校园个人主页",
    content: "通过个人中心、收藏、好友与设置，构建完整的校园数字名片。",
  },
];

export default function FeatureSection() {
  return (
    <section className="mx-auto flex w-[95%] max-w-7xl flex-col justify-center gap-12 pt-16">
      <h2 className="text-center text-[34px] font-semibold tracking-[-0.05em] text-white sm:text-[42px]">
        南京信息工程大学校园社区能做什么
      </h2>
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col items-center border-b border-white/10 px-8 py-8 text-center ${
                index === 0 ? "md:border-r md:border-r-white/10" : ""
              } ${index === 1 ? "lg:border-r lg:border-r-white/10" : ""} ${
                index === 2 ? "md:border-r md:border-r-white/10 lg:border-r-0" : ""
              } ${index === 3 ? "lg:border-b-0 lg:border-r lg:border-r-white/10" : ""} ${
                index === 4 ? "md:border-b-0 md:border-r md:border-r-white/10" : ""
              } ${index === 5 ? "border-b-0 border-r-0" : ""}`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-400/10 text-3xl shadow-[0_10px_30px_rgba(59,130,246,0.18)]">
                {feature.icon}
              </div>
              <h3 className="mb-2 mt-4 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-slate-300">{feature.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
