"use client";
import Link from 'next/link';
import { Bot, Store, Truck, ShoppingCart, ArrowRight, Heart, Shield, Clock, Star, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen" style={{background:"linear-gradient(135deg,#f0fdfa 0%,#e0f2fe 50%,#f0fdf4 100%)"}}>

      {/* Navbar */}
      <nav className="px-8 py-5 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md" style={{background:"rgba(240,253,250,0.85)",borderBottom:"1px solid rgba(13,148,136,0.1)"}}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg" style={{background:"linear-gradient(135deg,#0d9488,#0369a1)"}}>
            <Heart size={20} className="text-white" fill="white"/>
          </div>
          <div>
            <span className="text-xl font-black text-slate-800">MedPharm</span>
            <span className="ml-2 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-bold">PRO</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/savatcha" className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors font-medium text-sm">
            <ShoppingCart size={18}/> Savatcha
          </Link>
          <Link href="/login" className="px-5 py-2.5 rounded-full text-white font-bold text-sm transition-all hover:shadow-lg hover:scale-105 active:scale-95"
            style={{background:"linear-gradient(135deg,#0d9488,#0369a1)"}}>
            Kirish →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full text-sm font-bold text-teal-700 animate-fadeUp"
          style={{background:"rgba(13,148,136,0.1)",border:"1px solid rgba(13,148,136,0.2)"}}>
          <span className="w-2 h-2 bg-teal-500 rounded-full pulse-ring inline-block"/>
          O'zbekistondagi №1 tibbiy platforma
        </div>

        <h1 className="font-display text-6xl md:text-7xl font-bold mb-6 leading-tight animate-fadeUp-1" style={{color:"#0f172a"}}>
          Sog'liqni saqlash<br/>
          <span style={{background:"linear-gradient(135deg,#0d9488,#0369a1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            yangi darajada
          </span>
        </h1>

        <p className="text-lg text-slate-500 max-w-xl mx-auto mb-12 leading-relaxed animate-fadeUp-2">
          AI tashxis, onlayn dorixona va tez yetkazib berish — hammasi bir joyda.
        </p>

        <div className="flex items-center justify-center gap-4 mb-20 animate-fadeUp-3">
          <Link href="/login" className="px-8 py-4 rounded-2xl text-white font-bold text-base transition-all hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2"
            style={{background:"linear-gradient(135deg,#0d9488,#0369a1)",boxShadow:"0 8px 32px rgba(13,148,136,0.35)"}}>
            Boshlash <ArrowRight size={18}/>
          </Link>
          <Link href="/chat" className="px-8 py-4 rounded-2xl font-bold text-base transition-all hover:bg-teal-50 border-2 border-teal-200 text-teal-700">
            AI Demo →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              href: "/chat", color: "#0369a1", bg: "#eff6ff", border: "#bfdbfe",
              icon: <Bot size={28}/>, title: "AI Tashxis",
              desc: "Simptomlaringizni yozing — sun'iy intellekt dori tavsiya qiladi.",
              cta: "Chatni boshlash"
            },
            {
              href: "/dorixona", color: "#0d9488", bg: "#f0fdfa", border: "#99f6e4",
              icon: <Store size={28}/>, title: "Dorixona",
              desc: "500+ dori turi, qulay narxlar, tezkor buyurtma.",
              cta: "Ko'rish"
            },
            {
              href: "/kuryer", color: "#d97706", bg: "#fffbeb", border: "#fde68a",
              icon: <Truck size={28}/>, title: "Tez Yetkazish",
              desc: "Buyurtma bering — 30 daqiqada eshigingizga yetkazamiz.",
              cta: "Buyurtma berish"
            },
          ].map((c, i) => (
            <Link key={i} href={c.href} className="card-hover group p-8 rounded-3xl text-left relative overflow-hidden"
              style={{background:c.bg, border:`1.5px solid ${c.border}`}}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110"
                style={{background:`${c.color}18`,color:c.color}}>
                {c.icon}
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">{c.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{c.desc}</p>
              <div className="flex items-center gap-1 font-bold text-sm" style={{color:c.color}}>
                {c.cta} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
              </div>
              {/* Decorative circle */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10 transition-all group-hover:opacity-20"
                style={{background:c.color}}/>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: <Shield size={20}/>, val: "99%", label: "Aniq tashxis" },
            { icon: <Clock size={20}/>, val: "24/7", label: "Xizmat" },
            { icon: <Star size={20}/>, val: "4.9★", label: "Reyting" },
            { icon: <Heart size={20}/>, val: "10K+", label: "Bemorlar" },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl text-center" style={{background:"rgba(255,255,255,0.7)",border:"1px solid rgba(13,148,136,0.1)"}}>
              <div className="flex justify-center mb-2 text-teal-600">{s.icon}</div>
              <p className="text-2xl font-black text-slate-800">{s.val}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
