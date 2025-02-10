import { Request, Response, NextFunction } from "express";
import { Role } from "../models/role";
import { Errors } from "../enum/errors";
import { ErrorGenerator } from "../services/error";

// Create a new role
export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const role = new Role(req.body.role);
    await role.save();
    res.status(201).send({ role });
  } catch (error: any) {
    let err : ErrorGenerator
    if(error.code === 11000) {
      err = new ErrorGenerator(Errors.DUPLICATE_KEYS, "Role");
    }else {
      err = new ErrorGenerator(Errors.ERROR_CREATING, "Role",error);
    }
    next(err)
  }
};

// Get role details by ID
export const getRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      throw new ErrorGenerator(Errors.NOT_FOUND, "Role");
    }
    res.status(200).send({ role });
  } catch (error) {
    if(error instanceof ErrorGenerator){
      res.status(error.status).send({ error_type: error.type, message: error.message });
      return;
    }
    let err = new ErrorGenerator(Errors.ERROR_FETCHING_DETAILS, "Role",error);
    next(err);
  }
};

// Update role information by ID
export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!role) {
      throw new ErrorGenerator(Errors.NOT_FOUND, "Role");
    }
    res.status(201).send({ role });
  } catch (error) {
    if(error instanceof ErrorGenerator){
      res.status(error.status).send({ error_type: error.type, message: error.message });
      return;
    }
    let err = new ErrorGenerator(Errors.ERROR_UPDATING, "Role",error);
    next(err);
  }
};

// Delete a role by ID
export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      throw new ErrorGenerator(Errors.NOT_FOUND, "Role");
    }
    res.sendStatus(204);
  } catch (error) {
    if(error instanceof ErrorGenerator){
      res.status(error.status).send({ error_type: error.type, message: error.message });
      return
    } 
    let err = new ErrorGenerator(Errors.ERROR_DELETING, "Role",error);
    next(err);
  }
};

// Get the number of roles
export const getRoleCount = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const count = await Role.countDocuments();
    res.status(200).send({ count });
  } catch (error) {
    let err = new ErrorGenerator(Errors.ERROR_FETCHING_COUNT, "Role");
    next(err);
  }
};

// Get multiple roles
export const getRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const roles = await Role.find();
    res.status(200).send({ roles });
  } catch (error) {
    let err = new ErrorGenerator(Errors.ERROR_FETCHING, "Role",error);
    next(err);
  }
};
