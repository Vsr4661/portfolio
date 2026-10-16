"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { buttonClass } from "@/components/ui/button";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = window.setTimeout(() => setState("idle"), 2500);
    return () => window.clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <>
      <button type="button" onClick={copy} className={buttonClass("secondary", "lg")}>
        {state === "copied" ? <Check aria-hidden className="size-5" /> : <Copy aria-hidden className="size-5" />}
        {state === "copied" ? "Copied" : "Copy email"}
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? "Email address copied to clipboard" : state === "failed" ? `Copy failed. The address is ${email}` : ""}
      </span>
    </>
  );
}
