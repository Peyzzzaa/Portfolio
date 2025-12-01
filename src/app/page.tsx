import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* --- HERO SECTION --- */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(160deg, rgba(255,43,117,0.8) 0%, rgba(10,10,10,0.8) 70%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* ANIMATION */}
        <style>
          {`
            @keyframes floatFade {
              0% { opacity: 0.2; transform: translateY(0px); }
              50% { opacity: 0.5; transform: translateY(-12px); }
              100% { opacity: 0.2; transform: translateY(0px); }
            }
          `}
        </style>

        {/* KARRYL FAYE — ALL PINK */}
        <h1
          className="absolute top-20 text-pink-500 text-[90px] md:text-[160px] font-extrabold tracking-tight select-none opacity-70"
          style={{ animation: "floatFade 2s ease-in-out infinite" }}
        >
          KARRYL FAYE
        </h1>

        {/* ARAÑEZ — PINK */}
        <h1
          className="absolute top-[33%] text-[80px] md:text-[150px] font-extrabold tracking-tight select-none text-white opacity-70"
          style={{ animation: "floatFade 3s ease-in-out infinite" }}
        >
          ARANEZ
        </h1>

        {/* IMAGE */}
        <div className="absolute bottom-0 z-20">
          <img
            src="/profile.png"
            alt="Karryl Faye"
            className="w-[300px] md:w-[510px] drop-shadow-[0_0_40px_rgba(255,0,150,0.5)]"
          />
        </div>
      </section>
    </>
  );
}
