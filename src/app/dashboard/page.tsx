"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import BubbleBackground from "@/components/ui/BubbleBackground";

type Item = { name: string; img: string; price: string };
type Weapon = { name: string; img: string; price: string };

export default function Dashboard() {
  /* CHARACTER ITEMS */
  const items: Item[] = [
    { name: "FIONA", img: "/fiona.jpg", price: "1,350 CP" },
    { name: "SIREN", img: "/siren.jpg", price: "1,499 CP" },
    { name: "SPECTLAR", img: "/spectlar.jpg", price: "1,450 CP" },
    { name: "SPECTRE", img: "/spectre.jpg", price: "2,470 CP" },
    { name: "SOPHIA", img: "/sophia.jpg", price: "1,870 CP" }
  ];

  /* WEAPONS */
  const weapons: Weapon[] = [
    { name: "AK-47", img: "/AK-47.jpg", price: "800 CP" },
    { name: "AK117", img: "/ak117.jpg", price: "1,499 CP" },
    { name: "KILO", img: "/kilo.jpg", price: "2,000 CP" },
    { name: "ODEN", img: "/oden.jpg", price: "999 CP" },
    { name: "STRIKER", img: "/striker.jpg", price: "399 CP" }
  ];

  /* ------------ hydration-safe client state ------------ */
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [weaponIndex, setWeaponIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  /* ---------- mount and localStorage (client-only) ---------- */
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("cart-items");
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {
      // ignore localStorage errors
    }
  }, []);

  /* ---------- responsive visibleCount ---------- */
  useEffect(() => {
    if (!mounted) return;
    function updateVisible() {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    }
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, [mounted]);

  /* ---------- auto-slide carousel (client-only) ---------- */
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 3000);
    return () => clearInterval(id);
  }, [mounted, items.length]);

  const translatePercent = () => {
    return -(index * (100 / visibleCount));
  };

  /* ---------- auto-slide weapon preview (client-only) ---------- */
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => {
      setWeaponIndex((i) => (i + 1) % weapons.length);
    }, 2500);
    return () => clearInterval(id);
  }, [mounted, weapons.length]);

  /* ---------- cart count helper (safe) ---------- */
  const cartCount = mounted ? cart.length : undefined;

  /* ---------- JSX ---------- */
  return (
    <div className="min-h-screen w-full text-white relative overflow-hidden" style={{ background: "linear-gradient(160deg, #7f0018 0%, #000 75%)" }}>
      <BubbleBackground />

      {/* Top Left Title */}
      <div className="absolute top-9 left-10 z-50">
        <h1 className="text-2xl font-extrabold tracking-wide">DASHBOARD</h1>
      </div>

      {/* NAVBAR */}
      <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-10 px-12 py-4 rounded-full" style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,0,0,0.4)", backdropFilter: "blur(8px)" }}>
          <Link href="/dashboard" className="text-red-500 font-bold">HOME</Link>
          <Link href="/character" className="hover:text-red-400">CHARACTER</Link>
          <Link href="/weapon" className="hover:text-red-400">WEAPON</Link>
          <Link href="/team" className="hover:text-red-400">TEAM</Link>
        </div>
      </nav>

      {/* RIGHT BUTTONS */}
      <div className="absolute right-8 top-6 flex items-center gap-4 z-50">
        <Link href="/cart" aria-label="Open cart">
          <div className="relative w-10 h-10 rounded-full border-2 border-red-500 bg-black/50 flex items-center justify-center hover:scale-110 transition">
            <ShoppingCart size={18} />
            {typeof cartCount === "number" && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>
            )}
          </div>
        </Link>

        <Link href="/profile">
          <div className="w-12 h-12 rounded-full border-2 border-red-500 overflow-hidden hover:scale-110 transition cursor-pointer">
            <img src="/profile.png" className="w-full h-full object-cover" alt="profile" />
          </div>
        </Link>
      </div>

      {/* WEAPON PREVIEW */}
      <div className="absolute right-10 top-24 w-[500px] h-[230px] z-40">
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-red-700 shadow-xl">
          <img src={weapons[weaponIndex].img} alt={weapons[weaponIndex].name} className="w-full h-full object-cover transition-all duration-700" />
          <div className="absolute bottom-0 w-full bg-black/60 p-3 flex justify-between items-center px-4 text-lg font-bold">
            <span>{weapons[weaponIndex].name}</span>
            <span className="text-red-300 text-sm font-semibold">{weapons[weaponIndex].price}</span>
          </div>
        </div>
      </div>

      {/* WELCOME TEXT */}
      <div className="pt-30 px-12 md:px-20 relative z-20 max-w-3xl">
        <h2 className="text-6xl font-extrabold leading-tight">WELCOME <span className="text-red-400">SOLDIER!</span></h2>
        <p className="mt-4 text-lg text-gray-200 max-w-xl">
          Fresh weapons, lethal loadouts, and powerful heroes have arrived in the armory.
          Explore the store and gear up with premium weapons, elite operators, and tactical equipment designed for every mission.
          Your next victory starts here — equip the best and dominate the battlefield.
        </p>
      </div>

      {/* CHARACTER SLIDER */}
      <section className="mt-16 px-6 md:px-12 pb-28 relative z-20">
        <div className="relative max-w-full mx-auto">
          <button onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-black/40 border border-red-500/60 flex items-center justify-center hover:scale-110 transition">
            <ChevronLeft size={20} />
          </button>

          <button onClick={() => setIndex((i) => (i + 1) % items.length)} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-black/40 border border-red-500/60 flex items-center justify-center hover:scale-110 transition">
            <ChevronRight size={20} />
          </button>

          <div className="overflow-hidden">
            <div className="flex gap-6 transition-transform duration-700" style={mounted ? { transform: `translateX(${translatePercent()}%)`, padding: "18px 24px" } : { padding: "18px 24px" }}>
              {items.map((item, idx) => (
                <article key={idx} className="min-w-[260px] md:min-w-[320px] rounded-2xl bg-black/50 border border-red-600/40 shadow-2xl overflow-hidden">
                  <div className="w-full h-[260px] relative">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 bg-black/70">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold">{item.name}</h4>
                      <span className="text-sm text-red-300 font-semibold">{item.price}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            {items.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} className={i === index ? "w-3 h-3 rounded-full bg-red-400" : "w-3 h-3 rounded-full bg-white/30"} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
