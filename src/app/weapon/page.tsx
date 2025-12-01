"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, CreditCard } from "lucide-react";
import BubbleBackground from "@/components/ui/BubbleBackground";

type Weapon = {
  name: string;
  img: string;
  price: string;
};

export default function WeaponPage() {
  const weapons: Weapon[] = [
    { name: "AK-47", img: "/AK-47.jpg", price: "₱800" },
    { name: "AK117", img: "/ak117.jpg", price: "₱1,499" },
    { name: "KILO", img: "/kilo.jpg", price: "₱2,000" },
    { name: "ODEN", img: "/oden.jpg", price: "₱999" },
    { name: "STRIKER", img: "/striker.jpg", price: "₱399" },
    { name: "PISTOL", img: "/pistol.jpg", price: "₱299" },
  ];

  const [cart, setCart] = useState<any[]>([]);
  const [modal, setModal] = useState({ show: false, message: "" });

  useEffect(() => {
    const saved = localStorage.getItem("cart-items");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const saveCart = (items: any[]) => {
    setCart(items);
    localStorage.setItem("cart-items", JSON.stringify(items));
  };

  const openModal = (msg: string) => setModal({ show: true, message: msg });
  const closeModal = () => setModal({ show: false, message: "" });

  const handleAddToCart = (weapon: Weapon) => {
    const already = cart.some((item) => item.name === weapon.name);
    if (already) {
      openModal("This weapon is already in your cart.");
      return;
    }
    saveCart([...cart, { ...weapon, type: "weapon" }]);
    openModal("Added to cart successfully!");
  };

  const buyNow = (weapon: Weapon) => {
    saveCart([{ ...weapon, type: "weapon" }]);
    window.location.href = "/checkout";
  };

  return (
    <div
      className="min-h-screen w-full text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #7f0018 0%, #000 75%)",
      }}
    >
      <BubbleBackground />

      {/* NAVIGATION BAR */}
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
          <Link href="/weapon" className="text-red-500 font-bold">
            WEAPON
          </Link>
          <Link href="/team" className="hover:text-red-400">
            TEAM
          </Link>
        </div>
      </nav>

      {/* CART + PROFILE */}
      <div className="absolute right-10 top-6 flex items-center gap-4 z-50">
        {/* CART */}
        <Link href="/cart">
          <div className="relative w-10 h-10 rounded-full border-2 border-red-500 bg-black/60 flex items-center justify-center cursor-pointer">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </div>
        </Link>

        {/* PROFILE */}
        <div className="w-12 h-12 rounded-full border-2 border-red-500 overflow-hidden relative">
          <Image src="/profile.png" alt="profile" fill className="object-cover" />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="pt-32 pb-20 px-10 relative z-20">

        {/* ⭐ CENTERED TITLE (UPDATED) ⭐ */}
        <div className="w-full flex justify-center text-center">
          <h1 className="text-4xl font-extrabold mb-12 glitch-container">
            CHOOSE YOUR <span className="glitch text-red-500">WEAPON</span>
          </h1>
        </div>

        {/* WEAPON GRID */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {weapons.map((gun, index) => (
            <div
              key={index}
              className="bg-black/50 border border-red-500/30 rounded-3xl backdrop-blur-lg p-4 hover:scale-105 transition"
            >
              <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                <Image src={gun.img} alt={gun.name} fill className="object-cover" />
              </div>

              <div className="flex justify-between items-center mt-4">
                <h2 className="text-xl font-bold">{gun.name}</h2>
                <p className="text-red-400 font-semibold">{gun.price}</p>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleAddToCart(gun)}
                  className="w-1/2 bg-red-600 hover:bg-red-700 py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>

                <button
                  onClick={() => buyNow(gun)}
                  className="w-1/2 bg-yellow-600 hover:bg-yellow-500 py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} /> Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP */}
      {modal.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-[#111] border border-green-400/40 p-8 rounded-3xl w-[380px] text-center shadow-xl animate-fadeIn">
            <h2 className="text-green-300 font-bold text-xl mb-3">
              {window.location.host} says
            </h2>
            <p className="text-white mb-6">{modal.message}</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={closeModal}
                className="px-5 py-2 rounded-full bg-green-400 text-black font-bold hover:bg-green-300 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
