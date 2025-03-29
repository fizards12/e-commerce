import { Link, useActionData, useSubmit } from "react-router-dom";
import { Formik, Form, Field as FormikField, FormikHelpers } from "formik";
import { LoginSchema } from "../../../schemas/validations/auth";
import Field from "../../../components/atoms/Field/Field";
import { IUser } from "../../../schemas/user";
import { useRef } from "react";

const initialState: Partial<IUser> = {
  email: "",
  password: "",
};

function Login() {
  const submit = useSubmit();
  const actionData = useActionData();
  const form = useRef<HTMLFormElement>(null);

  const submitHandler = async (
    _values: Partial<IUser>,
    { setSubmitting }: FormikHelpers<Partial<IUser>>
  ): Promise<void> => {
    try {
      const formData = new FormData(form.current as HTMLFormElement);
      setSubmitting(true);
      await submit(formData, { method: "post", action: "/auth/login" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-sm w-full mx-auto">
        <div className="mb-4">
          <h4 className="mb-1">Log in to Exclusive</h4>
          <Link
            to="../register"
            className="link link-primary link-hover text-sm"
          >
            New User? Join Us!
          </Link>
        </div>
        <div>
          <Formik
            initialValues={initialState}
            validationSchema={LoginSchema}
            onSubmit={submitHandler}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form ref={form}>
                <div className="flex flex-col gap-2">
                  <Field
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    fieldStyle="filled"
                    size="sm"
                    error={errors.email}
                    touched={touched.email}
                  />
                  <Field
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    fieldStyle="filled"
                    size="sm"
                    error={errors.password}
                    touched={touched.password}
                  />
                </div>
                <div>
                  <Link
                    to="../forget-password"
                    className="link link-primary link-hover text-sm"
                  >
                    Forget Password
                  </Link>
                </div>
                <FormikField
                  type="submit"
                  value={isSubmitting ? "Logging in..." : "Login"}
                  className="btn btn-primary mt-2 w-full rounded-md btn-sm"
                  disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>
          {actionData && actionData.error && (
            <div className="alert alert-error alert-sm py-2 rounded-lg">
              {actionData.error}
            </div>
          )}
          {actionData && actionData.status == 200 && (
            <div className="alert alert-success alert-sm text-sm">
              {actionData.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
