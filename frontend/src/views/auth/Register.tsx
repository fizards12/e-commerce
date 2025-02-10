import {
  Link,
  useActionData,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import {
  Formik,
  Form,
  Field as FormikField,
  ErrorMessage,
  FormikHelpers,
} from "formik";
import { RegisterSchema } from "../../schemas/validations/auth";
import Field from "../../components/atoms/Field/Field";
import { IRole } from "../../schemas/role";
import { IUser } from "../../schemas/user";
import { useRef } from "react";

const initialState: IUser & { confirmPassword: string } = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
  phone: "",
  role: "",
};

function Register() {
  const roles: IRole[] = useLoaderData();
  const submit = useSubmit();
  const actionData = useActionData();
  const submitHandler = async (
    _values: IUser & { confirmPassword: string },
    {
      setSubmitting,
    }: FormikHelpers<IUser & { confirmPassword: string }>
  ): Promise<void> => {
    try {
      const formData = new FormData(form.current as HTMLFormElement);
      setSubmitting(true);
      await submit(formData, { method: "post", action: "/auth/register" });
    } finally {
      setSubmitting(false);
    }
  };
  const form = useRef<HTMLFormElement>(null);
  return (
    <div className="container flex items-center justify-center min-h-screen mx-auto">
      <div className="card w-full bg-white max-w-xl shadow-md shadow-gray-300 rounded-lg border border-gray-200">
        <div className="card-body">
          <div className="card-title">
            <h3>Join Us</h3>
          </div>
          <div>
            <Link
              to="../Login"
              className="link link-primary link-hover text-xs"
            >
              Already Have an account? Login
            </Link>
          </div>
          <div>
            <Formik
              initialValues={initialState}
              validationSchema={RegisterSchema}
              onSubmit={submitHandler}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form ref={form}>
                  <div className="flex flex-col">
                    <div className="flex gap-2 *:flex-1">
                      <Field
                        name="name"
                        label="Name"
                        size="sm"
                        error={errors.name}
                        touched={touched.name}
                      />
                      <Field
                        name="email"
                        label="Email"
                        size="sm"
                        error={errors.email}
                        touched={touched.email}
                      />
                    </div>
                    <div className="flex gap-2 *:flex-1">
                      <Field
                        name="password"
                        label="Password"
                        type="password"
                        size="sm"
                        error={errors.password}
                        touched={touched.password}
                      />
                      <Field
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        size="sm"
                        error={errors.confirmPassword}
                        touched={touched.confirmPassword}
                      />
                    </div>
                    <Field
                      name="address"
                      label="Address"
                      size="sm"
                      error={errors.address}
                      touched={touched.address}
                    />
                    <Field
                      name="phone"
                      label="Phone"
                      size="sm"
                      error={errors.phone}
                      touched={touched.phone}
                    />
                    {roles.map((role) => (
                      <div key={role.id} className="flex gap-1">
                        <FormikField
                          role="radio"
                          key={role}
                          value={role.id}
                          name="role"
                          type="radio"
                        />
                        <label className="label">
                          <span className="label-text">{role.name}</span>
                        </label>
                      </div>
                    ))}
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-error text-sm"
                    />
                  </div>
                  <FormikField
                    type="submit"
                    value={isSubmitting ? "Registering..." : "Register"}
                    className="btn btn-primary mt-2 w-full rounded-md btn-sm"
                    disabled={isSubmitting}
                  />
                </Form>
              )}
            </Formik>
            {actionData && actionData.error && (
              <div className="alert alert-error alert-sm mt-2 py-2 rounded-lg">{actionData.error}</div>
            )}
            {actionData && actionData.status == 200 && (
              <div className="alert alert-success alert-sm text-sm">{actionData.message}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
