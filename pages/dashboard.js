import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="h-screen bg-dark text-white flex flex-col">
      <Navbar />

      <div className="flex h-full">
        <Sidebar />

        <div className="flex-1 flex items-center justify-center text-4xl">
          Welcome to Fure Dashboard
        </div>
      </div>
    </div>
  );
}
