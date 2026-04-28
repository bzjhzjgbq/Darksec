import { useMemo, useState } from "react";
import Button from "../components/ui/Button";
import UserPageLayout from "../components/user/UserPageLayout";
import { useAuth } from "../contexts/AuthContext";
import { currentUserProfile } from "../data/mockUsers";

function buildInitialProfile(currentUser) {
  return {
    nickname: currentUser?.nickname || currentUserProfile.nickname,
    avatar: currentUser?.avatar || currentUserProfile.avatar,
    bio: currentUser?.bio || currentUserProfile.bio,
    age: currentUser?.age || currentUserProfile.age,
    major: currentUser?.major || currentUserProfile.major,
    college: currentUser?.college || currentUserProfile.college,
    school: currentUser?.school || currentUserProfile.school,
    grade: currentUser?.grade || currentUserProfile.grade,
    email: currentUser?.email || currentUserProfile.email,
  };
}

function Field({ label, children, hint }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white/92">{label}</span>
      {children}
      {hint ? <p className="text-xs leading-6 text-white/58">{hint}</p> : null}
    </label>
  );
}

const glassInputClass =
  "w-full rounded-[20px] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.10)_100%)] px-4 py-3 text-sm text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-[18px] transition placeholder:text-white/38 focus:border-white/30 focus:bg-[linear-gradient(180deg,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.12)_100%)]";

const glassPanelClass =
  "rounded-[28px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.12)_100%)] px-5 py-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_20px_50px_rgba(15,23,42,0.10)] backdrop-blur-[24px]";

export default function ProfileEditPage() {
  const { currentUser } = useAuth();
  const [form, setForm] = useState(() => buildInitialProfile(currentUser));
  const [saved, setSaved] = useState(false);
  const previewName = useMemo(() => form.nickname || currentUserProfile.nickname, [form.nickname]);

  function handleChange(key, value) {
    setSaved(false);
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <UserPageLayout title="资料编辑" description="这一页专门整理基础资料，信息放在统一的玻璃面板里，背景沿用个人主页。">
      <form onSubmit={handleSubmit} className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className={`${glassPanelClass} grid gap-5`}>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="名字">
              <input value={form.nickname} onChange={(event) => handleChange("nickname", event.target.value)} className={glassInputClass} />
            </Field>

            <Field label="头像链接" hint="这里先保留链接形式，后续再接上传接口。">
              <input value={form.avatar} onChange={(event) => handleChange("avatar", event.target.value)} className={glassInputClass} />
            </Field>

            <Field label="年龄">
              <input value={form.age} onChange={(event) => handleChange("age", event.target.value)} className={glassInputClass} />
            </Field>

            <Field label="年级">
              <input value={form.grade} onChange={(event) => handleChange("grade", event.target.value)} className={glassInputClass} />
            </Field>

            <Field label="专业">
              <input value={form.major} onChange={(event) => handleChange("major", event.target.value)} className={glassInputClass} />
            </Field>

            <Field label="学院">
              <input value={form.college} onChange={(event) => handleChange("college", event.target.value)} className={glassInputClass} />
            </Field>

            <Field label="学校">
              <input value={form.school} onChange={(event) => handleChange("school", event.target.value)} className={glassInputClass} />
            </Field>

            <Field label="联系邮箱">
              <input value={form.email} onChange={(event) => handleChange("email", event.target.value)} className={glassInputClass} />
            </Field>
          </div>

          <Field label="个性签名">
            <textarea value={form.bio} onChange={(event) => handleChange("bio", event.target.value)} rows={5} className={`${glassInputClass} rounded-[24px] leading-7`} />
          </Field>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" size="sm">保存资料</Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setForm(buildInitialProfile(currentUser));
                setSaved(false);
              }}
            >
              恢复默认
            </Button>
            {saved ? <span className="text-sm text-emerald-200">已保存本地预览</span> : null}
          </div>
        </section>

        <aside className={glassPanelClass}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/52">Preview</p>
          <div className="mt-5">
            <img src={form.avatar} alt={previewName} className="h-20 w-20 rounded-[24px] object-cover shadow-[0_12px_30px_rgba(15,23,42,0.12)]" />
            <h2 className="mt-5 text-[28px] font-semibold tracking-[-0.05em] text-white">{previewName}</h2>
            <p className="mt-2 text-sm text-white/68">{form.school} · {form.major}</p>
            <p className="mt-5 text-sm leading-7 text-white/76">{form.bio}</p>
            <div className="mt-6 space-y-2 text-sm text-white/66">
              <div className="flex items-center justify-between"><span>年龄</span><span className="text-white">{form.age}</span></div>
              <div className="flex items-center justify-between"><span>年级</span><span className="text-white">{form.grade}</span></div>
              <div className="flex items-center justify-between"><span>邮箱</span><span className="text-white">{form.email}</span></div>
            </div>
          </div>
        </aside>
      </form>
    </UserPageLayout>
  );
}
