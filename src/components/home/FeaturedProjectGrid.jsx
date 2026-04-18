import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Badge from "../ui/Badge";

export default function FeaturedProjectGrid({ projects }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      {projects.slice(0, 1).map((project) => (
        <motion.div
          key={project.id}
          whileHover={reduceMotion ? undefined : { y: -5 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to={`/projects/${project.id}`}
            className="group surface card-motion block overflow-hidden"
          >
            <img
              src={project.cover}
              alt={project.name}
              className="card-media h-72 w-full object-cover object-center"
            />
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <Badge>{project.category}</Badge>
                <span>{project.publishedAt}</span>
                <span>•</span>
                <span>{project.status}</span>
              </div>
              <h3 className="mt-4 text-[28px] font-semibold tracking-[-0.04em] text-slate-950 transition duration-200 group-hover:text-slate-700">
                {project.name}
              </h3>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">{project.summary}</p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
                <div className="flex items-center gap-3">
                  <img
                    src={project.author.avatar}
                    alt={project.author.name}
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <p className="font-medium text-slate-700">{project.author.name}</p>
                    <p className="text-xs text-slate-500">Project Author</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span>赞 {project.likes}</span>
                  <span>藏 {project.favorites}</span>
                  <span>看 {project.views}</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}

      <div className="grid gap-4">
        {projects.slice(1).map((project) => (
          <motion.div
            key={project.id}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={`/projects/${project.id}`}
              className="group surface card-motion block p-5"
            >
              <div className="flex items-start gap-4">
                <img
                  src={project.cover}
                  alt={project.name}
                  className="card-media h-24 w-28 rounded-2xl border border-slate-200 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <Badge>{project.category}</Badge>
                    <span>{project.publishedAt}</span>
                  </div>
                  <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.03em] text-slate-950 transition duration-200 group-hover:text-slate-700">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{project.summary}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span>{project.author.name}</span>
                    <span>{project.likes} 赞</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
