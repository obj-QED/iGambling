import { isApiRecordPayload } from '@api/contracts';
import { redactSecrets } from '@api/security';

export const INVALID_JSON_RESPONSE = 'Invalid JSON response';

const SNIPPET_MAX = 800;

export class ServerError extends Error {
  status: number;
  constructor(status: number, message = `Server error: ${status}`) {
    super(message);
    this.name = 'ServerError';
    this.status = status;
  }
}

/** Backend body is not a JSON object (HTML, PHP parse error, truncated JSON, empty). */
export class InvalidResponseError extends ServerError {
  snippet: string;
  constructor(status: number, message: string, snippet = '') {
    super(status, message);
    this.name = 'InvalidResponseError';
    this.snippet = snippet;
  }
}

export function toPayloadSnippet(data: unknown): string {
  if (typeof data === 'string') {
    return data.slice(0, SNIPPET_MAX);
  }
  try {
    return JSON.stringify(redactSecrets(data)).slice(0, SNIPPET_MAX);
  } catch {
    return String(data).slice(0, SNIPPET_MAX);
  }
}

export function createInvalidResponseError(
  data: unknown,
  status: number,
): InvalidResponseError | null {
  if (isApiRecordPayload(data)) return null;
  const code = status >= 400 ? status : 500;
  return new InvalidResponseError(code, INVALID_JSON_RESPONSE, toPayloadSnippet(data));
}
