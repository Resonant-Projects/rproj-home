import { DevGreeting } from "@/components/dev-greeting";
import { Footer } from "@/components/footer";
import { ProfileHeader } from "@/components/profile-header";
import { ProjectsSection } from "@/components/projects-section";
import { SocialLinksSection } from "@/components/social-links-section";
import { Backdrop } from "@/components/ui/backdrop";

export default function LinkTreePage() {
  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      <DevGreeting />
      <Backdrop />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 pt-10 md:pt-16 pb-12">
        <nav className="mb-10 md:mb-16 flex items-center font-mono text-[10px] tracking-[0.25em] uppercase text-ink-500">
          <span className="group/nav flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rotate-45 bg-glow transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:rotate-[135deg]" />
            <span>Resonant / Home</span>
          </span>
        </nav>

        <div className="grid gap-12 md:gap-16 md:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
          <aside className="md:sticky md:top-12 md:self-start space-y-10">
            <ProfileHeader />
            <div className="hairline" />
            <SocialLinksSection />
          </aside>

          <div className="space-y-12 min-w-0">
            <ProjectsSection />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
