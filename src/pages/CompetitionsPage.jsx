import { useEffect, useMemo, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import PageReveal from "../components/motion/PageReveal";
import CompetitionFilterPanel from "../components/competition/CompetitionFilterPanel";
import CompetitionList from "../components/competition/CompetitionList";
import CompetitionResources from "../components/competition/CompetitionResources";
import CompetitionSearchBar from "../components/competition/CompetitionSearchBar";
import CompetitionTipsPanel from "../components/competition/CompetitionTipsPanel";
import RecentCompetitions from "../components/competition/RecentCompetitions";
import {
  getCompetitionCatalog,
  getCompetitionFilters,
  getCompetitionResources,
  getCompetitionTips,
} from "../api/competitionApi";

const defaultFilters = {
  level: "鍏ㄩ儴",
  category: "鍏ㄩ儴",
  status: "鍏ㄩ儴",
  audience: "鍏ㄩ儴",
  source: "鍏ㄩ儴",
};

function sortByDeadline(items) {
  return [...items].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
}

export default function CompetitionsPage() {
  const [catalog, setCatalog] = useState([]);
  const [filterGroups, setFilterGroups] = useState([]);
  const [resources, setResources] = useState([]);
  const [tips, setTips] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [query, setQuery] = useState("");
  const [highlightedId, setHighlightedId] = useState("");

  useEffect(() => {
    async function load() {
      const [catalogData, filterData, resourceData, tipData] = await Promise.all([
        getCompetitionCatalog(),
        getCompetitionFilters(),
        getCompetitionResources(),
        getCompetitionTips(),
      ]);

      setCatalog(catalogData);
      setFilterGroups(filterData);
      setResources(resourceData);
      setTips(tipData);
    }

    load();
  }, []);

  const filteredCompetitions = useMemo(() => {
    return sortByDeadline(
      catalog.filter((competition) => {
        const queryText = query.trim().toLowerCase();
        const matchesQuery =
          !queryText ||
          [
            competition.title,
            competition.organizer,
            competition.department,
            competition.summary,
            competition.tags.join(" "),
          ]
            .join(" ")
            .toLowerCase()
            .includes(queryText);

        const matchesLevel =
          filters.level === "鍏ㄩ儴" || competition.level === filters.level;
        const matchesCategory =
          filters.category === "鍏ㄩ儴" || competition.category === filters.category;
        const matchesStatus =
          filters.status === "鍏ㄩ儴" || competition.status === filters.status;
        const matchesAudience =
          filters.audience === "鍏ㄩ儴" || competition.audience === filters.audience;
        const matchesSource =
          filters.source === "鍏ㄩ儴" || competition.sourceTags.includes(filters.source);

        return (
          matchesQuery &&
          matchesLevel &&
          matchesCategory &&
          matchesStatus &&
          matchesAudience &&
          matchesSource
        );
      }),
    );
  }, [catalog, filters, query]);

  const recentCompetitions = useMemo(() => {
    return sortByDeadline(
      catalog.filter((competition) =>
        ["鎶ュ悕涓?, "鍗冲皢寮€濮?, "杩涜涓?].includes(competition.status),
      ),
    ).slice(0, 6);
  }, [catalog]);

  useEffect(() => {
    if (!highlightedId) return;

    const node = document.getElementById(`competition-${highlightedId}`);
    if (!node) return;

    node.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [highlightedId, filteredCompetitions]);

  function handleFilterChange(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
    setHighlightedId("");
  }

  function handleClearSearch() {
    setQuery("");
    setHighlightedId("");
  }

  function handleRecentSelect(competitionId) {
    setFilters(defaultFilters);
    setQuery("");
    setHighlightedId(competitionId);
  }

  function getOptionCount(groupKey, option) {
    if (option === "鍏ㄩ儴") {
      return catalog.length;
    }

    return catalog.filter((competition) => {
      if (groupKey === "source") {
        return competition.sourceTags.includes(option);
      }

      return competition[groupKey] === option;
    }).length;
  }

  return (
    <PageReveal>
      <section className="min-h-[calc(100vh-76px)] bg-[#161d1a] text-white">
        <PageContainer className="grid gap-0 lg:grid-cols-[240px_minmax(0,1fr)_280px]">
          <div className="hidden border-r border-[#2b3531] bg-[#141b18] lg:block">
            <div className="competition-scrollbar sticky top-[76px] max-h-[calc(100vh-76px)] overflow-y-auto px-4 py-8">
              <CompetitionFilterPanel
                groups={filterGroups}
                filters={filters}
                onChange={handleFilterChange}
                getOptionCount={getOptionCount}
              />
            </div>
          </div>

          <div className="min-w-0 bg-[#181f1c] px-4 py-6 sm:px-6 lg:px-8">
            <CompetitionSearchBar
              query={query}
              resultCount={filteredCompetitions.length}
              onQueryChange={setQuery}
              onClear={handleClearSearch}
            />

            <div className="border-b border-[#2b3531] py-4 text-sm text-[#93a59c]">
              褰撳墠灞曠ず {filteredCompetitions.length} 椤圭珵璧涳紝鏀寔鎸夌骇鍒€佺被鍒€佺姸鎬併€侀潰鍚戝璞″拰鏉ユ簮绛涢€夈€?            </div>

            <div className="bg-[#181f1c]">
              <CompetitionList
                competitions={filteredCompetitions}
                highlightedId={highlightedId}
              />
            </div>
          </div>

          <div className="border-l border-[#2b3531] bg-[#171e1b] px-4 py-6 sm:px-5">
            <RecentCompetitions competitions={recentCompetitions} onSelect={handleRecentSelect} />
            <div className="mt-5">
              <CompetitionTipsPanel tips={tips} />
            </div>
            <div className="mt-5 border-t border-[#31403a] pt-5">
              <CompetitionResources resources={resources} />
            </div>
          </div>
        </PageContainer>
      </section>
    </PageReveal>
  );
}
