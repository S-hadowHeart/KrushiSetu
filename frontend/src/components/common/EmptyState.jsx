export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
      {Icon && (
        <div className="rounded-full bg-field-50 p-3 text-field-500">
          <Icon className="h-6 w-6" />
        </div>
      )}
      <h3 className="font-display text-lg font-semibold text-field-900">{title}</h3>
      {description && <p className="max-w-sm text-sm text-field-500">{description}</p>}
      {action}
    </div>
  );
}
