export function CheckboxGroup({ label, options, value = [], onChange }) {
  function toggle(opt) {
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt));
    else onChange([...value, opt]);
  }

  return (
    <div>
      {label && <span className="field-label">{label}</span>}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value.includes(opt);
          return (
            <button
              type="button"
              key={opt}
              onClick={() => toggle(opt)}
              className={
                active
                  ? 'rounded-full border border-field-600 bg-field-600 px-3 py-1.5 text-xs font-semibold text-white'
                  : 'rounded-full border border-field-200 bg-white px-3 py-1.5 text-xs font-medium text-field-600 hover:bg-field-50'
              }
            >
              {opt.replaceAll('_', ' ')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
