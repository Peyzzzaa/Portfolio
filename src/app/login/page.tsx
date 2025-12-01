"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { saveToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { API_BASE } from "@/lib/config";
import { Eye, EyeOff, User, Lock } from "lucide-react";

// ✅ FIX: Define API response type
type LoginResponse = {
  accessToken?: string;
  message?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    // Wake up Render server
    await fetch(API_BASE, { method: "GET" }).catch(() => {});

    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    let data: LoginResponse;

    try {
      data = await res.json();
    } catch {
      setError("Server error. Try again.");
      return;
    }

    // ❌ Invalid credentials
    if (!res.ok || !data.accessToken) {
      setError(data.message || "Invalid username or password.");
      return;
    }

    // ✅ Save token
    saveToken(data.accessToken);

    // Go to dashboard
    router.push("/dashboard");
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-black"
      style={{ backgroundImage: "url('/cod.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="absolute top-4 right-4 text-right z-20">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-red-500 drop-shadow-lg">
          FIZZYYY
        </h1>
        <p className="text-sm sm:text-lg font-semibold text-gray-300 drop-shadow-lg">
          CALL OF DUTY STORE
        </p>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-10 w-[380px] md:w-[420px] xl:w-[450px] z-20">
        <div className="bg-black/85 backdrop-blur-md rounded-2xl shadow-2xl border border-red-600/60 p-8 md:p-10 animate-glow-red">
          <h2 className="text-center text-4xl font-bold text-red-500 drop-shadow">
            Welcome Soldier!
          </h2>
          <p className="text-center text-gray-300 text-md mb-6">
            Login to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 pl-11 bg-black/40 border border-red-600/40 rounded-xl text-white focus:ring-2 focus:ring-red-600 outline-none"
              />
              <User className="absolute left-3 top-3 text-red-500" size={18} />
            </div>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-11 pr-10 bg-black/40 border border-red-600/40 rounded-xl text-white focus:ring-2 focus:ring-red-600 outline-none"
              />
              <Lock className="absolute left-3 top-3 text-red-500" size={18} />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-red-400"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <Button
              className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl text-lg font-semibold text-white"
              type="submit"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              className="text-red-400 hover:text-red-300 underline"
              onClick={() => router.push("/register")}
            >
              Create an account
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes glowRed {
            0% { box-shadow: 0 0 10px rgba(255,0,0,0.4); }
            50% { box-shadow: 0 0 20px rgba(255,0,0,1); }
            100% { box-shadow: 0 0 10px rgba(255,0,0,0.4); }
          }
          .animate-glow-red {
            animation: glowRed 2s infinite;
          }
        `}
      </style>
    </div>
  );
}
