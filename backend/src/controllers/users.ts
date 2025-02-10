import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { isObjectIdOrHexString, MongooseError } from "mongoose";
import { ErrorGenerator } from "../services/error";
import { Errors } from "../enum/errors";

// Create a new user
export const createUser = (req: Request, res: Response) => {
  // ...existing code...
  // Logic to create a new user
  res.status(201).send({ message: "User created successfully" });
};

// Get user details by ID
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.id || isObjectIdOrHexString(req.params.id) === false) {
      throw new ErrorGenerator(Errors.INVALID_ID, "User");
    }
    const user = await User.findById(req.params.id).populate("role");
    if (!user) {
      throw new ErrorGenerator(Errors.NOT_FOUND, "User");
    }
    // Logic to get user details by ID
    res.status(200).send({ message: "User details", user });
  } catch (error) {
    if (error instanceof ErrorGenerator) {
      res
        .status(error.status)
        .send({ error_type: error.type, message: error.message });
      return;
    }
    let err = new ErrorGenerator(Errors.ERROR_FETCHING_DETAILS, "User", error);
    next(err);
  }
};

// Update user information by ID
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  // ...existing code...
  // Logic to update user information by ID
  res.status(200).send({ message: "User updated successfully" });
};

// Delete a user by ID
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  // ...existing code...
  // Logic to delete a user by ID
  res.status(200).send({ message: "User deleted successfully" });
};

// Get the number of users
export const getUserCount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // ...existing code...
  // Logic to get the number of users
  res.status(200).send({ message: "Number of users", count: 0 });
};

// Get multiple users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // ...existing code...
  try {
    const users = await User.find();
    // Logic to get multiple users
    res.status(200).send({ message: "List of users", users });
  } catch (error) {
    let err = new ErrorGenerator(Errors.ERROR_CREATING, "User", error);
    next(err);
  }
};
