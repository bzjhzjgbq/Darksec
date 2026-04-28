import { useState } from "react";
import { projectCategories, projectStatuses } from "../../data/mockProjects";
import Button from "../ui/Button";
import Card from "../ui/Card";

const initialState = {
  name: "",
  category: projectCategories[1] || "",
  status: projectStatuses[1] || "",
  summary: "",
  content: "",
  techStack: "",
  highlights: "",
  github: "",
  demo: "",
};

function FieldLabel({ title, hint }) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-800">{title}</p>
      {hint ? <p className="mt-1 text-xs leading-5 text-slate-500">{hint}</p> : null}
    </div>
  );
}

export default function PublishProjectForm() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
      <Card className="px-6 py-6 sm:px-7">
        <div className="border-b border-slate-100 pb-6">
          <p className="eyebrow">发布项目</p>
          <h1 className="mt-3 headline-lg">发布你的项目</h1>
          <p className="mt-3 body-md">
            当前为前端静态演示版本。你可以像在社区里发帖一样整理项目内容，提交后会展示成功反馈，但不会写入后端。
          </p>
        </div>

        <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <FieldLabel title="项目名称" hint="用清晰名称说明你的项目是做什么的" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="field"
                placeholder="例如：DarkBoard"
              />
            </label>

            <label className="space-y-2">
              <FieldLabel title="项目分类" />
              <select name="category" value={form.category} onChange={handleChange} className="field">
                {projectCategories.slice(1).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <FieldLabel title="项目状态" />
              <select name="status" value={form.status} onChange={handleChange} className="field">
                {projectStatuses.slice(1).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <FieldLabel title="技术栈" hint="多个技术栈可用逗号分隔" />
              <input
                name="techStack"
                value={form.techStack}
                onChange={handleChange}
                className="field"
                placeholder="React, Vite, Tailwind CSS"
              />
            </label>
          </div>

          <label className="space-y-2">
            <FieldLabel title="项目简介" hint="像帖子摘要一样，用一句话概括项目价值" />
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              rows="3"
              className="field"
              placeholder="用一句话说明你的项目主要解决什么问题"
            />
          </label>

          <label className="space-y-2">
            <FieldLabel title="完整介绍" hint="介绍背景、目标用户、当前进度和使用场景" />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="7"
              className="field"
              placeholder="描述项目背景、功能亮点和适用场景"
            />
          </label>

          <label className="space-y-2">
            <FieldLabel title="功能亮点" hint="建议每行填写一个亮点，便于后续展示" />
            <textarea
              name="highlights"
              value={form.highlights}
              onChange={handleChange}
              rows="4"
              className="field"
              placeholder={"每行一个亮点，例如：\n支持 SSR\n支持插件扩展"}
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <FieldLabel title="GitHub 链接" />
              <input
                name="github"
                value={form.github}
                onChange={handleChange}
                className="field"
                placeholder="https://github.com/your-project"
              />
            </label>

            <label className="space-y-2">
              <FieldLabel title="Demo 链接" />
              <input
                name="demo"
                value={form.demo}
                onChange={handleChange}
                className="field"
                placeholder="https://your-demo.com"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <p className="text-xs text-slate-500">当前为静态提交流程演示，不会真实写入后端。</p>
            <Button type="submit">提交项目</Button>
          </div>
        </form>

        {submitted ? (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            提交成功演示：你的项目信息已在前端完成静态提交流程，后续接入 API 后即可真实保存。
          </div>
        ) : null}
      </Card>

      <div className="space-y-4 xl:sticky xl:top-24 xl:self-start">
        <Card className="p-5">
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">发布建议</h2>
          <div className="mt-4 space-y-3 body-sm">
            <p>标题尽量直接，方便其他开发者快速判断项目方向。</p>
            <p>简介优先写清解决什么问题，而不是只堆砌技术名词。</p>
            <p>亮点建议拆成多条，便于详情页和列表页做重点展示。</p>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">当前流程</h2>
          <div className="mt-4 space-y-3 body-sm">
            <p>1. 填写项目信息</p>
            <p>2. 提交前端静态表单</p>
            <p>3. 展示成功反馈</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
