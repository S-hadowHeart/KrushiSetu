export function Footer() {
  return (
    <footer className="mt-16 border-t border-field-100 py-8">
      <div className="page-shell flex flex-col items-center justify-between gap-2 text-sm text-field-500 sm:flex-row">
        <p>© {new Date().getFullYear()} KrushiSetu. Connecting farmers and buyers, fairly.</p>
        <p className="font-mono text-xs">v1.0.0</p>
      </div>
    </footer>
  );
}
