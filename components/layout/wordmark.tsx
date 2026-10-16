/** Original wordmark: a condensed red name over a tracked-out label. */
export function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  const name = size === "lg" ? "text-4xl" : "text-[1.65rem] lg:text-3xl";
  return (
    <span className="flex flex-col items-start leading-none select-none">
      <span className={`wordmark text-accent ${name}`}>Vaibhav</span>{" "}
      <span className="mt-0.5 text-[0.55rem] font-semibold tracking-[0.42em] text-ink/85 uppercase">Originals</span>
    </span>
  );
}
