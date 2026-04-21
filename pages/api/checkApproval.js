import { isApproved } from "./approveSession";

export default function handler(req, res) {
  const { sessionId, discordId } = req.query;

  const approved = isApproved(sessionId, discordId);

  return res.status(200).json({ approved });
}
