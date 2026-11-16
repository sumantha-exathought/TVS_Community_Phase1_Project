function FormInput({
  label,
  name,
  id: inputId,
  type = "text",
  value,
  onChange,
  options = [],
  placeholder,
  required = false,
  error,
  rows = 4,
  accept,
  min,
  max,
  step,
}) {
  const controlId = inputId || name;
  const controlClass = `mt-1.5 block w-full rounded-lg border ${
    error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-brand-500 focus:ring-brand-100"
  } bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-50`;

  let control;
  if (type === "textarea") {
    control = (
      <textarea
        id={controlId}
        name={name}
        rows={rows}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${controlClass} resize-y`}
        aria-invalid={Boolean(error)}
      />
    );
  } else if (type === "select") {
    control = (
      <select
        id={controlId}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        required={required}
        className={controlClass}
        aria-invalid={Boolean(error)}
      >
        <option value="" disabled>{placeholder || "Select an option"}</option>
        {options.map((option) => (
          <option key={option.value ?? option} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
    );
  } else {
    control = (
      <input
        id={controlId}
        name={name}
        type={type}
        value={type === "file" ? undefined : value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        accept={accept}
        min={min}
        max={max}
        step={step}
        className={controlClass}
        aria-invalid={Boolean(error)}
      />
    );
  }

  return (
    <div className="min-w-0">
      <label htmlFor={controlId} className="block text-sm font-medium text-slate-700">
        {label}{required && <span aria-hidden="true" className="ml-1 text-red-500">*</span>}
      </label>
      {control}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default FormInput;
