"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import { User, Phone, Star, Clock, X, CheckCircle, Calendar } from "lucide-react";

const SHIFOKORLAR = [
  { id: 1, ism: "Dr. Alisher Karimov", mutaxassislik: "Terapevt", tajriba: "12 yil", baho: 4.9, tel: "+998901234567", vaqt: "09:00 - 17:00", band: false, rasm: "AK" },
  { id: 2, ism: "Dr. Malika Yusupova", mutaxassislik: "Kardiolog", tajriba: "8 yil", baho: 4.8, tel: "+998931112233", vaqt: "10:00 - 18:00", band: false, rasm: "MY" },
  { id: 3, ism: "Dr. Jasur Toshmatov", mutaxassislik: "Nevropatolog", tajriba: "15 yil", baho: 4.7, tel: "+998901119988", vaqt: "08:00 - 16:00", band: true, rasm: "JT" },
  { id: 4, ism: "Dr. Nilufar Rahimova", mutaxassislik: "Pediatr", tajriba: "6 yil", baho: 4.9, tel: "+998935556677", vaqt: "09:00 - 17:00", band: false, rasm: "NR" },
  { id: 5, ism: "Dr. Bobur Xasanov", mutaxassislik: "Stomatolog", tajriba: "10 yil", baho: 4.6, tel: "+998901001122", vaqt: "11:00 - 19:00", band: true, rasm: "BX" },
  { id: 6, ism: "Dr. Sarvinoz Mirzayeva", mutaxassislik: "Ginekolog", tajriba: "9 yil", baho: 4.8, tel: "+998935671234", vaqt: "09:00 - 16:00", band: false, rasm: "SM" },
];

export default function ShifokorlarSahifasi() {
  const [modal, setModal] = useState<any>(null);
  const [ism, setIsm] = useState("");
  const [tel, setTel] = useState("");
  const [sana, setSana] = useState("");
  const [muvaffaqiyat, setMuvaffaqiyat] = useState(false);

  const navbatYozish = (e: any) => {
    e.preventDefault();
    setModal(null);
    setMuvaffaqiyat(true);
    setIsm(""); setTel(""); setSana("");
    setTimeout(() => setMuvaffaqiyat(false), 4000);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="ml-64 p-8 flex-1">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
          <User className="text-blue-600" /> Shifokorlar
        </h1>
        <p className="text-slate-500 mb-8">Mutaxassis shifokor bilan navbat oling</p>

        {/* Muvaffaqiyat xabari */}
        {muvaffaqiyat && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 animate-pulse">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <p className="font-bold text-green-800">Navbat muvaffaqiyatli olindi! 🎉</p>
              <p className="text-green-600 text-sm">Shifokor siz bilan bog'lanadi.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SHIFOKORLAR.map((s) => (
            <div key={s.id} className="bg-white rounded-3xl border shadow-sm p-6 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg">
                    {s.rasm}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{s.ism}</h3>
                    <p className="text-blue-600 font-medium text-sm">{s.mutaxassislik}</p>
                  </div>
                </div>
                <span className={"px-3 py-1 rounded-full text-xs font-bold " + (s.band ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700")}>
                  {s.band ? "🔴 Band" : "🟢 Bo'sh"}
                </span>
              </div>

              <div className="space-y-2 mb-5 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-slate-700">{s.baho}</span>
                  <span>• {s.tajriba} tajriba</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-slate-400" />
                  <span>Ish vaqti: {s.vaqt}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <a href={"tel:" + s.tel} className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
                  <Phone size={14} /> Qo'ng'iroq
                </a>
                <button
                  onClick={() => !s.band && setModal(s)}
                  disabled={s.band}
                  className={"flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all " + (s.band ? "bg-slate-100 text-slate-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200")}
                >
                  <Calendar size={14} /> Navbat olish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navbat modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-800">Navbat olish</h2>
                <p className="text-blue-600 font-medium">{modal.ism}</p>
              </div>
              <button onClick={() => setModal(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={navbatYozish} className="space-y-4">
              <input
                required type="text"
                placeholder="Ismingiz"
                value={ism}
                onChange={e => setIsm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                required type="tel"
                placeholder="+998 XX XXX XX XX"
                value={tel}
                onChange={e => setTel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                required type="date"
                value={sana}
                onChange={e => setSana(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
                ✅ Navbatni tasdiqlash
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
