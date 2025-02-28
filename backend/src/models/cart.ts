import { Document, Schema, Types, model } from 'mongoose';
import { CartInterface } from '../interfaces/cart';

const cartSchema = new Schema<CartInterface>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cartItems: [{ type: Schema.Types.ObjectId, ref: 'CartItem', required: true }],
  total_amount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

function transform(doc: Document, ret: Partial<CartInterface & Document>): Partial<CartInterface & Document> {
  ret.id = (ret._id as Types.ObjectId).toString();
  delete ret.createdAt;
  delete ret.updatedAt;
  delete ret.__v;
  return ret;
}

cartSchema.set('toJSON', { transform })

export const Cart = model('Cart', cartSchema);
