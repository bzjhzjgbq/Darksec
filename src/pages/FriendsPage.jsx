import { useMemo, useState } from "react";
import UserPageLayout from "../components/user/UserPageLayout";
import { currentUserProfile } from "../data/mockUsers";

const groupOrder = ["竞赛组队", "产品搭子", "实验室伙伴"];

export default function FriendsPage() {
  const [activeFriendId, setActiveFriendId] = useState(currentUserProfile.friendList[0]?.id || "");

  const groupedFriends = useMemo(() => {
    const map = new Map();

    currentUserProfile.friendList.forEach((friend) => {
      const groupName = friend.status === "在线" ? friend.group : "离线好友";
      if (!map.has(groupName)) {
        map.set(groupName, []);
      }
      map.get(groupName).push(friend);
    });

    return [...map.entries()].sort((a, b) => {
      const aIndex = groupOrder.indexOf(a[0]);
      const bIndex = groupOrder.indexOf(b[0]);
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });
  }, []);

  const activeFriend =
    currentUserProfile.friendList.find((friend) => friend.id === activeFriendId) ||
    currentUserProfile.friendList[0];

  return (
    <UserPageLayout
      title="好友"
      description="好友页也切到同一套模板里，只保留社交浏览感，不再回到厚重卡片和传统面板。"
    >
      <div className="grid h-full gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-[28px] bg-white/52 p-4 backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.68)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Friends</p>
          <div className="mt-4 space-y-5">
            {groupedFriends.map(([groupName, friends]) => (
              <div key={groupName}>
                <div className="mb-2 flex items-center justify-between px-2 text-xs text-slate-500">
                  <span>{groupName}</span>
                  <span>{friends.length} 人</span>
                </div>
                <div className="space-y-2">
                  {friends.map((friend) => (
                    <button
                      key={friend.id}
                      type="button"
                      onClick={() => setActiveFriendId(friend.id)}
                      className={`flex w-full items-center gap-3 rounded-[22px] px-3 py-3 text-left transition ${
                        activeFriend?.id === friend.id ? "bg-white text-slate-950" : "bg-white/48 text-slate-600 hover:bg-white/70"
                      }`}
                    >
                      <img src={friend.avatar} alt={friend.nickname} className="h-11 w-11 rounded-[18px] object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-medium">{friend.nickname}</p>
                          <span className={`text-xs ${friend.status === "在线" ? "text-emerald-600" : "text-slate-500"}`}>
                            {friend.status}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-xs text-slate-500">{friend.bio}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="rounded-[28px] bg-white/54 px-6 py-6 backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.68)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <img
              src={activeFriend.avatar}
              alt={activeFriend.nickname}
              className="h-24 w-24 rounded-[28px] object-cover shadow-[0_12px_30px_rgba(15,23,42,0.12)]"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-[30px] font-semibold tracking-[-0.05em] text-slate-950">{activeFriend.nickname}</h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    activeFriend.status === "在线" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {activeFriend.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                {activeFriend.level} · {activeFriend.group}
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-600">{activeFriend.bio}</p>
              <div className="mt-6 rounded-[22px] bg-white/58 px-4 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.58)]">
                <p className="text-xs text-slate-500">个性签名</p>
                <p className="mt-2 text-sm leading-7 text-slate-700">{activeFriend.motto}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </UserPageLayout>
  );
}
