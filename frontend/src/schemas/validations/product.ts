import * as Yup from 'yup';

export const NewProductSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  price: Yup.number().required('Required').positive('Must be a positive number'),
  description: Yup.string().required('Required'),
  category: Yup.string().required('Required')
});

export const NewCategorySchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required')
});
