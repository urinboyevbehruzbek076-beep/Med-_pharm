"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bot, Store, Truck, Map, User, LogOut, LayoutDashboard, ShoppingCart, Activity, Heart } from 'lucide-react';

export default function Sidebar() {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
    else router.push("/login");
  }, [router]);

  const handleLogout = () => { localStorage.removeItem("user"); router.push("/login"); };

  if (!user) return null;

  const menuItems = [
    { name: "Asosiy", href: "/", icon: <LayoutDashboard size={18}/>, roles: ["mijoz","dorixona","kuryer"] },
    { name: "AI Tashxis", href: "/chat", icon: <Bot size={18}/>, roles: ["mijoz"] },
    { name: "Dorixonalar", href: "/xarita", icon: <Map size={18}/>, roles: ["mijoz"] },
    { name: "Shifokorlar", href: "/shifokorlar", icon: <User size={18}/>, roles: ["mijoz"] },
    { name: "Savatcha", href: "/savatcha", icon: <ShoppingCart size={18}/>, roles: ["mijoz"] },
    { name: "Omborxona", href: "/omborxona", icon: <Store size={18}/>, roles: ["dorixona"] },
    { name: "Buyurtmalar", href: "/dorixona", icon: <Activity size={18}/>, roles: ["dorixona"] },
    { name: "Yetkazish", href: "/kuryer", icon: <Truck size={18}/>, roles: ["kuryer"] },
    { name: "Qabul ro'yxati", href: "/shifokorlar", icon: <User size={18}/>, roles: ["shifokor"] },
  ];

  const roleColors: any = { mijoz: "from-blue-500 to-teal-500", dorixona: "from-teal-500 to-green-500", kuryer: "from-orange-400 to-amber-500", shifokor: "from-red-400 to-pink-500" };
  const roleLabels: any = { mijoz: "Bemor", dorixona: "Dorixona", kuryer: "Kuryer", shifokor: "Shifokor" };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 flex flex-col z-50" style={{background:"linear-gradient(180deg,#0f766e 0%,#0d9488 50%,#0f766e 100%)"}}>
      
      {/* Logo */}
      <div className="p-6 border-b border-teal-600/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            <Heart size={20} className="text-white" fill="white"/>
          </div>
          <div>
            <span className="text-white text-xl font-black tracking-tight">MedPharm</span>
            <p className="text-teal-200 text-xs">Tibbiy platforma</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map(item => {
          if (!item.roles.includes(user.role)) return null;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={"flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all " +
                (active ? "bg-white text-teal-700 shadow-lg font-bold" : "text-teal-100 hover:bg-white/15 hover:text-white")}>
              <span className={active ? "text-teal-600" : ""}>{item.icon}</span>
              {item.name}
              {active && <div className="ml-auto w-1.5 h-1.5 bg-teal-500 rounded-full"/>}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-teal-600/50">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${roleColors[user.role]||'from-blue-400 to-teal-400'} flex items-center justify-center text-white font-black text-sm shadow-lg`}>
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-bold text-sm truncate">{user.name}</p>
            <p className="text-teal-300 text-xs">{roleLabels[user.role] || user.role}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-teal-200 hover:bg-red-500/20 hover:text-red-300 transition-all text-sm font-medium">
          <LogOut size={16}/> Chiqish
        </button>
      </div>
    </div>
  );
}
