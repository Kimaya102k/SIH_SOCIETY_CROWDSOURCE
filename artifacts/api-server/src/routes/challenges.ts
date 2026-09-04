import { Router, type IRouter } from "express";
import {
  CreateChallengeBody,
  GetChallengeParams,
  JoinChallengeBody,
  JoinChallengeParams,
  ListChallengesQueryParams,
} from "@workspace/api-zod";

export type Challenge = {
  id: number;
  title: string;
  summary: string;
  category: string;
  location: string;
  status: string;
  impact: string;
  participants: number;
  partners: string[];
  timeLeft: string;
  createdBy: string;
  createdAt: string;
};

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Making heatwaves safer for older adults",
    summary:
      "Design neighborhood-level support systems that help older residents stay cool, connected, and safe during extreme heat.",
    category: "Climate resilience",
    location: "Ahmedabad, India",
    status: "Open for collaborators",
    impact: "18,000 residents",
    participants: 42,
    partners: ["CEPT University", "Mahindra Rise"],
    timeLeft: "12 days left",
    createdBy: "Ahmedabad Municipal Lab",
    createdAt: "2026-08-21",
  },
  {
    id: 2,
    title: "Unlocking first jobs for rural graduates",
    summary:
      "Build a trusted bridge between rural university talent and employers who need emerging skills beyond major cities.",
    category: "Future of work",
    location: "Mysuru, India",
    status: "Team forming",
    impact: "4,500 graduates",
    participants: 27,
    partners: ["University of Mysore", "Wipro"],
    timeLeft: "19 days left",
    createdBy: "Rural Futures Collective",
    createdAt: "2026-08-18",
  },
  {
    id: 3,
    title: "Cleaner last-mile delivery in dense neighborhoods",
    summary:
      "Co-create an affordable, low-emission delivery model with street vendors, logistics operators, and local researchers.",
    category: "Clean mobility",
    location: "Pune, India",
    status: "Early research",
    impact: "120,000 trips / year",
    participants: 18,
    partners: ["IISER Pune", "Dunzo"],
    timeLeft: "26 days left",
    createdBy: "Pune Mobility Forum",
    createdAt: "2026-08-11",
  },
  {
    id: 4,
    title: "Reducing food waste across campus cafeterias",
    summary:
      "Help student communities and food operators measure, prevent, and redistribute surplus meals without adding operational friction.",
    category: "Food systems",
    location: "Bengaluru, India",
    status: "Open for collaborators",
    impact: "32 cafeterias",
    participants: 31,
    partners: ["IIM Bangalore", "ITC Foods"],
    timeLeft: "8 days left",
    createdBy: "Campus Commons",
    createdAt: "2026-08-25",
  },
];

const router: IRouter = Router();

router.get("/challenges", (req, res) => {
  const parsed = ListChallengesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid challenge filters" });
    return;
  }

  const { category, status } = parsed.data;
  const filtered = challenges.filter(
    (challenge) =>
      (!category || challenge.category === category) &&
      (!status || challenge.status === status),
  );
  res.json(filtered);
});

router.post("/challenges", (req, res) => {
  const parsed = CreateChallengeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Please complete all challenge fields" });
    return;
  }

  const challenge: Challenge = {
    id: Math.max(...challenges.map((item) => item.id)) + 1,
    title: parsed.data.title,
    summary: parsed.data.summary,
    category: parsed.data.category,
    location: parsed.data.location,
    impact: parsed.data.impact,
    status: "Open for collaborators",
    participants: 1,
    partners: [],
    timeLeft: "30 days left",
    createdBy: parsed.data.createdBy ?? "Community member",
    createdAt: new Date().toISOString().slice(0, 10),
  };
  challenges.unshift(challenge);
  res.status(201).json(challenge);
});

router.get("/challenges/:challengeId", (req, res) => {
  const parsed = GetChallengeParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid challenge id" });
    return;
  }

  const challenge = challenges.find((item) => item.id === parsed.data.challengeId);
  if (!challenge) {
    res.status(404).json({ error: "Challenge not found" });
    return;
  }
  res.json(challenge);
});

router.post("/challenges/:challengeId", (req, res) => {
  const params = JoinChallengeParams.safeParse(req.params);
  const body = JoinChallengeBody.safeParse(req.body ?? {});
  if (!params.success || !body.success) {
    res.status(400).json({ error: "Invalid participation details" });
    return;
  }

  const challenge = challenges.find((item) => item.id === params.data.challengeId);
  if (!challenge) {
    res.status(404).json({ error: "Challenge not found" });
    return;
  }
  challenge.participants += 1;
  if (!challenge.partners.includes("New collaborator")) {
    challenge.partners.push("New collaborator");
  }
  res.json(challenge);
});

export { challenges };
export default router;