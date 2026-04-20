import {
  competitionFilterGroups,
  competitionResourceLinks,
  competitionTips,
  competitions,
} from "../data/mockCompetitions";

export async function getCompetitionCatalog() {
  return competitions;
}

export async function getCompetitionById(competitionId) {
  return competitions.find((item) => item.id === competitionId) ?? null;
}

export async function getCompetitionFilters() {
  return competitionFilterGroups;
}

export async function getCompetitionResources() {
  return competitionResourceLinks;
}

export async function getCompetitionTips() {
  return competitionTips;
}
