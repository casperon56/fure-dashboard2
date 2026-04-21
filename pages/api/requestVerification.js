export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { code, discordId, sessionId } = req.body;

  await fetch(process.env.BOT_API_URL + "/verifyUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, discordId, sessionId })
  });

  return res.status(200).json({ ok: true });
}
