// src/lib/errors.ts
export type FieldErrors = Partial<Record<"firstName" | "lastName" | "username" | "email" | "password" | "confirm" | "form", string>>;

type ApiError = {
  code: string;                       // REQUIRED now
  message: string;                    // REQUIRED now
  fieldErrors?: { field: string; message: string }[];
};

const FIELD_MAP = new Set(["firstName", "lastName", "username", "email", "password", "confirm"]);

/** Parse API error (no heuristics). If payload is bad, show a safe generic form error. */
export function normalizeAuthError(raw: string): FieldErrors {
  let data: ApiError | null = null;
  try {
    data = JSON.parse(raw);
  } catch {
    return { form: "Request failed" };
  }
  if (!data || !data.code) return { form: "Request failed" };

  const out: FieldErrors = {};
  for (const v of data.fieldErrors ?? []) {
    if (v.field && FIELD_MAP.has(v.field)) {
      out[v.field as keyof Omit<FieldErrors, "form">] = v.message || "Invalid value";
    }
  }

  if (Object.keys(out).length) return out;
  return { form: data.message || data.code };
}
