import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="h-screen bg-dark text-white">
      <Navbar />

      <div className="flex items-center justify-center h-full text-4xl">
        Welcome to Fure Dashboard
      </div>
    </div>
  );
}
