"use client";

import { useState } from "react";
import Link from "next/link";

type Category = "role" | "project" | "certificate";

type CardData = {
  id: number;
  title: string;
  subtitle?: string;
  img: string;
  body: string;
  date?: string;
  category: Category;
};

export default function About() {
  const [selected, setSelected] = useState<CardData | null>(null);

  const items: CardData[] = [
    { id: 1, title: "CSC-CCS OFFICER", subtitle: "ASSISTANT AUDITOR", img: "/hero1.jfif", body: "Served as CSC-CCS Officer where I coordinated student activities...", date: "2025 – Present", category: "role" },
    { id: 2, title: "CYBERDEVS EXECUTIVE", subtitle: "AUDITOR", img: "/cyber.jfif", body: "Active member of CyberDevs...", date: "2025 – Present", category: "role" },
    { id: 5, title: "Microsoft Office Specialist", img: "/cert1.jfif", body: "Awarded for outstanding performance.", date: "January 18, 2025", category: "certificate" },
    { id: 6, title: "Python Webinar", img: "/cert2.jfif", body: "Recognized for research contribution.", date: "June 24, 2025", category: "certificate" },
    { id: 7, title: "Cloud and Code Webinar", img: "/cert3.jfif", body: "Leadership recognition.", date: "June 27, 2025", category: "certificate" },
    { id: 8, title: "BYTE 2025", img: "/cert4.jpg", body: "Completed front-end workshop.", date: "October 17, 2025", category: "certificate" },
    { id: 9, title: "SIAS Redesign", img: "/sias.jfif", body: "Redesigned a responsive e-learning platform...", date: "2025", category: "project" },
    { id: 10, title: "Aisha", img: "/aisha.jfif", body: "Smart Home Assistant", date: "2025", category: "project" },
    { id: 11, title: "Socket2me", img: "/socket2me.jfif", body: "Auditing tool for vulnerabilities...", date: "2025", category: "project" },
    { id: 12, title: "NCF Wayfinder", img: "/wayfinder.jfif", body: "Navigating app", date: "2025", category: "project" }
  ];

  const roles = items.filter((i) => i.category === "role");
  const projects = items.filter((i) => i.category === "project");
  const certs = items.filter((i) => i.category === "certificate");

  const workExperience = [
    {
      title: "Axie Scholar",
      date: "December 2021 – May 2022",
      description: "Managed digital assets and maintained performance goals as an Axie scholar."
    },
    {
      title: "Encoder – Barangay Sta. Lucia Health Center",
      date: "September 26 – October 31, 2024",
      description: "Handled local health data encoding, recording, and documentation."
    }
  ];

  return (
    <>
      {/* NAVIGATION */}
      <nav className="w-full fixed top-0 left-0 z-50 flex justify-center py-6">
        <ul className="flex gap-6 bg-white/10 backdrop-blur-xl px-10 py-3 rounded-full border border-white/10">
          <li><Link href="/" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">HOME</Link></li>
          <li><Link href="/about" className="px-5 py-2 rounded-full bg-pink-400 text-black font-semibold shadow-md hover:bg-pink-300 transition">ABOUT</Link></li>
          <li><Link href="/education" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">EDUCATION</Link></li>
          <li><Link href="/hobbies" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">HOBBIES</Link></li>
          <li><Link href="/contact" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">CONTACT</Link></li>
        </ul>
      </nav>

      {/* ABOUT SECTION */}
      <section className="w-full min-h-screen text-white px-6 md:px-24 pt-40 pb-32 relative"
        style={{ background: "linear-gradient(160deg, rgba(255,43,117,0.85) 0%, rgba(10,10,10,0.95) 75%)" }}>

        {/* PROFILE */}
        <div className="absolute top-30 right-30">
          <img src="/picko.png" alt="Profile" className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover border-4 border-pink-400 shadow-2xl" />
        </div>

        <div className="max-w-5xl mx-auto">
          <p className="text-pink-300 font-semibold tracking-widest mb-2">THIS IS ME,</p>
          <h1 className="text-[40px] md:text-[55px] font-extrabold leading-tight">KARRYL FAYE C. ARAÑEZ</h1>
          <h2 className="text-[18px] md:text-[22px] font-semibold text-pink-200 mt-1">BS Information Technology | 19 YEARS OLD</h2>
          <p className="text-[16px] text-pink-200 mb-6">Zone 4, Sta. Lucia, Magarao, Camarines Sur</p>

          <p className="text-[16px] md:text-[18px] max-w-2xl leading-relaxed opacity-95">
            I am a passionate and dedicated student with a strong drive for excellence.
          </p>

          {/* SKILLS */}
          <div className="mt-8">
            <h3 className="text-[22px] font-bold text-pink-300 mb-3">Skills</h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[15px]">
              <li className="bg-white/10 px-4 py-2 rounded-lg border border-white/10">Leadership & Organizational Skills</li>
              <li className="bg-white/10 px-4 py-2 rounded-lg border border-white/10">Hardworking & Dedicated</li>
              <li className="bg-white/10 px-4 py-2 rounded-lg border border-white/10">Communication & Public Speaking</li>
              <li className="bg-white/10 px-4 py-2 rounded-lg border border-white/10">Figma Designing</li>
              <li className="bg-white/10 px-4 py-2 rounded-lg border border-white/10">Basic HTML & CSS</li>
              <li className="bg-white/10 px-4 py-2 rounded-lg border border-white/10">Gamer</li>
            </ul>
          </div>

          {/* WORK EXPERIENCE */}
          <div className="mt-10">
            <h3 className="text-[22px] font-bold text-pink-300 mb-3">Work Experience</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {workExperience.map((job, index) => (
                <div key={index} className="bg-white/10 p-4 rounded-xl border border-white/10">
                  <p className="text-lg font-semibold text-pink-200">{job.title}</p>
                  <p className="text-sm text-white/70">{job.date}</p>
                  <p className="mt-2 text-white/90 text-sm">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROLES */}
        <div className="max-w-6xl mx-auto mt-12">
          <h3 className="text-lg font-semibold mb-4">Leadership</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelected(r)}
                className="group relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="relative w-full h-44 md:h-56 bg-gray-800">
                  <img
                    src={r.img}
                    alt={r.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute left-0 bottom-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                  <p className="text-sm text-pink-300 font-semibold">{r.title}</p>
                  <p className="text-xs text-white/90">{r.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS */}
        <div className="max-w-6xl mx-auto mt-16">
          <h3 className="text-lg font-semibold mb-4">Projects</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className="group relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="w-full h-40 md:h-52 bg-gray-900">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                    <p className="text-sm text-pink-300 font-semibold">{p.title}</p>
                    <p className="text-xs text-white/90">{p.date}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CERTIFICATES */}
        <div className="max-w-9xl mx-auto mt-16 pb-12">
          <h3 className="text-lg font-semibold mb-4">Certificates</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certs.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className="group relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="w-full h-40 md:h-52 bg-gray-900">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                    <p className="text-sm text-pink-300 font-semibold">{c.title}</p>
                    <p className="text-xs text-white/90">{c.date}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL (no animation) */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center px-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-[#081018] w-full max-w-4xl rounded-2xl p-6 md:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-white/80 text-xl"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selected.img}
                className="w-full md:w-[420px] h-auto max-h-[700px] object-cover rounded-xl"
                alt={selected.title}
              />

              <div>
                <h3 className="text-2xl font-bold text-pink-300">{selected.title}</h3>
                {selected.subtitle && (
                  <p className="text-sm text-white/70">{selected.subtitle}</p>
                )}

                <p className="mt-4 text-white/90">{selected.body}</p>

                {selected.date && (
                  <p className="mt-3 text-pink-400 text-sm font-semibold">
                    📅 {selected.date}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
