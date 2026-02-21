import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Mail, Download } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  subscribed_at: string;
}

const AdminNewsletter = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subscribers, isLoading } = useQuery({
    queryKey: ["newsletter_subscribers"],
    queryFn: async () => {
      const { data, error } = await db
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });
      if (error) throw error;
      return (data as Subscriber[]) || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db.from("newsletter_subscribers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["newsletter_subscribers"] }),
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Remover este inscrito?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast({ title: "Removido", description: "Inscrito removido com sucesso." });
    } catch {
      toast({ title: "Erro", description: "Não foi possível remover.", variant: "destructive" });
    }
  };

  const handleExport = () => {
    if (!subscribers?.length) return;
    const csv = ["Email,Nome,Data de Inscrição"]
      .concat(subscribers.map(s => `${s.email},${s.name || ""},${new Date(s.subscribed_at).toLocaleDateString("pt-BR")}`))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter_inscritos.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) return <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Newsletter</h2>
          <p className="text-sm text-muted-foreground">{subscribers?.length || 0} inscritos</p>
        </div>
        {subscribers && subscribers.length > 0 && (
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" /> Exportar CSV
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {(!subscribers || subscribers.length === 0) && (
          <p className="text-muted-foreground text-center py-8">Nenhum inscrito ainda.</p>
        )}
        {subscribers?.map((sub) => (
          <div key={sub.id} className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground truncate">{sub.email}</p>
                <p className="text-sm text-muted-foreground">{new Date(sub.subscribed_at).toLocaleDateString("pt-BR")}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(sub.id)} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNewsletter;
