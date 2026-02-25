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

  const loginViaEdgeFunction = async (): Promise<{ access_token: string; refresh_token: string } | null> => {
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const url = `https://${projectId}.supabase.co/functions/v1/admin-login`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": anonKey,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      return data;
    } catch (err: any) {
      console.error("Edge function login failed:", err);
      throw err;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Try direct auth first
      let session: any = null;
      let directError: any = null;

      try {
        const result = await supabase.auth.signInWithPassword({ email, password });
        if (result.error) {
          directError = result.error;
        } else {
          session = result.data.session;
        }
      } catch (err: any) {
        directError = err;
      }

      // If direct auth failed with network error, fallback to edge function
      if (directError) {
        const msg = directError.message || String(directError);
        if (msg.includes("Failed to fetch") || msg.includes("NetworkError") || msg.includes("fetch")) {
          console.log("Direct auth failed with network error, trying backend function...");
          const tokens = await loginViaEdgeFunction();
          if (tokens) {
            const { error: setErr } = await supabase.auth.setSession({
              access_token: tokens.access_token,
              refresh_token: tokens.refresh_token,
            });
            if (setErr) {
              toast({ title: "Login failed", description: setErr.message, variant: "destructive" });
              setLoading(false);
              return;
            }
          }
        } else {
          // Non-network error (wrong password, etc.)
          toast({ title: "Login failed", description: msg, variant: "destructive" });
          setLoading(false);
          return;
        }
      }

      // Check admin role
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: "Login failed", description: "Could not get user", variant: "destructive" });
        setLoading(false);
        return;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
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
