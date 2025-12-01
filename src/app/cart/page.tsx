"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import BubbleBackground from "@/components/ui/BubbleBackground";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart-items");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Remove item by name
  const removeItem = (name) => {
    const updated = cart.filter((item) => item.name !== name);
    setCart(updated);
    localStorage.setItem("cart-items", JSON.stringify(updated));
  };

  // FIX: Convert ANY price (₱350 / 350 CP / ₱350 CP)
  const subtotal = cart.reduce((sum, item) => {
    const numeric = parseInt(item.price.replace(/\D/g, "")); // FIXED
    return sum + (isNaN(numeric) ? 0 : numeric);
  }, 0);

  const delivery = subtotal > 0 ? 50 : 0;
  const total = subtotal + delivery;

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
          className="flex items-center gap-10 px-12 py-4 rounded-full border border-red-500/40"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 25px rgba(255,0,0,0.4)",
          }}
        >
          <Link href="/dashboard" className="hover:text-red-400">HOME</Link>
          <Link href="/character" className="hover:text-red-400">CHARACTER</Link>
          <Link href="/weapon" className="hover:text-red-400">WEAPON</Link>
          <Link href="/team" className="hover:text-red-400">TEAM</Link>
        </div>
      </nav>

      {/* CART + PROFILE */}
      <div className="absolute right-10 top-6 flex items-center gap-4 z-50">

        {/* CART ICON */}
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

        {/* PROFILE ICON (RESTORED) */}
        <Link href="/profile">
          <div className="w-12 h-12 rounded-full border-2 border-red-500 overflow-hidden relative cursor-pointer">
            <Image src="/profile.png" alt="profile" fill className="object-cover" />
          </div>
        </Link>
      </div>

      {/* PAGE CONTENT */}
      <div className="pt-40 pb-20 px-10 relative z-20 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">

        {/* LEFT: CART ITEMS */}
        <div
          className="flex-1 bg-black/40 border border-red-500/40 rounded-3xl backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 25px rgba(255,0,0,0.3)" }}
        >
          <h2 className="text-3xl font-bold mb-6">My Cart ({cart.length})</h2>

          {cart.length === 0 && (
            <p className="text-lg opacity-80">Your cart is empty.</p>
          )}

          <div className="space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex gap-5 bg-black/50 border border-red-500/30 rounded-xl p-5"
              >
                {/* IMAGE */}
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-red-500/40">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-red-400 text-lg">{item.price}</p>
                  </div>

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => removeItem(item.name)}
                    className="text-red-500 hover:text-red-400 flex items-center gap-2 font-semibold"
                  >
                    <Trash2 size={18} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div
          className="w-full lg:w-80 bg-black/40 border border-red-500/40 rounded-3xl backdrop-blur-xl p-6 h-fit"
          style={{ boxShadow: "0 0 25px rgba(255,0,0,0.4)" }}
        >
          <h2 className="text-2xl font-bold mb-6">Check Out Summary</h2>

          <div className="space-y-4 text-lg">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₱{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Charge Fee</span>
              <span>₱{delivery}</span>
            </div>

            <div className="border-t border-red-500/30 pt-4 flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span className="text-red-400">{total} CP</span>
            </div>
          </div>

          {/* CHECKOUT */}
          <Link href="/checkout">
            <button className="mt-6 w-full py-4 bg-red-600 hover:bg-red-700 rounded-xl text-lg font-bold">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
