export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { code, discordId, sessionId, type } = req.body;

  try {
    await fetch(process.env.BOT_API_URL + "/verifyUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        discordId,
        sessionId,
        type
      })
    });

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to send request to bot" });
  }
}
