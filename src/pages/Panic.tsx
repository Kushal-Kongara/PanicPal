export default function Panic() {
  return (
    <main className="relative z-10 min-h-screen bg-black text-white flex items-center justify-center px-6">
      {/* Center wrapper */}
      <section aria-label="Panic Support Voice Agent" className="w-full max-w-2xl">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Panic Support</h1>
            <p className="text-white/70 text-sm md:text-base">Stay calm. A voice agent will guide you here.</p>
          </div>

          {/* Glowing orb */}
          <div className="relative">
            {/* soft outer glow */}
            <div className="absolute -inset-10 rounded-full blur-3xl opacity-60 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.25),rgba(56,189,248,0.2)_40%,transparent_70%)]" />

            {/* animated ring */}
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              <div className="absolute inset-0 rounded-full opacity-90 bg-[conic-gradient(from_0deg_at_50%_50%,#a855f7_0%,#22d3ee_25%,#f472b6_50%,#60a5fa_75%,#a855f7_100%)] animate-[spin_12s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full bg-black" />
              {/* highlight streak */}
              <div className="absolute left-6 bottom-6 h-1/2 w-1/2 rounded-full blur-xl opacity-70 bg-[radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.6),transparent_60%)]" />
            </div>
          </div>

          {/* CTA placeholder for VAPI hook */}
          <div className="flex items-center gap-3">
            <button className="rounded-full bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur px-5 py-2 text-sm transition">Tap to Speak</button>
            <span className="text-white/50 text-sm">voice agent coming soon</span>
          </div>
        </div>
      </section>
    </main>
  );
}
  