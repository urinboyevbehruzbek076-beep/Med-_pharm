"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Heart, ChevronDown, ArrowLeft } from 'lucide-react';

const ROLLAR = [
  { id: "mijoz", label: "Bemor / Mijoz", icon: "🧑‍💼", desc: "Dori buyurtma qiling", grad: "from-blue-400 to-cyan-400" },
  { id: "shifokor", label: "Shifokor", icon: "👨‍⚕️", desc: "Bemorlarni qabul qiling", grad: "from-teal-400 to-green-400" },
  { id: "dorixona", label: "Dorixona", icon: "🏥", desc: "Buyurtmalarni boshqaring", grad: "from-emerald-400 to-teal-400" },
  { id: "kuryer", label: "Kuryer", icon: "🛵", desc: "Yetkazib bering", grad: "from-orange-400 to-amber-400" },
];

export default function LoginSahifasi() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState("");
  const router = useRouter();

  const handleRegister = (e: any) => {
    e.preventDefault();
    const userData = { name, phone, role, specialty: role === "shifokor" ? specialty : null, loggedIn: true };
    localStorage.setItem("user", JSON.stringify(userData));
    if (role === "shifokor") router.push("/shifokorlar");
    else if (role === "mijoz") router.push("/chat");
    else if (role === "dorixona") router.push("/dorixona");
    else if (role === "kuryer") router.push("/kuryer");
  };

  const tanlangan = ROLLAR.find(r => r.id === role);

  return (
    <div className="min-h-screen flex" style={{background:"linear-gradient(135deg,#f0fdfa 0%,#e0f2fe 60%,#f0fdf4 100%)"}}>

      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 p-12 relative overflow-hidden"
        style={{background:"linear-gradient(160deg,#0f766e 0%,#0369a1 100%)"}}>
        <div className="absolute inset-0 opacity-10"
          style={{backgroundImage:"radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",backgroundSize:"40px 40px"}}/>
        <div className="relative">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
              <Heart size={20} className="text-white" fill="white"/>
            </div>
            <span className="text-white text-xl font-black">MedPharm</span>
          </div>
          <h2 className="font-display text-5xl text-white font-bold leading-tight mb-6">
            Sog'liqingiz<br/>bizning<br/>
            <span className="text-teal-200">ustuvorligimiz</span>
          </h2>
          <p className="text-teal-200 leading-relaxed">AI tashxis, onlayn buyurtma va tez yetkazib berish xizmati.</p>
        </div>
        <div className="relative grid grid-cols-2 gap-3">
          {["99% Aniq","24/7 Xizmat","500+ Dori","Tez Yetkazish"].map(s => (
            <div key={s} className="bg-white/10 backdrop-blur rounded-2xl p-3 text-white text-sm font-bold text-center">{s}</div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Heart size={20} className="text-teal-600" fill="currentColor"/>
            <span className="text-xl font-black text-slate-800">MedPharm</span>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            {[1,2].map(n => (
              <div key={n} className="flex items-center gap-3">
                <div className={"w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all " +
                  (step >= n ? "text-white shadow-lg" : "bg-slate-100 text-slate-300")}
                  style={step >= n ? {background:"linear-gradient(135deg,#0d9488,#0369a1)"} : {}}>
                  {n}
                </div>
                {n < 2 && <div className={"h-0.5 w-16 rounded-full transition-all " + (step >= 2 ? "bg-teal-500" : "bg-slate-200")}/>}
              </div>
            ))}
            <span className="text-sm text-slate-400 ml-2">{step === 1 ? "Rol tanlash" : "Ma'lumotlar"}</span>
          </div>

          <div className="bg-white rounded-[28px] shadow-2xl p-8" style={{boxShadow:"0 24px 64px rgba(13,148,136,0.12)"}}>
            {step === 1 ? (
              <>
                <h1 className="text-2xl font-black text-slate-800 mb-1">Xush kelibsiz! 👋</h1>
                <p className="text-slate-400 text-sm mb-6">Platformaga kirish uchun rolingizni tanlang</p>
                <div className="space-y-3">
                  {ROLLAR.map(item => (
                    <button key={item.id} onClick={() => { setRole(item.id); setStep(2); }}
                      className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 hover:border-teal-300 hover:bg-teal-50/50 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.grad} flex items-center justify-center text-lg shadow`}>
                          {item.icon}
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-slate-800 text-sm">{item.label}</p>
                          <p className="text-xs text-slate-400">{item.desc}</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-slate-300 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all"/>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleRegister}>
                <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1 text-teal-600 font-bold text-sm mb-5 hover:gap-2 transition-all">
                  <ArrowLeft size={14}/> Orqaga
                </button>

                <div className={`flex items-center gap-3 p-3 rounded-2xl mb-6 bg-gradient-to-r ${tanlangan?.grad} bg-opacity-10`}
                  style={{background:"linear-gradient(135deg,rgba(13,148,136,0.08),rgba(3,105,161,0.08))"}}>
                  <span className="text-2xl">{tanlangan?.icon}</span>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{tanlangan?.label}</p>
                    <p className="text-xs text-teal-600">{tanlangan?.desc}</p>
                  </div>
                </div>

                <h2 className="text-xl font-black text-slate-800 mb-5">Ma'lumotlaringiz</h2>

                <div className="space-y-3">
                  <input required type="text" placeholder="To'liq ismingiz"
                    className="w-full rounded-2xl px-4 py-3.5 text-sm outline-none transition-all font-medium"
                    style={{background:"#f8fffe",border:"1.5px solid #99f6e4"}}
                    onFocus={e => e.target.style.borderColor="#0d9488"}
                    onBlur={e => e.target.style.borderColor="#99f6e4"}
                    onChange={e => setName(e.target.value)}/>
                  <input required type="tel" placeholder="+998 XX XXX XX XX"
                    className="w-full rounded-2xl px-4 py-3.5 text-sm outline-none transition-all font-medium"
                    style={{background:"#f8fffe",border:"1.5px solid #99f6e4"}}
                    onFocus={e => e.target.style.borderColor="#0d9488"}
                    onBlur={e => e.target.style.borderColor="#99f6e4"}
                    onChange={e => setPhone(e.target.value)}/>
                  {role === "shifokor" && (
                    <div className="relative">
                      <select required onChange={e => setSpecialty(e.target.value)}
                        className="w-full rounded-2xl px-4 py-3.5 text-sm outline-none appearance-none font-medium"
                        style={{background:"#f8fffe",border:"1.5px solid #99f6e4"}}>
                        <option value="">Mutaxassislik tanlang</option>
                        {["Kardiolog","Nevropatolog","Terapevt","Stomatolog","Pediatr","Ginekolog"].map(s => <option key={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-4 text-slate-400 pointer-events-none"/>
                    </div>
                  )}
                </div>

                <button type="submit" className="w-full mt-6 py-4 rounded-2xl text-white font-black text-base transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  style={{background:"linear-gradient(135deg,#0d9488,#0369a1)",boxShadow:"0 8px 24px rgba(13,148,136,0.3)"}}>
                  Kirish →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
