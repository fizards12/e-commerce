// services/cartService.js

import { Types } from "mongoose";
import { Cart, populate } from "../models/cart";
import { CartItem } from "../models/cartItem";
import { IProduct } from "../interfaces/product";
import { CartItemInterface } from "../interfaces/cart";
async function updateCartTotal(cartId : string | Types.ObjectId) {
    const cart = await Cart.findById(cartId).populate<{ items: CartItemInterface<IProduct>[] }>(populate);
    
    if(!cart) return;

    const totalAmount = cart.items.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);

    cart.total_amount = totalAmount;
    await cart.save();
}

async function addItemToCart(cartId: string | Types.ObjectId, productId : string | Types.ObjectId, quantity : number) {
    const newItem = await CartItem.create({ cart: cartId, product: productId, quantity });
    await updateCartTotal(cartId);  // Manual update
    return newItem;
}

async function updateCartItem(cartId: string | Types.ObjectId, itemId : string | Types.ObjectId, quantity : number) {
    await CartItem.findByIdAndUpdate(itemId, { quantity });
    await updateCartTotal(cartId);
}

async function removeCartItem(cartId: string | Types.ObjectId, itemId: string | Types.ObjectId) {
    await CartItem.findByIdAndDelete(itemId);
    await updateCartTotal(cartId);
}

module.exports = {
    updateCartTotal,
    addItemToCart,
    updateCartItem,
    removeCartItem
};
