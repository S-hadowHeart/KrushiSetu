import { Loader2 } from 'lucide-react';

export function Spinner({ className = 'h-5 w-5' }) {
  return <Loader2 className={`animate-spin ${className}`} aria-hidden="true" />;
}

export function FullPageSpinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-paper">
      <div className="flex flex-col items-center gap-3 text-field-600">
        <Spinner className="h-8 w-8" />
        <p className="text-sm font-medium">Loading KrushiSetu…</p>
      </div>
    </div>
  );
}
