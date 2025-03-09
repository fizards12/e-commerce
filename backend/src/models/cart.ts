import { Document, Schema, Types, UpdateQuery, model } from 'mongoose';
import { CartInterface, CartItemInterface } from '../interfaces/cart';
import { IProduct } from '../interfaces/product';

export let populate = {
  path: 'items',
  populate: {
      path: 'product',
      select: 'name price img'
  }
}

const cartSchema = new Schema<CartInterface>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  total_amount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

cartSchema.virtual<CartItemInterface<IProduct>>('items', {
  ref: 'CartItem',
  localField: '_id',
  foreignField: 'cart',
  justOne: false,
});

// pre save hook
cartSchema.pre("save", async function (next) {
  next();
});

// pre update hook
cartSchema.pre(["updateOne", "findOneAndUpdate"], async function (next) {
  next();
});

// pre delete hook
cartSchema.pre(['deleteOne', 'findOneAndDelete'], async function(next) {
  next();
});

function transform(doc: Document, ret: Partial<CartInterface & Document>): Partial<CartInterface & Document> {
  ret.id = (ret._id as Types.ObjectId).toString();
  delete ret.createdAt;
  delete ret.updatedAt;
  delete ret.__v;
  delete ret._id;
  return ret;
}

cartSchema.set('toJSON', { transform,virtuals: true })

export const Cart = model('Cart', cartSchema);
