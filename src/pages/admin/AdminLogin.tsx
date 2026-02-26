import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

// Hardcoded fallbacks so login works even if env vars are missing in production build
const FALLBACK_URL = "https://dlwiktowlhbrlcjeojcc.supabase.co";
const FALLBACK_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2lrdG93bGhicmxjamVvamNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1ODE1ODMsImV4cCI6MjA4NzE1NzU4M30.LxNDV4FrhS_kRlQodQ5kUnvVW-5Ux3l0DZSWRj9_YSY";

const getSupabaseUrl = () => import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
const getAnonKey = () => import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_KEY;

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginViaFetch = async (): Promise<{ access_token: string; refresh_token: string }> => {
    const url = `${getSupabaseUrl()}/functions/v1/admin-login`;
    console.log("Fetch: calling", url);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": getAnonKey(),
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    return data;
  };

  const loginViaXHR = (): Promise<{ access_token: string; refresh_token: string }> => {
    return new Promise((resolve, reject) => {
      const url = `${getSupabaseUrl()}/functions/v1/admin-login`;
      console.log("XHR: calling", url);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("apikey", getAnonKey());
      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) resolve(data);
          else reject(new Error(data.error || `XHR ${xhr.status}`));
        } catch { reject(new Error("Invalid response")); }
      };
      xhr.onerror = () => reject(new Error("XHR network error"));
      xhr.send(JSON.stringify({ email, password }));
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const errors: string[] = [];

    try {
      let tokens: { access_token: string; refresh_token: string } | null = null;

      // Strategy 1: fetch to edge function
      try {
        tokens = await loginViaFetch();
        console.log("Fetch login succeeded");
      } catch (err: any) {
        console.warn("Fetch failed:", err.message);
        errors.push(`fetch: ${err.message}`);
      }

      // Strategy 2: XHR to edge function
      if (!tokens) {
        try {
          tokens = await loginViaXHR();
          console.log("XHR login succeeded");
        } catch (err: any) {
          console.warn("XHR failed:", err.message);
          errors.push(`xhr: ${err.message}`);
        }
      }

      // If we got tokens, set session
      let session;
      if (tokens) {
        const { error: setErr } = await supabase.auth.setSession({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        });
        if (setErr) throw setErr;
        session = (await supabase.auth.getSession()).data.session;
      }

      // Strategy 3: direct signInWithPassword
      if (!session) {
        try {
          console.log("Attempting direct sign in...");
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          session = data.session;
          console.log("Direct sign in succeeded");
        } catch (err: any) {
          console.warn("Direct sign in failed:", err.message);
          errors.push(`direct: ${err.message}`);
        }
      }

      if (!session?.user) {
        toast({
          title: "Login failed",
          description: `All methods failed. ${errors.join(" | ")}. URL: ${getSupabaseUrl()}`,
          variant: "destructive",
        });
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
      toast({ title: "Login failed", description: `${err.message} | URL: ${getSupabaseUrl()}`, variant: "destructive" });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-sm text-muted-foreground mt-1">Conceev Health Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@conceev.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full rounded-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
