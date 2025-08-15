export function Footer() {
  return (
    <footer className="text-center py-6 border-t border-border">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Keith Elliott. Built with Next.js & Tailwind CSS.
      </p>
      <p className="text-xs text-muted-foreground mt-2">Designed for performance, accessibility, and elegance.</p>
    </footer>
  )
}
