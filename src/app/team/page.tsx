"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import BubbleBackground from "@/components/ui/BubbleBackground";

export default function TeamPage() {
  return (
    <div
      className="min-h-screen w-full text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #7f0018 0%, #000 75%)",
      }}
    >
      <BubbleBackground />

      {/* NAVBAR */}
      <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
        <div
          className="flex items-center gap-10 px-12 py-4 rounded-full"
          style={{
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,0,0,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Link href="/dashboard" className="hover:text-red-400">
            HOME
          </Link>
          <Link href="/character" className="hover:text-red-400">
            CHARACTER
          </Link>
          <Link href="/weapon" className="hover:text-red-400">
            WEAPON
          </Link>
          <Link href="/team" className="text-red-500 font-bold">
            TEAM
          </Link>
        </div>
      </nav>

      {/* CART + PROFILE */}
      <div className="absolute right-10 top-6 flex items-center gap-4 z-50">

        {/* CART BUTTON → GO TO /cart */}
        <Link href="/cart">
          <div className="w-10 h-10 rounded-full border-2 border-red-500 bg-black/60 flex items-center justify-center hover:scale-110 transition cursor-pointer">
            <ShoppingCart size={20} />
          </div>
        </Link>

        {/* PROFILE BUTTON → GO TO /profile */}
        <Link href="/profile">
          <div className="w-12 h-12 rounded-full border-2 border-red-500 overflow-hidden relative hover:scale-110 transition cursor-pointer">
            <Image
              src="/profile.png"
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
        </Link>

      </div>

      {/* MAIN CONTENT */}
      <div className="pt-40 pb-20 px-10 relative z-20">
        <h1 className="text-5xl font-extrabold text-center mb-16">
          NOVERIA <span className="text-red-500">HYBRID</span>
        </h1>

        {/* TEAM GRID FIRST */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-20">
          {[
            { name: "FIZZYYY", img: "/paye.jpg" },
            { name: "JAY", img: "/jay.jpg" },
            { name: "MARK", img: "/mark.jpg" },
            { name: "CHRIS", img: "/chi.jpg" },
            { name: "SHIYA", img: "/shiya.jpg" },
          ].map((member, i) => (
            <div
              key={i}
              className="relative bg-black/40 border border-red-500/30 backdrop-blur-lg p-4 rounded-3xl shadow-lg hover:scale-105 transition cursor-pointer text-center animate-glow"
            >
              <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-lg font-semibold">{member.name}</p>
            </div>
          ))}
        </div>

        {/* TEAM PHOTO BELOW PLAYERS */}
        <div
          className="max-w-4xl mx-auto bg-black/40 border p-4 rounded-3xl shadow-xl relative overflow-hidden animate-glow"
          style={{
            borderColor: "rgba(255, 0, 0, 0.5)",
          }}
        >
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/gaming.jfif"
              alt="Team Photo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* GLOW ANIMATION */}
      <style jsx global>{`
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 8px rgba(255, 0, 0, 0.5),
              0 0 16px rgba(255, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 16px rgba(255, 0, 0, 0.9),
              0 0 32px rgba(255, 0, 0, 0.6);
          }
          100% {
            box-shadow: 0 0 8px rgba(255, 0, 0, 0.5),
              0 0 16px rgba(255, 0, 0, 0.3);
          }
        }

        .animate-glow {
          animation: pulseGlow 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
