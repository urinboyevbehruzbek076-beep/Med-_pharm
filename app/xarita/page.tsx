"use client";
import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/sidebar";
import { MapPin, Store, Navigation, Crosshair, X } from "lucide-react";

const DORIXONALAR = [
  { id: 1, nomi: "Shifobaxsh Dorixona", manzil: "Chilonzor, 5-kvartal", lat: 41.2995, lng: 69.2401, tel: "+998901234567", ochiq: true },
  { id: 2, nomi: "Dori Dunyo", manzil: "Yunusobod, 19-kvartal", lat: 41.3611, lng: 69.2848, tel: "+998931112233", ochiq: true },
  { id: 3, nomi: "Najot Apteka", manzil: "Mirzo Ulugbek, 2-kvartal", lat: 41.3219, lng: 69.3156, tel: "+998901119988", ochiq: false },
  { id: 4, nomi: "MedPlus Dorixona", manzil: "Sergeli, 14-kvartal", lat: 41.2201, lng: 69.2689, tel: "+998935556677", ochiq: true },
  { id: 5, nomi: "Baraka Apteka", manzil: "Shayxontohur", lat: 41.3105, lng: 69.2644, tel: "+998901001122", ochiq: true },
  { id: 6, nomi: "Salomatlik Apteka", manzil: "Yakkasaroy", lat: 41.2888, lng: 69.2712, tel: "+998911223344", ochiq: false },
];

const KURYER = { lat: 41.3050, lng: 69.2700, nomi: "Jasur" };

export default function XaritaSahifasi() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [tanlangan, setTanlangan] = useState<any>(null);
  const [yuklanmoqda, setYuklanmoqda] = useState(true);
  const [joylashuv, setJoylashuv] = useState<{lat:number,lng:number}|null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      navigator.geolocation?.getCurrentPosition(
        pos => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setJoylashuv(coords);
          initMap(coords);
        },
        () => initMap(null)
      );
    };
    document.head.appendChild(script);
    return () => { if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; } };
  }, []);

  const initMap = (userPos: {lat:number,lng:number}|null) => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const L = (window as any).L;
    const center = userPos || { lat: 41.2995, lng: 69.2401 };
    const map = L.map(mapRef.current).setView([center.lat, center.lng], 12);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" }).addTo(map);

    // Foydalanuvchi joylashuvi
    if (userPos) {
      const myIcon = L.divIcon({
        html: `<div style="background:#2563eb;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 4px rgba(37,99,235,0.3);"></div>`,
        className: "", iconSize: [20,20], iconAnchor: [10,10]
      });
      L.marker([userPos.lat, userPos.lng], { icon: myIcon }).addTo(map).bindTooltip("📍 Siz bu yerdasiz", { permanent: true, direction: "top", offset:[0,-8] });
    }

    // Dorixonalar
    DORIXONALAR.forEach(d => {
      const icon = L.divIcon({
        html: `<div style="background:${d.ochiq?'#16a34a':'#94a3b8'};width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.3);font-size:18px;">🏥</div>`,
        className: "", iconSize:[38,38], iconAnchor:[19,19]
      });
      const m = L.marker([d.lat, d.lng], { icon }).addTo(map);
      m.on("click", () => setTanlangan(d));
      m.bindTooltip(d.nomi, { direction:"top", offset:[0,-10] });
    });

    // Kuryer
    const kuryerIcon = L.divIcon({
      html: `<div style="background:#f59e0b;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.3);font-size:20px;">🛵</div>`,
      className: "", iconSize:[42,42], iconAnchor:[21,21]
    });
    L.marker([KURYER.lat, KURYER.lng], { icon: kuryerIcon }).addTo(map).bindTooltip("🛵 Jasur — Kuryer", { permanent:true, direction:"top", offset:[0,-12] });

    setYuklanmoqda(false);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col">

        <div className="p-6 pb-3">
          <h1 className="text-3xl font-bold text-slate-800 mb-1 flex items-center gap-3">
            <MapPin className="text-blue-600" /> Xarita
          </h1>
          <p className="text-slate-500 text-sm mb-4">Yaqin dorixonalar va kuryer joylashuvi</p>
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border shadow-sm text-xs font-medium"><span>🏥</span><span className="text-green-600 font-bold">Ochiq</span></div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border shadow-sm text-xs font-medium"><span>🏥</span><span className="text-slate-400 font-bold">Yopiq</span></div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border shadow-sm text-xs font-medium"><span>🛵</span><span className="text-amber-600 font-bold">Kuryer</span></div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border shadow-sm text-xs font-medium"><span className="w-3 h-3 bg-blue-600 rounded-full inline-block border-2 border-white shadow ring-2 ring-blue-300"></span><span className="text-blue-600 font-bold">Siz</span></div>
          </div>
        </div>

        <div className="flex gap-4 flex-1 px-6 pb-6">
          {/* Xarita */}
          <div className="flex-1 relative rounded-3xl overflow-hidden border-2 border-slate-200 shadow-lg min-h-[500px]">
            {yuklanmoqda && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                <div className="text-center">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-slate-500 font-medium text-sm">Xarita yuklanmoqda...</p>
                </div>
              </div>
            )}
            <div ref={mapRef} style={{ width:"100%", height:"100%", minHeight:"500px" }} />
          </div>

          {/* Yon panel */}
          <div className="w-72 flex flex-col gap-4">

            {/* Tanlangan dorixona */}
            {tanlangan ? (
              <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-md p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏥</span>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{tanlangan.nomi}</h3>
                      <span className={"text-xs font-bold px-2 py-0.5 rounded-full " + (tanlangan.ochiq ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400")}>
                        {tanlangan.ochiq ? "✓ Ochiq" : "✗ Yopiq"}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setTanlangan(null)} className="p-1 hover:bg-slate-100 rounded-lg"><X size={14}/></button>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-3"><MapPin size={12}/>{tanlangan.manzil}</p>
                <a href={"tel:"+tanlangan.tel} className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all">
                  📞 Qo'ng'iroq
                </a>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border shadow-sm p-5 text-center">
                <Store size={28} className="text-slate-200 mx-auto mb-2"/>
                <p className="text-slate-400 text-xs">Xaritadagi dorixonani bosing</p>
              </div>
            )}

            {/* Joylashuv */}
            <div className={"rounded-3xl p-4 border " + (joylashuv ? "bg-blue-600 text-white border-blue-500" : "bg-white border-slate-200")}>
              <div className="flex items-center gap-2 mb-1">
                <Crosshair size={16} />
                <p className="font-bold text-sm">Joylashuvingiz</p>
              </div>
              <p className={"text-xs " + (joylashuv ? "text-blue-200" : "text-slate-400")}>
                {joylashuv ? `${joylashuv.lat.toFixed(4)}, ${joylashuv.lng.toFixed(4)}` : "Aniqlanmadi — brauzerga ruxsat bering"}
              </p>
            </div>

            {/* Kuryer */}
            <div className="bg-amber-500 rounded-3xl p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🛵</span>
                <div>
                  <p className="font-bold text-sm">Jasur — Kuryer</p>
                  <p className="text-amber-200 text-xs">Faol • Yo'lda</p>
                </div>
              </div>
              <div className="bg-amber-400 rounded-2xl p-3 text-xs">
                <p className="font-bold">Ali Valiev → Paratsetamol</p>
                <p className="text-amber-100 mt-0.5">Chilonzor, 5-kvartal</p>
              </div>
            </div>

            {/* Ro'yxat */}
            <div className="bg-white rounded-3xl border shadow-sm p-4 overflow-y-auto" style={{maxHeight:"240px"}}>
              <h3 className="font-bold text-slate-600 mb-3 text-xs uppercase tracking-wider">Barcha dorixonalar ({DORIXONALAR.length})</h3>
              <div className="space-y-2">
                {DORIXONALAR.map(d => (
                  <button key={d.id} onClick={() => setTanlangan(d)} className={"w-full text-left p-2.5 rounded-xl border transition-all " + (tanlangan?.id===d.id ? "bg-blue-50 border-blue-300" : "hover:bg-slate-50 border-transparent")}>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-slate-800 text-xs">{d.nomi}</p>
                      <span className={"text-xs px-1.5 py-0.5 rounded-full font-bold " + (d.ochiq ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400")}>
                        {d.ochiq?"Ochiq":"Yopiq"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{d.manzil}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
