import { Document, Schema, Types, model } from 'mongoose';
import { IRole } from '../interfaces/role';

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const transform = (doc: Document, ret: Partial<IRole & {_id?:Types.ObjectId}>): Partial<IRole & {_id?:Types.ObjectId}> => {
  ret.id = (ret._id as Types.ObjectId).toString();
  delete ret._id;
  delete ret.__v;
  return ret;
}

roleSchema.set('toJSON', {
  transform: transform
})

export const Role = model('Role', roleSchema);
