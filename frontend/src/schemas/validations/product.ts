import * as Yup from 'yup';
import { IProduct } from '../product';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const NewProductSchema = Yup.object<IProduct>().shape({
  name: Yup.string().required('Required'),
  price: Yup.number().required('Required').positive('Must be a positive number'),
  stock: Yup.number().required('Required').positive('Must be a positive number'),
  description: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  img: Yup.mixed()
    .test('fileSize', 'File size is too large', (value) => 
      !value || (value && (value as File).size <= MAX_FILE_SIZE))
    .test('fileType', 'Unsupported file format', value =>
      !value || (value && SUPPORTED_FORMATS.includes((value as File).type)))
});

export const NewCategorySchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required')
});
