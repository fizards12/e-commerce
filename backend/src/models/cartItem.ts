import { Schema, Types, model } from 'mongoose';
import { CartItemInterface } from '../interfaces/cart';
import { Document } from 'mongoose';

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  // ...existing code...
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

function transform(doc: Document, ret: Partial<CartItemInterface & {_id?:Types.ObjectId}>): Partial<CartItemInterface & {_id?:Types.ObjectId}> {
  ret.id = (ret._id as Types.ObjectId).toString();
  delete ret.createdAt;
  delete ret.updatedAt;
  delete ret.__v;
  return ret;
}

cartItemSchema.set('toJSON', { transform })

export const CartItem = model('CartItem', cartItemSchema);
