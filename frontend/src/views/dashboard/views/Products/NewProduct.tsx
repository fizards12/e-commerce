import { Formik, Form } from "formik";
import { NewProductSchema } from "../../../../schemas/validations/product";
import Field from "../../../../components/atoms/Field/Field";
import { IProduct } from "../../../../schemas/product";
import AutoComplete, {
  Option,
} from "../../../../components/atoms/AutoComplete/AutoComplete";
import { useFetchDoc, useFetchDocList } from "../../../../Hooks/useFetchDoc";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GeneralError } from "../../../../services/error";
import { useMutateDoc } from "../../../../Hooks/useMutateDoc";
import ImageUploader from "../../../../components/atoms/Field/FileInput";

const initialValues: IProduct<string> = {
  name: "",
  stock: 0,
  price: 0,
  description: "",
  category: "",
  img: undefined,
};
const NewProduct = () => {
  const { id } = useParams();
  const [p]: [IProduct<string> | undefined, GeneralError | undefined] =
    useFetchDoc("product", id);
  const [product, setProduct] = useState<IProduct<string>>(initialValues);
  const [categories] = useFetchDocList("category");
  const { mutate: onSubmit } = useMutateDoc("product", id);
  useEffect(() => {
    if (p) {
      setProduct({ ...p });
    }
  }, [p]);

  return (
    <div className="card">
      <Formik
        enableReinitialize
        initialValues={product}
        validationSchema={NewProductSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting, setFieldValue, values }) => (
          <Form>
            <ImageUploader
              className="float-right"
              label="Product Image"
              setFieldValue={setFieldValue}
              name="img"
              error={errors.img}
              touched={touched.img}
              val={values.img}
            />
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
            </div>
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
            <div className="flex-col flex gap-1 items-start">
              <label htmlFor="category" className="label label-text">
                Product Category
              </label>
              <AutoComplete
                list={
                  Object.values(categories || [])?.map((c) => ({
                    id: c.id,
                    name: c.name,
                  })) || []
                }
                fieldDisplay="name"
                val={product.category || ""}
                name="category"
                id="category"
                onChange={(value: Option) => {
                  setFieldValue("category", value?.id || "");
                }}
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
              {!id && (isSubmitting ? "Creating..." : "Create")}
              {id && (isSubmitting ? "Updating..." : "Update")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewProduct;
