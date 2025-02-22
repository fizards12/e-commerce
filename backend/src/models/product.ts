import { Schema, Types, model } from 'mongoose';
import { ProductWithCategory, ProductWithCategoryId } from '../interfaces/product';
import { Document } from 'mongoose';

const productSchema = new Schema<ProductWithCategoryId | ProductWithCategory>({
  name: { type: String,unique: true, required: true },
  description: { type: String, required: true },
  img: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const transform = (doc: Document, ret: Partial<ProductWithCategoryId | ProductWithCategory>): Partial<ProductWithCategoryId | ProductWithCategory> => {
  ret.id = (ret._id as Types.ObjectId).toString();
  delete ret._id;
  delete ret.__v;
  return ret;
};
productSchema.set('toJSON', { transform });
export const Product = model('Product', productSchema);
