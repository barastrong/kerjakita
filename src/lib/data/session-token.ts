import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";

const KEY = createHash("sha256")
  .update(process.env.SESSION_SECRET ?? "kerjakita-demo-session-secret")
  .digest();

export function sealSession(payload: object): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", KEY, iv);
  const data = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);

  return Buffer.concat([iv, cipher.getAuthTag(), data]).toString("base64url");
}

export function openSession<T>(value: string | null | undefined): T | null {
  if (!value) return null;

  try {
    const raw = Buffer.from(value, "base64url");
    const decipher = createDecipheriv(
      "aes-256-gcm",
      KEY,
      raw.subarray(0, 12),
    );
    decipher.setAuthTag(raw.subarray(12, 28));
    const data = Buffer.concat([
      decipher.update(raw.subarray(28)),
      decipher.final(),
    ]);

    return JSON.parse(data.toString("utf8")) as T;
  } catch {
    return null;
  }
}
