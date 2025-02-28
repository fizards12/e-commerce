import { Request, Response } from 'express';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';

// Create a new cart
export const createCart = async (req: Request, res: Response) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.status(201).send({ message: 'Cart created successfully', cart });
    } catch (error) {
        res.status(400).send({ message: 'Error creating cart', error });
    }
};

// Get cart details by ID
export const getCart = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findById(req.params.id).populate('cartItems');
        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }
        res.status(200).send({ message: 'Cart details', cart });
    } catch (error) {
        res.status(400).send({ message: 'Error fetching cart', error });
    }
};

// Update cart information by ID
export const updateCart = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
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
            return res.status(404).send({ message: 'Cart not found' });
        }
        res.status(200).send({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error deleting cart', error });
    }
};

// Get multiple carts
export const getCarts = async (req: Request, res: Response) => {
    try {
        const carts = await Cart.find().populate('cartItems');
        res.status(200).send({ message: 'List of carts', carts });
    } catch (error) {
        res.status(400).send({ message: 'Error fetching carts', error });
    }
};

// Add a cart item
export const addCartItem = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne({ user: req.body.user });
        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }
        const cartItem = new CartItem(req.body.cartItem);
        await cartItem.save();
        cart.cartItems.push(cartItem._id);
        await cart.save();
        res.status(201).send({ message: 'Cart item added successfully', cart });
    } catch (error) {
        res.status(400).send({ message: 'Error adding cart item', error });
    }
};

// Create cart if not created for a user
export const createCartIfNotExists = async (req: Request, res: Response) => {
    try {
        let cart = await Cart.findOne({ user: req.body.user });
        if (!cart) {
            cart = new Cart({ user: req.body.user, cartItems: [] });
            await cart.save();
        }
        res.status(200).send({ message: 'Cart retrieved or created successfully', cart });
    } catch (error) {
        res.status(400).send({ message: 'Error creating or retrieving cart', error });
    }
};

// Delete a cart item
export const deleteCartItem = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne({ user: req.body.user });
        if (!cart) {
            return res.status(404).send({ message: 'Cart not found' });
        }
        const cartItemIndex = cart.cartItems.indexOf(req.params.itemId);
        if (cartItemIndex > -1) {
            cart.cartItems.splice(cartItemIndex, 1);
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
