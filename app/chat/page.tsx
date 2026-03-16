"use client";
import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import { Send, Bot, User, ShoppingCart, Loader2 } from 'lucide-react';

const DORI_BAZASI: Record<string, { dori: string; narxi: number; tavsiya: string; tur: string }> = {
  // Bosh va nerv
  "bosh og'rig'i": { dori: "Paratsetamol", narxi: 5000, tavsiya: "Tinch joyda dam oling, ko'z oldingizni o'chiring.", tur: "Tabletka" },
  "bosh aylanishi": { dori: "Betaserc", narxi: 45000, tavsiya: "Tez o'tirmang yoki turing, sekin harakat qiling.", tur: "Tabletka" },
  "migran": { dori: "Sumatriptan", narxi: 35000, tavsiya: "Qorong'i xonada yoting, shovqindan uzoq turing.", tur: "Tabletka" },
  "uyqu": { dori: "Melatonin", narxi: 28000, tavsiya: "Uxlashdan 30 daqiqa oldin iching, ekrandan uzoq turing.", tur: "Tabletka" },
  "asab": { dori: "Glycine", narxi: 12000, tavsiya: "Chuqur nafas oling, yengil jismoniy mashq qiling.", tur: "Tabletka" },
  "stress": { dori: "Afobazol", narxi: 38000, tavsiya: "Kun tartibini belgilang, meditatsiya qiling.", tur: "Tabletka" },

  // Harorat va gripp
  "isitma": { dori: "Taylol-hot", narxi: 15000, tavsiya: "Ko'p suyuqlik iching, issiq kiyining.", tur: "Kukun" },
  "gripp": { dori: "Tamiflu", narxi: 85000, tavsiya: "Uyda qoling, ko'p suv iching, dam oling.", tur: "Kapsul" },
  "shamollash": { dori: "Coldrex", narxi: 18000, tavsiya: "Iliq choy iching, oyoqlaringizni isiting.", tur: "Tabletka" },
  "sovuq": { dori: "TeraFlu", narxi: 22000, tavsiya: "Uyda qoling, issiq ovqat yeng.", tur: "Kukun" },
  "koronavirus": { dori: "Paratsetamol + Vitamin C", narxi: 20000, tavsiya: "Izolyatsiya qiling, shifokor bilan maslahatlashing.", tur: "Tabletka" },

  // Nafas yo'llari
  "yo'tal": { dori: "Ambrosol", narxi: 18000, tavsiya: "Iliq sut iching, bug' ustida nafas oling.", tur: "Sirop" },
  "quruq yo'tal": { dori: "Libexin", narxi: 32000, tavsiya: "Ko'p suv iching, havo namligini oshiring.", tur: "Tabletka" },
  "tomog'im og'riydi": { dori: "Strepsils", narxi: 25000, tavsiya: "Iliq sho'r suv bilan chayqang, sovuq narsalar yemang.", tur: "Konfet" },
  "tomoq": { dori: "Tantum Verde", narxi: 35000, tavsiya: "Tomoqni chayqang, sovuq ichimliklar ichmang.", tur: "Sprey" },
  "bronxit": { dori: "Lazolvan", narxi: 42000, tavsiya: "Bug' bilan nafas oling, ko'p suyuqlik iching.", tur: "Sirop" },
  "astma": { dori: "Salbutamol", narxi: 55000, tavsiya: "Inhaler doim yoningizda bo'lsin, shifokorga boring.", tur: "Inhaler" },
  "burun": { dori: "Nazivin", narxi: 28000, tavsiya: "Dengiz suvi bilan yuving, kir xonada uzoq turmang.", tur: "Tomchi" },
  "tumov": { dori: "Aqua Maris", narxi: 32000, tavsiya: "Buruningizni ko'p artmang, dengiz suvi bilan yuving.", tur: "Sprey" },

  // Oshqozon va ichak
  "oshqozon og'rig'i": { dori: "Mezim", narxi: 22000, tavsiya: "Achchiq va yog'li ovqat yemang, kichik porsiyalarda yeng.", tur: "Tabletka" },
  "gastrit": { dori: "Omeprazol", narxi: 18000, tavsiya: "Ovqatni o'z vaqtida yeng, qorin ochib qolmang.", tur: "Kapsul" },
  "ko'ngil aynishi": { dori: "Cerucal", narxi: 15000, tavsiya: "Yengil ovqat yeng, yotib olmang ovqatdan keyin.", tur: "Tabletka" },
  "qayt qilish": { dori: "Motilium", narxi: 35000, tavsiya: "Suv-tuz balansini saqlang, kichik-kichik iching.", tur: "Tabletka" },
  "ich ketish": { dori: "Enterol", narxi: 45000, tavsiya: "Ko'p suv iching, RegidronR iching.", tur: "Kapsul" },
  "ich qotish": { dori: "Duphalac", narxi: 38000, tavsiya: "Ko'p suv iching, sabzavot va meva yeng.", tur: "Sirop" },
  "meteorizm": { dori: "Espumisan", narxi: 28000, tavsiya: "Gazli ichimlik ichmang, sekin yeng.", tur: "Kapsul" },
  "diareya": { dori: "Imodium", narxi: 22000, tavsiya: "Suyuqlik ko'p iching, og'ir ovqatdan saqlaning.", tur: "Kapsul" },
  "ulcer": { dori: "De-Nol", narxi: 65000, tavsiya: "Spirtli ichimlik va tamakidan saqlaning, shifokorga boring.", tur: "Tabletka" },

  // Yurak va qon bosimi
  "yurak": { dori: "Aspirin Cardio", narxi: 25000, tavsiya: "Tuz va yog'li ovqatni kamaytiring, shifokorga boring.", tur: "Tabletka" },
  "qon bosimi": { dori: "Enalapril", narxi: 12000, tavsiya: "Tuz, stress va qahvani kamaytiring.", tur: "Tabletka" },
  "yurak urishi": { dori: "Corvalol", narxi: 15000, tavsiya: "Chuqur nafas oling, stressdan uzoq turing.", tur: "Tomchi" },

  // Suyak va mushak
  "bel og'rig'i": { dori: "Diclofenac", narxi: 18000, tavsiya: "Og'ir ko'tarmang, issiq malham suring.", tur: "Tabletka" },
  "tizza og'rig'i": { dori: "Voltaren Gel", narxi: 45000, tavsiya: "Ko'p yurmaslik, issiq kompres qo'ying.", tur: "Gel" },
  "bo'g'im og'rig'i": { dori: "Nimesulid", narxi: 22000, tavsiya: "Bo'g'imni ortiqcha yuklamaslik, issiq saqlasin.", tur: "Tabletka" },
  "mushak og'rig'i": { dori: "Fastum Gel", narxi: 38000, tavsiya: "Yengil massaj qiling, dam oling.", tur: "Gel" },
  "sinish": { dori: "Calcium D3", narxi: 35000, tavsiya: "Suyak shifokoriga boring, ko'p sut iching.", tur: "Tabletka" },

  // Ko'z va quloq
  "ko'z qizarishi": { dori: "Vizin", narxi: 28000, tavsiya: "Ko'zingizni ishqalamang, ekranga kam qarang.", tur: "Tomchi" },
  "ko'z og'rig'i": { dori: "Systane", narxi: 45000, tavsiya: "Ko'z shifokoriga boring, ko'z tomchisi tomizing.", tur: "Tomchi" },
  "quloq og'rig'i": { dori: "Otipax", narxi: 35000, tavsiya: "Quloqni sovuqdan saqlang, otorinolaringologga boring.", tur: "Tomchi" },

  // Teri
  "allergiya": { dori: "Loratadin", narxi: 15000, tavsiya: "Allergen narsadan uzoq turing, shifokorga boring.", tur: "Tabletka" },
  "qichima": { dori: "Fenistil", narxi: 32000, tavsiya: "Ishqalamang, salqin joyda turing.", tur: "Gel" },
  "toshma": { dori: "Zodak", narxi: 28000, tavsiya: "Allergen ovqatlardan saqlaning, toza kiyim kiyining.", tur: "Tabletka" },
  "yara": { dori: "Panthenol", narxi: 35000, tavsiya: "Yarани toza saqlang, kunda malham suring.", tur: "Krem" },
  "kuydirish": { dori: "Panthenol Sprey", narxi: 42000, tavsiya: "Sovuq suv ostida ushlab turing, tiqmang.", tur: "Sprey" },

  // Ayollar sog'ligi
  "hayz og'rig'i": { dori: "No-Shpa", narxi: 18000, tavsiya: "Issiq xalta qo'ying, dam oling.", tur: "Tabletka" },
  "siydik yo'li": { dori: "Monural", narxi: 55000, tavsiya: "Ko'p suv iching, shifokorga boring.", tur: "Kukun" },

  // Vitamin va immunitet
  "charchoq": { dori: "Vitamin B kompleks", narxi: 35000, tavsiya: "To'liq uxlang, to'g'ri ovqatlaning.", tur: "Tabletka" },
  "immunitet": { dori: "Vitamin C", narxi: 15000, tavsiya: "Meva-sabzavot ko'p yeng, tashqarida yuring.", tur: "Tabletka" },
  "kamqonlik": { dori: "Ferograd", narxi: 45000, tavsiya: "Temir ko'p ovqat yeng: jigar, qo'ziqorin, nok.", tur: "Tabletka" },
  "soch to'kilishi": { dori: "Pantovigar", narxi: 120000, tavsiya: "Stress kamaytiring, vitamin iching.", tur: "Kapsul" },
};

function topDori(matn: string) {
  const kichik = matn.toLowerCase();
  for (const [kalit, qiymat] of Object.entries(DORI_BAZASI)) {
    if (kichik.includes(kalit)) return { kasallik: kalit, ...qiymat };
  }
  return null;
}

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<any[]>([
    { role: "ai", text: "Assalomu alaykum! Men Med AI yordamchisiman 👨‍⚕️\n\nSimptomlaringizni yozing — dori va maslahat beraman.\n\nMasalan: 'boshim og'riyapti', 'yo'tal bor', 'isitmam bor'...", dori: null }
  ]);

  const savatchagaQoshish = (nomi: string, narxi: number) => {
    if (typeof window !== "undefined") {
      const eski: any = JSON.parse(localStorage.getItem("cart") || "[]");
      const yangi = { id: Date.now(), nomi, narxi, soni: 1, rasm: "💊" };
      localStorage.setItem("cart", JSON.stringify([...eski, yangi]));
      alert(nomi + " savatchaga qo'shildi!");
    }
  };

  const handleSend = () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input, dori: null };
    const newChat = [...chat, userMsg];
    setChat(newChat);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const natija = topDori(input);
      let aiText = "";
      let doriObj = null;

      if (natija) {
        aiText = `Sizda "${natija.kasallik}" belgilari bor.\n\n💊 Tavsiya: ${natija.dori} (${natija.tur})\n💡 Maslahat: ${natija.tavsiya}`;
        doriObj = { nomi: natija.dori, narxi: natija.narxi };
      } else {
        aiText = "Kechirasiz, bu simptomni aniqlay olmadim 🤔\n\nQuyidagilarni sinab ko'ring:\n• 'bosh og'rig'i'\n• 'isitma'\n• 'yo'tal'\n• 'oshqozon og'rig'i'\n• 'allergiya'\n\nYoki shifokorlar bo'limiga o'ting.";
      }

      setChat([...newChat, { role: "ai", text: aiText, dori: doriObj }]);
      setLoading(false);
    }, 600);
  };

  return (
    <main className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col h-screen">

        <header className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <Bot size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Med AI Chat</h2>
          </div>
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">● Offline · 50+ kasallik</span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chat.map((msg: any, idx: number) => (
            <div key={idx} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
              <div className={"flex gap-3 max-w-[85%] " + (msg.role === 'user' ? "flex-row-reverse" : "")}>
                <div className={"p-2 rounded-full h-fit shrink-0 " + (msg.role === 'ai' ? "bg-blue-600 text-white" : "bg-slate-300")}>
                  {msg.role === 'ai' ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div>
                  <div className={"p-3 rounded-2xl shadow-sm whitespace-pre-line " + (msg.role === 'ai' ? "bg-white border" : "bg-blue-600 text-white")}>
                    {msg.text}
                  </div>
                  {msg.role === 'ai' && msg.dori && (
                    <div className="mt-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
                      <p className="text-sm text-slate-500 mb-1">Tavsiya etilgan dori:</p>
                      <p className="font-bold text-slate-800">💊 {msg.dori.nomi}</p>
                      <p className="text-blue-600 font-bold text-sm">{msg.dori.narxi?.toLocaleString()} so'm</p>
                      <button
                        onClick={() => savatchagaQoshish(msg.dori.nomi, msg.dori.narxi)}
                        className="mt-2 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-all"
                      >
                        <ShoppingCart size={14} /> Savatchaga qo'shish
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="p-2 rounded-full h-fit bg-blue-600 text-white">
                  <Bot size={18} />
                </div>
                <div className="bg-white border p-3 rounded-2xl shadow-sm flex items-center gap-2 text-slate-400">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Tahlil qilinmoqda...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t">
          <div className="max-w-4xl mx-auto flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e: any) => setInput(e.target.value)}
              onKeyDown={(e: any) => { if (e.key === 'Enter') handleSend(); }}
              placeholder="Masalan: boshim og'riyapti, isitmam bor..."
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-slate-900"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
