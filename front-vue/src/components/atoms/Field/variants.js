import { tv } from "tailwind-variants";

const baseClasses = {
  input: "input input-bordered",
  select: "select select-bordered",
  textarea: "textarea textarea-bordered",
  checkbox: "checkbox checkbox-bordered",
  radio: "radio radio-bordered",
  button: "button button-bordered",
};

const sizeClasses = {
  input: {
    sm: "input-sm",
    md: "input-md",
    lg: "input-lg",
  },
  select: {
    sm: "select-sm",
    md: "select-md",
    lg: "select-lg",
  },
  textarea: {
    sm: "textarea-sm",
    md: "textarea-md",
    lg: "textarea-lg",
  },
  checkbox: {
    sm: "checkbox-sm",
    md: "checkbox-md",
    lg: "checkbox-lg",
  },
  radio: {
    sm: "radio-sm",
    md: "radio-md",
    lg: "radio-lg",
  },
  button: {
    sm: "button-sm",
    md: "button-md",
    lg: "button-lg",
  },
};

const errorClasses = {
  input: "input-error",
  select: "select-error",
  textarea: "textarea-error",
  checkbox: "checkbox-error",
  radio: "radio-error",
  button: "button-error",
};

const touchedClasses = {
  input: "input-touched",
  select: "select-touched",
  textarea: "textarea-touched",
  checkbox: "checkbox-touched",
  radio: "radio-touched",
  button: "button-touched",
};

export function inputVariants(type) {
  const baseClass = baseClasses[type];
  return tv({
    base: `${baseClass} ${type === "checkbox" || type === "radio" ? "" : "rounded-md"}`,
    variants: {
      size: sizeClasses[type],
      error: {
        true: errorClasses[type],
        false: "",
      },
      touched: {
        true: touchedClasses[type],
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
      touched: false,
    },
  });
}