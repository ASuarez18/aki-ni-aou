import type { Profile } from "./reunion.ts";
import { SECRET_DIGEST } from "./secret.ts";

export const SESSION_KEY = "aki-session-v1";
export const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000;

export type Session = { profile: Profile; expiresAt: number };

export function parseSession(raw: string | null, now: number): Session | null {
  try {
    const s = JSON.parse(raw || "null");
    return s &&
      (s.profile === "Sa-chan" || s.profile === "Ku-chan") &&
      typeof s.expiresAt === "number" &&
      s.expiresAt > now
      ? s
      : null;
  } catch {
    return null;
  }
}

export async function matchesSecret(answer: string): Promise<boolean> {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(answer.toLowerCase())
  );
  return (
    Array.from(new Uint8Array(hash), (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("") === SECRET_DIGEST
  );
}
