import { useState } from 'react';
import { X } from 'lucide-react';

export function TagInput({ label, value = [], onChange, error, placeholder, hint }) {
  const [draft, setDraft] = useState('');

  function addTag() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) {
      setDraft('');
      return;
    }
    onChange([...value, trimmed]);
    setDraft('');
  }

  function removeTag(tag) {
    onChange(value.filter((v) => v !== tag));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !draft && value.length) {
      removeTag(value[value.length - 1]);
    }
  }

  return (
    <div>
      {label && <label className="field-label">{label}</label>}
      <div className="field-input flex flex-wrap gap-1.5 py-2">
        {value.map((tag) => (
          <span key={tag} className="chip">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="rounded-full hover:bg-field-100"
              aria-label={`Remove ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={value.length ? '' : placeholder}
          className="min-w-[120px] flex-1 border-none bg-transparent p-0 text-[15px] outline-none focus:ring-0"
        />
      </div>
      {hint && !error && <p className="mt-1 text-xs text-field-500">{hint}</p>}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
