export const projectCategories = [
  "全部",
  "校园服务",
  "课程项目",
  "竞赛作品",
  "前端练习",
  "数据可视化",
];

export const projectStatuses = ["全部", "开发中", "已上线", "维护中", "已完成"];

export const projects = [
  {
    id: "project-1",
    name: "校园主页中心",
    category: "校园服务",
    status: "开发中",
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    summary: "围绕学生个人主页、收藏分类、好友与设置做统一的校园社区中枢页面。",
    content:
      "这个项目用于承载南京信息工程大学学生在社区中的个人信息、项目、文章和竞赛经历，强调清晰的信息结构与统一风格。",
    techStack: ["React", "Vite", "Tailwind CSS"],
    highlights: [
      "支持个人中心、收藏、好友、设置等模块",
      "欢迎页与社区主站分层展示",
      "预留后续接入真实后端的结构",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    ],
    author: {
      name: "小顾同学",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      bio: "热爱前端开发与校园社区产品设计。",
    },
    publishedAt: "2026-04-16",
    likes: 582,
    favorites: 214,
    views: 8921,
    github: "https://github.com/example/campus-home",
    demo: "https://demo.example.com/campus-home",
    comments: [],
    featured: true,
    members: 4,
  },
  {
    id: "project-2",
    name: "智慧气象可视化",
    category: "数据可视化",
    status: "已完成",
    cover:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
    summary: "面向校园科创展示的气象数据大屏，用于比赛答辩与实验室成果展示。",
    content:
      "整合温度、降水、风场等数据，做成便于老师和同学理解的气象展示界面。",
    techStack: ["React", "ECharts", "Node.js"],
    highlights: ["支持图表联动", "适合竞赛展示", "可扩展更多数据源"],
    screenshots: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    ],
    author: {
      name: "南信云观测员",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      bio: "关注数据可视化和气象信息表达。",
    },
    publishedAt: "2026-03-28",
    likes: 416,
    favorites: 163,
    views: 6430,
    github: "https://github.com/example/weather-lab",
    demo: "https://demo.example.com/weather-lab",
    comments: [],
    featured: true,
    members: 3,
  },
  {
    id: "project-3",
    name: "竞赛组队看板",
    category: "竞赛作品",
    status: "已上线",
    cover:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    summary: "帮助同学按方向、技能和时间快速组队，适用于挑战杯和互联网+。",
    content:
      "以卡片和标签形式展示队伍需求、技能要求和项目方向，方便校园内快速协作。",
    techStack: ["React", "Supabase", "Tailwind CSS"],
    highlights: ["组队需求可视化", "按方向筛选", "适合竞赛前期协作"],
    screenshots: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    ],
    author: {
      name: "风起南信",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      bio: "喜欢做校园产品与协作平台。",
    },
    publishedAt: "2026-03-21",
    likes: 733,
    favorites: 341,
    views: 12310,
    github: "https://github.com/example/team-board",
    demo: "https://demo.example.com/team-board",
    comments: [],
    featured: true,
    members: 5,
  },
  {
    id: "project-4",
    name: "课程笔记库",
    category: "课程项目",
    status: "维护中",
    cover:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    summary: "整理软件工程、计网、数据库等课程笔记，便于同学共同沉淀学习资料。",
    content:
      "支持按课程分类、按标签检索，并保留项目式笔记展示页。",
    techStack: ["React", "Markdown", "Node.js"],
    highlights: ["课程分类清晰", "支持全文搜索", "适合作为长期知识库"],
    screenshots: [],
    author: {
      name: "顾言",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
      bio: "关注学习资料整理与自动化工具。",
    },
    publishedAt: "2026-02-10",
    likes: 154,
    favorites: 57,
    views: 2408,
    github: "https://github.com/example/course-notes",
    demo: "https://demo.example.com/course-notes",
    comments: [],
    featured: false,
    members: 2,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
