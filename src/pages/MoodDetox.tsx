import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { Play, Pause, Volume2, Waves, Sparkles } from "lucide-react";

type Track = { id: string; name: string; src: string };

const tracks: Track[] = [
  { id: "rain",  name: "Gentle Rain", src: "/audio/rain.mp3" },
  { id: "ocean", name: "Ocean Waves", src: "/audio/waves.mp3" },
  { id: "brown", name: "Brown Noise", src: "/audio/brown-noise.mp3" },
];

function CalmBlobsBG() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-black">
      {/* floating, blurred gradient blobs */}
      <div className="blob left-[-10%] top-[-10%] h-[45vmax] w-[45vmax] bg-gradient-to-br from-cyan-400 to-blue-600" />
      <div className="blob right-[-10%] top-[20%] h-[35vmax] w-[35vmax] bg-gradient-to-br from-fuchsia-400 to-blue-500"
           style={{ animationDelay: "2s" }}/>
      <div className="blob left-[20%] bottom-[-10%] h-[40vmax] w-[40vmax] bg-gradient-to-br from-emerald-400 to-teal-600"
           style={{ animationDelay: "4s" }}/>
    </div>
  );
}

function BreathGuide({ enabled }: { enabled: boolean }) {
  // subtle “inhale/exhale” circle using CSS animation
  return (
    <div className={`relative grid place-items-center ${enabled ? "opacity-100" : "opacity-0"} transition-opacity`}>
      <div
        className="h-28 w-28 rounded-full bg-white/10 ring-1 ring-white/20"
        style={{
          animation: enabled ? "breathe 8s ease-in-out infinite" : undefined,
        }}
      />
      <style>{`
        @keyframes breathe {
          0% { transform: scale(1); }
          25% { transform: scale(1.12); }   /* inhale */
          50% { transform: scale(1.2); }
          75% { transform: scale(1.12); }   /* exhale */
          100% { transform: scale(1); }
        }
      `}</style>
      <div className="mt-3 text-xs text-white/60">Breathe in • Hold • Breathe out • Hold</div>
    </div>
  );
}

export default function MoodDetox() {
  const [selected, setSelected] = useState<string>(tracks[0].id);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(70);
  const [loop, setLoop] = useState(true);
  const [showBreath, setShowBreath] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const current = useMemo(
    () => tracks.find(t => t.id === selected) ?? tracks[0],
    [selected]
  );

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.loop = loop;
  }, [loop]);

  useEffect(() => {
    // load new src on track change
    if (!audioRef.current) return;
    audioRef.current.src = current.src;
    if (playing) {
      audioRef.current.play().catch(() => setPlaying(false));
    }
  }, [current, playing]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        console.warn("Audio failed to play. Check /public/audio files exist.");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <CalmBlobsBG />

      <div className="mx-auto max-w-5xl p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-2">
            <Sparkles className="h-6 w-6" /> Mood Detox
          </h1>
          <div className="text-sm text-white/60">designed for calm, focus, and reset</div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sound card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5" /> Soothing soundscape
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-col gap-3">
                <Label className="text-white/80">Track</Label>
                <Select value={selected} onValueChange={setSelected}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Choose a track" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 text-white border-white/20">
                    {tracks.map(t => (
                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between gap-4">
                <Button
                  onClick={togglePlay}
                  className="rounded-xl bg-white/20 hover:bg-white/30 text-white"
                >
                  {playing ? (
                    <span className="inline-flex items-center gap-2"><Pause className="h-4 w-4" /> Pause</span>
                  ) : (
                    <span className="inline-flex items-center gap-2"><Play className="h-4 w-4" /> Play</span>
                  )}
                </Button>

                <div className="flex items-center gap-3 w-full">
                  <Volume2 className="h-4 w-4 text-white/70" />
                  <Slider
                    value={[volume]}
                    onValueChange={(v) => setVolume(v[0] ?? 70)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="w-10 text-right text-sm text-white/70">{volume}%</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch checked={loop} onCheckedChange={setLoop} id="loop" />
                <Label htmlFor="loop" className="text-white/80">Loop seamlessly</Label>
              </div>

              {/* hidden audio element */}
              <audio ref={audioRef} src={current.src} preload="auto" />
            </CardContent>
          </Card>

          {/* Breath + quick reset */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Reset the nervous system</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <BreathGuide enabled={showBreath} />
              <div className="flex items-center gap-3">
                <Switch checked={showBreath} onCheckedChange={setShowBreath} id="breathe" />
                <Label htmlFor="breathe" className="text-white/80">Breathing guide</Label>
              </div>
              <p className="text-sm text-white/70">
                Try 4–4–6 breathing: inhale 4s • hold 4s • exhale 6s. Two minutes can noticeably calm arousal.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Minimal footer note */}
        <div className="mt-8 text-center text-xs text-white/50">
          Sound loops are loaded from <code className="bg-white/10 px-1 rounded">/public/audio</code>.
          Replace with your own for your vibe.
        </div>
      </div>
    </div>
  );
}
