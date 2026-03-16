"use client";
import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import { Truck, Clock } from 'lucide-react';

const boshlangichBuyurtmalar: any = [
  { id: 101, dori: "Paratsetamol", mijoz: "Ali Valiev", tel: "+998901234567", holat: "kutilmoqda" },
  { id: 102, dori: "Trimol, Vitamin C", mijoz: "Olim Karimov", tel: "+998931112233", holat: "tayyorlanmoqda" },
];

export default function DorixonaPanel() {
  const [buyurtmalar, setBuyurtmalar] = useState(boshlangichBuyurtmalar);

  const holatniOzgartirish = (id: number, yangiHolat: string) => {
    const yangiRoyxat = buyurtmalar.map((b: any) => {
      if (b.id === id) return { ...b, holat: yangiHolat };
      return b;
    });
    setBuyurtmalar(yangiRoyxat);
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />
      <div className="ml-64 p-8 flex-1">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Dorixonachi boshqaruvi</h1>

        <div className="grid grid-cols-1 gap-6">
          {buyurtmalar.map((b: any) => (
            <div key={b.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-blue-600">ID: #{b.id}</span>
                  <span className={"px-3 py-1 rounded-full text-xs font-bold " + (b.holat === "kutilmoqda" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700")}>
                    {b.holat}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">{b.dori}</h3>
                <p className="text-slate-500">Mijoz: {b.mijoz} | {b.tel}</p>
              </div>

              <div className="flex gap-3">
                {b.holat === "kutilmoqda" ? (
                  <button
                    onClick={() => holatniOzgartirish(b.id, "tayyorlanmoqda")}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Clock size={18} /> Qabul qilish
                  </button>
                ) : (
                  <button
                    onClick={() => holatniOzgartirish(b.id, "kuryerga berildi")}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 flex items-center gap-2"
                  >
                    <Truck size={18} /> Kuryerga berish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
