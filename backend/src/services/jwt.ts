import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET, PRODUCTION_ENV } from "../env";
import { Response } from "express";
import { Request } from "express";

// ...existing code...

/**
 * Generates a JWT token with the given payload.
 * @param payload - The payload to include in the token.
 * @returns The generated JWT token.
 */
export function generateToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

/**
 * Verifies the given JWT token and returns the decoded payload.
 * @param token - The JWT token to verify.
 * @returns The decoded payload if the token is valid, otherwise null.
 */
export function verifyToken(token: string): JwtPayload | string | null {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

/**
 * Stores the given JWT token in an HTTP-only cookie.
 * @param token - The JWT token to store.
 * @param res - The Express response object.
 */
export function storeTokenInCookie(token: string, res: Response): void {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === PRODUCTION_ENV,
    maxAge: 3600000, // 1 hour
  });
}

/**
 * Retrieves the JWT token from the HTTP-only cookie.
 * @param req - The Express request object.
 * @returns The JWT token if present, otherwise null.
 */
export function getTokenFromCookie(req: Request): string | null {
    const token = req.cookies?.token;
    return token || null;
}

/**
 * Clears the JWT token from the HTTP-only cookie.
 * @param res - The Express response object.
 */
export function clearTokenFromCookie(res: Response): void {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === PRODUCTION_ENV,
  });
}
