import Badge from "../ui/Badge";

export default function UserProfileHero({ user }) {
  const metaItems = [
    { label: "学院", value: user.college },
    { label: "专业", value: user.major },
    { label: "学号", value: user.studentId },
    { label: "年级", value: user.grade },
  ];

  return (
    <section className="surface-strong relative overflow-hidden px-6 py-8 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 top-0 h-60 w-60 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute left-4 top-10 h-40 w-40 rounded-full bg-sky-100/65 blur-3xl" />
      </div>

      <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <img
            src={user.avatar}
            alt={user.nickname}
            className="h-28 w-28 rounded-[32px] object-cover ring-1 ring-slate-200 shadow-[0_16px_44px_rgba(15,23,42,0.12)]"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="eyebrow">校园个人主页</p>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Lv.{user.level} · {user.levelTitle}
              </span>
            </div>
            <h2 className="mt-3 text-[40px] font-semibold tracking-[-0.05em] text-slate-950 sm:text-[46px]">
              {user.nickname}
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-600">
              {user.name} · {user.role}
            </p>
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-600">{user.bio}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {user.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-[24px] border border-slate-200 bg-white/80 p-5 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
            <p className="eyebrow">快速信息</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {metaItems.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50/85 p-3">
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_46%,#115e59_140%)] p-5 text-white shadow-[0_18px_48px_rgba(15,23,42,0.18)]">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-300">当前方向</p>
            <p className="mt-3 text-lg font-semibold tracking-[-0.03em]">校园主页与竞赛作品集</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              正在整理课程项目、比赛记录和个人成长内容，做成更完整的学生主页中心。
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-200">
              <span>{user.location}</span>
              <span>{user.campus}</span>
              <span>{user.email || "未绑定邮箱"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
