// utils/sectorConfig.js

// يربط ID الرتبة باسم القطاع
export const sectorFromRole = {
  "ROLE_ID_AMN": "AMN", // الأمن العام
  "ROLE_ID_FE": "FE",   // الاستخبارات
  "ROLE_ID_MOD": "MOD", // الدفاع
  "ROLE_ID_MOI": "MOI"  // الداخلية
};

// بادئة الأكواد لكل قطاع
export const sectorPrefixes = {
  AMN: "A",
  FE: "T",
  MOD: "D",
  MOI: "M"
};

// اسم/مسار اختبار كل قطاع (نستخدمه لاحقًا)
export const sectorTests = {
  AMN: "security-test",
  FE: "intel-test",
  MOD: "defense-test",
  MOI: "interior-test"
};
