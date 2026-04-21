let approvedSessions = {};

export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { sessionId, discordId } = req.body;

  approvedSessions[sessionId] = discordId;

  return res.status(200).json({ ok: true });
}

export function isApproved(sessionId, discordId) {
  return approvedSessions[sessionId] === discordId;
}
