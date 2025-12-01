"use client";

import { useEffect, useState } from "react";

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState<
    { size: number; left: number; delay: number }[]
  >([]);

  useEffect(() => {
    const arr = Array.from({ length: 20 }, () => ({
      size: Math.random() * 40 + 10, // 10–50px
      left: Math.random() * 100,     // 0%–100%
      delay: Math.random() * 5,      // 0–5s
    }));
    setBubbles(arr);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute bg-red-800/20 rounded-full animate-bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
