// One labelled field with its error message beside it. `as` picks the
// control: "input" (default), "textarea", or "select" (pass options).
export default function FormField({ id, label, error, as = "input", options, ...props }) {
  const common = {
    id,
    className: "auth-input",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    ...props,
  };

  let control;
  if (as === "textarea") control = <textarea rows={5} {...common} />;
  else if (as === "select") {
    control = (
      <select {...common}>
        <option value="">Choose a province</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  } else control = <input {...common} />;

  return (
    <div className="auth-field">
      <label className="auth-label" htmlFor={id}>
        {label}
      </label>
      {control}
      {error ? (
        <p className="auth-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
