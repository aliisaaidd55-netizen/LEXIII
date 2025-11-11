'use client';

import { useState } from 'react';
import { PRICES } from './config';

function App() {
  const [service, setService] = useState<'Photobooth' | '360 Video'>('Photobooth');
  const [hours, setHours] = useState<2 | 4 | 6 | 8>(2);
  const [extras, setExtras] = useState<string[]>([]);
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const hoursPricing = PRICES.hours;
  const extraPrice = PRICES.extra;
  const extrasCount = extras.length;
  const extrasTotal = extrasCount * extraPrice;
  const totalPrice = hoursPricing[hours] + extrasTotal;

  const toggleExtra = (extra: string) => {
    setExtras(prev =>
      prev.includes(extra)
        ? prev.filter(e => e !== extra)
        : [...prev, extra]
    );
  };

  // الحل النهائي: no-cors + لا تنتظر الرد
  const handleBookNow = async () => {
    const extrasText = extras.length > 0 ? extras.join(', ') : 'None';
    const hoursLabel = hours === 8 ? 'Full Event (up to 8 Hours)' : `${hours} Hours`;

    const payload = {
      name: customerName,
      phone: customerPhone,
      eventType: eventType,
      eventDate: eventDate,
      service: service,
      hours: hoursLabel,
      extras: extras.join(', '),
      totalPrice: totalPrice
    };

    try {
      // إرسال بدون انتظار (no-cors)
      fetch('https://script.google.com/macros/s/AKfycbx-_jU7XTOKwlt-dHIC7qF-DEnf-NmPlDBmpik67zTyCefYenquBDSkqp2Ob515TYA0/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // واتساب فورًا
      const message = `Hello LEXICON EVENT.%0AI want to book a service.%0A%0A` +
        `Service: ${service}%0A` +
        `Hours: ${hoursLabel}%0A` +
        `Extras: ${extrasText}%0A` +
        `Event Type: ${eventType}%0A` +
        `Event Date: ${eventDate}%0A` +
        `Name: ${customerName}%0A` +
        `Phone: ${customerPhone}%0A%0A` +
        `Total Price: ${totalPrice} EGP`;

      window.open(`https://wa.me/201200972525?text=${message}`, '_blank');

    } catch (error) {
      // حتى لو في إيرور → واتساب يشتغل
      const message = `Hello LEXICON EVENT.%0AI want to book a service.%0A%0A` +
        `Service: ${service}%0A` +
        `Hours: ${hoursLabel}%0A` +
        `Extras: ${extrasText}%0A` +
        `Event Type: ${eventType}%0A` +
        `Event Date: ${eventDate}%0A` +
        `Name: ${customerName}%0A` +
        `Phone: ${customerPhone}%0A%0A` +
        `Total Price: ${totalPrice} EGP`;
      window.open(`https://wa.me/201200972525?text=${message}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/background.jpg')`,
          filter: 'brightness(0.7) blur(1px)',
        }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="px-8 py-6 relative">
          <div className="absolute top-2 left-4 z-10">
            <img
              src="/LEXICON.png"
              alt="LEXICON Logo"
              className="w-12 h-12 rounded-lg object-contain bg-white/90 backdrop-blur-sm shadow-xl p-1"
            />
          </div>
          <div className="flex justify-center">
            <h1 className="bg-white/90 text-[#5f8a62] font-bold text-2xl px-6 py-2 rounded-xl shadow-md">
              LEXICON EVENT
            </h1>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/30">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Book Your Event</h2>
                  <p className="text-gray-600 text-sm">Make Your memories with Mood!</p>
                </div>

                {/* باقي الكود زي ما هو... (Service, Duration, Extras, etc.) */}
                {/* مش هكرره هنا عشان المساحة، بس كله موجود في الكود الأصلي */}

                <div className="pt-4 border-t border-gray-200">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">Base Price: </span>
                    <span className="font-medium">{hoursPricing[hours]} EGP</span>
                  </div>
                  {extrasTotal > 0 && (
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">Extras ({extrasCount} × {extraPrice}): </span>
                      <span className="font-medium text-[#5f8a62]">+{extrasTotal} EGP</span>
                    </div>
                  )}
                  <div className="mb-4 border-t border-gray-300 pt-2">
                    <span className="text-lg text-gray-700">Total Price: </span>
                    <span className="text-2xl font-bold text-[#5f8a62]">{totalPrice} EGP</span>
                  </div>
                  <button
                    onClick={handleBookNow}
                    className="w-full bg-[#5f8a62] hover:bg-[#4d7250] text-white font-medium py-3 rounded-lg transition-all"
                  >
                    Book Now via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;