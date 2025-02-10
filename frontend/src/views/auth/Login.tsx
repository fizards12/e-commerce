import { Link, useActionData, useSubmit } from "react-router-dom";
import { Formik, Form, Field as FormikField, FormikHelpers } from "formik";
import { LoginSchema } from "../../schemas/validations/auth";
import Field from "../../components/atoms/Field/Field";
import { IUser } from "../../schemas/user";
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
    <div className="container flex items-center justify-center h-screen mx-auto">
      <div className="card bg-white max-w-sm w-full shadow-md shadow-gray-300 rounded-lg border border-gray-200">
        <div className="card-body">
          <div className="card-title">
            <h4>Welcome Back</h4>
          </div>
          <Link
            to="../register"
            className="link link-primary link-hover text-sm"
          >
            New User? Join Us!
          </Link>
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
                      type="email"
                      size="sm"
                      error={errors.email}
                      touched={touched.email}
                    />
                    <Field
                      name="password"
                      label="Password"
                      type="password"
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
    </div>
  );
}

export default Login;
