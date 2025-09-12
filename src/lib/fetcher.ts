// src/app/lib/fetcher.ts
export async function jsonFetcher(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, { cache: "no-store", ...init });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  return res.json();
}
