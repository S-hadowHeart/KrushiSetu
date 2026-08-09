import { forwardRef } from 'react';

export const Input = forwardRef(function Input(
  { label, error, hint, className = '', ...props },
  ref
) {
  return (
    <div className={className}>
      {label && <label className="field-label" htmlFor={props.id}>{label}</label>}
      <input ref={ref} className="field-input" {...props} />
      {hint && !error && <p className="mt-1 text-xs text-field-500">{hint}</p>}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
});
