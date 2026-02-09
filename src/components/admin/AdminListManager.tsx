import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Field {
  name: string;
  label: string;
  type?: "text" | "textarea" | "url" | "select" | "checkbox";
  options?: string[];
  placeholder?: string;
}

interface AdminListManagerProps {
  title: string;
  fields: Field[];
  data: Record<string, unknown>[] | undefined;
  isLoading: boolean;
  onAdd: (data: Record<string, unknown>) => Promise<void>;
  onUpdate: (data: Record<string, unknown> & { id: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  displayField?: string;
  secondaryField?: string;
}

const AdminListManager = ({ title, fields, data, isLoading, onAdd, onUpdate, onDelete, displayField = "title", secondaryField }: AdminListManagerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const openCreate = () => {
    setEditingItem(null);
    const initial: Record<string, unknown> = {};
    fields.forEach(f => { initial[f.name] = f.type === "checkbox" ? false : ""; });
    setFormData(initial);
    setIsDialogOpen(true);
  };

  const openEdit = (item: Record<string, unknown>) => {
    setEditingItem(item);
    const initial: Record<string, unknown> = {};
    fields.forEach(f => { initial[f.name] = item[f.name] ?? ""; });
    setFormData(initial);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingItem) {
        await onUpdate({ id: editingItem.id as string, ...formData });
      } else {
        await onAdd(formData);
      }
      toast({ title: "Salvo!", description: `${title} ${editingItem ? "atualizado" : "criado"} com sucesso.` });
      setIsDialogOpen(false);
    } catch (err: unknown) {
      toast({ title: "Erro", description: String(err), variant: "destructive" });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    try {
      await onDelete(id);
      toast({ title: "Excluído", description: "Item removido com sucesso." });
    } catch (err: unknown) {
      toast({ title: "Erro", description: String(err), variant: "destructive" });
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <Button onClick={openCreate} className="bg-secondary hover:bg-secondary/90">
          <Plus className="w-4 h-4 mr-2" /> Adicionar
        </Button>
      </div>

      <div className="space-y-3">
        {(!data || data.length === 0) && (
          <p className="text-muted-foreground text-center py-8">Nenhum item cadastrado.</p>
        )}
        {data?.map((item) => (
          <div key={item.id as string} className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{String(item[displayField] || "Sem título")}</p>
              {secondaryField && <p className="text-sm text-muted-foreground truncate">{String(item[secondaryField] || "")}</p>}
            </div>
            <div className="flex gap-2 ml-4">
              <Button variant="ghost" size="sm" onClick={() => openEdit(item)}><Edit2 className="w-4 h-4" /></Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id as string)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Editar" : "Novo"} {title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(field => (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    value={String(formData[field.name] || "")}
                    onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    placeholder={field.placeholder}
                    rows={3}
                  />
                ) : field.type === "select" ? (
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={String(formData[field.name] || "")}
                    onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                  >
                    {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : field.type === "checkbox" ? (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={Boolean(formData[field.name])}
                      onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.checked }))}
                    />
                    <span className="text-sm">{field.label}</span>
                  </label>
                ) : (
                  <Input
                    type={field.type === "url" ? "url" : "text"}
                    value={String(formData[field.name] || "")}
                    onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}><X className="w-4 h-4 mr-1" /> Cancelar</Button>
              <Button type="submit" disabled={saving} className="bg-primary"><Save className="w-4 h-4 mr-1" /> {saving ? "Salvando..." : "Salvar"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminListManager;
