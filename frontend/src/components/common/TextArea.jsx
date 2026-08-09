import { forwardRef } from 'react';

export const TextArea = forwardRef(function TextArea(
  { label, error, className = '', rows = 4, ...props },
  ref
) {
  return (
    <div className={className}>
      {label && <label className="field-label" htmlFor={props.id}>{label}</label>}
      <textarea ref={ref} rows={rows} className="field-input resize-y" {...props} />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
});
