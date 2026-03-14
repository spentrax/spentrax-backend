import { randomBytes } from "crypto";
import * as bcrypt from "bcrypt";

export function generateApiKey(): string {
  return `spx_sk_${randomBytes(24).toString("hex")}`;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
