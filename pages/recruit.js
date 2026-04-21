import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Recruit() {
  const [discordId, setDiscordId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [approved, setApproved] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const startVerification = async () => {
    if (!discordId) {
      alert("الرجاء إدخال Discord ID");
      return;
    }

    const newSession = Math.random().toString(36).substring(2, 10);
    setSessionId(newSession);
    setWaiting(true);

    // إرسال طلب للبوت
    await fetch("/api/requestVerification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        discordId,
        sessionId: newSession,
        type: "recruit"
      })
    });

    // الانتظار حتى يوافق البوت
    const interval = setInterval(async () => {
      const res = await fetch(`/api/checkApproval?sessionId=${newSession}&discordId=${discordId}`);
      const data = await res.json();

      if (data.approved) {
        clearInterval(interval);
        setApproved(true);
        setWaiting(false);

        // جلب بيانات المجند
        const infoRes = await fetch(`/api/getUserInfo?discordId=${discordId}`);
        const info = await infoRes.json();
        setUserInfo(info);
      }
    }, 2000);
  };

  return (
    <div className="h-screen bg-dark text-white flex flex-col">
      <Navbar />

      <div className="flex h-full">
        <Sidebar />

        <div className="flex-1 p-10 text-2xl">
          <h1 className="text-gold font-bold mb-6">شؤون التجنيد</h1>

          {/* خطوة التحقق */}
          {!approved && (
            <div className="space-y-4">
              <input
                placeholder="أدخل Discord ID"
                value={discordId}
                onChange={(e) => setDiscordId(e.target.value)}
                className="w-full p-3 rounded bg-gray-800"
              />

              <button
                onClick={startVerification}
                className="px-6 py-3 bg-gold text-black font-bold rounded hover:bg-yellow-500"
              >
                بدء التحقق
              </button>

              {waiting && <p className="text-gray-300">بانتظار موافقة البوت...</p>}
            </div>
          )}

          {/* بيانات المجند بعد الموافقة */}
          {approved && userInfo && (
            <div className="mt-10 bg-gray-900 p-6 rounded-xl shadow-lg w-[450px]">
              <div className="flex items-center space-x-4">
                <img
                  src={userInfo.avatar}
                  alt="avatar"
                  className="w-20 h-20 rounded-full"
                />

                <div>
                  <h2 className="text-2xl font-bold">{userInfo.name}</h2>
                  <p className="text-gold text-lg">ID: {userInfo.id}</p>
                </div>
              </div>

              <div className="mt-6 text-xl space-y-2">
                <p>
                  <span className="text-gold">الرتبة:</span> {userInfo.rank}
                </p>
                <p>
                  <span className="text-gold">القطاع:</span> {userInfo.sector}
                </p>
                <p>
                  <span className="text-gold">جميع الرتب:</span> {userInfo.roles.join(", ")}
                </p>
              </div>

              <p className="mt-6 text-green-400 text-xl font-bold">
                ✔️ تم التحقق — يمكنك الآن متابعة إجراءات التجنيد
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
