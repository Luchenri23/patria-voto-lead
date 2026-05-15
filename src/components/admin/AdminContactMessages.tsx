import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Download, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

interface ContactMessage {
  id: string;
  nome: string;
  whatsapp: string;
  cidade: string;
  data_nascimento: string;
  created_at: string;
}

const AdminContactMessages = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["contact_messages"],
    queryFn: async () => {
      const { data, error } = await db
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as ContactMessage[]) || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db.from("contact_messages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contact_messages"] }),
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Remover este contato?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast({ title: "Removido", description: "Contato removido." });
    } catch {
      toast({ title: "Erro", description: "Não foi possível remover.", variant: "destructive" });
    }
  };

  const fmtDate = (d: string) => {
    try {
      // For YYYY-MM-DD (date column), parse as UTC noon to avoid timezone day-shift
      const iso = d?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      const dt = iso ? new Date(`${d}T12:00:00Z`) : new Date(d);
      return format(dt, "dd/MM/yyyy", { locale: ptBR });
    } catch { return d; }
  };

  const handleExport = () => {
    if (!messages?.length) return;
    const csv = ["Nome,WhatsApp,Cidade,Data de Nascimento,Cadastrado em"]
      .concat(messages.map(m => `"${m.nome}","${m.whatsapp}","${m.cidade}","${fmtDate(m.data_nascimento)}","${fmtDate(m.created_at)}"`))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contatos_site.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) return <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Mensagens de Contato</h2>
          <p className="text-sm text-muted-foreground">{messages?.length || 0} cadastros</p>
        </div>
        {messages && messages.length > 0 && (
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" /> Exportar CSV
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {(!messages || messages.length === 0) && (
          <p className="text-muted-foreground text-center py-8">Nenhum contato recebido ainda.</p>
        )}
        {messages?.map((m) => (
          <div key={m.id} className="flex items-start justify-between p-4 bg-muted rounded-lg border border-border gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <User className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate">{m.nome}</p>
                <p className="text-sm text-muted-foreground">
                  {m.whatsapp} • {m.cidade} • Nasc.: {fmtDate(m.data_nascimento)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Cadastrado: {fmtDate(m.created_at)}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(m.id)} className="text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContactMessages;
