import axios from "axios";

export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  try {
    const data = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI,
    });

    const tokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      data,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const access_token = tokenResponse.data.access_token;

    // نرجّع التوكن للواجهة
    return res.redirect(`/login?token=${access_token}`);
  } catch (err) {
    return res.status(500).json({
      error: "OAuth failed",
      details: err.message,
    });
  }
}
