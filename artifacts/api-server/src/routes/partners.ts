import { Router, type IRouter } from "express";
import { ListPartnersQueryParams } from "@workspace/api-zod";

const partners = [
  {
    id: 1,
    name: "CEPT University",
    type: "University",
    focus: "Urban design & climate",
    location: "Ahmedabad, India",
    openProjects: 4,
    initials: "CU",
    color: "orange",
  },
  {
    id: 2,
    name: "Mahindra Rise",
    type: "Industry",
    focus: "Mobility & manufacturing",
    location: "Mumbai, India",
    openProjects: 2,
    initials: "MR",
    color: "blue",
  },
  {
    id: 3,
    name: "IISER Pune",
    type: "University",
    focus: "Science & public health",
    location: "Pune, India",
    openProjects: 3,
    initials: "IP",
    color: "green",
  },
  {
    id: 4,
    name: "Wipro",
    type: "Industry",
    focus: "Digital public infrastructure",
    location: "Bengaluru, India",
    openProjects: 5,
    initials: "WI",
    color: "purple",
  },
  {
    id: 5,
    name: "University of Mysore",
    type: "University",
    focus: "Rural futures & livelihoods",
    location: "Mysuru, India",
    openProjects: 2,
    initials: "UM",
    color: "teal",
  },
];

const router: IRouter = Router();

router.get("/partners", (req, res) => {
  const parsed = ListPartnersQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid partner filter" });
    return;
  }
  const { type } = parsed.data;
  res.json(type ? partners.filter((partner) => partner.type === type) : partners);
});

export default router;