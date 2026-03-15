export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center py-6 border-t border-border">
      <p className="text-sm text-muted-foreground">
        &copy; {year} Keith Elliott
      </p>
      <p className="text-xs text-muted-foreground mt-2">
        Creating art that resonates in code, frequency, and color.
      </p>
    </footer>
  );
}
