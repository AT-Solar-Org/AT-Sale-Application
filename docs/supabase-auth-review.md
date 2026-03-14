# Supabase Authentication Code Review (Next.js App Router)

### Overall Assessment
The current implementation in the `authen` branch handles basic client-side authentication successfully using Supabase. However, it **does not adhere to the latest Next.js App Router and Supabase best practices** (as of early 2026).

Currently, the setup is heavily client-dependent. This misses out on the security, performance, and SSR (Server-Side Rendering) benefits provided by Next.js Server Components, Server Actions, and Middleware.

### Key Issues & Recommendations

#### 1. Outdated Supabase Client Configuration
- **Current State:** You are exporting a singleton client from `lib/supabase.ts` using `@supabase/supabase-js`. This is adequate for purely client-side React apps but poses major issues for Next.js App Router, as the authentication state (tokens) cannot be securely shared between the server and the client without cookies.
- **Best Practice Recommendation:** Install and use the `@supabase/ssr` package. This package provides helper functions (`createServerClient` and `createBrowserClient`) to ensure the authentication session is correctly read and securely managed through cookies. This allows your Server Components and API Routes to reliably identify the authenticated user.

#### 2. Missing Next.js Middleware (`middleware.ts`)
- **Current State:** There is no `middleware.ts` in the project root. This means routes are not protected at the edge, and access tokens are not automatically refreshed on page loads.
- **Best Practice Recommendation:** Implement a Next.js `middleware.ts`. This middleware will intercept requests, verify the active user session via Supabase, securely refresh stale access tokens, and redirect unauthorized users away from protected routes (like `/dashboard` and `/pending`) *before* the server renders the page.

#### 3. Over-reliance on Client-Side Authentication Flow
- **Current State:** In `SignInForm.tsx` and `SignUpForm.tsx`, the authentication, profile fetching, and routing logic (`router.push`) are managed completely on the client side inside the `handleSubmit` event.
- **Best Practice Recommendation:** Shift to using **Next.js Server Actions**. By calling a Server Action to handle sign-in, the server securely handles the Supabase request, reads the user profile to check `role` and `is_approved`, sets the HTTP-only cookies, and executes the redirect cleanly from the backend. This eliminates loading flashes on the UI.

#### 4. Handling State with `localStorage`
- **Current State:** In `callback/page.tsx` and `SignUpForm.tsx`, `localStorage` is used to store `pendingProfileData` across the authentication verification flow.
- **Best Practice Recommendation:** `localStorage` is inaccessible to Next.js server-side code. To bridge this gap, you can pass temporary context via URL Search Parameters, or use cookies (which Server Actions can read and write), or store progressive profiling data in your database natively before or during the signup flow.

### Next Steps Forward
To refactor the codebase to modern standards, without writing any code right now, you should plan to:
1. Run `npm install @supabase/ssr`.
2. Delete the current `lib/supabase.ts`.
3. Create new dedicated clients for the server, browser, and middleware following the official Supabase documentation for Next.js.
4. Add a `middleware.ts` file in the project root for strict route protection.
5. Move the business logic from your `SignInForm.tsx` and `SignUpForm.tsx` directly into Server Actions (`actions.ts`).
