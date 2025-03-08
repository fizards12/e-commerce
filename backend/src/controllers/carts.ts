import { Request, Response } from 'express';
import { Cart, populate } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { CartInterface, CartItemInterface } from '../interfaces/cart';
import { IUser } from '../interfaces/user';
import { IProduct } from '../interfaces/product';
export interface RequestWithData<T> extends Request {
    body: {
        data: T
    }
}

// Get cart details by ID
export const getCart = async (req: Request & { user: IUser }, res: Response) => {
    try {
        const cart = await Cart.findOne({user: req.user.id}).populate<CartItemInterface<IProduct>>(populate);
        if (!cart) {
            // send status 204 to notify user that the cart not found without throwing error.
            res.status(204).send({ message: 'Cart not found' });
            return
        }
        res.status(200).send({ message: 'Cart details', cart });
        return
    } catch (error) {
        res.status(400).send({ message: 'Error fetching cart', error });
    }
};

// Add a cart item
export const updateItem = async (req: RequestWithData<CartItemInterface<string>> & { user: IUser }, res: Response) => {
    /**
     * Request
        * Body
            * count: number
        * Params
            * id: string
     */
    try {
        // initialize quantity
        let quantity = 1;
        // get item data from request
        const { data } = req.body;

        // check if quantity is provided
        if (data.quantity != 0 && data.quantity) {
            quantity = data.quantity;
        }
        // if quantity is 0 delete item
        if (quantity == 0) {
            await CartItem.findOneAndDelete({_id: data.id});
            res.status(200).send({ message: 'Cart item deleted successfully' });
            return;
        }

        // check if cart item already exist
        let cartItem = await CartItem.findOne({ user: req.user._id, product: data.product });
        // if item not exists create a new one
        if (!cartItem) {
            cartItem = new CartItem({
                ...data,
                quantity
            });
        } else {
            // if item exists update quantity
            cartItem.quantity = quantity;
        }
        // find user cart and if not exists create one 
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id });
            await cart.save();
        }
        await cartItem.save();
        res.status(200).send({ message: 'Cart item added successfully', cart });
    } catch (error) {
    }
};
// Delete a cart item
export const deleteCartItem = async (req: Request, res: Response) => {
    try {
        const cart = await CartItem.findOneAndDelete({ cart: req.params.id });
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
