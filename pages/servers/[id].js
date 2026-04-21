import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import withAuth from "../../utils/withAuth";

function ServerPage() {
  const router = useRouter();
  const { id } = router.query;

  const [guild, setGuild] = useState(null);
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

    loadGuild();
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

          {/* Overview Content */}
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

        </div>
      </div>
    </div>
  );
}

export default withAuth(ServerPage);
