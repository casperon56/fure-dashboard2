import { useState, useEffect } from "react";

export default function CharacterTest() {
  const [code, setCode] = useState("");
  const [valid, setValid] = useState(true); // نخليه دائمًا صحيح
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 دقائق
  const [score, setScore] = useState(null);

  // الأسئلة
  const questions = [
    {
      id: 1,
      question: "ما هو مفهوم الانضباط العسكري؟",
      options: [
        "الالتزام بالأوامر والتعليمات",
        "الراحة أثناء العمل",
        "التصرف بدون الرجوع للقائد",
        "التأخر عن المهام"
      ],
      correct: "الالتزام بالأوامر والتعليمات"
    },
    {
      id: 2,
      question: "كيف تتصرف عند مواجهة أمر طارئ؟",
      options: [
        "إبلاغ القائد فورًا",
        "تجاهل الموقف",
        "الانسحاب من المكان",
        "انتظار شخص آخر يتصرف"
      ],
      correct: "إبلاغ القائد فورًا"
    },
    {
      id: 3,
      question: "لماذا ترغب بالانضمام للقوات المشتركة؟",
      options: ["خدمة الوطن", "الحصول على رتبة فقط", "التجربة", "لا أعرف"],
      correct: "خدمة الوطن"
    },
    {
      id: 4,
      question: "ما هو التصرف الصحيح عند سماع نداء طارئ؟",
      options: ["التوجه فورًا", "إكمال الراحة", "تجاهل النداء", "الانسحاب"],
      correct: "التوجه فورًا"
    },
    {
      id: 5,
      question: "ما هو أهم عنصر في العمل العسكري؟",
      options: ["الانضباط", "الفوضى", "التأخير", "الراحة"],
      correct: "الانضباط"
    },
    {
      id: 6,
      question: "كيف تتعامل مع أوامر القائد؟",
      options: ["تنفيذها فورًا", "رفضها", "تأجيلها", "التفاوض عليها"],
      correct: "تنفيذها فورًا"
    },
    {
      id: 7,
      question: "ما هو التصرف الصحيح عند حدوث مشكلة؟",
      options: ["إبلاغ المسؤول", "إخفاء المشكلة", "ترك المكان", "انتظار شخص آخر"],
      correct: "إبلاغ المسؤول"
    },
    {
      id: 8,
      question: "ما هو معنى العمل الجماعي؟",
      options: ["التعاون", "العمل الفردي", "التجاهل", "الانسحاب"],
      correct: "التعاون"
    },
    {
      id: 9,
      question: "كيف تتصرف إذا رأيت خطأ؟",
      options: ["إبلاغ القائد", "تجاهله", "المشاركة فيه", "الضحك"],
      correct: "إبلاغ القائد"
    },
    {
      id: 10,
      question: "ما هو أهم سلوك في القوات المشتركة؟",
      options: ["الاحترام", "الفوضى", "التأخير", "التجاهل"],
      correct: "الاحترام"
    }
  ];

  // المؤقت
  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      submitTest();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, submitted]);

  // حفظ الإجابات
  const handleSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  // إرسال الاختبار
  const submitTest = () => {
    if (submitted) return;

    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) correctCount++;
    });

    const finalScore = correctCount * 2; // كل سؤال درجتان
    setScore(finalScore);
    setSubmitted(true);
  };

  if (!valid)
    return <h2 style={{ color: "red" }}>❌ الكود غير صالح</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>اختبار القبول العسكري</h1>

      <h3>الوقت المتبقي: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</h3>

      {!submitted ? (
        <>
          {questions.map((q) => (
            <div key={q.id} style={{ marginTop: "20px" }}>
              <h3>{q.question}</h3>

              {q.options.map((opt) => (
                <div key={opt}>
                  <label>
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={opt}
                      onChange={() => handleSelect(q.id, opt)}
                    />
                    {" "}
                    {opt}
                  </label>
                </div>
              ))}
            </div>
          ))}

          <button
            onClick={submitTest}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#00ff9d",
              border: "none",
              cursor: "pointer",
            }}
          >
            إرسال الاختبار
          </button>
        </>
      ) : (
        <>
          <h2>نتيجتك: {score} / 20</h2>
          {score >= 12 ? (
            <h2 style={{ color: "green" }}>✔️ ناجح</h2>
          ) : (
            <h2 style={{ color: "red" }}>❌ راسب</h2>
          )}
        </>
      )}
    </div>
  );
}
