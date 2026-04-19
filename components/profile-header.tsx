import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spectrum } from "@/components/ui/spectrum";

const ELLIOTT = "Elliott";

export function ProfileHeader() {
  return (
    <header className="relative space-y-6 animate-fade-in-up">
      <div className="group/avatar relative w-fit">
        <div
          aria-hidden="true"
          className="absolute -inset-6 rounded-full bg-glow/15 blur-3xl transition-all duration-700 group-hover/avatar:bg-glow/30 group-hover/avatar:-inset-8"
        />
        <Avatar className="relative size-32 md:size-36 ring-1 ring-ink-800 shadow-[0_0_0_6px_var(--color-ink-950),0_30px_60px_-20px_color-mix(in_oklch,var(--color-brand-500)_35%,transparent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/avatar:scale-[1.02]">
          <AvatarImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-square-JrvbSWr4JHlotK5PNHLm0dhuHl462I.png"
            alt="Keith Elliott"
            className="object-cover"
          />
          <AvatarFallback className="bg-ink-900 text-ink-100 text-xl font-semibold">
            KE
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="space-y-5">
        <div className="space-y-1">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-500">
            Full-Stack Developer × Audio Engineer
          </p>
          <h1 className="group/name font-display text-5xl md:text-6xl leading-[0.95] tracking-tight text-ink-100">
            Keith
            <br />
            <span className="italic text-glow inline-flex">
              {ELLIOTT.split("").map((ch, i) => (
                <span
                  key={`${ch}-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: static letter sequence
                    i
                  }`}
                  className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover/name:-translate-y-1"
                  style={{ transitionDelay: `${i * 35}ms` }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </h1>
        </div>

        <Spectrum bars={14} className="h-5 w-28" />

        <p className="max-w-sm text-base leading-relaxed text-ink-300">
          Crafting art that resonates across <span className="text-ink-100">code</span>,{" "}
          <span className="text-ink-100">frequency</span>, and{" "}
          <span className="text-ink-100">color</span>.
        </p>
      </div>
    </header>
  );
}
