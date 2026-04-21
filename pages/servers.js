import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import withAuth from "../utils/withAuth";

function Servers() {
  const [guilds, setGuilds] = useState([]);

  useEffect(() => {
    async function loadGuilds() {
      const token = localStorage.getItem("discord_token");

      if (!token) return;

      const res = await fetch("/api/auth/guilds", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setGuilds(data);
    }

    loadGuilds();
  }, []);

  return (
    <div className="h-screen bg-dark text-white flex flex-col">
      <Navbar />

      <div className="flex h-full">
        <Sidebar />

        <div className="flex-1 p-10 text-3xl">
          <h1 className="text-gold font-bold mb-6">Your Servers</h1>

          {guilds.length === 0 ? (
            <p className="text-xl text-gray-300">Loading servers...</p>
          ) : (
            <ul className="space-y-4 text-xl">
              {guilds.map((g) => {
                const icon = g.icon
                  ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`
                  : "https://cdn.discordapp.com/embed/avatars/1.png";

                return (
                  <li
                    key={g.id}
                    onClick={() => (window.location.href = `/servers/${g.id}`)}
                    className="flex items-center space-x-4 hover:text-gold cursor-pointer"
                  >
                    <img
                      src={icon}
                      alt={g.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <span>{g.name}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(Servers);
