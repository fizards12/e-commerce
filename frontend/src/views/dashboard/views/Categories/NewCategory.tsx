import { Formik, Form, FormikHelpers } from "formik";
import { NewCategorySchema } from "../../../../schemas/validations/product";
import Field from "../../../../components/atoms/Field/Field";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../stores";
import { ICategory } from "../../../../schemas/category";
import { createCategoryThunk } from "../../../../stores/products/productsThunk";
import { showToastThunk } from "../../../../stores/app/app";
const initialValues: ICategory = {
  name: "",
  description: "",
};
const NewCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = async (
    values: ICategory,
    { setSubmitting }: FormikHelpers<ICategory>
  ) => {
    setSubmitting(true);
    try {
      await dispatch(createCategoryThunk(values)).unwrap();
      dispatch(showToastThunk({ type:"success", message: "Category created successfully", duration: 2000 }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h4>New Category</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={NewCategorySchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <>
            <Form>
              <Field
                placeholder="Category Name"
                error={errors.name}
                touched={touched.name}
                type="text"
                id="name"
                name="name"
                label="Name"
                size="sm"
              />
              <Field
                placeholder="Description"
                error={errors.description}
                touched={touched.description}
                height={200}
                as={"textarea"}
                id="description"
                name="description"
                label="Description"
                size="sm"
              />
              <button disabled={isSubmitting} className="mt-2 btn btn-primary" type="submit">
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default NewCategory;
