function Card({ title, description, action, children, className = "" }) {
  return (
    <section
      className={`min-w-0 rounded-xl border border-slate-200 bg-white shadow-panel dark:border-gray-800 dark:bg-gray-800 ${className}`}
    >
      {(title || description || action) && (
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-gray-700 sm:px-6">
          <div>
            {title && <h2 className="text-sm font-semibold text-slate-900 dark:text-gray-100">{title}</h2>}
            {description && <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

export default Card;
