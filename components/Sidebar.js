export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="title">القوات المشتركة</h2>

      <ul className="menu">
        <li>الصفحة الرئيسية</li>
        <li>نظام التقارير</li>
        <li>شؤون التجنيد</li>
        <li>القيادة العليا</li>
        <li>رئاسة الوزراء</li>
      </ul>

      <h3 className="section">الوزارات</h3>
      <ul className="menu">
        <li>وزارة الداخلية</li>
        <li>وزارة الدفاع</li>
        <li>النيابة العامة</li>
      </ul>

      <h3 className="section">القوانين</h3>
      <ul className="menu">
        <li>القوانين العسكرية العامة</li>
        <li>الدورات العسكرية</li>
      </ul>

      <h3 className="section">وصول سريع</h3>
      <ul className="menu">
        <li>الانضمام للقوات المشتركة</li>
        <li>بوابة المستجدين</li>
        <li>تعميمات القوات المشتركة</li>
        <li>تواصل القوات المشتركة</li>
        <li>الديسكورد العسكري</li>
        <li>الديسكورد الأساسي</li>
      </ul>

      <style jsx>{`
        .sidebar {
          width: 260px;
          background: #0f0f0f;
          color: white;
          height: 100vh;
          padding: 20px;
          border-left: 2px solid #222;
          overflow-y: auto;
        }
        .title {
          font-size: 22px;
          margin-bottom: 20px;
          font-weight: bold;
        }
        .menu {
          padding: 0;
          margin: 0 0 20px 0;
        }
        .menu li {
          list-style: none;
          padding: 10px 0;
          cursor: pointer;
          transition: 0.2s;
          border-bottom: 1px solid #1a1a1a;
        }
        .menu li:hover {
          color: #00ff9d;
        }
        .section {
          margin-top: 10px;
          font-size: 14px;
          opacity: 0.6;
          border-bottom: 1px solid #333;
          padding-bottom: 5px;
        }
      `}</style>
    </div>
  );
}
