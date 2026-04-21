import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    if (token) {
      localStorage.setItem("discord_token", token);
      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-dark text-white">
      <h1 className="text-4xl mb-6 text-gold">Fure Login</h1>

      <a
        href="/api/auth/discord"
        className="bg-gold text-black px-6 py-3 rounded-lg text-xl font-bold hover:bg-yellow-400 transition"
      >
        Login with Discord
      </a>
    </div>
  );
}
