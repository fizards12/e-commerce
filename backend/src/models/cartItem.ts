import { Schema, Types, model, startSession } from 'mongoose';
import { CartItemInterface } from '../interfaces/cart';
import { Document } from 'mongoose';
import { Cart } from './cart';


// TODO: use Classes for cart and cartItem

const cartItemSchema = new Schema<CartItemInterface<Types.ObjectId>>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1, min: 1 },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
  // ...existing code...
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// post save hook
// Update cart total after CartItem is saved (created or updated)
cartItemSchema.post('save', async function (doc) {
  const cartId = doc.cart;
  const newSession = await startSession();
  newSession.startTransaction();
  try {
    // Calculate new total using aggregation
    const result = await CartItem.aggregate([
      { $match: { cart: cartId } },
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'product'
        }
      },
      {$unwind: '$product'},
      { $group: { _id: null, total: { $sum: { $multiply: ['$quantity', '$product.price'] } } } }
    ]).session(newSession);
    const total = result[0]?.total || 0;
    // Update cart's total
    await Cart.findByIdAndUpdate(cartId, { total_amount: total }, { session: newSession });
    await newSession.commitTransaction();
  } catch (error) {
    await newSession.abortTransaction();
    throw error;
  } finally {
    newSession.endSession();
  }
});

// Update cart total after CartItem is removed
cartItemSchema.post('findOneAndDelete', async function (doc?: CartItemInterface<Types.ObjectId>) {
  if (!doc) return;
  console.log(doc)
  const cartId = doc.cart;
  const session = await startSession();
  session.startTransaction();
  try {
    const result = await CartItem.aggregate([
      { $match: { cart: cartId } },
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'product'
        }
      },
      {$unwind: '$product'},
      { $group: { _id: null, total: { $sum: { $multiply: ['$quantity', '$product.price'] } } } }
    ]).session(session);

    const total = result[0]?.total || 0;
    await Cart.findByIdAndUpdate(cartId, { total_amount: total }, { session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});


function transform(doc: Document, ret: Partial<CartItemInterface & { _id?: Types.ObjectId }>): Partial<CartItemInterface & { _id?: Types.ObjectId }> {
  ret.id = (ret._id as Types.ObjectId).toString();
  delete ret.createdAt;
  delete ret.updatedAt;
  delete ret._id;
  delete ret.__v;
  return ret;
}

cartItemSchema.set('toJSON', { transform })

export const CartItem = model('CartItem', cartItemSchema);
