"use client";
import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import { ShoppingCart, Trash2, CreditCard, Plus, Minus, ArrowLeft, X, Phone, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SavatchaSahifasi() {
  const [items, setItems] = useState<any[]>([]);
  const [yuklanmoqda, setYuklanmoqda] = useState(true);
  const [modal, setModal] = useState(false);
  const [tel, setTel] = useState("");
  const [manzil, setManzil] = useState("");
  const [jarayon, setJarayon] = useState(false);
  const [muvaffaqiyat, setMuvaffaqiyat] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setItems(JSON.parse(localStorage.getItem("cart") || "[]"));
      setYuklanmoqda(false);
    }
  }, []);

  const yangilash = (yangi: any[]) => {
    setItems(yangi);
    localStorage.setItem("cart", JSON.stringify(yangi));
  };

  const ozgartirish = (id: number, miqdor: number) => {
    yangilash(items.map(item => item.id === id ? { ...item, soni: Math.max(1, item.soni + miqdor) } : item));
  };

  const ochirish = (id: number) => yangilash(items.filter(i => i.id !== id));

  const buyurtmaJonatish = (e: any) => {
    e.preventDefault();
    setJarayon(true);
    setTimeout(() => {
      setJarayon(false);
      setModal(false);
      setMuvaffaqiyat(true);
      localStorage.removeItem("cart");
      setItems([]);
      setTimeout(() => setMuvaffaqiyat(false), 5000);
    }, 2000);
  };

  const jamiSumma = items.reduce((s, i) => s + i.narxi * i.soni, 0);

  if (yuklanmoqda) return <div className="p-10 text-center">Yuklanmoqda...</div>;

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-900">
      <Sidebar />
      <div className="ml-64 p-8 flex-1">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingCart className="text-blue-600" /> Savatchangiz
          </h1>
          <Link href="/chat" className="text-blue-600 flex items-center gap-1 hover:underline text-sm">
            <ArrowLeft size={16} /> AI Chatga qaytish
          </Link>
        </div>

        {/* Muvaffaqiyat */}
        {muvaffaqiyat && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-3xl p-6 text-center">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
            <h2 className="text-xl font-black text-green-800">Buyurtmangiz qabul qilindi! 🎉</h2>
            <p className="text-green-600 mt-1">Dorixonachi siz bilan <strong>{tel}</strong> raqami orqali bog'lanadi.</p>
          </div>
        )}

        {items.length === 0 && !muvaffaqiyat ? (
          <div className="bg-white p-20 rounded-3xl text-center border-2 border-dashed border-slate-200">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-slate-400">Savatcha bo'sh</h2>
            <p className="text-slate-400 mt-2 mb-6">AI Chatga o'tib dori tanlang</p>
            <Link href="/chat" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Dori qidirish</Link>
          </div>
        ) : items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border flex items-center justify-between hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl bg-blue-50 p-3 rounded-xl">💊</div>
                    <div>
                      <h3 className="text-xl font-bold">{item.nomi}</h3>
                      <p className="text-blue-600 font-bold">{item.narxi?.toLocaleString()} so'm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl">
                      <button onClick={() => ozgartirish(item.id, -1)} className="p-1 hover:bg-white rounded-lg"><Minus size={16}/></button>
                      <span className="font-bold w-6 text-center">{item.soni}</span>
                      <button onClick={() => ozgartirish(item.id, 1)} className="p-1 hover:bg-white rounded-lg"><Plus size={16}/></button>
                    </div>
                    <button onClick={() => ochirish(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border h-fit sticky top-8">
              <h2 className="text-xl font-bold mb-6 border-b pb-4">Hisob-kitob</h2>
              <div className="space-y-3 mb-6 text-slate-600 text-sm">
                <div className="flex justify-between"><span>Dorilar:</span><span className="font-bold text-slate-800">{items.length} ta</span></div>
                <div className="flex justify-between"><span>Narx:</span><span className="font-bold text-slate-800">{jamiSumma.toLocaleString()} so'm</span></div>
                <div className="flex justify-between"><span>Yetkazish:</span><span className="font-bold text-green-600">10 000 so'm</span></div>
                <div className="flex justify-between text-lg font-black text-slate-800 pt-3 border-t">
                  <span>Jami:</span>
                  <span className="text-blue-600">{(jamiSumma + 10000).toLocaleString()} so'm</span>
                </div>
              </div>
              <button onClick={() => setModal(true)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg active:scale-95">
                <CreditCard size={20} /> Buyurtma berish
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Buyurtma modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-800">Aloqa ma'lumotlari</h2>
              <button onClick={() => setModal(false)} className="p-2 hover:bg-slate-100 rounded-xl"><X size={20}/></button>
            </div>
            <p className="text-slate-500 mb-6 text-sm">Buyurtmangizni tasdiqlash uchun telefon raqamingizni kiriting — dorixonachi siz bilan bog'lanadi.</p>

            <form onSubmit={buyurtmaJonatish} className="space-y-4">
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-4 text-slate-400" />
                <input
                  required type="tel"
                  placeholder="+998 XX XXX XX XX"
                  value={tel}
                  onChange={e => setTel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                placeholder="Yetkazish manzili (ixtiyoriy)"
                value={manzil}
                onChange={e => setManzil(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button type="submit" disabled={jarayon} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-70 transition-all shadow-lg active:scale-95">
                {jarayon ? <><Loader2 size={20} className="animate-spin" /> Yuborilmoqda...</> : <><CheckCircle size={20} /> Buyurtmani tasdiqlash</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
