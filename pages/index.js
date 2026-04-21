import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="h-screen bg-dark text-white flex flex-col">
      <Navbar />

      <div className="flex h-full">
        <Sidebar />

        <div className="flex-1 p-10 text-3xl">
          <h1 className="text-gold font-bold mb-6">لوحة التحكم</h1>

          <p className="text-xl text-gray-300">
            مرحباً بك في نظام القوات المشتركة — اختر من القائمة الجانبية للبدء.
          </p>
        </div>
      </div>
    </div>
  );
}
