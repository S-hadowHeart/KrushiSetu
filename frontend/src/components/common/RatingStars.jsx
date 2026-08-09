import { Star } from 'lucide-react';

export function RatingStars({ value = 0, onChange, size = 18 }) {
  const isInteractive = typeof onChange === 'function';
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-0.5" role={isInteractive ? 'radiogroup' : undefined}>
      {stars.map((star) => {
        const filled = star <= Math.round(value);
        return (
          <button
            key={star}
            type="button"
            disabled={!isInteractive}
            onClick={() => onChange?.(star)}
            className={isInteractive ? 'cursor-pointer' : 'cursor-default'}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
          >
            <Star
              width={size}
              height={size}
              className={filled ? 'fill-mustard-400 text-mustard-400' : 'fill-none text-field-200'}
            />
          </button>
        );
      })}
    </div>
  );
}
