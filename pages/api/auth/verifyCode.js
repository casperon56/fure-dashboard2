// pages/api/auth/verifyCode.js

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ valid: false });
  }

  // تحقق من وجود الكود في قاعدة البيانات (لاحقًا نربطه)
  // الآن نخليه دائمًا صحيح للتجربة
  return res.status(200).json({ valid: true });
}
