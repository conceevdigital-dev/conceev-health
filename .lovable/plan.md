

## Problem

The Lovable preview environment patches `window.fetch` (via `lovable.js`), which blocks ALL fetch requests -- including our edge function fallback. Both the direct Supabase auth call and the edge function call fail with "Failed to fetch" because they both go through `window.fetch`.

Evidence from console logs:
- Direct auth: `TypeError: Failed to fetch` at `window.fetch (lovable.js:1:2838)`
- Edge function fallback: `TypeError: Failed to fetch` at `window.fetch (lovable.js:1:2838)`
- Edge function logs: **Empty** -- the request never reaches the server

## Solution

Replace `fetch()` with `XMLHttpRequest` in the edge function login call. The `lovable.js` interceptor only patches `window.fetch`, not `XMLHttpRequest`.

## Changes

**File: `src/pages/admin/AdminLogin.tsx`**

Replace the `loginViaEdgeFunction` function to use `XMLHttpRequest` instead of `fetch`:

```typescript
const loginViaEdgeFunction = async (): Promise<{ access_token: string; refresh_token: string } | null> => {
  return new Promise((resolve, reject) => {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    const url = `https://${projectId}.supabase.co/functions/v1/admin-login`;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("apikey", anonKey);

    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(data);
      } else {
        reject(new Error(data.error || "Login failed"));
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));

    xhr.send(JSON.stringify({ email, password }));
  });
};
```

Also update the error handling in `handleLogin` to **always** try the edge function fallback when direct auth fails (not just on network errors), since the interceptor will always cause failures in the preview.

