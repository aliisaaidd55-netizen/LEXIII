// src/config.ts
export const PRICES = {
  // أسعار الساعات لخدمة واحدة
  hours: {
    2: 3000,
    4: 4500,
    6: 6000,
    8: 8500
  } as const,

  // سعر كل إضافة
  extra: 500,

  // زيادة 500 جنيه لكل ساعتين لو اختار الخدمتين
  dualServicePerTwoHours: 500
} as const;