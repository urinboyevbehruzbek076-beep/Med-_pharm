"use client";
import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import { MapPin, CheckCircle, Phone, Navigation } from 'lucide-react';

const kuryerBuyurtmalari: any = [
  { id: 101, dori: "Paratsetamol", mijoz: "Ali Valiev", manzil: "Toshkent sh., Chilonzor 5-kvartal", tel: "+998901234567", holat: "yo'lda" }
];

export default function KuryerSahifasi() {
  const [orders, setOrders] = useState(kuryerBuyurtmalari);

  const yetkazildi = (id: number) => {
    const yangiRoyxat = orders.filter((o: any) => o.id !== id);
    setOrders(yangiRoyxat);
    alert("Barakalla! Buyurtma muvaffaqiyatli yetkazildi.");
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="ml-64 p-8 flex-1">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Kuryer boshqaruvi</h1>

        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center shadow-sm">
            <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-700">Hozircha yangi buyurtmalar yo'q</h2>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((o: any) => (
              <div key={o.id} className="bg-white p-6 rounded-3xl shadow-md border-2 border-blue-100">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold">YO'LDA</span>
                      <span className="text-slate-400 text-sm">Buyurtma #{o.id}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">{o.mijoz}</h2>
                    <p className="flex items-center gap-2 text-slate-600">
                      <MapPin size={18} className="text-red-500" /> {o.manzil}
                    </p>
                    <p className="flex items-center gap-2 text-slate-600 font-medium">
                      <Phone size={18} className="text-green-500" /> {o.tel}
                    </p>
                    <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
                      <span className="text-sm text-slate-500 font-bold uppercase tracking-wider">Dori:</span>
                      <p className="text-slate-800 font-bold">{o.dori}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 min-w-[200px]">
                    <a
                      href={"tel:" + o.tel}
                      className="flex-1 bg-green-500 text-white flex items-center justify-center gap-2 rounded-2xl font-bold hover:bg-green-600 transition-all py-3"
                    >
                      <Phone size={20} /> Qo'ng'iroq
                    </a>
                    <button className="flex-1 bg-blue-100 text-blue-700 flex items-center justify-center gap-2 rounded-2xl font-bold hover:bg-blue-200 transition-all py-3">
                      <Navigation size={20} /> Xarita
                    </button>
                    <button
                      onClick={() => yetkazildi(o.id)}
                      className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 hover:scale-[1.02] transition-all"
                    >
                      Yetkazib berdim
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
