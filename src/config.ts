// config.ts - كل الأسعار هنا، عدّل براحتك!

export const PRICES = {
  // أسعار الساعات
  hours: {
    2: 3000,
    4: 4500,
    6: 6000,
    8: 8500,
  } as const,

  // سعر كل إضافة (Extra)
  extra: 500,
} as const;