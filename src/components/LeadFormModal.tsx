import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const procedures = ["IVF", "IUI", "Hysterectomy", "Fibroid Surgery", "Ovarian Cyst Removal", "Normal Delivery", "C-Section", "Other"];
const cities = ["Bangalore", "Hyderabad"];

interface LeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourcePage?: string;
}

const LeadFormModal = ({ open, onOpenChange, sourcePage = "homepage" }: LeadFormModalProps) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", procedure_interest: "", city: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.procedure_interest || !form.city) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    if (form.phone.trim().length < 10) {
      toast({ title: "Please enter a valid phone number", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      name: form.name.trim().slice(0, 100),
      phone: form.phone.trim().slice(0, 15),
      procedure_interest: form.procedure_interest,
      city: form.city,
      source_page: sourcePage,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Thank you! 🎉", description: "Our care coordinator will contact you shortly." });
      setForm({ name: "", phone: "", procedure_interest: "", city: "" });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Book Free Consultation</DialogTitle>
          <DialogDescription>Share your details and our care coordinator will reach out within 30 minutes.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <Input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />
          <Input placeholder="Phone Number" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={15} />
          <Select value={form.procedure_interest} onValueChange={(v) => setForm({ ...form, procedure_interest: v })}>
            <SelectTrigger><SelectValue placeholder="Select Procedure" /></SelectTrigger>
            <SelectContent>
              {procedures.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={form.city} onValueChange={(v) => setForm({ ...form, city: v })}>
            <SelectTrigger><SelectValue placeholder="Select City" /></SelectTrigger>
            <SelectContent>
              {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full rounded-2xl" disabled={loading}>
            {loading ? "Submitting..." : "Get Free Consultation"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormModal;
