import dotenv from "dotenv";
import type { Secret } from "jsonwebtoken";

dotenv.config();

export const JWT_SECRET: Secret = process.env.JWT_SECRET as string;
export const JWT_ACCESS_DURATION: string | number = process.env.JWT_ACCESS_DURATION || "1d";
export const API_KEY = process.env.API_KEY as string;
export const PORT = process.env.PORT || "3000";
export const DATABASE_URL = process.env.DATABASE_URL as string;
