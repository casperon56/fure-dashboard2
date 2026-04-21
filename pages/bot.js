// ===============================
//  bot.js — نظام التحقق الكامل
// ===============================

const express = require("express");
const app = express();
app.use(express.json());

const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
});

// ===============================
//  POST /verifyUser
//  الموقع يرسل طلب للبوت للتحقق
// ===============================

app.post("/verifyUser", async (req, res) => {
  const { code, discordId, sessionId, type } = req.body;

  try {
    const user = await client.users.fetch(discordId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // رسالة حسب نوع التحقق
    let message = "";

    if (type === "exam") {
      message = `🚨 **محاولة دخول اختبار**\n\nالكود: **${code}**`;
    }

    if (type === "recruit") {
      message = `📋 **محاولة دخول شؤون التجنيد**`;
    }

    // أزرار التحقق
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`approve_${sessionId}`)
        .setLabel("✔️ نعم هذا أنا")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId(`deny_${sessionId}`)
        .setLabel("❌ ليس أنا")
        .setStyle(ButtonStyle.Danger)
    );

    // إرسال رسالة للمستخدم
    await user.send({
      content: `${message}\n\nهل أنت الشخص الذي يحاول الدخول الآن؟`,
      components: [row]
    });

    return res.json({ ok: true });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to send DM" });
  }
});

// ===============================
//  مستمع الأزرار
// ===============================

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  const [action, sessionId] = interaction.customId.split("_");

  if (action === "approve") {
    await interaction.reply({
      content: "✔️ تم التحقق بنجاح",
      ephemeral: true
    });

    // إرسال موافقة للموقع
    await fetch(process.env.SITE_URL + "/api/approveSession", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        discordId: interaction.user.id
      })
    });

  } else if (action === "deny") {
    await interaction.reply({
      content: "❌ تم رفض الدخول",
      ephemeral: true
    });
  }
});

// ===============================
//  GET /getUserInfo
//  الموقع يطلب بيانات المجند
// ===============================

app.get("/getUserInfo", async (req, res) => {
  const { discordId } = req.query;

  try {
    const guild = client.guilds.cache.get(process.env.MAIN_GUILD_ID);
    const member = await guild.members.fetch(discordId);

    const roles = member.roles.cache.map((r) => r.name);

    const sectors = ["الأمن العام", "العدل", "الدفاع", "المباحث", "وزارة الصحة", "القوات الخاصة"];
    const sector = roles.find((r) => sectors.includes(r)) || "غير معروف";

    const rank = roles.find((r) =>
      r.includes("جندي") ||
      r.includes("رقيب") ||
      r.includes("وكيل")
    ) || "غير معروف";

    return res.json({
      id: member.id,
      name: member.user.username,
      avatar: member.user.displayAvatarURL(),
      roles,
      sector,
      rank
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Failed to fetch user info" });
  }
});

// ===============================
//  تشغيل البوت + API
// ===============================

client.login(process.env.TOKEN);

app.listen(3001, () => {
  console.log("API Running on port 3001");
});
