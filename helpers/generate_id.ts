import { createHash } from "crypto";

export function generateID(name: string) {
   return createHash("sha256").update(name).digest("hex");
}