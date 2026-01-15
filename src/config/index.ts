import dotenv from "dotenv";

dotenv.config(); // Load .env variables

export const DATABASE_URL = process.env.DATABASE_URL!;
