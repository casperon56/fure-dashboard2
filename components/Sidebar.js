import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-[#0f0f0f] text-white p-6">
      <h2 className="text-2xl font-bold mb-8 text-gold">Menu</h2>

      <ul className="space-y-4 text-lg">
        <li className="hover:text-gold cursor-pointer">
          <Link href="/dashboard">Dashboard</Link>
        </li>

        <li className="hover:text-gold cursor-pointer">
          <Link href="/servers">Servers</Link>
        </li>

        <li className="hover:text-gold cursor-pointer">
          <Link href="/bot">Bot Settings</Link>
        </li>

        <li className="hover:text-gold cursor-pointer">
          <Link href="/account">Account</Link>
        </li>
      </ul>
    </div>
  );
}
