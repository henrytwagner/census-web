// utils/optional-context.ts
"use client";
import { createContext, useContext } from "react";

export function createOptionalContext<T>() {
  const Ctx = createContext<T | null>(null);
  const useOptional = () => useContext(Ctx);         // may return null
  const Provider = Ctx.Provider;
  return { Provider, useOptional };
}
