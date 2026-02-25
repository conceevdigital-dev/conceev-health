

## Diagnosis

I verified the backend database thoroughly:

- **User exists**: `admin@conceev.com` (ID: `31c26655-f613-4040-9af4-85774b5a1a6b`, email confirmed, last sign-in recorded)
- **Admin role exists**: The `user_roles` table has an entry with `role: admin` for this user
- **Auth logs show success**: The backend auth service returns HTTP 200 for login requests that reach it

The problem is that **requests never reach the backend**. Every single auth request from your browser fails with "Failed to fetch" before it even hits the server. The retry mechanism we added retries 3 times, but all 3 attempts fail identically because the underlying `fetch()` call is being blocked/intercepted in the preview environment.

## Root Cause

The Supabase JS client uses `window.fetch()` internally for all auth requests. The preview environment intercepts `window.fetch()`, and this interception is consistently blocking the auth endpoint. Retrying the same blocked call will never work.

## Solution: Create a backend login function

Instead of relying on the client-side `fetch()` (which is intercepted), we will create a **backend function** that handles authentication server-side, then returns the session tokens to the client. The client calls this function via a simple POST -- which goes through a different code path that works reliably.

### Changes

1. **Create `supabase/functions/admin-login/index.ts`** -- A backend function that:
   - Receives email/password via POST body
   - Calls the auth API server-side (no fetch interception)
   - Returns the session data (access_token, refresh_token) to the client

2. **Update `src/pages/admin/AdminLogin.tsx`** -- Change `handleLogin` to:
   - First try the normal `supabase.auth.signInWithPassword()` approach
   - If it fails with "Failed to fetch", fall back to calling the backend function
   - Use `supabase.auth.setSession()` with the returned tokens to establish the session client-side
   - Then proceed with the existing admin role check

### Technical detail

```text
Current (broken) flow:
  Browser → window.fetch() [intercepted] → ❌ "Failed to fetch"

New flow (fallback):
  Browser → POST /functions/v1/admin-login → Backend function
    → Server-side auth call (no interception) → ✅ Returns tokens
  Browser → supabase.auth.setSession(tokens) → ✅ Logged in
```

### Files to create/modify
- **Create**: `supabase/functions/admin-login/index.ts`
- **Modify**: `src/pages/admin/AdminLogin.tsx` -- add fallback to edge function when direct auth fails

