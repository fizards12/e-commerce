import { Document, Schema, model } from 'mongoose';
import { IRole } from '../interfaces/role';

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const transform = (doc: Document, ret: Partial<IRole>): Partial<IRole> => {
  ret.id = (ret._id as Schema.Types.ObjectId).toString();
  return ret;
}

roleSchema.set('toJSON', {
  transform: transform
})

export const Role = model('Role', roleSchema);
