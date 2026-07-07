import { existsSync } from "fs";
import { join } from "path";

/** Liefert den öffentlichen Pfad eines optionalen Bildes — oder null, wenn es (noch) nicht hinterlegt ist. */
export function optionalImage(relativePath: string): string | null {
  const filePath = join(process.cwd(), "public", relativePath);
  return existsSync(filePath) ? `/${relativePath}` : null;
}
