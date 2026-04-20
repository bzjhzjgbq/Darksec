export default function CompetitionResources({ resources }) {
  return (
    <section>
      <div className="border-b border-[#41524a] pb-3">
        <p className="text-sm font-semibold text-[#eef5f0]">璧勬枡鍏ュ彛</p>
      </div>

      <div className="mt-3 space-y-3">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.href}
            target="_blank"
            rel="noreferrer"
            className="block text-sm text-[#9cc5af] transition hover:text-[#dff1e8]"
          >
            {resource.label}
          </a>
        ))}
      </div>
    </section>
  );
}
