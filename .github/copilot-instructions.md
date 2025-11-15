<!-- .github/copilot-instructions.md for job-portal-frontend -->

# Copilot / AI agent instructions — Job Portal Frontend

Quick summary

- This is a Next.js (App Router) + TypeScript frontend for a Spring Boot backend.
- Key folders: `src/app` (routes/layouts), `src/components` (UI), `src/services` (API wrappers), `src/contexts` (Auth/Filters), `src/hooks`.

What to know up front

- App Router is used — routes and layouts are under `src/app`. There are nested layouts (e.g. `src/app/(main)/...` and `src/app/profile/(dashboard)/...`). When changing route structure, update corresponding `layout.tsx` files.
- The shared HTTP client is `src/services/api-client.ts` — an Axios instance configured with `baseURL: process.env.NEXT_PUBLIC_BASE_URL` and `withCredentials: true`. Any cross-cutting HTTP behavior (headers, cookies) should be done via this instance.
- Authentication is centralized in `src/app/AuthProvider.tsx` + `src/contexts/AuthContext.ts`. AuthProvider installs Axios request/response interceptors to add Bearer tokens and to handle token refresh logic (it retries the original request after refresh). Pay attention to the 401 handling: it looks for an error message including "Invalid bearer token" and calls `/auth/refresh`.
- Service modules live in `src/services/*.ts`. Each service exports typed methods that call `apiClient` and generally return `res.data` (see `jobPost-service.ts` and `auth-service.ts` for examples). Follow their style when adding services: define request/response interfaces and export a default singleton instance.

Patterns & concrete examples

- API call (service pattern):
  - `src/services/jobPost-service.ts` shows typed enums/interfaces and methods like `jobPosts(filters?: string)` returning a `PageResponse<JobPostResponse>`.
  - To call from UI (React Query):
    - useQuery(['jobPosts', filters], () => jobPostService.jobPosts(filters))
- Auth flow example:
  - `auth-service.ts` has `login`, `logout`, `getSession`, `refreshToken` helpers that call `/auth/*` endpoints.
  - `AuthProvider` sets `Authorization: Bearer <token>` on requests (except refresh) and will attempt a refresh when it detects the specific 401 error string.
- React Query: `src/app/QueryProvider.tsx` sets up a `QueryClient` with `staleTime: 30s` and includes React Query Devtools.
- Theming: `src/components/ui/theme-provider.tsx` wraps `next-themes`.
- Uploads: uploadthing is installed; look for `src/app/api/uploadthing` and `@uploadthing/react` usage for file upload patterns.

Developer workflows & scripts

- Scripts (package.json):
  - `npm run dev` — runs `next dev --turbopack` (local development)
  - `npm run build` — `next build`
  - `npm run start` — `next start`
  - `npm run lint` — `next lint`
- Env required: set `NEXT_PUBLIC_BASE_URL` (e.g. `http://localhost:8080`) so `api-client` points at the backend. Because `api-client` uses `withCredentials: true`, the backend must allow credentials and CORS appropriately in dev.

Conventions & project-specific notes (follow these exactly)

- Services: prefer one service file per backend resource (e.g., `auth-service.ts`, `jobPost-service.ts`). Export typed interfaces/enums at the top, implement methods that return Axios calls, and export a `new Service()` singleton at the bottom.
- Types: keep request/response DTOs in the same service file where they are used (the codebase already does this). Use those exported types across UI and contexts.
- Error handling: many components expect the service call to throw an Axios error or return `res.data`. Do not swallow errors; let callers handle them and use UI components like `ErrorMessage.tsx` to present issues.
- Layouts: use nested `layout.tsx` files under `src/app` to scope providers and UI shells; adding a new section should include its own `layout.tsx` when isolation is required.
- UI components: `src/components/ui` contains many shadcn/radix-based primitives. Reuse these primitives instead of creating custom styled variants unless necessary.

Integration notes / gotchas

- Axios + refresh: The refresh logic in `AuthProvider` mutates the previous request's headers and replays it after receiving a new token. If you change error messages returned from the backend, update the string match for "Invalid bearer token" accordingly.
- withCredentials: true means cookies/sessions are expected. Local dev backend needs CORS config: Access-Control-Allow-Credentials and proper allowed origin.
- Next version: project uses Next 15 App Router; be careful when adding pages — use the App Router conventions, server/client component boundaries (`"use client"`), and nested layouts.

Where to look first when adding a feature

1. `src/services/` — add/extend backend interface and logic.
2. `src/contexts/` — if you need cross-cutting state (auth, filters, etc.).
3. `src/hooks/` — domain hooks live here (patterns exist for fetching/applying data).
4. `src/components/ui/` — reuse existing components for forms, inputs, and layout.
5. `src/app/` — add route, page, and layout files following existing nested layout structure.

Examples you can copy-paste

- Add a service method (pattern):
  - Define interfaces/enums at top of file.
  - Implement calls using `apiClient.get|post|patch|delete` and `.then(res => res.data)`.

When to ask the human

- If you need the backend contract changed or missing types — ask for the API OpenAPI/contract or coordinate changes with the backend repo.
- If auth token formats, refresh endpoints, or error messages change — confirm before editing the interceptors in `AuthProvider`.

If anything here is unclear or missing (env vars, CI steps, or routing intent), tell me what you want added and I'll iterate.
