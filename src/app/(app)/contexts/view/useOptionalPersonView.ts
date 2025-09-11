// src/app/(app)/contexts/view/useOptionalPersonView.ts
"use client";

import { useContext } from "react";
import type { PersonViewState } from "./PersonViewContext"; // re-export the type there
import { __internalCtx as PersonViewCtx } from "@/app/(app)/contexts/view/PersonViewContext";     // see note below

/**
 * Optional version of usePersonView().
 * - Returns the PersonViewState if a provider is present
 * - Returns null if not wrapped in <PersonViewProvider>
 */
export function useOptionalPersonView(): PersonViewState | null {
  return useContext(PersonViewCtx);
}
