import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cartItems: [{ type: Schema.Types.ObjectId, ref: 'CartItem', required: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Cart = model('Cart', cartSchema);
