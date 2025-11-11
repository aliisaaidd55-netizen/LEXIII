'use client';

import { useState } from 'react';
import { PRICES } from './config';

function App() {
  // الآن services هي array (يمكن اختيار أكتر من واحد)
  const [services, setServices] = useState<string[]>(['Photobooth']);
  const [hours, setHours] = useState<2 | 4 | 6 | 8>(2);
  const [extras, setExtras] = useState<string[]>([]);
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const hoursPricing = PRICES.hours;
  const extraPrice = PRICES.extra;
  const dualIncrease = PRICES.dualServicePerTwoHours;

  // حساب عدد الخدمات المختارة
  const isDualService = services.length === 2;

  // حساب الزيادة لو اختار الخدمتين
  const dualExtra = isDualService ? Math.ceil(hours / 2) * dualIncrease : 0;

  // السعر الأساسي + الإضافات + زيادة الخدمتين
  const extrasTotal = extras.length * extraPrice;
  const totalPrice = hoursPricing[hours] + extrasTotal + dualExtra;

  const toggleService = (service: string) => {
    setServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const toggleExtra = (extra: string) => {
    setExtras(prev =>
      prev.includes(extra)
        ? prev.filter(e => e !== extra)
        : [...prev, extra]
    );
  };

  const handleBookNow = () => {
    const servicesText = services.length > 0 ? services.join(' + ') : 'None';
    const extrasText = extras.length > 0 ? extras.join(', ') : 'None';
    const hoursLabel = hours === 8 ? 'Full Event (up to 8 Hours)' : `${hours} Hours`;

    const message = `Hello LEXICON EVENT.%0AI want to book a service.%0A%0A` +
      `Service: ${servicesText}%0A` +
      `Hours: ${hoursLabel}%0A` +
      `Extras: ${extrasText}%0A` +
      `Event Type: ${eventType}%0A` +
      `Event Date: ${eventDate}%0A` +
      `Name: ${customerName}%0A` +
      `Phone: ${customerPhone}%0A%0A` +
      `Total Price: ${totalPrice} EGP`;

    window.open(`https://wa.me/201200972525?text=${message}`, '_blank');
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
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Book Your Event
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Make Your memories with Mood!
                  </p>
                </div>

                {/* Service Type - تشيك بوكس */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Service Type
                  </label>
                  <div className="space-y-2">
                    <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      services.includes('Photobooth') ? 'border-[#5f8a62] bg-green-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="checkbox"
                        checked={services.includes('Photobooth')}
                        onChange={() => toggleService('Photobooth')}
                        className="w-4 h-4 text-[#5f8a62]"
                      />
                      <span className="ml-3 font-medium text-gray-900">Photobooth</span>
                    </label>

                    <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      services.includes('360 Video') ? 'border-[#5f8a62] bg-green-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="checkbox"
                        checked={services.includes('360 Video')}
                        onChange={() => toggleService('360 Video')}
                        className="w-4 h-4 text-[#5f8a62]"
                      />
                      <span className="ml-3 font-medium text-gray-900">360 Video</span>
                    </label>
                  </div>
                  {isDualService && (
                    <p className="text-xs text-amber-600 mt-2">
                      * اخترت الخدمتين: +{dualExtra} EGP (500 جنيه لكل ساعتين)
                    </p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Duration
                  </label>
                  <div className="space-y-2">
                    {[2, 4, 6, 8].map((h) => (
                      <label key={h} className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        hours === h ? 'border-[#5f8a62] bg-green-50' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="hours"
                            value={h}
                            checked={hours === h}
                            onChange={() => setHours(h as 2 | 4 | 6 | 8)}
                            className="w-4 h-4 text-[#5f8a62]"
                          />
                          <span className="ml-3 font-medium text-gray-900">
                            {h === 8 ? 'Full Event (up to 8 Hours)' : `${h} Hours`}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-[#5f8a62]">{hoursPricing[h]} EGP</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Extras */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Extras
                  </label>
                  <div className="space-y-2">
                    <label className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      extras.includes('Audio Record') ? 'border-[#5f8a62] bg-green-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={extras.includes('Audio Record')}
                          onChange={() => toggleExtra('Audio Record')}
                          className="w-4 h-4 text-[#5f8a62]"
                        />
                        <span className="ml-3 font-medium text-gray-900">Audio Record</span>
                      </div>
                      <span className="text-sm font-bold text-[#5f8a62]">+{extraPrice} EGP</span>
                    </label>

                    <label className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      extras.includes('Wish Book') ? 'border-[#5f8a62] bg-green-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={extras.includes('Wish Book')}
                          onChange={() => toggleExtra('Wish Book')}
                          className="w-4 h-4 text-[#5f8a62]"
                        />
                        <span className="ml-3 font-medium text-gray-900">Wish Book</span>
                      </div>
                      <span className="text-sm font-bold text-[#5f8a62]">+{extraPrice} EGP</span>
                    </label>
                  </div>
                </div>

                {/* Event Type & Date */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#5f8a62] focus:outline-none transition-colors"
                    >
                      <option value="">Select Event Type</option>
                      <option value="event">Event</option>
                      <option value="party">Party</option>
                      <option value="wedding">Wedding</option>
                      <option value="engagement">Engagement</option>
                      <option value="celebrate">Celebrate</option>
                      <option value="graduation">Graduation</option>
                      <option value="school day">School Day</option>
                      <option value="conferences">Conferences</option>
                      <option value="birthday">Birthday</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#5f8a62] transition-colors"
                    />
                  </div>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#5f8a62] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Your phone"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#5f8a62] transition-colors"
                    />
                  </div>
                </div>

                {/* Total Price */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">Base Price: </span>
                    <span className="font-medium">{hoursPricing[hours]} EGP</span>
                  </div>
                  {extrasTotal > 0 && (
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">Extras ({extras.length} × {extraPrice}): </span>
                      <span className="font-medium text-[#5f8a62]">+{extrasTotal} EGP</span>
                    </div>
                  )}
                  {dualExtra > 0 && (
                    <div className="mb-2">
                      <span className="text-sm text-gray-600">Dual Service ({Math.ceil(hours / 2)} × {dualIncrease}): </span>
                      <span className="font-medium text-[#5f8a62]">+{dualExtra} EGP</span>
                    </div>
                  )}
                  <div className="mb-4 border-t border-gray-300 pt-2">
                    <span className="text-lg text-gray-700">Total Price: </span>
                    <span className="text-2xl font-bold text-[#5f8a62]">{totalPrice} EGP</span>
                  </div>
                  <button
                    onClick={handleBookNow}
                    disabled={services.length === 0}
                    className={`w-full font-medium py-3 rounded-lg transition-all ${
                      services.length === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#5f8a62] hover:bg-[#4d7250] text-white'
                    }`}
                  >
                    {services.length === 0 ? 'Please select at least one service' : 'Book Now via WhatsApp'}
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