import { Formik, Form, FormikHelpers } from "formik";
import { NewProductSchema } from "../../../../schemas/validations/product";
import Field from "../../../../components/atoms/Field/Field";
import { AppDispatch, RootState } from "../../../../stores";
import { useDispatch, useSelector } from "react-redux";
import { createProductThunk } from "../../../../stores/products/productsThunk";
import { showToastThunk } from "../../../../stores/app/app";
import { IProduct } from "../../../../schemas/product";

const initialValues: IProduct = {
  name: "",
  stock: 0,
  price: 0,
  description: "",
  category: "",
};
const NewProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.products.categories
  );
  const onSubmit = async (
    values: IProduct,
    { setSubmitting }: FormikHelpers<IProduct>
  ) => {
    setSubmitting(true);
    try {
      await dispatch(createProductThunk(values)).unwrap();
      dispatch(
        showToastThunk({
          type: "success",
          message: "Product created successfully",
          duration: 2000,
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h4>New Product</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={NewProductSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              error={errors.name}
              touched={touched.name}
              type="text"
              id="name"
              name="name"
              label="Name"
              size="sm"
            />
            <Field
              error={errors.price}
              touched={touched.price}
              type="number"
              id="price"
              name="price"
              label="Price"
              size="sm"
            />
            <Field
              error={errors.stock}
              touched={touched.stock}
              type="number"
              id="stock"
              name="stock"
              label="Stock"
              size="sm"
            />
            <Field
              error={errors.description}
              touched={touched.description}
              as={"textarea"}
              id="description"
              name="description"
              label="Description"
              size="sm"
            />
            <div>
              <label className="label font-semibold">Product Category</label>
              {categories.map((category, index) => (
                <Field
                  key={index}
                  error={errors.category}
                  touched={touched.category}
                  as={"radio"}
                  value={category.id}
                  id="category"
                  classes={{
                    wrapperClass: "flex-row flex-wrap items-center",
                    labelClass: "order-2 font-semibold",
                    errorClass: "w-full order-3",
                    fieldClass: "order-1 radio-bordered",
                  }}
                  name="category"
                  label={category.name}
                  size="sm"
                />
              ))}
            </div>
            <button className="mt-2 btn btn-primary" type="submit">
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewProduct;
