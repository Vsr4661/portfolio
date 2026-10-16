import Image from "next/image";
import { Download, Play } from "lucide-react";
import { profile } from "@/data/profile";
import { AnchorButton, LinkButton } from "@/components/ui/button";
import { HeroItem, HeroStagger, HeroVisual } from "@/components/home/hero-motion";

export function Hero() {
  const photo = profile.photo;

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-24 pb-14 sm:pt-28 lg:min-h-[92svh] lg:pt-36 lg:pb-24">
      {/* Background: blurred, slowly drifting project frame under a red-black grade */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="animate-drift absolute -inset-[10%] bg-[radial-gradient(45%_55%_at_75%_35%,rgb(229_9_20/0.22),transparent_70%),radial-gradient(35%_45%_at_15%_85%,rgb(229_9_20/0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_85%_20%,rgb(229_9_20/0.28),transparent_60%)]" />
        <div className="absolute inset-0 bg-linear-to-r from-canvas via-canvas/85 to-canvas/30" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-canvas to-transparent" />
      </div>

      <div className="shell grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <HeroStagger className="max-w-2xl">
          <HeroItem>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.28em] text-muted uppercase">
              <span aria-hidden className="inline-block h-4 w-1 rounded-sm bg-accent" />
              A Vaibhav Originals Portfolio
            </p>
          </HeroItem>
          <HeroItem>
            <h1 id="hero-title" className="display mt-4 text-[clamp(2.9rem,9vw,6.4rem)] uppercase">
              Vaibhav Singh <span className="text-accent">Rathore</span>
            </h1>
          </HeroItem>
          <HeroItem>
            <p className="mt-5 text-lg font-medium text-ink sm:text-xl">
              {profile.role} — web &amp; mobile applications
            </p>
            <p className="mt-2 max-w-xl text-base text-muted sm:text-lg">{profile.positioning}</p>
          </HeroItem>
          <HeroItem>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              <span className="rounded-sm border border-ink/30 px-1.5 py-0.5 text-xs font-semibold text-ink">B.Tech CSE · 2025</span>
              <span>React</span>
              <span aria-hidden>•</span>
              <span>React Native</span>
              <span aria-hidden>•</span>
              <span>TypeScript</span>
              <span aria-hidden>•</span>
              <span>Node.js</span>
              <span aria-hidden>•</span>
              <span>Java &amp; DSA</span>
            </p>
          </HeroItem>
          <HeroItem>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <LinkButton href="/#projects" variant="primary" size="lg">
                <Play aria-hidden className="size-5 fill-current" />
                Explore Projects
              </LinkButton>
              <AnchorButton href={profile.resume} download={profile.resumeFileName} variant="secondary" size="lg">
                <Download aria-hidden className="size-5" />
                Download Resume
                <span className="sr-only"> (PDF)</span>
              </AnchorButton>
            </div>
          </HeroItem>
          <HeroItem>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line/70 pt-6">
              {profile.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="display text-3xl sm:text-4xl">{stat.value}</dd>
                  <dd className="mt-1 text-xs leading-snug text-muted">
                    {stat.label}
                    <span className="block text-subtle">Source: {stat.source}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </HeroItem>
        </HeroStagger>

        <HeroVisual className="relative mx-auto w-full max-w-sm sm:max-w-md lg:mr-0 lg:max-w-[30rem]">
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_40%,rgb(229_9_20/0.35),transparent_70%)] blur-2xl" />
          <figure
            className="relative overflow-hidden rounded-xl bg-[radial-gradient(70%_65%_at_55%_38%,#5c0d12_0%,#241515_55%,#161616_100%)] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.95),0_0_0_1px_rgb(255_255_255/0.08)]"
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              loading="eager"
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 448px, 384px"
              className="object-contain object-bottom"
            />
            {/* Fade the bottom of the portrait into the page so the caption stays readable */}
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-canvas via-canvas/70 to-transparent" />
            <figcaption className="absolute right-4 bottom-4 left-4 sm:right-5 sm:bottom-5 sm:left-5">
              <p className="flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.3em] text-success uppercase">
                <span aria-hidden className="size-1.5 rounded-full bg-success" />
                Open to work
              </p>
              <p className="mt-1.5 text-base font-semibold sm:text-lg">Software Developer · Frontend · Full-Stack · SDE</p>
              <p className="mt-0.5 text-sm text-ink/75">{profile.location}</p>
            </figcaption>
          </figure>
        </HeroVisual>
      </div>
    </section>
  );
}
