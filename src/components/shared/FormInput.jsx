import React, { useState } from "react";

// Basic input component
export function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-error-red ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full px-3 py-2 border rounded-lg transition-colors
            focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${
              error
                ? "border-error-red focus:ring-error-red"
                : "border-gray-300 hover:border-gray-400"
            }
          `}
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-error-red">{error}</p>}
    </div>
  );
}

// Textarea component
export function FormTextarea({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  rows = 3,
  className = "",
  ...props
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-error-red ml-1">*</span>}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`
          w-full px-3 py-2 border rounded-lg transition-colors resize-vertical
          focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${
            error
              ? "border-error-red focus:ring-error-red"
              : "border-gray-300 hover:border-gray-400"
          }
        `}
        {...props}
      />

      {error && <p className="mt-1 text-sm text-error-red">{error}</p>}
    </div>
  );
}

// Select component
export function FormSelect({
  label,
  name,
  value,
  onChange,
  error,
  options = [],
  placeholder = "Select an option",
  required = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-error-red ml-1">*</span>}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border rounded-lg transition-colors
          focus:outline-none focus:ring-2 focus:ring-dark-red focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${
            error
              ? "border-error-red focus:ring-error-red"
              : "border-gray-300 hover:border-gray-400"
          }
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-error-red">{error}</p>}
    </div>
  );
}

// Checkbox component
export function FormCheckbox({
  label,
  name,
  checked,
  onChange,
  error,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            mr-2 h-4 w-4 text-dark-red border-gray-300 rounded
            focus:ring-dark-red focus:ring-2
            disabled:cursor-not-allowed
          `}
          {...props}
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>

      {error && <p className="mt-1 text-sm text-error-red">{error}</p>}
    </div>
  );
}

// Radio group component
export function FormRadioGroup({
  label,
  name,
  value,
  onChange,
  error,
  options = [],
  required = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-error-red ml-1">*</span>}
        </label>
      )}

      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
              className={`
                mr-2 h-4 w-4 text-dark-red border-gray-300
                focus:ring-dark-red focus:ring-2
                disabled:cursor-not-allowed
              `}
              {...props}
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>

      {error && <p className="mt-1 text-sm text-error-red">{error}</p>}
    </div>
  );
}
