import { treaty } from "@elysiajs/eden";
import type { App } from "backend";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const api = treaty<App>(API_URL).api;
