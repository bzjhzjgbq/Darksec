export const mockAuthState = {
  isLoggedIn: false,
};

export const users = [
  {
    id: "user_001",
    name: "顾知远",
    nickname: "小顾同学",
    role: "校园开发者",
    summary: "热爱前端开发、校园项目实践和竞赛协作。",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
    score: "4.8",
    level: 3,
    levelTitle: "校园新秀",
    tags: ["前端开发", "校园项目", "竞赛交流"],
  },
  {
    id: "user_002",
    name: "周沐晴",
    nickname: "南信云观测员",
    role: "数据可视化方向",
    summary: "关注气象数据展示、校园服务产品和信息可视化。",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    score: "4.7",
    level: 4,
    levelTitle: "活跃成员",
    tags: ["数据可视化", "气象应用", "竞赛展示"],
  },
  {
    id: "user_003",
    name: "姜栀",
    nickname: "风起南信",
    role: "产品与设计方向",
    summary: "专注校园产品策划、视觉设计和页面体验优化。",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    score: "4.6",
    level: 5,
    levelTitle: "社区主理人",
    tags: ["产品策划", "视觉体验", "社区运营"],
  },
];

export const currentUserProfile = {
  id: "user_001",
  userId: 1,
  name: "顾知远",
  nickname: "小顾同学",
  role: "南京信息工程大学学生 / 校园开发者",
  bio: "热爱前端开发、项目实践和竞赛交流，正在整理自己的校园个人主页与作品集。",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
  avatarUrl:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
  location: "中国 · 南京",
  website: "student.darksec.example/xiaogu",
  studentId: "202221048",
  studentNo: "202221048",
  phone: "13812345678",
  age: "21",
  major: "软件工程",
  grade: "2022级",
  college: "计算机学院",
  school: "南京信息工程大学",
  campus: "滨江楼 306",
  email: "xiaogu@nuist.edu.cn",
  level: 3,
  levelTitle: "校园新秀",
  roleCode: "USER",
  tags: ["前端开发", "项目实践", "竞赛交流", "校园社区"],
  stats: [
    { label: "收藏数", value: "18" },
    { label: "好友数", value: "27" },
    { label: "发布数", value: "9" },
    { label: "获赞数", value: "126" },
  ],
  favoriteArticleIds: ["article-1", "article-4", "article-6"],
  favoriteProjectIds: ["project-1", "project-3"],
  favoriteCompetitionIds: ["competition-1", "competition-3"],
  friendList: [
    {
      id: "friend-1",
      name: "周沐晴",
      nickname: "南信云观测员",
      level: "Lv.4",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      bio: "关注气象数据分析和可视化设计。",
      status: "在线",
      group: "竞赛组队",
      motto: "把复杂数据讲清楚，答辩就会更有说服力。",
    },
    {
      id: "friend-2",
      name: "姜栀",
      nickname: "风起南信",
      level: "Lv.5",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      bio: "擅长校园产品策划与页面视觉设计。",
      status: "在线",
      group: "产品搭子",
      motto: "先让同学看懂，再去追求高级感。",
    },
    {
      id: "friend-3",
      name: "顾言",
      nickname: "夜航者",
      level: "Lv.3",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
      bio: "喜欢网络安全与自动化脚本。",
      status: "离线",
      group: "实验室伙伴",
      motto: "离线也能随时回来一起排查问题。",
    },
  ],
  collectionGroups: [
    {
      title: "收藏文章",
      desc: "课程笔记、经验分享与社区内容沉淀。",
    },
    {
      title: "收藏项目",
      desc: "校园服务项目、实验室作品和课程设计案例。",
    },
    {
      title: "收藏竞赛",
      desc: "数学建模、挑战杯、互联网+ 等竞赛资料。",
    },
  ],
  settings: {
    notifyComments: true,
    notifyInvites: true,
    profileVisible: true,
    linkedAccount: "校园邮箱",
  },
};
