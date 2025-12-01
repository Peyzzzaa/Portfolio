"use client"; 

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import BubbleBackground from "@/components/ui/BubbleBackground";

type CartItem = {
  name: string;
  price: string;
  img: string;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [payment, setPayment] = useState<string>("gcash");
  const [isPaying, setIsPaying] = useState(false);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    idNumber: "",
    ign: "",
    phone: "",
    reference: "",
  });

  // Load Cart
  useEffect(() => {
    const saved = localStorage.getItem("cart-items");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const subtotal = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ""));
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  const total = subtotal;

  const handleQRUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setQrImage(URL.createObjectURL(file));
  };

  // Only numbers
  const handleNumericInput = (value: string, max: number) => {
    return value.replace(/\D/g, "").slice(0, max);
  };

  // ⭐ UPDATED FUNCTION WITH DASHBOARD REDIRECT ⭐
  const handlePay = () => {
    if (!form.idNumber || !form.ign || !form.phone || !form.reference) {
      alert("Please fill out all fields including Reference Number.");
      return;
    }

    if (!qrImage) {
      alert("Please upload your QR receipt.");
      return;
    }

    setIsPaying(true);

    setTimeout(() => {
      localStorage.removeItem("cart-items");

      setShowSuccess(true);

      setTimeout(() => {
        // ⭐ FIXED: Redirect to dashboard after successful payment
        window.location.href = "/dashboard";
      }, 1800);
    }, 1800);
  };

  return (
    <div
      className="min-h-screen w-full text-white relative overflow-hidden animate-fadeIn"
      style={{
        background: "linear-gradient(160deg, #7f0018 0%, #000 75%)",
      }}
    >
      <BubbleBackground />

      {/* NAVBAR */}
      <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-50 animate-fadeDown">
        <div
          className="flex items-center gap-10 px-12 py-4 rounded-full"
          style={{
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,0,0,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Link href="/dashboard" className="hover:text-red-400 transition">HOME</Link>
          <Link href="/character" className="hover:text-red-400 transition">CHARACTER</Link>
          <Link href="/weapon" className="hover:text-red-400 transition">WEAPON</Link>
          <Link href="/team" className="hover:text-red-400 transition">TEAM</Link>
        </div>
      </nav>

      {/* CART + PROFILE */}
      <div className="absolute right-10 top-6 flex items-center gap-4 z-50 animate-fadeDown">
        <div className="w-10 h-10 rounded-full border-2 border-red-500 bg-black/60 flex items-center justify-center">
          <ShoppingCart size={20} />
        </div>

        <div className="w-12 h-12 rounded-full border-2 border-red-500 overflow-hidden relative">
          <Image src="/profile.png" alt="profile" fill className="object-cover" />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="pt-40 pb-20 px-10 relative z-20 max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-16 animate-fadeUp">
          CHECKOUT <span className="text-red-500">ORDER</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-10 animate-fadeUp">

          {/* LEFT */}
          <div className="bg-black/60 p-6 rounded-xl border border-red-600/20">
            <h2 className="text-xl mb-4 font-semibold">Customer Information</h2>

            <input
              type="text"
              placeholder="UID / ID Number"
              className="w-full mb-3 p-3 rounded bg-black/40 border border-red-500/40"
              value={form.idNumber}
              onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
            />

            <input
              type="text"
              placeholder="IGN (In-Game Name)"
              className="w-full mb-3 p-3 rounded bg-black/40 border border-red-500/40"
              value={form.ign}
              onChange={(e) => setForm({ ...form, ign: e.target.value })}
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full mb-3 p-3 rounded bg-black/40 border border-red-500/40"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: handleNumericInput(e.target.value, 11),
                })
              }
            />

            <input
              type="text"
              placeholder={`Enter ${payment.toUpperCase()} Reference Number`}
              className="w-full mb-3 p-3 rounded bg-black/40 border border-red-500/40"
              value={form.reference}
              onChange={(e) =>
                setForm({
                  ...form,
                  reference: handleNumericInput(e.target.value, 13),
                })
              }
            />

            <h2 className="text-xl mt-6 mb-4 font-semibold">Payment Method</h2>

            <div className="flex gap-4">
              {["gcash", "paymaya"].map((method) => (
                <button
                  key={method}
                  className={`px-4 py-2 rounded-lg border transition ${
                    payment === method
                      ? "border-red-400 bg-red-400/20"
                      : "border-white/20"
                  }`}
                  onClick={() => setPayment(method)}
                >
                  {method.toUpperCase()}
                </button>
              ))}
            </div>

            <h2 className="text-xl mt-6 mb-3 font-semibold">Upload QR Payment</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleQRUpload}
              className="w-full p-2 bg-black/40 border border-red-500/40 rounded"
            />

            {qrImage && (
              <div className="mt-4 animate-fadeIn">
                <p className="text-sm text-white/60 mb-2">Uploaded QR:</p>
                <img src={qrImage} className="w-40 rounded-lg border border-red-500/40" />
              </div>
            )}

            <button
              onClick={handlePay}
              disabled={isPaying}
              className="w-full mt-6 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold transition flex justify-center items-center gap-3"
            >
              {isPaying ? (
                <>
                  <div className="loader"></div>
                  Processing...
                </>
              ) : (
                `Pay ₱${total}`
              )}
            </button>
          </div>

          {/* RIGHT */}
          <div className="bg-black/60 p-6 rounded-xl border border-red-600/20">
            <h2 className="text-xl mb-4 font-semibold">Order Summary</h2>

            {cart.map((item, i) => (
              <div
                key={i}
                className="flex justify-between mb-3 pb-2 border-b border-red-500/20"
              >
                <p className="font-semibold">{item.name}</p>
                <p className="text-red-400">{item.price}</p>
              </div>
            ))}

            <div className="mt-6 pt-4 border-t border-red-500/20">
              <h3 className="font-bold text-lg mb-2">Customer Info</h3>

              <p>ID Number: <span className="text-red-400">{form.idNumber || "-"}</span></p>
              <p>IGN: <span className="text-red-400">{form.ign || "-"}</span></p>
              <p>Phone: <span className="text-red-400">{form.phone || "-"}</span></p>
              <p>Reference No: <span className="text-red-400">{form.reference || "-"}</span></p>

              <p className="mt-2">
                Payment: <span className="text-red-400">{payment.toUpperCase()}</span>
              </p>
            </div>

            <div className="border-t border-red-500/20 mt-6 pt-4">
              <p className="flex justify-between text-lg">
                <span>Subtotal</span> <span>₱{subtotal}</span>
              </p>

              <p className="flex justify-between text-2xl font-bold mt-3">
                <span>Total</span> <span>₱{total}</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-[999] animate-fadeIn">
          <div className="success-box">
            <div className="success-check">✔</div>
          </div>
          <h1 className="text-3xl mt-6 font-bold text-green-400 animate-fadeUp">
            PAYMENT SUCCESSFUL
          </h1>
        </div>
      )}
    </div>
  );
}

/* EXTRA STYLES */
const styles = `
@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulseGlow {
  0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(0,255,0,0.4); }
  50% { transform: scale(1.15); box-shadow: 0 0 35px rgba(0,255,0,0.7); }
}

.animate-fadeIn { animation: fadeIn .8s ease-out; }
.animate-fadeUp { animation: fadeUp .8s ease-out; }

.loader {
  width: 18px;
  height: 18px;
  border: 3px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin .6s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.success-box {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(0,255,0,0.15);
  border: 4px solid green;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: pulseGlow 1.8s infinite;
}

.success-check {
  font-size: 60px;
  color: #00ff6a;
  font-weight: bold;
}
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = styles;
  document.head.appendChild(style);
}
