import { Formik, Form, FormikHelpers } from "formik";
import { NewProductSchema } from "../../../../schemas/validations/product";
import Field from "../../../../components/atoms/Field/Field";
import { AppDispatch } from "../../../../stores";
import { useDispatch } from "react-redux";
import { createProductThunk } from "../../../../stores/products/productsThunk";
import { showToastThunk } from "../../../../stores/app/app";
import { IProduct } from "../../../../schemas/product";
import AutoComplete, {
  Option,
} from "../../../../components/atoms/AutoComplete/AutoComplete";
import { useFetchDoc, useFetchDocList } from "../../../../Hooks/useFetchDoc";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const initialValues: IProduct<string> = {
  name: "",
  stock: 0,
  price: 0,
  description: "",
  category: "",
};
const NewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [p] = useFetchDoc('product', id);
  const [product, setProduct] = useState<IProduct<string>>(initialValues);
  const [categories] = useFetchDocList('category');
  useEffect(()=>{
    if(p && typeof p.category == 'object'){
      setProduct({...p, category: p.category.id || ''});
    }
  },[p])
  const onSubmit = async (
    values: IProduct<string>,
    { setSubmitting }: FormikHelpers<IProduct<string>>
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
      <h4>{p ? "Edit Product" : 'New Product'}</h4>
      <Formik
      enableReinitialize
        initialValues={product}
        validationSchema={NewProductSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <div className="flex gap-2">
              <Field
                error={errors.name}
                touched={touched.name}
                classes={{
                  wrapperClass: "flex-1",
                }}
                type="text"
                id="name"
                name="name"
                label="Product Name"
                size="sm"
              />
              <Field
                error={errors.price}
                touched={touched.price}
                classes={{
                  wrapperClass: "flex-1",
                }}
                type="number"
                id="price"
                name="price"
                label="Price"
                size="sm"
              />
              <Field
                error={errors.stock}
                touched={touched.stock}
                classes={{
                  wrapperClass: "flex-1",
                }}
                type="number"
                id="stock"
                name="stock"
                label="Stock"
                size="sm"
              />
            </div>
            <div className="flex-col flex gap-1 items-start">
              <label htmlFor="category" className="label label-text">
                Product Category
              </label>
              <AutoComplete
                list={categories?.map((c) => ({id: c.id, name: c.name})) || []}
                fieldDisplay="name"
                val={product.category || ''}
                name="category"
                id="category"
                onChange={(value: Option) =>
                  setFieldValue("category", value?.id || "")
                }
              />
              {errors.category && touched.category && (
                <div className="text-red-500">{errors.category}</div>
              )}
            </div>
            <Field
              error={errors.description}
              touched={touched.description}
              as={"textarea"}
              id="description"
              name="description"
              label="Description"
              size="sm"
            />
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
