import {
  Formik,
  Form,
  Field as FormikField,
  FormikHelpers,
} from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Field from "../../../components/atoms/Field/Field";
import { call } from "../../../services/call";
import { resetPassword } from "../../../services/auth";
import { resetPasswordSchema } from "../../../schemas/validations/auth";
export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const submitHandler = async (
    values: { password: string; confirmPassword: string },
    {
      setSubmitting,
    }: FormikHelpers<{ password: string; confirmPassword: string }>
  ) => {
    try {
      await call(resetPassword, [token, values.password]);
      navigate("/auth/login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={resetPasswordSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="flex flex-col gap-2">
              <Field
                name="password"
                label="New Password"
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
}
