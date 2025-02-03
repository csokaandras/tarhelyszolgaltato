import jwt from "jsonwebtoken";
import { config } from "../config/data-source";
 
export const generateToken = (payload: object): string => {
    return jwt.sign(payload, config.jwtSecret as string, { expiresIn: "1h" });
};