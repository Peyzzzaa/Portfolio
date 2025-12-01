"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import BubbleBackground from "@/components/ui/BubbleBackground";

export default function ProfilePage() {
  const [profile] = useState({
    name: "Karryl Faye Aranez",
    email: "kfaranez@gbox.ncf.edu.ph",
    ign: "Fizzyyy",
    phone: "09XXXXXXXXX",
  });

  const purchaseHistory = [
    {
      id: 1,
      item: "SPECTLAR",
      type: "Character",
      price: "450 CP",
      date: "December 10, 2025",
      img: "/spectlar.jpg",
    },
    {
      id: 2,
      item: "AK-47",
      type: "Weapon",
      price: "800 CP",
      date: "November 30, 2025",
      img: "/AK-47.jpg",
    },
    {
      id: 3,
      item: "SIREN",
      type: "Character",
      price: "420 CP",
      date: "November 29,2025",
      img: "/siren.jpg",
    },
  ];

  return (
    <div
      className="min-h-screen w-full text-white relative overflow-hidden animate-fadeIn"
      style={{
        background: "linear-gradient(160deg, #7f0018 0%, #000 75%)",
      }}
    >
      <BubbleBackground />

      {/* ✅ LOGOUT BUTTON UPPER-LEFT */}
      <div className="absolute top-6 left-6 z-50 animate-fadeDown">
        <Link
          href="/login"
          className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold text-lg 
          hover:bg-red-700 hover:scale-105 hover:shadow-red-500/50 shadow-lg transition"
        >
          LOGOUT
        </Link>
      </div>

      {/* NAVBAR WITHOUT PROFILE */}
      <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-40 animate-fadeDown">
        <div
          className="flex items-center gap-10 px-12 py-4 rounded-full"
          style={{
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,0,0,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Link href="/dashboard" className="hover:text-red-400 transition">
            HOME
          </Link>
          <Link href="/character" className="hover:text-red-400 transition">
            CHARACTER
          </Link>
          <Link href="/weapon" className="hover:text-red-400 transition">
            WEAPON
          </Link>
          <Link href="/team" className="hover:text-red-400 transition">
            TEAM
          </Link>
        </div>
      </nav>

      {/* CART + PROFILE ICON (right side) */}
      <div className="absolute right-10 top-6 flex items-center gap-4 z-50 animate-fadeDown">
        <Link href="/cart">
          <div className="w-10 h-10 rounded-full border-2 border-red-500 bg-black/60 flex items-center justify-center cursor-pointer hover:scale-110 transition">
            <ShoppingCart size={20} />
          </div>
        </Link>

        <Link href="/profile">
          <div className="w-12 h-12 rounded-full border-2 border-red-500 overflow-hidden relative cursor-pointer hover:scale-110 transition">
            <Image src="/profile.png" alt="profile" fill className="object-cover" />
          </div>
        </Link>
      </div>

      {/* MAIN PROFILE CONTENT */}
      <div className="pt-40 px-8 pb-20 max-w-4xl mx-auto relative z-20 animate-fadeUp">
        <h1 className="text-5xl font-extrabold text-center mb-12 tracking-wider">
          YOUR <span className="text-red-500">PROFILE</span>
        </h1>

        <div className="bg-black/60 border border-red-600/30 p-10 rounded-2xl shadow-xl backdrop-blur-md">
          <div className="flex justify-center mb-10">
            <div className="w-40 h-40 rounded-full border-4 border-red-500 overflow-hidden relative shadow-lg hover:scale-105 transition">
              <Image src="/profile.png" alt="Profile" fill className="object-cover" />
            </div>
          </div>

          <div className="space-y-7">
            {[
              { label: "Full Name", value: profile.name },
              { label: "Email Address", value: profile.email },
              { label: "In-Game Name", value: profile.ign },
              { label: "Phone Number", value: profile.phone },
            ].map((item, index) => (
              <div key={index}>
                <p className="text-sm text-gray-400">{item.label}</p>
                <p className="text-2xl font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PURCHASE HISTORY */}
        <h2 className="text-4xl font-bold mt-16 mb-6 text-center tracking-wider">
          PURCHASE <span className="text-red-500">HISTORY</span>
        </h2>

        <div className="space-y-5">
          {purchaseHistory.map((item) => (
            <div
              key={item.id}
              className="bg-black/50 border border-red-600/30 p-5 rounded-xl flex items-center gap-5 
              hover:bg-black/70 hover:scale-[1.02] transition cursor-pointer"
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden relative border border-red-500">
                <Image src={item.img} alt={item.item} fill className="object-cover" />
              </div>

              <div className="flex-1">
                <p className="text-xl font-bold tracking-wide">{item.item}</p>
                <p className="text-sm text-gray-400">{item.type}</p>
              </div>

              <div className="text-right">
                <p className="text-red-400 font-bold text-lg">{item.price}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ANIMATIONS */
const styles = `
@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn { animation: fadeIn .8s ease-out; }
.animate-fadeUp { animation: fadeUp .8s ease-out; }
.animate-fadeDown { animation: fadeDown .8s ease-out; }
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = styles;
  document.head.appendChild(style);
}
