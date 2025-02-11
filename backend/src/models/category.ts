import { Document, Schema, model } from 'mongoose';
import { ICategory } from '../interfaces/category';

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true,unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const transform = (doc: Document, ret: Partial<ICategory>): Partial<ICategory> => {
  ret.id = (ret._id as Schema.Types.ObjectId).toString();
  delete ret._id;
  delete ret.__v;
  return ret;
};
categorySchema.set('toJSON', { transform });

export const Category = model('Category', categorySchema);
