import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfileHeader() {
  return (
    <header className="text-center space-y-4 animate-fade-in-up">
      <div className="flex justify-center">
        <Avatar className="ring-4 ring-primary/20 transition-all duration-300 hover:ring-primary/40 size-48">
          <AvatarImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-square-JrvbSWr4JHlotK5PNHLm0dhuHl462I.png"
            alt="Profile photo"
            className="object-cover"
          />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">YN</AvatarFallback>
        </Avatar>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Keith Elliott</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed font-semibold">
          Full-Stack Developer & Audio Engineer
        </p>
        <p className="max-w-md mx-auto leading-relaxed text-base text-[rgba(110,39,101,0.8586956521739131)]">
          Passionate about creating art that resonates in code, frequency, and color.
        </p>
      </div>
    </header>
  )
}
