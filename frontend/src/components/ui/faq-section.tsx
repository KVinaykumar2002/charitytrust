"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export default function FAQWithSpiral() {
  const spiralRef = useRef<HTMLDivElement | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Spiral configuration - using orange theme for CCT
  const [cfg, setCfg] = useState({
    points: 700,
    dotRadius: 1.8,
    duration: 3.0,
    color: "#FD7E14",
    gradient: "none" as
      | "none"
      | "rainbow"
      | "sunset"
      | "ocean"
      | "fire"
      | "neon"
      | "pastel"
      | "grayscale",
    pulseEffect: true,
    opacityMin: 0.25,
    opacityMax: 0.9,
    sizeMin: 0.5,
    sizeMax: 1.4,
    background: "#000000",
  });

  // Gradient presets
  const gradients: Record<string, string[]> = useMemo(
    () => ({
      none: [],
      rainbow: ["#ff0000", "#ff9900", "#ffff00", "#00ff00", "#0099ff", "#6633ff"],
      sunset: ["#ff0000", "#ff9900", "#ffcc00"],
      ocean: ["#0066ff", "#00ccff", "#00ffcc"],
      fire: ["#ff0000", "#ff6600", "#ffcc00"],
      neon: ["#ff00ff", "#00ffff", "#ffff00"],
      pastel: ["#ffcccc", "#ccffcc", "#ccccff"],
      grayscale: ["#ffffff", "#999999", "#333333"],
    }),
    []
  );

  // Generate spiral SVG and mount
  useEffect(() => {
    if (!spiralRef.current) return;

    const SIZE = 560;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = cfg.points;
    const DOT = cfg.dotRadius;
    const CENTER = SIZE / 2;
    const PADDING = 4;
    const MAX_R = CENTER - PADDING - DOT;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(SIZE));
    svg.setAttribute("height", String(SIZE));
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    // Gradient
    if (cfg.gradient !== "none") {
      const defs = document.createElementNS(svgNS, "defs");
      const g = document.createElementNS(svgNS, "linearGradient");
      g.setAttribute("id", "spiralGradient");
      g.setAttribute("gradientUnits", "userSpaceOnUse");
      g.setAttribute("x1", "0%");
      g.setAttribute("y1", "0%");
      g.setAttribute("x2", "100%");
      g.setAttribute("y2", "100%");

      gradients[cfg.gradient].forEach((color, idx, arr) => {
        const stop = document.createElementNS(svgNS, "stop");
        stop.setAttribute("offset", `${(idx * 100) / (arr.length - 1)}%`);
        stop.setAttribute("stop-color", color);
        g.appendChild(stop);
      });

      defs.appendChild(g);
      svg.appendChild(defs);
    }

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toFixed(3));
      c.setAttribute("cy", y.toFixed(3));
      c.setAttribute("r", String(DOT));
      c.setAttribute("fill", cfg.gradient === "none" ? cfg.color : "url(#spiralGradient)");
      c.setAttribute("opacity", "0.6");

      if (cfg.pulseEffect) {
        const animR = document.createElementNS(svgNS, "animate");
        animR.setAttribute("attributeName", "r");
        animR.setAttribute("values", `${DOT * cfg.sizeMin};${DOT * cfg.sizeMax};${DOT * cfg.sizeMin}`);
        animR.setAttribute("dur", `${cfg.duration}s`);
        animR.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animR.setAttribute("repeatCount", "indefinite");
        animR.setAttribute("calcMode", "spline");
        animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
        c.appendChild(animR);

        const animO = document.createElementNS(svgNS, "animate");
        animO.setAttribute("attributeName", "opacity");
        animO.setAttribute("values", `${cfg.opacityMin};${cfg.opacityMax};${cfg.opacityMin}`);
        animO.setAttribute("dur", `${cfg.duration}s`);
        animO.setAttribute("begin", `${(frac * cfg.duration).toFixed(3)}s`);
        animO.setAttribute("repeatCount", "indefinite");
        animO.setAttribute("calcMode", "spline");
        animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
        c.appendChild(animO);
      }

      svg.appendChild(c);
    }

    spiralRef.current.innerHTML = "";
    spiralRef.current.appendChild(svg);
  }, [cfg, gradients]);

  // CCT-specific FAQ content
  const faqs = [
    {
      q: "What is Chiranjeevi Charitable Trust (CCT)?",
      a: "Chiranjeevi Charitable Trust is a non-profit organization founded in 1998, dedicated to saving lives and sight through blood donation drives, eye care programs, and corneal transplants. We operate one of the largest blood banks in Hyderabad.",
    },
    {
      q: "How can I donate blood at CCT?",
      a: "You can donate blood by visiting our blood bank at Jubilee Hills, Hyderabad, or by participating in our mobile blood donation camps. We ensure a safe, hygienic, and comfortable experience for all donors. Call 040-23554849 to schedule your donation.",
    },
    {
      q: "What are the eligibility criteria for blood donation?",
      a: "You must be 18-65 years old, weigh at least 45 kg, have hemoglobin above 12.5 g/dL, and be in good health. You should not have donated blood in the last 3 months. Our team will conduct a quick health screening before donation.",
    },
    {
      q: "How does CCT's Eye Bank work?",
      a: "Our eye bank collects, processes, and distributes corneal tissue for transplantation. We work with hospitals and eye surgeons across the region to restore vision to those suffering from corneal blindness. We've facilitated over 10,000 corneal transplants.",
    },
    {
      q: "How can I pledge to donate my eyes?",
      a: "You can pledge your eyes by filling out our eye donation pledge form on our website or at any of our camps. After pledging, inform your family about your decision so they can contact us at the time of need. Eye donation is done after natural death.",
    },
    {
      q: "Are donations to CCT tax-deductible?",
      a: "Yes, all donations to Chiranjeevi Charitable Trust are eligible for tax exemption under Section 80G of the Income Tax Act. We provide official receipts for all donations that can be used for tax filing purposes.",
    },
    {
      q: "How can I volunteer with CCT?",
      a: "We welcome volunteers for blood donation camps, awareness programs, administrative support, and community outreach. You can register as a volunteer through our website or contact us at 98497 56785 to learn about current opportunities.",
    },
    {
      q: "What programs does CCT run for the community?",
      a: "CCT runs blood donation drives, eye care camps, corneal transplant support, free health checkups, awareness programs in schools and colleges, and emergency blood supply services. We also organize mega blood donation camps during festivals and important occasions.",
    },
    {
      q: "How can organizations partner with CCT?",
      a: "Corporate partners, educational institutions, and community organizations can collaborate with us for blood donation camps, CSR initiatives, and awareness programs. Contact us to discuss partnership opportunities that align with your organization's goals.",
    },
    {
      q: "How do I contact CCT for emergencies?",
      a: "For emergency blood requirements, call our 24/7 helpline at 040-23554849 or 040-23555005. We maintain a well-stocked blood bank and coordinate with other blood banks to ensure availability of all blood groups during emergencies.",
    },
  ];

  const filtered = query
    ? faqs.filter(({ q, a }) => (q + a).toLowerCase().includes(query.toLowerCase()))
    : faqs;

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{ backgroundColor: cfg.background }}
    >
      {/* Background Spiral */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30 [mask-image:radial-gradient(circle_at_center,rgba(255,255,255,1),rgba(255,255,255,0.1)_60%,transparent_75%)]"
        style={{ mixBlendMode: "screen" }}
      >
        <div ref={spiralRef} />
      </div>

      {/* Layout */}
      <div className="relative mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-white/20 pb-6 gap-4">
          <div>
            <span className="inline-flex rounded-full border border-[#FD7E14]/30 px-4 py-1 text-sm font-medium uppercase tracking-[0.24em] text-[#FD7E14] mb-4">
              Help & Support
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-2 text-sm md:text-base text-white/70">
              Find answers about CCT's blood bank, eye care programs, and how you can help.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="h-10 w-full md:w-56 rounded-xl border border-white/20 bg-transparent px-3 text-sm outline-none transition focus:border-[#FD7E14]/60 placeholder:text-white/50"
            />
          </div>
        </header>

        {/* Content */}
        <section className="relative">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {filtered.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i + 1} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60">No questions match your search. Try different keywords.</p>
            </div>
          )}
        </section>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-white/70 mb-6">
            If you couldn't find the answer you're looking for, feel free to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:04023554849"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FD7E14] text-white rounded-xl hover:bg-[#E56B00] transition-colors font-semibold"
            >
              Call: 040-23554849
            </a>
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors font-semibold"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 pt-6 text-xs text-white/50 text-center">
          © {new Date().getFullYear()} Chiranjeevi Charitable Trust — Saving Lives & Sight Since 1998
        </footer>
      </div>
    </div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-black/40 backdrop-blur-sm p-5 transition hover:border-[#FD7E14]/40">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-3">
          <span className="text-xs text-[#FD7E14]/60">{String(index).padStart(2, "0")}</span>
          <h3 className="text-base md:text-lg font-semibold leading-tight">{q}</h3>
        </div>
        <span className="ml-4 text-[#FD7E14]/60 transition group-hover:text-[#FD7E14]">
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${
          open ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="text-sm text-white/70 leading-relaxed">{a}</p>
        </div>
      </div>

      {/* Hover halo */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div
          className="absolute -inset-1 rounded-2xl"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(253, 126, 20, 0.1), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}

