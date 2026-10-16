export function Tag({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "accent" | "outline" }) {
  const tones = {
    default: "bg-ink/10 text-ink/90",
    accent: "bg-accent text-ink",
    outline: "border border-line text-muted",
  };
  return (
    <span className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium whitespace-nowrap ${tones[tone]}`}>
      {children}
    </span>
  );
}
