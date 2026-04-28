import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";

function MetaStat({ label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500">
      <span>{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <Card className="px-6 py-6 sm:px-7">
      <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-slate-950">{title}</h2>
      <div className="mt-5">{children}</div>
    </Card>
  );
}

export default function ProjectDetailContent({ project }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-6 sm:px-7">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <Badge>{project.category}</Badge>
              <Badge className="bg-white">{project.status}</Badge>
              <span>发布于 {project.publishedAt}</span>
            </div>

            <h1 className="mt-4 headline-lg">{project.name}</h1>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={project.author.avatar}
                  alt={project.author.name}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-200"
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">{project.author.name}</p>
                  <p className="text-xs text-slate-500">项目作者</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 md:ml-auto">
                <MetaStat label="点赞" value={project.likes} />
                <MetaStat label="收藏" value={project.favorites} />
                <MetaStat label="浏览" value={project.views} />
                <MetaStat label="评论" value={project.comments.length} />
              </div>
            </div>
          </div>

          <div className="px-6 py-6 sm:px-7">
            <img
              src={project.cover}
              alt={project.name}
              className="h-64 w-full rounded-2xl border border-slate-200 object-cover md:h-80"
            />
            <p className="mt-6 body-md">{project.content}</p>
          </div>
        </Card>

        <Section title="技术栈">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((item) => (
              <Badge key={item} className="text-sm">
                {item}
              </Badge>
            ))}
          </div>
        </Section>

        <Section title="功能亮点">
          <div className="space-y-3">
            {project.highlights.map((item, index) => (
              <div key={item} className="surface-soft flex gap-3 px-4 py-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                  {index + 1}
                </div>
                <p className="body-sm">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="项目截图">
          <div className="grid gap-4 md:grid-cols-2">
            {project.screenshots.length ? (
              project.screenshots.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={`${project.name} 截图`}
                  className="h-60 w-full rounded-2xl border border-slate-200 object-cover"
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                当前还没有上传项目截图。
              </div>
            )}
          </div>
        </Section>

        <Section title={`评论区（${project.comments.length}）`}>
          <div className="space-y-4">
            {project.comments.length ? (
              project.comments.map((comment) => (
                <div key={comment.id} className="surface-soft p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{comment.user}</p>
                      <p className="mt-1 text-xs text-slate-500">{comment.time}</p>
                    </div>
                    <Button variant="ghost" className="px-2 py-1 text-xs">
                      回复
                    </Button>
                  </div>
                  <p className="mt-3 body-sm">{comment.content}</p>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                暂无评论，欢迎第一个留下反馈。
              </div>
            )}

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <textarea
                rows="4"
                placeholder="写下你对这个项目的看法（当前为静态演示）"
                className="field resize-none"
              />
              <div className="mt-3 flex justify-end">
                <Button>发表评论</Button>
              </div>
            </div>
          </div>
        </Section>
      </div>

      <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
        <Card className="p-5">
          <p className="eyebrow">作者信息</p>
          <div className="mt-4 flex items-start gap-3">
            <img
              src={project.author.avatar}
              alt={project.author.name}
              className="h-14 w-14 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">
                {project.author.name}
              </h3>
              <p className="mt-2 body-sm">{project.author.bio}</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">项目信息</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between gap-3">
              <span>发布时间</span>
              <span className="font-medium text-slate-900">{project.publishedAt}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>项目状态</span>
              <span className="font-medium text-slate-900">{project.status}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>技术栈数量</span>
              <span className="font-medium text-slate-900">{project.techStack.length}</span>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">项目链接</h3>
          <div className="mt-4 grid gap-3">
            <a href={project.github} target="_blank" rel="noreferrer">
              <Button variant="secondary" className="w-full">
                GitHub 仓库
              </Button>
            </a>
            <a href={project.demo} target="_blank" rel="noreferrer">
              <Button className="w-full">在线 Demo</Button>
            </a>
          </div>
        </Card>
      </aside>
    </div>
  );
}
