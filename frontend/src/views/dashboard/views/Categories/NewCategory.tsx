import { Formik, Form } from "formik";
import { NewCategorySchema } from "../../../../schemas/validations/product";
import Field from "../../../../components/atoms/Field/Field";
import { ICategory } from "../../../../schemas/category";
import { useEffect, useState } from "react";
import { useFetchDoc } from "../../../../Hooks/useFetchDoc";
import { useParams } from "react-router-dom";
import { useMutateDoc } from "../../../../Hooks/useMutateDoc";
const initialValues: ICategory = {
  name: "",
  description: "",
};
const NewCategory = () => {
  const { id } = useParams();
  const [c] = useFetchDoc('category', id);
  const [category, setCategory] = useState<ICategory>(initialValues);
  useEffect(()=>{
    if(c ){
      setCategory({...c});
    }
  },[c])
  const { mutate : onSubmit } = useMutateDoc('category', id);

  return (
    <div className="card">
      <Formik
        initialValues={category}
        enableReinitialize
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
                {!id && (isSubmitting ? "Creating..." : "Create")}
                {id && (isSubmitting ? "Updating..." : "Update")}
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default NewCategory;
