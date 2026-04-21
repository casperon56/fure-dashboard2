import { useState, useEffect } from "react";

export default function CharacterTest() {
  const [code, setCode] = useState("");
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // قراءة الكود من الرابط
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const c = urlParams.get("code");
    if (!c) {
      setLoading(false);
      return;
    }

    setCode(c);

    // التحقق من صحة الكود من API
    fetch(`/api/auth/verifyCode?code=${c}`)
      .then((res) => res.json())
      .then((data) => {
        setValid(data.valid);
        setLoading(false);
      });
  }, []);

  // إرسال نتيجة الاختبار
  const submitTest = async () => {
    setSubmitted(true);

    await fetch("/api/auth/submitTest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    alert("تم إرسال اختبارك بنجاح، سيتم التواصل معك قريبًا.");
  };

  if (loading) return <h2>جاري التحقق من الكود...</h2>;

  if (!valid)
    return (
      <h2 style={{ color: "red" }}>
        ❌ الكود غير صالح أو منتهي — تواصل مع الإدارة
      </h2>
    );

  return (
    <div style={{ padding: "30px" }}>
      <h1>اختبار القبول العسكري</h1>
      <p>الكود الخاص بك: {code}</p>

      <div style={{ marginTop: "20px" }}>
        <h3>السؤال 1:</h3>
        <p>ما هو مفهوم الانضباط العسكري؟</p>

        <h3>السؤال 2:</h3>
        <p>كيف تتصرف عند مواجهة أمر طارئ؟</p>

        <h3>السؤال 3:</h3>
        <p>لماذا ترغب بالانضمام للقوات المشتركة؟</p>
      </div>

      {!submitted ? (
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
      ) : (
        <h3 style={{ color: "green" }}>✔️ تم إرسال الاختبار</h3>
      )}
    </div>
  );
}
