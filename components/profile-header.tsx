import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function ProfileHeader() {
  return (
    <header className="text-center space-y-4 animate-fade-in-up">
      <div className="flex justify-center">
        <Avatar className="ring-4 ring-primary/20 transition-[box-shadow] duration-150 hover:ring-primary/40 size-48">
          <AvatarImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-square-JrvbSWr4JHlotK5PNHLm0dhuHl462I.png"
            alt="Keith Elliott"
            width={192}
            height={192}
            className="object-cover aspect-square rounded-full"
          />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
            KE
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Keith Elliott</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed font-semibold">
          Full-Stack Developer & Audio Engineer
        </p>
        <p className="max-w-md mx-auto leading-relaxed text-base text-muted-foreground">
          Passionate about creating art that resonates in code, frequency, and color.
        </p>
      </div>
    </header>
  );
}
