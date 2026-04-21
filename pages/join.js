import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Join() {
  const [step, setStep] = useState("verify"); // verify → test → result
  const [code, setCode] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [waiting, setWaiting] = useState(false);

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [score, setScore] = useState(null);

  const questions = [
    { id: 1, question: "ما هو مفهوم الانضباط العسكري؟",
      options: ["الالتزام بالأوامر والتعليمات","الراحة أثناء العمل","التصرف بدون الرجوع للقائد","التأخر عن المهام"],
      correct: "الالتزام بالأوامر والتعليمات"
    },
    { id: 2, question: "كيف تتصرف عند مواجهة أمر طارئ؟",
      options: ["إبلاغ القائد فورًا","تجاهل الموقف","الانسحاب من المكان","انتظار شخص آخر يتصرف"],
      correct: "إبلاغ القائد فورًا"
    },
    { id: 3, question: "لماذا ترغب بالانضمام للقوات المشتركة؟",
      options: ["خدمة الوطن","الحصول على رتبة فقط","التجربة","لا أعرف"],
      correct: "خدمة الوطن"
    },
    { id: 4, question: "ما هو التصرف الصحيح عند سماع نداء طارئ؟",
      options: ["التوجه فورًا","إكمال الراحة","تجاهل النداء","الانسحاب"],
      correct: "التوجه فورًا"
    },
    { id: 5, question: "ما هو أهم عنصر في العمل العسكري؟",
      options: ["الانضباط","الفوضى","التأخير","الراحة"],
      correct: "الانضباط"
    },
    { id: 6, question: "كيف تتعامل مع أوامر القائد؟",
      options: ["تنفيذها فورًا","رفضها","تأجيلها","التفاوض عليها"],
      correct: "تنفيذها فورًا"
    },
    { id: 7, question: "ما هو التصرف الصحيح عند حدوث مشكلة؟",
      options: ["إبلاغ المسؤول","إخفاء المشكلة","ترك المكان","انتظار شخص آخر"],
      correct: "إبلاغ المسؤول"
    },
    { id: 8, question: "ما هو معنى العمل الجماعي؟",
      options: ["التعاون","العمل الفردي","التجاهل","الانسحاب"],
      correct: "التعاون"
    },
    { id: 9, question: "كيف تتصرف إذا رأيت خطأ؟",
      options: ["إبلاغ القائد","تجاهله","المشاركة فيه","الضحك"],
      correct: "إبلاغ القائد"
    },
    { id: 10, question: "ما هو أهم سلوك في القوات المشتركة؟",
      options: ["الاحترام","الفوضى","التأخير","التجاهل"],
      correct: "الاحترام"
    }
  ];

  // المؤقت
  useEffect(() => {
    if (step !== "test" || submitted) return;

    if (timeLeft <= 0) {
      submitTest();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, step, submitted]);

  // بدء التحقق
  const startVerification = async () => {
    if (!code || !discordId) {
      alert("الرجاء إدخال الكود و Discord ID");
      return;
    }

    const newSession = Math.random().toString(36).substring(2, 10);
    setSessionId(newSession);
    setWaiting(true);

    await fetch("/api/requestVerification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        discordId,
        sessionId: newSession,
        type: "exam"
      })
    });

    // الانتظار حتى يوافق البوت
    const interval = setInterval(async () => {
      const res = await fetch(`/api/checkApproval?sessionId=${newSession}&discordId=${discordId}`);
      const data = await res.json();

      if (data.approved) {
        clearInterval(interval);
        setWaiting(false);
        setStep("test");
      }
    }, 2000);
  };

  const handleSelect = (id, option) => {
    setAnswers({ ...answers, [id]: option });
  };

  const submitTest = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) correctCount++;
    });

    const finalScore = correctCount * 2;
    setScore(finalScore);
    setSubmitted(true);
    setStep("result");
  };

  return (
    <div className="h-screen bg-dark text-white flex flex-col">
      <Navbar />

      <div className="flex h-full">
        <Sidebar />

        <div className="flex-1 p-10 text-2xl">
          <h1 className="text-gold font-bold mb-6">الانضمام للقوات المشتركة</h1>

          {/* خطوة التحقق */}
          {step === "verify" && (
            <div className="space-y-4">
              <input
                placeholder="أدخل الكود"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-3 rounded bg-gray-800"
              />

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

          {/* الاختبار */}
          {step === "test" && (
            <>
              <h3 className="text-xl mb-4">
                الوقت المتبقي: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </h3>

              {questions.map((q) => (
                <div key={q.id} className="mb-6">
                  <h3 className="text-xl mb-2">{q.question}</h3>

                  {q.options.map((opt) => (
                    <label key={opt} className="block text-lg cursor-pointer">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        onChange={() => handleSelect(q.id, opt)}
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              ))}

              <button
                onClick={submitTest}
                className="mt-4 px-6 py-3 bg-gold text-black font-bold rounded hover:bg-yellow-500"
              >
                إرسال الاختبار
              </button>
            </>
          )}

          {/* النتيجة */}
          {step === "result" && (
            <div className="mt-6">
              <h2 className="text-3xl">نتيجتك: {score} / 20</h2>

              {score >= 12 ? (
                <h2 className="text-green-400 text-3xl mt-4">✔️ ناجح</h2>
              ) : (
                <h2 className="text-red-400 text-3xl mt-4">❌ راسب</h2>
              )}

              <p className="mt-4 text-xl">إذا كنت ناجحًا، توجه إلى شؤون التجنيد للتفعيل.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
