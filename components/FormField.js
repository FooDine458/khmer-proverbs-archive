import { useState } from "react";

// One labelled field with its error message beside it. `as` picks the
// control: "input" (default), "textarea", or "select" (pass options).
// A type="password" input gets a Show/Hide button so a typo can be checked.
export default function FormField({ id, label, error, as = "input", options, ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = props.type === "password";
  const common = {
    id,
    className: "auth-input",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    ...props,
    ...(isPassword && show ? { type: "text" } : {}),
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
  } else if (isPassword) {
    control = (
      <div className="auth-password">
        <input {...common} />
        <button
          type="button"
          className="auth-password-toggle"
          onClick={() => setShow(!show)}
          aria-pressed={show}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
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
