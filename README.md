# DevSphere

> 面向开发者的社区平台  
> 发布项目 · 分享文章 · 建立影响力

---

## 📌 项目简介

DevSphere 是一个开发者社区网站，专注于为开发者、学生和技术爱好者提供内容交流与作品展示平台。

用户可以在平台中：

- 发布自己的项目作品
- 浏览社区优秀项目
- 分享技术文章
- 收藏与点赞内容
- 建立个人主页与技术影响力
- 参与社区交流与互动

当前阶段目标：

> 优先完成高质量前端页面设计，再逐步补齐功能模块与后端系统。

---

## ✨ 核心功能

### 已规划模块

- 首页（社区展示页）
- 项目中心（浏览 / 发布 / 项目详情）
- 文章中心（浏览 / 发布 / 文章详情）
- 用户中心（个人主页 / 收藏 / 点赞记录）
- 登录 / 注册系统
- 评论 / 点赞 / 收藏系统
- 通知系统（后续）

---

## 🖼 页面预览

（后续可在这里放截图）

- 首页
- 项目页
- 文章页
- 用户中心
- 登录页

---

## 🛠 技术栈

### 前端

- React
- Vite
- Tailwind CSS
- React Router

### 后续计划（后端）

- Node.js / Express  
或
- Flask

### 数据库

- MySQL

### 其他

- GitHub（团队协作）
- GitHub Actions（后续 CI/CD）

---

## 📂 项目结构

```text
devsphere/
├── public/                # 静态资源
├── src/
│   ├── assets/            # 图片 / 图标
│   ├── components/        # 公共组件
│   ├── layouts/           # 布局组件
│   ├── pages/             # 页面组件
│   ├── data/              # mock 数据
│   ├── router/            # 路由配置
│   ├── hooks/             # 自定义 hooks
│   ├── utils/             # 工具函数
│   ├── App.jsx
│   └── main.jsx
├── README.md
├── package.json
└── vite.config.js

---

## 🚀 本地运行

### 1. 克隆仓库

```bash
git clone https://github.com/bzjhzjgbq/devsphere.git
cd devsphere
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发环境

```bash
npm run dev
```

### 4. 打包项目

```bash
npm run build
```

---

## 🌿 Git 分支规范

```text
main        稳定版本
dev         开发主分支
feature/*   功能开发分支
fix/*       Bug 修复分支
hotfix/*    紧急修复分支
```

---

## 🔁 团队开发流程

### 开发前

```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-task-name
```

### 开发完成后提交

```bash
git add .
git commit -m "feat: complete your task"
git push -u origin feature/your-task-name
```

### Pull Request

```text
feature/* → dev
```

### 发布正式版本

```text
dev → main
```

---

## 📝 Commit 提交规范

### feat（新功能）

```text
feat: add project detail page
```

### fix（修复 bug）

```text
fix: resolve navbar overlap
```

### style（样式优化）

```text
style: improve project card spacing
```

### refactor（重构）

```text
refactor: split homepage components
```

### docs（文档修改）

```text
docs: update README
```

---

## 🎨 UI 设计规范

### 风格参考

* GitHub
* Linear
* Notion
* Vercel

### 主色

```text
#0F172A
```

### 强调色

```text
#14B8A6
```

### 背景色

```text
#F8FAFC
```

### 设计原则

* 内容优先
* 简洁高级
* 现代感
* 卡片式布局
* 清晰层级
* 响应式适配

---

## 📅 当前开发计划

### 第一阶段（当前）

* [x] GitHub 仓库搭建
* [x] main / dev 分支建立
* [ ] 首页 UI 完成
* [ ] 项目页 UI 完成
* [ ] 用户中心 UI 完成
* [ ] 文章页 UI 完成

### 第二阶段

* [ ] 登录注册
* [ ] 发布项目
* [ ] 发布文章

### 第三阶段

* [ ] 评论系统
* [ ] 点赞收藏
* [ ] 通知系统

---

## 👥 团队协作规则

* 禁止直接 push main
* 所有功能通过 PR 合并
* 保持代码风格统一
* 提交前本地自测
* 遇到问题及时沟通
* 页面风格保持一致

---

## 🌟 项目愿景

> 打造一个属于开发者的内容社区，让优秀作品被看见，让技术分享更有价值。

---

## 📮 联系方式

（后续补充）

---

## ⭐ Star Support

如果你喜欢这个项目，欢迎点一个 Star ⭐

---

```
```
