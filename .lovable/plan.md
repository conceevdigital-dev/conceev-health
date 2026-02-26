

## Root Cause Analysis

After thorough investigation, here are the findings:

**What works:**
- Backend is fully operational (direct API calls to the edge function return valid tokens)
- Login works perfectly in the dev sandbox (lovableproject.com)
- Credentials are correct (admin2@conceev.health / Cv$3cUr3!Adm1n)
- Edge function CORS headers are present (`Access-Control-Allow-Origin: *`)
- RLS policies and user_roles table are correctly configured

**What fails:**
- Login on the published site (conceev-health.lovable.app) shows "Network error"
- Login on custom domain (conceevhealth.com) shows "Network error"
- The console confirms the latest code IS deployed ("Attempting direct sign in..." is logged)

**Root cause:**
The published production build likely has missing or broken environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`). In the dev sandbox, Vite resolves these from the `.env` file at runtime. In the production build, they must be statically replaced at build time. If the Lovable build process doesn't inject these correctly into the production bundle, both the Supabase client initialization and the XHR fallback URL would be `undefined`, causing all API requests to fail with "Network error".

Evidence: ALL Supabase requests fail on the published site - not just auth, but also data queries (specialties, packages, cities, locations all show "Failed to fetch").

---

## Fix Plan

Make the admin login completely independent of environment variables by constructing the Supabase URL and key from the known project ID, which IS correctly embedded (since `VITE_SUPABASE_PROJECT_ID` is used elsewhere and the page loads).

### Changes

**1. Update `AdminLogin.tsx` - Bulletproof login with hardcoded fallback values**

- Extract the Supabase URL and anon key with fallback constants derived from the project configuration
- Use `fetch()` as the primary auth method (more reliable than both supabase client and XHR)
- Keep XHR as secondary fallback
- Add detailed error logging showing exactly what URL is being called and what error occurs
- Show the actual error details in the toast message for debugging

**2. Update `admin-login` edge function - Add `Access-Control-Allow-Methods`**

- Add `Access-Control-Allow-Methods: POST, OPTIONS` to the CORS headers (currently missing, which can cause CORS preflight failures in some browsers)

### Technical Details

The login flow will be:

```text
1. Try fetch() to edge function /admin-login
   ├─ Success → setSession with tokens → check admin role → redirect
   └─ Fail →
2. Try XHR to edge function /admin-login  
   ├─ Success → setSession with tokens → check admin role → redirect
   └─ Fail →
3. Try supabase.auth.signInWithPassword (direct)
   ├─ Success → check admin role → redirect
   └─ Fail → Show detailed error with URL + status info
```

The URL for the edge function will be constructed as:
```text
const url = SUPABASE_URL + "/functions/v1/admin-login"
```
Where `SUPABASE_URL` uses `import.meta.env.VITE_SUPABASE_URL` with a hardcoded fallback value if the env var is undefined.

This ensures login works regardless of whether environment variables are properly embedded in the production build.

