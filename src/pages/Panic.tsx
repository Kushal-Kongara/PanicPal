import { VapiButton } from "../components/VapiButton";
import { useVapi } from "../hooks/useVapi";
import CalmBlobsBG from "@/components/CalmBlobsBG";

export default function Panic() {
  const { isSessionActive, isLoading } = useVapi({
    publicKey: import.meta.env.VITE_VAPI_PUBLIC_KEY || "",
    assistantId: import.meta.env.VITE_VAPI_ASSISTANT_ID || "",
    baseUrl: import.meta.env.VITE_VAPI_BASE_URL,
  });

  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Center wrapper */}
      <section
        aria-label="Panic Support Voice Agent"
        className="w-full max-w-4xl flex flex-col items-center text-center"
      >
        <div className="space-y-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Panic Support
          </h1>
          <p className="text-white/70 text-sm md:text-base">
            Stay calm. A voice agent will guide you here.
          </p>
        </div>

        {/* Orb - purely visual element */}
        <div className="relative flex items-center justify-center -mt-24">
          {/* Soft outer glow */}
          <div className="absolute -inset-16 rounded-full blur-3xl opacity-50 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.3),rgba(56,189,248,0.25)_40%,transparent_70%)]" />

          {/* Orb container - visual only */}
          <div className="relative h-80 w-80 md:h-96 md:w-96">
            <CalmBlobsBG />
          </div>
        </div>

        {/* Start Call Button - positioned below orb */}
        <div className="mt-26">
          <VapiButton
            className={`
              px-8 py-4 rounded-full text-white font-medium text-lg
              backdrop-blur-md border transition-all duration-300 ease-in-out
              shadow-lg hover:shadow-xl transform hover:scale-105
              ${
                isSessionActive
                  ? "bg-red-500/20 border-red-400/50 hover:bg-red-500/30 text-red-100 animate-pulse"
                  : "bg-white/10 border-white/30 hover:bg-white/20 text-white"
              }
            `}
          />
        </div>

        {/* Status indicator - completely separate from orb */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            {isLoading
              ? "Connecting..."
              : isSessionActive
              ? "Voice agent active"
              : "Tap to speak with voice agent"}
          </p>
        </div>
      </section>
    </main>
  );
}
