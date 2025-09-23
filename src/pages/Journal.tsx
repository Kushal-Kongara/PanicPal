// src/pages/Journal.tsx
import { useMemo, useState } from "react";
import CalmBlobsBG from "@/components/CalmBlobsBG";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { NotebookPen, Tag as TagIcon, Smile, Trash2, Plus } from "lucide-react";

type MoodKey = "low" | "ok" | "good" | "great";
const moodOptions: { id: MoodKey; label: string; emoji: string }[] = [
  { id: "low",   label: "Low",    emoji: "😞" },
  { id: "ok",    label: "Okay",   emoji: "🙂" },
  { id: "good",  label: "Good",   emoji: "😊" },
  { id: "great", label: "Great",  emoji: "😄" },
];

export default function Journal() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [mood, setMood] = useState<MoodKey>("good");
  const [tagDraft, setTagDraft] = useState("");
  const [tags, setTags] = useState<string[]>(["gratitude", "calm"]);

  const moodLabel = useMemo(() => moodOptions.find((m) => m.id === mood)?.label ?? "Good", [mood]);

  function addTag() {
    const t = tagDraft.trim().toLowerCase();
    if (!t) return;
    if (!tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagDraft("");
  }
  function removeTag(t: string) {
    setTags((prev) => prev.filter((x) => x !== t));
  }
  function clearAll() {
    setTitle(""); setText(""); setTags([]); setMood("good");
  }
  function saveDemo() {
    console.log({ title, text, tags, mood }); // placeholder
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      <CalmBlobsBG />

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        {/* Heading */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Daily Journal</h1>
            <p className="text-white/70 mt-2">Capture thoughts, tags, and mood. (UI only for now)</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-white/60">
            <span className="rounded-full bg-white/5 px-3 py-1">Theme: Black</span>
            <span className="rounded-full bg-white/5 px-3 py-1">Calm UI</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Composer */}
          <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <NotebookPen className="h-5 w-5" /> New Entry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white/80">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="A headline for today…"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              {/* Mood + Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80">Mood</Label>
                  <Select value={mood} onValueChange={(v: MoodKey) => setMood(v)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select mood" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 text-white border-white/20">
                      {moodOptions.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          <span className="inline-flex items-center gap-2"><span>{m.emoji}</span>{m.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-white/60 mt-1 inline-flex items-center gap-2">
                    <Smile className="h-3.5 w-3.5" /> Current: {moodLabel}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-white/80">Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      value={tagDraft}
                      onChange={(e) => setTagDraft(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addTag()}
                      placeholder="Add a tag and press Enter"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    <Button onClick={addTag} className="bg-white/20 hover:bg-white/30 text-white" type="button">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {tags.map((t) => (
                      <Badge key={t} variant="secondary" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white">
                        <span className="inline-flex items-center gap-2">
                          <TagIcon className="h-3.5 w-3.5" /> {t}
                          <button onClick={() => removeTag(t)} className="ml-1 -mr-1 rounded hover:bg-white/10 px-1" aria-label={`Remove ${t}`} type="button">×</button>
                        </span>
                      </Badge>
                    ))}
                    {tags.length === 0 && <span className="text-xs text-white/50">No tags yet</span>}
                  </div>
                </div>
              </div>

              {/* Entry */}
              <div className="space-y-2">
                <Label htmlFor="entry" className="text-white/80">Entry</Label>
                <Textarea
                  id="entry"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="How are you feeling today?"
                  className="min-h-44 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="text-xs text-white/60">UI prototype — not persisted</div>
                <div className="flex gap-2">
                  <Button onClick={clearAll} variant="ghost" className="text-white/80 hover:bg-white/10" type="button">
                    <Trash2 className="h-4 w-4 mr-2" /> Clear
                  </Button>
                  <Button onClick={saveDemo} className="bg-sky-400/90 hover:bg-sky-400 text-sky-950 shadow-[0_8px_24px_rgba(56,189,248,0.35)]" type="button">
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar: Recent */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-0 shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent</CardTitle>
                <span className="text-xs text-white/60">demo</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {["hopeful", "improving", "calm"].map((mood, idx) => (
                <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/70">{new Date(Date.now() - idx * 86400000).toLocaleDateString()}</div>
                    <span className="text-xs rounded-full bg-white/10 px-2 py-1 text-white/80">{mood}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/90 line-clamp-2">
                    Today was challenging but I made it through. Grateful for small wins.
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Streak", value: "3 days" },
            { title: "Mood", value: "Trending up" },
            { title: "Tags", value: `${tags.length} active` },
          ].map((card, i) => (
            <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
              <div className="text-sm text-white/60">{card.title}</div>
              <div className="mt-1 text-xl text-white">{card.value}</div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
