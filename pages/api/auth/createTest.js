// pages/api/auth/createTest.js

import { sectorPrefixes, sectorTests } from "../../../utils/sectorConfig";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { discordId, sector } = req.body;

  if (!discordId || !sector)
    return res.status(400).json({ error: "Missing data" });

  // توليد الكود حسب القطاع
  const prefix = sectorPrefixes[sector];
  if (!prefix) return res.status(400).json({ error: "Invalid sector" });

  const part1 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const part2 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const code = `${prefix}-${part1}-${part2}`;

  // إرسال الطلب للبوت (API خاص بالبوت)
  await fetch(process.env.BOT_API_URL + "/createTest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ discordId, sector, code })
  });

  return res.status(200).json({ code });
}
