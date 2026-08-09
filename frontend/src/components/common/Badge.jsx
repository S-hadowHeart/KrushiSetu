const TONES = {
  neutral: 'bg-field-50 text-field-700 border-field-100',
  success: 'bg-field-100 text-field-800 border-field-200',
  warning: 'bg-mustard-100 text-mustard-700 border-mustard-200',
  danger: 'bg-rose-50 text-rose-700 border-rose-200',
};

export function Badge({ tone = 'neutral', children }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${TONES[tone]}`}>
      {children}
    </span>
  );
}

export function statusTone(status) {
  if (status === 'ACCEPTED' || status === 'APPROVED') return 'success';
  if (status === 'REJECTED') return 'danger';
  return 'warning';
}
