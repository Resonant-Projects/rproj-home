export function Backdrop() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 backdrop-glow" />
      <div className="absolute inset-0 backdrop-dots" />
      <div className="grain" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklch,var(--color-glow)_45%,transparent)] to-transparent" />
    </div>
  );
}
