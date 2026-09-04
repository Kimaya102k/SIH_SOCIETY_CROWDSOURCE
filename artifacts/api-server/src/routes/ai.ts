import { Router, type IRouter } from "express";
import { FrameChallengeWithAiBody, FrameChallengeWithAiResponse } from "@workspace/api-zod";

const router: IRouter = Router();

function localFrame(rawIdea: string, context?: string) {
  const cleaned = rawIdea.trim().replace(/\s+/g, " ");
  const title = cleaned.length > 72
    ? `${cleaned.slice(0, 69).replace(/[,.!?]$/, "")}...`
    : cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  return {
    title,
    framing: `How might we work with the people most affected by ${cleaned.toLowerCase()} to test a practical, measurable response${context ? ` in ${context}` : ""}?`,
    outcomes: [
      "A clearer definition of the people and systems affected",
      "One small pilot that can be tested with a local partner",
      "A shared measure of progress that communities can understand",
    ],
    tags: ["community-led", "pilot-ready", "cross-sector"],
    suggestedPartners: ["Local university research team", "Civic organization", "Mission-aligned industry partner"],
  };
}

async function openAiFrame(rawIdea: string, context?: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return localFrame(rawIdea, context);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a civic innovation facilitator. Return JSON with title, framing, outcomes (3 short strings), tags (3 short strings), suggestedPartners (3 short strings). Make the challenge community-centered, specific, and testable.",
          },
          {
            role: "user",
            content: `Raw idea: ${rawIdea}\nContext: ${context ?? "Not provided"}`,
          },
        ],
      }),
    });
    if (!response.ok) return localFrame(rawIdea, context);
    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) return localFrame(rawIdea, context);
    return JSON.parse(content) as ReturnType<typeof localFrame>;
  } catch {
    return localFrame(rawIdea, context);
  }
}

router.post("/ai/frame-challenge", async (req, res) => {
  const parsed = FrameChallengeWithAiBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Tell us a little more about the challenge first" });
    return;
  }
  const result = await openAiFrame(parsed.data.rawIdea, parsed.data.context);
  res.json(FrameChallengeWithAiResponse.parse(result));
});

export default router;