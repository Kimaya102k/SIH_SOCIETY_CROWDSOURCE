import { Router, type IRouter } from "express";
import { GetSummaryResponse } from "@workspace/api-zod";
import { challenges } from "./challenges";

const router: IRouter = Router();

router.get("/insights/summary", (_req, res) => {
  const summary = {
    activeChallenges: challenges.length,
    projectsInMotion: 18,
    peopleContributing: challenges.reduce(
      (total, challenge) => total + challenge.participants,
      0,
    ),
    partnerOrganizations: 28,
    solvedThisYear: 12,
  };
  res.json(GetSummaryResponse.parse(summary));
});

export default router;