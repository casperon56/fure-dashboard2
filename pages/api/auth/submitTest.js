// pages/api/auth/submitTest.js

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  // إرسال النتيجة للبوت
  await fetch(process.env.BOT_API_URL + "/submitTest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code })
  });

  return res.status(200).json({ success: true });
}
