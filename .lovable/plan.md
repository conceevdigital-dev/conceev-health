

## Problem Analysis

**Backend is confirmed working**: Direct call to the `admin-login` edge function with `admin2@conceev.health` / `Cv$3cUr3!Adm1n` returns a valid `access_token` and `refresh_token` (HTTP 200). The user exists and has the `admin` role in `user_roles`.

**The client-side issue**: The current `AdminLogin.tsx` ONLY uses `XMLHttpRequest` to call the edge function. It never tries the standard `supabase.auth.signInWithPassword()`. On the published site (`conceevhealth.com`), `window.fetch` is NOT intercepted (the `lovable.js` interceptor only exists in the preview iframe), so `signInWithPassword()` should work perfectly.

The XHR-only approach is fragile -- "Network error" on XHR can be caused by CORS preflight issues, missing headers, or browser restrictions that don't affect `fetch`. The XHR workaround was only needed for the preview iframe, not the published site.

## Solution

Rewrite `handleLogin` in `src/pages/admin/AdminLogin.tsx` to:

1. **Primary**: Use `supabase.auth.signInWithPassword()` directly -- this works on the published site and custom domain
2. **Fallback**: If that fails with a network error, fall back to the XHR edge function approach (for the preview iframe)
3. Use `VITE_SUPABASE_URL` (guaranteed to exist) instead of constructing the URL from `VITE_SUPABASE_PROJECT_ID`
4. Add console logging at each step for debugging

### File: `src/pages/admin/AdminLogin.tsx`

Replace `handleLogin` logic:

```typescript
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    let session;

    // Try direct signInWithPassword first (works on published site)
    try {
      console.log("Attempting direct sign in...");
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      session = data.session;
      console.log("Direct sign in succeeded");
    } catch (directErr: any) {
      console.log("Direct sign in failed:", directErr.message, "- trying edge function fallback...");
      // Fallback to XHR edge function (for preview iframe where fetch is intercepted)
      const tokens = await loginViaEdgeFunction();
      const { error: setErr } = await supabase.auth.setSession({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });
      if (setErr) throw setErr;
      session = (await supabase.auth.getSession()).data.session;
      console.log("Edge function fallback succeeded");
    }

    if (!session?.user) {
      toast({ title: "Login failed", description: "Could not establish session", variant: "destructive" });
      setLoading(false);
      return;
    }

    // Check admin role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      toast({ title: "Access denied", description: "You don't have admin privileges.", variant: "destructive" });
      setLoading(false);
      return;
    }

    navigate("/admin");
  } catch (err: any) {
    console.error("Login error:", err);
    toast({ title: "Login failed", description: err.message || "An unexpected error occurred", variant: "destructive" });
    setLoading(false);
  }
};
```

Also update `loginViaEdgeFunction` to use `VITE_SUPABASE_URL` instead of constructing from project ID:

```typescript
const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-login`;
```

### Summary of changes

- **One file**: `src/pages/admin/AdminLogin.tsx`
- **Primary approach**: `signInWithPassword()` (works on published/custom domain sites)
- **Fallback**: XHR edge function (works in preview iframe where fetch is blocked)
- **URL fix**: Use `VITE_SUPABASE_URL` for reliability
- **Better logging**: Console logs at each step for debugging

