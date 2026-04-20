import { currentUserProfile } from "../data/mockUsers";

function formatRole(roleCode) {
  if (roleCode === "ADMIN") return "绠＄悊鍛?;
  if (roleCode === "TEACHER") return "鏁欏笀";
  return currentUserProfile.role;
}

export function normalizeUserProfile(user) {
  if (!user) return null;

  return {
    ...currentUserProfile,
    id: String(user.userId ?? currentUserProfile.userId ?? currentUserProfile.id),
    userId: user.userId ?? currentUserProfile.userId,
    name: user.nickname || currentUserProfile.name,
    nickname: user.nickname || currentUserProfile.nickname,
    avatar: user.avatarUrl || currentUserProfile.avatar,
    avatarUrl: user.avatarUrl || currentUserProfile.avatarUrl,
    email: user.email || currentUserProfile.email,
    phone: user.phone || currentUserProfile.phone,
    studentId: user.studentNo || currentUserProfile.studentId,
    studentNo: user.studentNo || currentUserProfile.studentNo,
    inviteCode: user.inviteCode ?? currentUserProfile.inviteCode,
    roleCode: user.roleCode || currentUserProfile.roleCode,
    role: formatRole(user.roleCode),
  };
}
