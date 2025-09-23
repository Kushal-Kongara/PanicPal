// src/components/CalmBlobsBG.tsx
export default function CalmBlobsBG() {
    return (
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-black">
        <div className="blob left-[-10%] top-[-10%] h-[45vmax] w-[45vmax] bg-gradient-to-br from-cyan-400 to-blue-600" />
        <div className="blob right-[-10%] top-[20%] h-[35vmax] w-[35vmax] bg-gradient-to-br from-fuchsia-400 to-blue-500" style={{ animationDelay: "2s" }}/>
        <div className="blob left-[20%] bottom-[-10%] h-[40vmax] w-[40vmax] bg-gradient-to-br from-emerald-400 to-teal-600" style={{ animationDelay: "4s" }}/>
      </div>
    );
  }  