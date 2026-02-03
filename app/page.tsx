import { Footer } from "@/components/footer";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ProfileHeader } from "@/components/profile-header";
import { ProjectsSection } from "@/components/projects-section";
import { SocialLinksSection } from "@/components/social-links-section";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export default function LinkTreePage() {
  return (
    <main className="min-h-screen bg-background relative">
      <FlickeringGrid
        className="fixed inset-0 z-0"
        squareSize={3}
        gridGap={8}
        color="#a87da3"
        maxOpacity={0.15}
        flickerChance={0.05}
      />

      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        <div className="space-y-8">
          <ProfileHeader />
          <ProjectsSection />
          <SocialLinksSection />
          <NewsletterSignup />
          <Footer />
        </div>
      </div>
    </main>
  );
}
