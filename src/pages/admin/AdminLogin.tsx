import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginViaEdgeFunction = (): Promise<{ access_token: string; refresh_token: string }> => {
    return new Promise((resolve, reject) => {
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-login`;

      console.log("XHR fallback: calling", url);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("apikey", anonKey);

      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(data);
          } else {
            reject(new Error(data.error || "Login failed"));
          }
        } catch {
          reject(new Error("Invalid response from server"));
        }
      };

      xhr.onerror = () => reject(new Error("Network error"));

      xhr.send(JSON.stringify({ email, password }));
    });
  };

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
