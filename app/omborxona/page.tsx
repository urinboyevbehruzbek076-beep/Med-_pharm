"use client";
import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import { Plus, Trash2, Edit, Package } from 'lucide-react';

const BOSHLANGICH_DORILAR = [
  { id: 1, nomi: "Paratsetamol", narxi: 5000, miqdori: 120, tur: "Tabletka", ishlab: "Pharmstandard" },
  { id: 2, nomi: "Ibuprofen", narxi: 8000, miqdori: 80, tur: "Tabletka", ishlab: "Bayer" },
  { id: 3, nomi: "Ambrosol", narxi: 18000, miqdori: 45, tur: "Sirop", ishlab: "Boehringer" },
  { id: 4, nomi: "Trimol", narxi: 12000, miqdori: 60, tur: "Tabletka", ishlab: "Uzmedimpex" },
  { id: 5, nomi: "No-Shpa", narxi: 18000, miqdori: 200, tur: "Tabletka", ishlab: "Sanofi" },
  { id: 6, nomi: "Mezim", narxi: 22000, miqdori: 35, tur: "Tabletka", ishlab: "Berlin-Chemie" },
  { id: 7, nomi: "Omeprazol", narxi: 15000, miqdori: 90, tur: "Kapsul", ishlab: "Stada" },
  { id: 8, nomi: "Loratadin", narxi: 12000, miqdori: 55, tur: "Tabletka", ishlab: "Pharmstandard" },
  { id: 9, nomi: "Vitamin C", narxi: 8000, miqdori: 300, tur: "Tabletka", ishlab: "Bayer" },
  { id: 10, nomi: "Vitamin B12", narxi: 25000, miqdori: 40, tur: "Ampula", ishlab: "Mefar" },
  { id: 11, nomi: "Diclofenac", narxi: 18000, miqdori: 70, tur: "Tabletka", ishlab: "Novartis" },
  { id: 12, nomi: "Nimesulid", narxi: 22000, miqdori: 25, tur: "Tabletka", ishlab: "Helsinn" },
  { id: 13, nomi: "Nazivin", narxi: 28000, miqdori: 48, tur: "Tomchi", ishlab: "Merck" },
  { id: 14, nomi: "Strepsils", narxi: 25000, miqdori: 110, tur: "Konfet", ishlab: "Reckitt" },
  { id: 15, nomi: "Cerucal", narxi: 15000, miqdori: 18, tur: "Tabletka", ishlab: "Teva" },
  { id: 16, nomi: "Enterol", narxi: 45000, miqdori: 32, tur: "Kapsul", ishlab: "Biocodex" },
  { id: 17, nomi: "Duphalac", narxi: 38000, miqdori: 22, tur: "Sirop", ishlab: "Abbott" },
  { id: 18, nomi: "Betaserc", narxi: 45000, miqdori: 60, tur: "Tabletka", ishlab: "Solvay" },
  { id: 19, nomi: "Corvalol", narxi: 15000, miqdori: 85, tur: "Tomchi", ishlab: "Krewel" },
  { id: 20, nomi: "Enalapril", narxi: 12000, miqdori: 15, tur: "Tabletka", ishlab: "Hexal" },
  { id: 21, nomi: "Voltaren Gel", narxi: 45000, miqdori: 38, tur: "Gel", ishlab: "Novartis" },
  { id: 22, nomi: "Panthenol", narxi: 35000, miqdori: 42, tur: "Krem", ishlab: "Dr. Scholl" },
  { id: 23, nomi: "Fenistil Gel", narxi: 32000, miqdori: 28, tur: "Gel", ishlab: "Novartis" },
  { id: 24, nomi: "Zodak", narxi: 28000, miqdori: 55, tur: "Tabletka", ishlab: "UCB" },
  { id: 25, nomi: "Monural", narxi: 55000, miqdori: 12, tur: "Kukun", ishlab: "Zambon" },
];

export default function Omborxona() {
  const [dorilar, setDorilar] = useState(BOSHLANGICH_DORILAR);
  const [yangi, setYangi] = useState({ nomi: "", narxi: "", miqdori: "", tur: "Tabletka", ishlab: "" });
  const [qidiruv, setQidiruv] = useState("");

  const filtrlangan = dorilar.filter(d => d.nomi.toLowerCase().includes(qidiruv.toLowerCase()));

  const qoshish = () => {
    if (!yangi.nomi || !yangi.narxi) { alert("Dori nomi va narxini kiriting!"); return; }
    setDorilar([...dorilar, { id: Date.now(), nomi: yangi.nomi, narxi: Number(yangi.narxi), miqdori: Number(yangi.miqdori), tur: yangi.tur, ishlab: yangi.ishlab }]);
    setYangi({ nomi: "", narxi: "", miqdori: "", tur: "Tabletka", ishlab: "" });
  };

  const ochirish = (id: number) => setDorilar(dorilar.filter(d => d.id !== id));

  const kam = dorilar.filter(d => d.miqdori < 30).length;
  const jami = dorilar.reduce((s, d) => s + d.narxi * d.miqdori, 0);

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="ml-64 p-8 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Package className="text-blue-600" /> Omborxona
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl border shadow-sm">
            <p className="text-slate-500 text-sm">Jami tur</p>
            <p className="text-3xl font-black text-slate-800">{dorilar.length}</p>
          </div>
          <div className={"p-5 rounded-2xl border shadow-sm " + (kam > 0 ? "bg-red-50 border-red-200" : "bg-white")}>
            <p className="text-slate-500 text-sm">Kam qolgan</p>
            <p className={"text-3xl font-black " + (kam > 0 ? "text-red-600" : "text-slate-800")}>{kam} ta</p>
          </div>
          <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 shadow-sm">
            <p className="text-slate-500 text-sm">Ombor qiymati</p>
            <p className="text-2xl font-black text-blue-700">{(jami / 1000000).toFixed(1)}M so'm</p>
          </div>
        </div>

        {/* Qo'shish */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border mb-6">
          <h2 className="text-lg font-bold mb-4 text-slate-700">Yangi dori qo'shish</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <input type="text" placeholder="Dori nomi *" className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={yangi.nomi} onChange={e => setYangi({...yangi, nomi: e.target.value})} />
            <input type="number" placeholder="Narxi (so'm) *" className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={yangi.narxi} onChange={e => setYangi({...yangi, narxi: e.target.value})} />
            <input type="number" placeholder="Miqdori" className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={yangi.miqdori} onChange={e => setYangi({...yangi, miqdori: e.target.value})} />
            <input type="text" placeholder="Ishlab chiqaruvchi" className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={yangi.ishlab} onChange={e => setYangi({...yangi, ishlab: e.target.value})} />
            <button onClick={qoshish} className="bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2 transition-all">
              <Plus size={20} /> Qo'shish
            </button>
          </div>
        </div>

        {/* Qidiruv */}
        <input type="text" placeholder="🔍 Dori qidirish..." className="w-full mb-4 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={qidiruv} onChange={e => setQidiruv(e.target.value)} />

        {/* Jadval */}
        <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
          <table className="w-full text-left text-slate-900">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-4 font-bold text-sm">Dori nomi</th>
                <th className="p-4 font-bold text-sm">Turi</th>
                <th className="p-4 font-bold text-sm">Ishlab chiqaruvchi</th>
                <th className="p-4 font-bold text-sm">Narxi</th>
                <th className="p-4 font-bold text-sm">Miqdori</th>
                <th className="p-4 font-bold text-sm text-center">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filtrlangan.map((dori) => (
                <tr key={dori.id} className="border-b hover:bg-slate-50 transition-all">
                  <td className="p-4 font-medium">{dori.nomi}</td>
                  <td className="p-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-xs font-medium">{dori.tur}</span></td>
                  <td className="p-4 text-slate-400 text-sm">{dori.ishlab || "—"}</td>
                  <td className="p-4 font-bold text-blue-600">{dori.narxi.toLocaleString()} so'm</td>
                  <td className="p-4">
                    <span className={"px-3 py-1 rounded-full text-xs font-bold " + (dori.miqdori < 30 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600")}>
                      {dori.miqdori} ta {dori.miqdori < 30 ? "⚠️" : ""}
                    </span>
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <button className="text-slate-300 hover:text-blue-600 transition-all p-1"><Edit size={16} /></button>
                    <button onClick={() => ochirish(dori.id)} className="text-slate-300 hover:text-red-500 transition-all p-1"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
