import { Smartphone } from "lucide-react";

/**
 * Shown when a project has no published screenshots yet.
 * It is labelled clearly so it is never mistaken for the real interface.
 */
export function PosterPlaceholder({ title, note = "Screenshots coming soon" }: { title: string; note?: string }) {
  return (
    <div
      role="img"
      aria-label={`${title}: no screenshots published yet`}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden bg-[radial-gradient(120%_90%_at_80%_10%,#4a0b10_0%,#1d1d1d_55%,#141414_100%)] p-4 text-center"
    >
      <div className="flex h-[46%] min-h-16 aspect-[9/19] items-center justify-center rounded-[0.9rem] border-2 border-ink/25 bg-black/40">
        <Smartphone aria-hidden className="size-6 text-ink/50" />
      </div>
      <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-ink/70 uppercase">{note}</p>
    </div>
  );
}
