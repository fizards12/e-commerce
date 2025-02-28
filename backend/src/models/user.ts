import { Document, Schema, Types, model } from 'mongoose';
import { IUser, UserwithRoleId } from '../interfaces/user';

const userSchema = new Schema<IUser<Types.ObjectId>>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  role: { type: Types.ObjectId, ref: 'Role', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Define a typed transform function
function transform(doc: Document, ret: Partial<UserwithRoleId & {_id?:Types.ObjectId}>): Partial<UserwithRoleId & {_id?:Types.ObjectId}> {
  ret.id = (ret._id as Types.ObjectId).toString();
  delete ret.createdAt;
  delete ret.updatedAt;
  delete ret.__v;
  delete ret.password;
  return ret;
}

// Exclude password field when converting to JSON
userSchema.set('toJSON', { transform });

export const User = model('User', userSchema);
