export default async function handler(req, res) {
  const { discordId } = req.query;

  try {
    const response = await fetch(
      process.env.BOT_API_URL + `/getUserInfo?discordId=${discordId}`
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to fetch user info" });
  }
}
