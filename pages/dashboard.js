import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import withAuth from "../utils/withAuth";

function Dashboard() {
  return (
    <div className="h-screen bg-dark text-white flex flex-col">
      <Navbar />

      <div className="flex h-full">
        <Sidebar />

        <div className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold text-gold mb-6">
            Fure Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-2 text-gold">
                Total Servers
              </h2>
              <p className="text-3xl font-bold">—</p>
              <p className="text-sm text-gray-400 mt-2">
                سيتم عرض عدد السيرفرات هنا لاحقًا.
              </p>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-2 text-gold">
                Active Users
              </h2>
              <p className="text-3xl font-bold">—</p>
              <p className="text-sm text-gray-400 mt-2">
                إحصائيات المستخدمين النشطين قادمة قريبًا.
              </p>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <h2 className="text-xl font-semibold mb-2 text-gold">
                Logs
              </h2>
              <p className="text-3xl font-bold">—</p>
              <p className="text-sm text-gray-400 mt-2">
                سيتم إضافة نظام اللوق هنا.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
