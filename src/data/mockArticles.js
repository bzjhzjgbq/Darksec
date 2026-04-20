export const articleCategories = ["全部", "前端工程", "后端架构", "产品实践", "开源协作", "AI 工程", "网络安全"];

export const articleTagGroups = {
  common: [
    "React",
    "Vite",
    "Tailwind CSS",
    "TypeScript",
    "Node.js",
    "Markdown",
    "性能优化",
    "设计系统",
    "开源",
    "AI",
  ],
  securityVulnerabilities: [
    "XSS",
    "SQL注入",
    "CSRF",
    "SSRF",
    "RCE",
    "文件上传",
    "命令执行",
    "越权",
    "目录穿越",
    "反序列化",
    "XXE",
    "点击劫持",
    "认证绕过",
    "权限提升",
    "信息泄露",
    "逻辑漏洞",
    "WebShell",
    "内网渗透",
    "横向移动",
    "供应链安全",
  ],
  securityTools: [
    "Burp Suite",
    "Nmap",
    "Wireshark",
    "Metasploit",
    "Nuclei",
    "Wazuh",
    "ELK",
    "Suricata",
    "Snort",
    "YARA",
    "Nessus",
    "OpenVAS",
    "Kali Linux",
    "Goby",
    "Fiddler",
    "Hydra",
    "Sqlmap",
  ],
  securityScenarios: [
    "渗透测试",
    "漏洞复现",
    "安全加固",
    "应急响应",
    "威胁情报",
    "蓝队",
    "红队",
    "溯源分析",
    "攻防演练",
    "安全运维",
    "入侵检测",
    "日志分析",
    "告警分析",
    "CTF",
    "靶场实战",
    "逆向分析",
    "二进制安全",
    "Web安全",
    "主机安全",
    "云安全",
    "容器安全",
    "零信任",
  ],
  technology: [
    "Linux",
    "Python",
    "Java",
    "PHP",
    "Docker",
    "Kubernetes",
    "FastAPI",
    "Vue",
    "React",
    "Spring Boot",
    "Nginx",
    "MySQL",
    "Redis",
  ],
};

export const articleTags = [...new Set(Object.values(articleTagGroups).flat())];

export const articles = [
  {
    id: "article-1",
    title: "用 React 和 Vite 搭建可维护的社区内容页",
    excerpt:
      "从路由、组件拆分、样式约定和 mock 数据四个角度，梳理一个技术社区前端页面如何保持清晰、稳定和易扩展。",
    author: "Aster Chen",
    role: "Frontend Engineer",
    readTime: "8 分钟",
    category: "前端工程",
    tags: ["React", "Vite", "设计系统"],
    publishedAt: "2026-04-12",
    views: 4280,
    likes: 356,
    comments: 48,
    recommended: true,
    content: `# 用 React 和 Vite 搭建可维护的社区内容页

一个社区内容页的难点通常不是页面能不能做出来，而是后续能不能持续添加内容、组件和交互。

## 页面边界

建议把页面拆成三个层次：

- \`pages\` 负责组织页面结构和状态
- \`components\` 负责稳定的 UI 单元
- \`data\` 负责 mock 数据和后续 API 替换入口

这样做的好处是，当内容结构变化时，不需要在每个页面里重复修改卡片、标签和统计信息。

## 一个列表筛选示例

\`\`\`jsx
const filteredArticles = articles.filter((article) => {
  const keyword = search.trim().toLowerCase();
  return article.title.toLowerCase().includes(keyword);
});
\`\`\`

## 设计约束

技术社区页面不需要过度装饰。清晰的标题、稳定的网格、克制的强调色和足够的留白，往往比复杂动效更耐看。
`,
  },
  {
    id: "article-2",
    title: "技术文章列表页的信息密度应该如何拿捏",
    excerpt:
      "文章卡片需要同时呈现标题、摘要、作者、标签和热度数据，但不能变成一张拥挤的数据表。",
    author: "Lin Yue",
    role: "Full-stack Developer",
    readTime: "6 分钟",
    category: "产品实践",
    tags: ["设计系统", "性能优化"],
    publishedAt: "2026-04-10",
    views: 3612,
    likes: 281,
    comments: 36,
    recommended: true,
    content: `# 技术文章列表页的信息密度应该如何拿捏

列表页是社区内容分发的入口。用户来到这里时，通常在快速判断三件事：

1. 这篇文章是不是我关心的方向
2. 作者是否可信
3. 文章是否值得打开阅读

## 卡片信息优先级

标题和摘要是第一优先级，分类与标签帮助建立上下文，阅读数、评论数和点赞数则提供社区反馈。

\`\`\`js
const score = article.views * 0.2 + article.likes * 2 + article.comments * 3;
\`\`\`

## 不要把卡片做得太满

信息密度要服务浏览效率。过多的徽章、图标和颜色会让用户失去视觉焦点。
`,
  },
  {
    id: "article-3",
    title: "Markdown 编辑体验里的几个关键细节",
    excerpt:
      "发布页不只是一个 textarea。摘要、分类、标签和草稿状态会直接影响作者是否愿意持续写作。",
    author: "Serein",
    role: "Product Engineer",
    readTime: "10 分钟",
    category: "产品实践",
    tags: ["Markdown", "开源", "设计系统"],
    publishedAt: "2026-04-08",
    views: 5190,
    likes: 402,
    comments: 64,
    recommended: true,
    content: `# Markdown 编辑体验里的几个关键细节

写作工具需要给作者确定感。一个简洁的发布页，至少应该让作者知道内容是否完整、草稿是否保存、发布后会展示成什么样子。

## 草稿优先

保存草稿不是复杂功能，但它能明显降低写作压力。

\`\`\`js
localStorage.setItem("darksec_article_draft", JSON.stringify(form));
\`\`\`

## 预览不是必须，但结构要稳定

如果暂时不做实时预览，也要保证 Markdown 最终在详情页里有稳定的排版、代码高亮和复制按钮。
`,
  },
  {
    id: "article-4",
    title: "从 mock 数据到真实 API：前端模块如何预留替换空间",
    excerpt:
      "在没有后端的阶段，可以用接近真实接口形态的 mock 数据支撑页面开发，减少后续接入 API 的返工。",
    author: "Echo Xu",
    role: "Frontend Engineer",
    readTime: "7 分钟",
    category: "前端工程",
    tags: ["React", "Node.js"],
    publishedAt: "2026-04-06",
    views: 2974,
    likes: 214,
    comments: 29,
    recommended: false,
    content: `# 从 mock 数据到真实 API：前端模块如何预留替换空间

mock 数据不应该只是临时填字。字段结构越接近后端接口，后续替换成本越低。

## 字段建议

- \`id\`: 稳定路由参数
- \`title\`: 标题
- \`excerpt\`: 列表摘要
- \`content\`: Markdown 正文
- \`tags\`: 标签数组
- \`stats\`: 阅读、评论、点赞等反馈数据

## 接入 API 时

可以先把 \`data\` 层替换为 service，再逐步处理加载态、错误态和分页参数。
`,
  },
  {
    id: "article-5",
    title: "代码块复制按钮为什么能提升阅读体验",
    excerpt:
      "技术文章里的代码通常承担行动入口。复制按钮、语法高亮和稳定的行距能让读者更快进入实践。",
    author: "Nina Gu",
    role: "Developer Advocate",
    readTime: "5 分钟",
    category: "开源协作",
    tags: ["开源", "Markdown"],
    publishedAt: "2026-04-04",
    views: 2230,
    likes: 176,
    comments: 21,
    recommended: false,
    content: `# 代码块复制按钮为什么能提升阅读体验

读者阅读技术文章时，经常会在解释和实践之间来回切换。代码块如果能直接复制，就能减少很多低价值操作。

\`\`\`bash
npm install react-markdown remark-gfm rehype-highlight
npm run dev
\`\`\`

## 细节

复制按钮应该足够明显，但不应该抢走正文注意力。放在代码块右上角通常是比较稳妥的选择。
`,
  },
  {
    id: "article-6",
    title: "社区文章详情页的右侧目录怎么设计才不打扰",
    excerpt:
      "目录适合辅助长文阅读，但需要保持克制。它应该帮助定位，而不是制造额外的视觉噪音。",
    author: "Lin Yue",
    role: "Full-stack Developer",
    readTime: "9 分钟",
    category: "AI 工程",
    tags: ["AI", "设计系统"],
    publishedAt: "2026-04-02",
    views: 3348,
    likes: 245,
    comments: 33,
    recommended: false,
    content: `# 社区文章详情页的右侧目录怎么设计才不打扰

右侧目录适合中长篇技术文章。它的价值在于让读者理解文章结构，并快速跳到某个小节。

## 目录来源

最简单的方式是从 Markdown 文本里提取二级和三级标题。

\`\`\`js
const headings = markdown
  .split("\\n")
  .filter((line) => /^#{2,3}\\s+/.test(line));
\`\`\`

## 视觉风格

目录不需要很重的边框和背景，保持轻量列表即可。当前阅读位置高亮可以后续再补。
`,
  },
  {
    id: "article-7",
    title: "一次 XSS 漏洞复现到安全加固的完整记录",
    excerpt:
      "围绕输入过滤、输出编码、Cookie 策略和前端框架默认防护，复盘一个适合技术社区讨论的 Web 安全案例。",
    author: "Moss Zhang",
    role: "Security Engineer",
    readTime: "11 分钟",
    category: "网络安全",
    tags: ["Web安全", "XSS", "漏洞复现", "安全加固", "Burp Suite"],
    publishedAt: "2026-04-14",
    views: 3860,
    likes: 312,
    comments: 52,
    recommended: true,
    content: `# 一次 XSS 漏洞复现到安全加固的完整记录

XSS 的核心并不只是脚本执行，而是用户输入、页面渲染和浏览器安全策略之间的边界失守。

## 复现思路

先确认输入点是否会进入页面，再观察输出位置是在 HTML、属性、脚本还是 URL 上下文中。

\`\`\`html
<img src=x onerror="alert(document.domain)" />
\`\`\`

## 加固建议

- 对不同输出上下文使用对应编码策略
- 开启 HttpOnly、SameSite 等 Cookie 防护
- 使用 CSP 降低脚本注入后的影响面
- 保留复现样本，方便后续回归测试

## 工具链

Burp Suite 适合观察请求链路，浏览器 DevTools 适合定位渲染位置。真正有效的修复需要同时覆盖前端、后端和安全配置。
`,
  },
  {
    id: "article-8",
    title: "用 Nmap 和日志分析做一次轻量级入侵排查",
    excerpt:
      "从端口暴露、服务指纹、登录日志和告警线索入手，梳理一次偏蓝队视角的主机安全排查流程。",
    author: "Rin Tao",
    role: "Blue Team Analyst",
    readTime: "12 分钟",
    category: "网络安全",
    tags: ["Nmap", "Linux", "入侵检测", "日志分析", "蓝队", "主机安全"],
    publishedAt: "2026-04-13",
    views: 3424,
    likes: 268,
    comments: 41,
    recommended: false,
    content: `# 用 Nmap 和日志分析做一次轻量级入侵排查

入侵排查不一定从复杂平台开始。对于小团队来说，先把资产暴露面、关键日志和异常行为串起来，已经能发现很多问题。

## 端口与服务

\`\`\`bash
nmap -sV -Pn 192.168.1.10
sudo journalctl -u ssh --since "24 hours ago"
grep "Failed password" /var/log/auth.log
\`\`\`

## 排查重点

- 是否出现异常开放端口
- 是否存在高频失败登录
- 是否有未知用户或计划任务
- 是否出现可疑外联行为

## 后续动作

确认风险后，应先保留证据，再隔离资产、更新凭据、修补暴露服务，并把排查规则沉淀到安全运维流程中。
`,
  },
];
