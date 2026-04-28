import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import UserPageLayout from "../components/user/UserPageLayout";
import { useAuth } from "../contexts/AuthContext";
import { currentUserProfile } from "../data/mockUsers";

const settingSections = [
  { key: "account", label: "账号" },
  { key: "security", label: "安全" },
  { key: "notice", label: "通知" },
  { key: "privacy", label: "隐私" },
];

const glassBoxClass =
  "rounded-[24px] border border-white/24 bg-white/16 px-4 py-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_20px_50px_rgba(15,23,42,0.10)] backdrop-blur-[24px]";

export default function SettingsPage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("account");

  const safeUser = currentUser || currentUserProfile;

  const contentMap = {
    account: {
      title: "账号设置",
      blocks: [
        ["昵称", safeUser.nickname],
        ["邮箱", safeUser.email || "暂未绑定"],
        ["学号", safeUser.studentId || "暂未绑定"],
      ],
    },
    security: {
      title: "安全设置",
      blocks: [
        ["登录方式", "账号密码登录"],
        ["当前状态", "本地展示模式已启用，后续可以继续接真实鉴权。"],
        ["邀请码", safeUser.inviteCode || "当前账号暂无邀请码信息"],
      ],
    },
    notice: {
      title: "通知设置",
      blocks: [
        ["评论通知", currentUserProfile.settings.notifyComments ? "已开启" : "已关闭"],
        ["组队邀请", currentUserProfile.settings.notifyInvites ? "已开启" : "已关闭"],
        ["说明", "当前阶段仍以静态展示为主，后续可以直接接入真实设置接口。"],
      ],
    },
    privacy: {
      title: "隐私设置",
      blocks: [
        ["主页可见状态", currentUserProfile.settings.profileVisible ? "公开展示" : "仅自己可见"],
        ["资料说明", "个人页面与主站风格解耦，保持独立展示。"],
        ["背景设置", "背景裁切和更换已放在个人主页右下角。"],
      ],
    },
  };

  const activeSection = contentMap[activeKey];

  function handleSwitchAccount() {
    logout();
    navigate("/login", { replace: true });
  }

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <UserPageLayout title="设置" description="设置页和个人主页使用同一背景，内部信息改成更轻的 iOS 风格玻璃层。">
      <div className="grid gap-8 xl:grid-cols-[220px_minmax(0,1fr)]">
        <div className="space-y-3">
          {settingSections.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveKey(item.key)}
              className={`flex w-full items-center justify-between rounded-full px-4 py-3 text-left text-sm font-medium transition ${
                activeKey === item.key
                  ? "bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-xl"
                  : "bg-white/10 text-white/78 backdrop-blur-xl hover:bg-white/16 hover:text-white"
              }`}
            >
              <span>{item.label}</span>
              <span className="text-xs opacity-70">→</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          <section className="rounded-[28px] border border-white/24 bg-white/16 px-6 py-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_20px_50px_rgba(15,23,42,0.10)] backdrop-blur-[24px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/52">Panel</p>
            <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.05em] text-white">{activeSection.title}</h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {activeSection.blocks.map(([label, value]) => (
                <div key={label} className={glassBoxClass}>
                  <p className="text-xs text-white/58">{label}</p>
                  <p className="mt-2 text-sm leading-7 text-white/84">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-white/24 bg-white/16 px-6 py-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_20px_50px_rgba(15,23,42,0.10)] backdrop-blur-[24px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/52">Account</p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-[24px] font-semibold tracking-[-0.04em] text-white">账号操作</h3>
                <p className="mt-2 text-sm leading-7 text-white/72">这里只保留切换账号和退出登录两个动作，不再额外拆出独立页面。</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" size="sm" onClick={handleSwitchAccount}>切换账号</Button>
                <Button size="sm" onClick={handleLogout}>退出登录</Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </UserPageLayout>
  );
}
