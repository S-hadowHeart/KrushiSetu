import { forwardRef } from 'react';

export const Select = forwardRef(function Select(
  { label, error, options, placeholder, className = '', ...props },
  ref
) {
  return (
    <div className={className}>
      {label && <label className="field-label" htmlFor={props.id}>{label}</label>}
      <select ref={ref} className="field-input" {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
});
