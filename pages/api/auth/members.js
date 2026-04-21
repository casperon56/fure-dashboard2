export default async function handler(req, res) {
  const { id } = req.query;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${id}/members?limit=1000`,
      {
        headers: {
          Authorization: `Bot ${process.env.BOT_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch members" });
  }
}
