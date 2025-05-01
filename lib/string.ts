// noinspection SpellCheckingInspection

/**
 * Generates a StyleX-like hash from a string using a modified FNV-1a algorithm
 * @param input The string to hash
 * @param shortOutput Whether to return a short base62 encoded version (default: true)
 * @returns A deterministic hash string
 */
export function hashString(input: string, shortOutput: boolean = true): string {
  // FNV-1a parameters - these are standard values for 32-bit FNV-1a
  const FNV_PRIME = 16777619;
  // Calculate the FNV-1a hash
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, FNV_PRIME);
  }

  // Make hash positive
  hash = hash >>> 0;

  if (!shortOutput) {
    return hash.toString(16); // Return hex representation
  }

  // Convert to base62 (a-zA-Z0-9) for shorter representation
  // Similar to how StyleX generates compact class names
  const BASE62_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let base62Hash = '';
  let value = hash;

  // Generate at least 4 characters even for small hashes
  do {
    base62Hash = BASE62_CHARS[value % 62] + base62Hash;
    value = Math.floor(value / 62);
  } while (value > 0 || base62Hash.length < 4);

  return base62Hash;
}