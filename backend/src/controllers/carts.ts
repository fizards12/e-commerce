import { Request, Response } from 'express';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { CartInterface, CartItemInterface } from '../interfaces/cart';
import { IUser } from '../interfaces/user';
import { ErrorGenerator } from '../services/error';
import { Errors } from '../enum/errors';
export interface RequestWithData<T> extends Request {
    body: Request['body'] & {
        data?: T
    }
}

let populate = {
    path: 'items',
    populate: {
        path: 'product',
        select: 'name price img'
    }
}

// Get cart details by ID
export const getCart = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findById(req.params.id).populate(populate);
        if (!cart) {
            res.status(404).send({ message: 'Cart not found' });
            return
        }
        res.status(200).send({ message: 'Cart details', cart });
        return
    } catch (error) {
        res.status(400).send({ message: 'Error fetching cart', error });
    }
};

// Update cart information by ID
export const updateCart = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cart) {
            res.status(404).send({ message: 'Cart not found' });
            return
        }
        res.status(200).send({ message: 'Cart updated successfully', cart });
    } catch (error) {
        res.status(400).send({ message: 'Error updating cart', error });
    }
};

// Delete a cart by ID
export const deleteCart = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if (!cart) {
            res.status(404).send({ message: 'Cart not found' });
            return
        }
        res.status(200).send({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error deleting cart', error });
    }
};

// Add a cart item
export const updateItem = async (req: RequestWithData<CartItemInterface> & { user: IUser }, res: Response) => {
    try {
        // find user cart and if not exists create one 
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [],total_amount: 0 });
        }
        // initialize quantity
        let quantity = 1;
        // get item data from request
        let { data } = req.body;

        // check if quantity is provided
        if (data.quantity != 0 && data.quantity) {
            quantity = data.quantity;
        }
        // check if cart item already exist
        let cartItem = await CartItem.findOne({ user: req.user._id, product: data.product });
        // if item not exists create a new one
        if (!cartItem) {
            cartItem = new CartItem({
                user: req.user._id,
                ...data
            });
        } else {
            // if item exists update quantity
            cartItem.quantity = quantity;
        }
        if(cartItem.quantity == 0){
            await CartItem.findByIdAndDelete(cartItem._id);
        }else{
            await cartItem.save();
        }
        // find item on cart and if not exists add it
        await cart.populate(populate);
        const cartItemIndex = cart.items.findIndex((item) => item.product === cartItem.product.toString());
        
        await cart.save();
        res.status(200).send({ message: 'Cart item added successfully', cart });
    } catch (error) {
    }
};
// Delete a cart item
export const deleteCartItem = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne({ user: req.body.user });
        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }
        const cartItemIndex = cart.items.indexOf(req.params.itemId);
        if (cartItemIndex > -1) {
            cart.items.splice(cartItemIndex, 1);
            await CartItem.findByIdAndDelete(req.params.itemId);
            await cart.save();
            res.status(200).send({ message: 'Cart item deleted successfully', cart });
        } else {
            res.status(404).send({ message: 'Cart item not found' });
        }
    } catch (error) {
        res.status(400).send({ message: 'Error deleting cart item', error });
    }
};
