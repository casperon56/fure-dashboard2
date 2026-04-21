import axios from "axios";

export default async function handler(req, res) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const response = await axios.get("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: token,
      },
    });

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch guilds", details: err.message });
  }
}
