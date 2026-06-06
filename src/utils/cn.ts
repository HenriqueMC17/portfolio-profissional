import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes resolving conflicts safely.
 * Uses clsx for conditional classes and tailwind-merge to avoid style clashes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
