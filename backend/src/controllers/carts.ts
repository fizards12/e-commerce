import { Request, Response } from 'express';
import { Cart, populate } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { CartInterface, CartItemInterface } from '../interfaces/cart';
import { IProduct } from '../interfaces/product';
import { ErrorGenerator } from '../services/error';
import { Errors } from '../enum/errors';
import { AuthenticatedRequest } from '../middlewares/auth';
import { isObjectIdOrHexString } from 'mongoose';
export interface RequestWithData<T> extends AuthenticatedRequest {
    body: {
        data: T
    }
}


// Get cart details by ID
export const getCart = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const cart = await Cart.findOne({ user: req.user?.id }).populate<CartItemInterface<IProduct>>(populate);
        if (!cart) {
            // send status 204 to notify user that the cart not found without throwing error.
            res.status(204).send({ message: 'Cart not found' });
            
        }
        res.status(200).send({ message: 'Cart details', cart: cart?.toJSON()});
    } catch (error) {
        res.status(400).send({ message: 'Error fetching cart', error });
    }
};

// Add a cart item
export const updateItem = async (req: RequestWithData<CartItemInterface<string>>, res: Response) => {
    /**
     * Request
        * Body
            * data: New Cart Item Data
        * Params
            * id: string
     */
    try {
        // find user cart and if not exists create one 
        let cart = await Cart.findOne({ user: req.user?._id });

        // get item data from request
        const { data } = req.body;

        // check if product id is provided and valid id.
        let productId = data?.product;
        if(!productId || !isObjectIdOrHexString(productId)) 
            throw new ErrorGenerator(Errors.INVALID_ID, "CartItem");

        // check if quantity equal zero to delete cart item.
        if (data?.quantity == 0) {
            await CartItem.findOneAndDelete({ product: data.product });
        }else{
            // check if cart item already exist
            let cartItem = await CartItem.findOne({ product: data.product });
            // if item not exists create a new one
            if (!cartItem) {
                // if not exists create a new cart
                if (!cart) {
                    cart = new Cart({ user: req.user?._id });
                    await cart.save();
                }
                cartItem = new CartItem({
                    product: data.product,
                    quantity: data.quantity || 1,
                    cart: cart._id
                });
            } else {
                // if item exists update quantity
                cartItem.quantity = data.quantity || 1;
            }
            // save updates
            await cartItem.save();
        }
        
        cart = await Cart.findOne({ user: req.user?._id }).populate<CartItemInterface<IProduct>[]>(populate);
        res.status(200).send({ message: 'Cart Updated successfully', cart: cart?.toJSON() });
    } catch (error) {
        const err = new ErrorGenerator(Errors.ERROR_UPDATING, "Cart", error);
        res.status(err.status).send({ error_type: err.type, message: err.message,error: err.error });
    }
};
// Delete a cart item
export const deleteCartItem = async (req: AuthenticatedRequest, res: Response) => {
    try {
        await CartItem.findOneAndDelete({ _id: req.params.id });
        const cart = await Cart.findOne({ user: req.user?.id }).populate<CartItemInterface<IProduct>>(populate);
        if (!cart) {
            throw new ErrorGenerator(Errors.NOT_FOUND, "Cart");
        }
        res.status(200).send({ message: 'Cart item deleted successfully', cart });
    } catch (error) {
        if (error instanceof ErrorGenerator) {
            res.status(error.status).send({ error_type: error.type, message: error.message });
            return;
        }
        const err = new ErrorGenerator(Errors.ERROR_DELETING, "Cart", error);
        res.status(err.status).send({ error_type: err.type, message: err.message,error: err.error });
    }
};
