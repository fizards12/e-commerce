import { Formik, Form, Field as FormikField, ErrorMessage } from "formik";
import Field from "../../../components/atoms/Field/Field";
import { call } from "../../../services/call";
import { forgetPassword } from "../../../services/auth";
import { showToastThunk } from "../../../stores/app/app";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
const ForgetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <h2>Forget Password</h2>
      <Formik
        initialValues={{ email: "" }}
        validate={(values) => {
          const errors: { email?: string } = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // handle submit logic here
          try {
            await call(forgetPassword, [values.email]);
            dispatch(showToastThunk({
              message: "Password reset link sent to your email.",
              type: "success",
              duration: 3000
            }));
          } catch (error) {
            console.log(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div>
              <Field
                name="email"
                label="Email"
                size="sm"
                error={errors.email}
                touched={touched.email}
                fieldStyle="outlined"
                classes={{
                  fieldClass: "bg-gray-50",
                }}
              />
            </div>
            <div>
              <FormikField
                type="submit"
                value={isSubmitting ? "Sending..." : "Reset Password"}
                className="btn btn-primary mt-2 rounded-md"
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgetPassword;
