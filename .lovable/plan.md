

## Diagnosis

The admin credentials (`admin@conceev.com` / `Admin@123456`) are **verified working**. I just tested them successfully and the dashboard loaded correctly with all data.

The "Failed to fetch" error you're experiencing is caused by the **Lovable preview iframe's fetch interceptor** -- a script (`lovable.js`) that wraps `window.fetch` inside the preview panel. This wrapper sometimes blocks authentication requests to the backend.

## Root Cause

The preview environment at `728b6476-a908-46c1-9ce2-cca684cd9728.lovableproject.com` injects a script that intercepts all `fetch()` calls. When the login form calls the authentication API, this interceptor occasionally fails silently, producing a "Failed to fetch" error before the request even reaches the server.

This is **not** a code bug or a credentials issue -- it is a preview environment limitation.

## Solution

To fix this so login works reliably in **both** the preview iframe and the published site, I will update the `AdminLogin` component to use the native `fetch` directly for the authentication call, bypassing the preview wrapper. Specifically:

1. **Update `AdminLogin.tsx`** to store a reference to the original `window.fetch` before the Lovable script overrides it, or use `XMLHttpRequest` as a fallback for the auth token request
2. A simpler alternative: add error handling that detects the "Failed to fetch" error and automatically retries the request after a short delay

### Recommended approach: Direct fetch bypass

Modify the `handleLogin` function in `AdminLogin.tsx` to:
- Catch "Failed to fetch" errors specifically
- On that error, make the auth request directly using `XMLHttpRequest` or a stored reference to the native fetch
- This ensures the login works in both preview and published environments

### Files to modify
- `src/pages/admin/AdminLogin.tsx` -- add retry logic with native fetch fallback

### Technical detail
```text
Current flow:
  User clicks Sign In
    → supabase.auth.signInWithPassword()
      → window.fetch() [intercepted by lovable.js]
        → ❌ "Failed to fetch"

Fixed flow:
  User clicks Sign In
    → supabase.auth.signInWithPassword()
      → window.fetch() [intercepted by lovable.js]
        → If "Failed to fetch", retry with native fetch
          → ✅ Success
```

