import React, { PropsWithChildren, FC } from "react";
import { Field as FormikField, FieldConfig, ErrorMessage } from "formik";
import { inputVariants } from "./variants";

interface Props
  extends PropsWithChildren<
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">
  > {
  error?: string;
  label?: string;
  as?: "input" | "select" | "textarea" | "checkbox" | "radio" | "button";
  size: "lg" | "md" | "sm";
  touched?: boolean;
  classes?: {
    wrapperClass?: string;
    fieldClass?: string;
    labelClass?: string;
    errorClass?: string;
  };
}

const inputAsArr = [
  "input",
  "select",
  "textarea",
  "checkbox",
  "radio",
  "button",
];

const Field: FC<Props & FieldConfig> = ({
  classes = {
    wrapperClass: "",
    fieldClass: "",
    labelClass: "",
    errorClass: "",
  },
  name,
  as = "input",
  error,
  touched,
  label,
  size = "md",
  ...props
}) => {
  const fieldVariants = inputVariants(
    inputAsArr.find((v) => v === as) as keyof typeof inputVariants
  );
  return (
    <div className={`w-full flex flex-col ${classes.wrapperClass || ""}`}>
      <label htmlFor={props.id} className={`label ${classes.labelClass || ""}`}>
        <span className="label-text">{label}</span>
      </label>
      <FormikField
        id={props.id}
        name={name}
        type={as === "checkbox" || as === "radio"? as : props.type }
        as={as === "checkbox" || as === "radio" ? "input" : as}
        {...props}
        className={`${fieldVariants({
          size,
          error: !!error && touched,
          touched: touched,
        })} ${classes.fieldClass || ""}`}
      />
      <ErrorMessage
        name={name}
        component={"span"}
        className={`text-xs text-error ${classes.errorClass}`}
      />
    </div>
  );
};

export default Field;
