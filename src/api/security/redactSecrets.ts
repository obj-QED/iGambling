const SECRET_KEY_PATTERN =
  /^(token|access_token|refresh_token|password|passwd|secret|authorization|api[_-]?key|webhook[_-]?secret|bot[_-]?token)$/i;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Deep-clone-ish redact for logs / error serialization.
 * Never log lobby/bot tokens, passwords, or webhook secrets.
 */
export function redactSecrets<T>(value: T, depth = 0): T {
  if (depth > 8) return '[MaxDepth]' as T;
  if (typeof value === 'string') return value as T;
  if (Array.isArray(value)) {
    return value.map((item) => redactSecrets(item, depth + 1)) as T;
  }
  if (!isPlainObject(value)) return value;

  const out: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (SECRET_KEY_PATTERN.test(key) && entry != null && String(entry).length > 0) {
      out[key] = '[REDACTED]';
    } else {
      out[key] = redactSecrets(entry, depth + 1);
    }
  }
  return out as T;
}
