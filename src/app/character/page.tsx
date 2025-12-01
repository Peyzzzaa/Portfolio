"use client";

import Image from "next/image";
import Link from "next/link";
import BubbleBackground from "@/components/ui/BubbleBackground";
import { ShoppingCart, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

// Types for items
type Character = {
  name: string;
  img: string;
  price: string;
  type?: string;
};

export default function CharacterPage() {
  const characters: Character[] = [
    { name: "FIONA", img: "/fiona.jpg", price: "₱350" },
    { name: "GHOST", img: "/ghost.jpg", price: "₱500" },
    { name: "SIREN", img: "/siren.jpg", price: "₱420" },
    { name: "SOPHIA", img: "/sophia.jpg", price: "₱390" },
    { name: "SPECTLAR", img: "/spectlar.jpg", price: "₱450" },
    { name: "SPECTRE", img: "/spectre.jpg", price: "₱470" },
  ];

  const [cart, setCart] = useState<Character[]>([]);
  const [popup, setPopup] = useState({ show: false, message: "" });

  useEffect(() => {
    const saved = localStorage.getItem("cart-items");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const closePopup = () => {
    setPopup({ show: false, message: "" });
  };

  const addToCart = (item: Character) => {
    const exists = cart.some((c) => c.name === item.name);

    if (exists) {
      setPopup({ show: true, message: "This character is already in your cart." });
      return;
    }

    const updated = [...cart, { ...item, type: "character" }];
    setCart(updated);
    localStorage.setItem("cart-items", JSON.stringify(updated));

    setPopup({ show: true, message: "Added to cart successfully!" });
  };

  const buyNow = (item: Character) => {
    const updated = [{ ...item, type: "character" }];
    setCart(updated);
    localStorage.setItem("cart-items", JSON.stringify(updated));
    window.location.href = "/checkout";
  };

  return (
    <div
      className="min-h-screen w-full text-white relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #7f0018 0%, #000 75%)" }}
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
          <Link href="/dashboard" className="hover:text-red-400">HOME</Link>
          <Link href="/character" className="text-red-500 font-bold">CHARACTER</Link>
          <Link href="/weapon" className="hover:text-red-400">WEAPON</Link>
          <Link href="/team" className="hover:text-red-400">TEAM</Link>
        </div>
      </nav>

      {/* TOP RIGHT ICONS */}
      <div className="absolute right-10 top-6 flex items-center gap-4 z-50">

        {/* Cart Icon */}
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

        {/* Profile */}
        <Link href="/profile">
          <div className="w-12 h-12 rounded-full border-2 border-red-500 overflow-hidden hover:scale-110 transition">
            <img src="/profile.png" className="w-full h-full object-cover" />
          </div>
        </Link>

      </div>

      {/* MAIN TITLE */}
      <div className="pt-32 pb-10 px-10 relative z-20 flex justify-center">
        <h1 className="text-4xl font-extrabold glitch-container text-center">
          CHOOSE YOUR <span className="glitch text-red-500">CHARACTER</span>
        </h1>
      </div>

      {/* CHARACTER GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-20 px-10 pb-20">
        {characters.map((char, index) => (
          <div
            key={index}
            className="bg-black/50 border border-red-500/30 rounded-3xl backdrop-blur-lg p-4 hover:scale-105 transition shadow-[0_0_20px_rgba(255,0,0,0.25)]"
          >
            <div className="relative w-full h-64 rounded-2xl overflow-hidden">
              <Image
                src={char.img}
                alt={char.name}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <h2 className="text-xl font-bold">{char.name}</h2>
              <p className="text-red-400 font-semibold">{char.price}</p>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => addToCart(char)}
                className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>

              <button
                onClick={() => buyNow(char)}
                className="flex-1 bg-yellow-600 hover:bg-yellow-500 py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2"
              >
                <CreditCard size={18} /> Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-[#111] border border-green-400/40 p-8 rounded-3xl w-[400px] text-center shadow-xl animate-fadeIn">

            <h2 className="text-green-300 font-bold text-xl mb-3">
              {typeof window !== "undefined" ? window.location.host + " says" : "Message"}
            </h2>

            <p className="text-white mb-6">{popup.message}</p>

            <button
              onClick={closePopup}
              className="px-6 py-2 rounded-full bg-green-400 text-black font-bold hover:bg-green-300 transition"
            >
              OK
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
