import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import withAuth from "../../utils/withAuth";

function ServerPage() {
  const router = useRouter();
  const { id } = router.query;

  const [guild, setGuild] = useState(null);
  const [guildMembers, setGuildMembers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    async function loadGuild() {
      const token = localStorage.getItem("discord_token");
      if (!token || !id) return;

      const res = await fetch("/api/auth/guilds", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const found = data.find((g) => g.id === id);
      setGuild(found);
    }

    async function loadMembers() {
      const token = localStorage.getItem("discord_token");
      if (!token || !id) return;

      const res = await fetch(`/api/auth/members?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setGuildMembers(data);
    }

    loadGuild();
    loadMembers();
  }, [id]);

  if (!guild) {
    return (
      <div className="h-screen bg-dark text-white flex items-center justify-center text-3xl">
        Loading server...
      </div>
    );
  }

  const icon = guild.icon
    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
    : "https://cdn.discordapp.com/embed/avatars/1.png";

  return (
    <div className="h-screen bg-dark text-white flex flex-col">
      <Navbar />

      <div className="flex h-full">
        <Sidebar />

        <div className="flex-1 p-10">

          {/* Header */}
          <div className="flex items-center space-x-6 mb-8">
            <img src={icon} className="w-20 h-20 rounded-full" />
            <h1 className="text-4xl font-bold text-gold">{guild.name}</h1>
          </div>

          {/* Tabs */}
          <div className="flex space-x-6 border-b border-gray-700 pb-3 mb-8 text-xl">
            <button
              onClick={() => setTab("overview")}
              className={`transition ${tab === "overview" ? "text-gold" : "hover:text-gold"}`}
            >
              Overview
            </button>

            <button
              onClick={() => setTab("members")}
              className={`transition ${tab === "members" ? "text-gold" : "hover:text-gold"}`}
            >
              Members
            </button>

            <button
              onClick={() => setTab("logs")}
              className={`transition ${tab === "logs" ? "text-gold" : "hover:text-gold"}`}
            >
              Logs
            </button>

            <button
              onClick={() => setTab("settings")}
              className={`transition ${tab === "settings" ? "text-gold" : "hover:text-gold"}`}
            >
              Settings
            </button>
          </div>

          {/* Overview */}
          {tab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Server ID */}
              <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
                <h2 className="text-xl font-semibold text-gold mb-2">Server ID</h2>
                <div className="flex items-center justify-between">
                  <p className="text-lg">{guild.id}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(guild.id)}
                    className="bg-gold text-black px-4 py-1 rounded-lg font-bold hover:bg-yellow-400"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Members */}
              <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
                <h2 className="text-xl font-semibold text-gold mb-2">Members</h2>
                <p className="text-3xl font-bold">—</p>
                <p className="text-sm text-gray-400 mt-2">سيتم جلب عدد الأعضاء لاحقًا.</p>
              </div>

              {/* Bots */}
              <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
                <h2 className="text-xl font-semibold text-gold mb-2">Bots</h2>
                <p className="text-3xl font-bold">—</p>
                <p className="text-sm text-gray-400 mt-2">سيتم جلب عدد البوتات لاحقًا.</p>
              </div>

              {/* Boost Level */}
              <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
                <h2 className="text-xl font-semibold text-gold mb-2">Boost Level</h2>
                <p className="text-3xl font-bold">—</p>
                <p className="text-sm text-gray-400 mt-2">سيتم عرض مستوى البوست لاحقًا.</p>
              </div>

            </div>
          )}

          {/* Members */}
          {tab === "members" && (
            <div>
              <h2 className="text-2xl font-bold text-gold mb-6">Members</h2>

              {guildMembers.length === 0 ? (
                <p className="text-gray-400">Loading members...</p>
              ) : (
                <ul className="space-y-4">
                  {guildMembers.map((m) => {
                    const avatar = m.user.avatar
                      ? `https://cdn.discordapp.com/avatars/${m.user.id}/${m.user.avatar}.png`
                      : "https://cdn.discordapp.com/embed/avatars/1.png";

                    return (
                      <li
                        key={m.user.id}
                        className="flex items-center justify-between bg-[#111] border border-gray-800 p-4 rounded-xl"
                      >
                        <div className="flex items-center space-x-4">
                          <img src={avatar} className="w-12 h-12 rounded-full" />
                          <div>
                            <p className="text-lg font-semibold">{m.user.username}</p>
                            <p className="text-gray-400 text-sm">{m.user.id}</p>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={() => navigator.clipboard.writeText(m.user.id)}
                            className="bg-gold text-black px-4 py-1 rounded-lg font-bold hover:bg-yellow-400"
                          >
                            Copy ID
                          </button>

                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(
                                `الكود العسكري: ${m.user.username} | ${m.user.id}`
                              )
                            }
                            className="bg-blue-600 px-4 py-1 rounded-lg font-bold hover:bg-blue-500"
                          >
                            Military Code
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}

          {/* Logs */}
          {tab === "logs" && (
            <div>
              <h2 className="text-2xl font-bold text-gold mb-6">Server Logs</h2>

              {logs.length === 0 ? (
                <div className="bg-[#111] border border-gray-800 p-6 rounded-xl text-gray-400 text-lg">
                  لا توجد سجلات لعرضها حالياً.
                  <br />
                  <span className="text-sm text-gray-500">
                    (سيتم إضافة نظام اللوق لاحقًا وربطه بقاعدة البيانات)
                  </span>
                </div>
              ) : (
                <ul className="space-y-4">
                  {logs.map((log, index) => (
                    <li
                      key={index}
                      className="bg-[#111] border border-gray-800 p-4 rounded-xl"
                    >
                      <p className="text-gold font-semibold">{log.action}</p>
                      <p className="text-gray-400 text-sm">{log.timestamp}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default withAuth(ServerPage);
