import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-field-50 text-field-500">
        <Compass className="h-7 w-7" />
      </span>
      <h1 className="font-display text-2xl font-semibold text-field-900">Page not found</h1>
      <p className="max-w-sm text-sm text-field-500">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link to="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}
