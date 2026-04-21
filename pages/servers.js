import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import withAuth from "../../utils/withAuth";

function ServerPage() {
  const router = useRouter();
  const { id } = router.query;

  const [guild, setGuild] = useState(null);

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
          <div className="flex items-center space-x-6">
            <img src={icon} className="w-20 h-20 rounded-full" />
            <h1 className="text-4xl font-bold text-gold">{guild.name}</h1>
          </div>

          <p className="mt-6 text-xl text-gray-300">
            إعدادات السيرفر ستظهر هنا قريبًا...
          </p>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ServerPage);
