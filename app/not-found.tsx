import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70svh] flex-col items-start justify-center pt-24">
      <p className="eyebrow">Error 404</p>
      <h1 className="display mt-3 text-5xl uppercase sm:text-7xl">Lost your way?</h1>
      <p className="mt-4 max-w-md text-muted">This page isn&apos;t in the catalogue. The project may have been renamed, or the link may be mistyped.</p>
      <div className="mt-8 flex flex-col gap-3 xs:flex-row">
        <LinkButton href="/" variant="primary" size="lg">Back to home</LinkButton>
        <LinkButton href="/#projects" variant="secondary" size="lg">Browse projects</LinkButton>
      </div>
    </section>
  );
}
