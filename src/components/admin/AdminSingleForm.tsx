import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import ImageUploadField from "./ImageUploadField";

interface Field {
  name: string;
  label: string;
  type?: "text" | "textarea" | "url" | "image";
  placeholder?: string;
  accept?: string;
}

interface AdminSingleFormProps {
  title: string;
  fields: Field[];
  data: Record<string, unknown> | null | undefined;
  isLoading: boolean;
  onSave: (data: Record<string, unknown>) => Promise<void>;
}

const AdminSingleForm = ({ title, fields, data, isLoading, onSave }: AdminSingleFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (data) {
      const initial: Record<string, string> = {};
      fields.forEach(f => { initial[f.name] = String(data[f.name] ?? ""); });
      setFormData(initial);
    }
  }, [data, fields]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      toast({ title: "Salvo!", description: `${title} atualizado com sucesso.` });
    } catch (err: unknown) {
      toast({ title: "Erro", description: String(err), variant: "destructive" });
    }
    setSaving(false);
  };

  if (isLoading) return <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <h2 className="text-xl font-bold text-foreground mb-6">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(field => (
          <div key={field.name} className="space-y-2">
            {field.type === "image" ? (
              <ImageUploadField
                label={field.label}
                value={formData[field.name] || ""}
                onChange={(url) => setFormData(prev => ({ ...prev, [field.name]: url }))}
                accept={field.accept}
              />
            ) : field.type === "textarea" ? (
              <>
                <Label>{field.label}</Label>
                <Textarea
                  value={formData[field.name] || ""}
                  onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                  placeholder={field.placeholder}
                  rows={4}
                />
              </>
            ) : (
              <>
                <Label>{field.label}</Label>
                <Input
                  type={field.type === "url" ? "url" : "text"}
                  value={formData[field.name] || ""}
                  onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                  placeholder={field.placeholder}
                />
              </>
            )}
          </div>
        ))}
        <Button type="submit" disabled={saving} className="bg-primary">
          <Save className="w-4 h-4 mr-2" /> {saving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </form>
    </div>
  );
};

export default AdminSingleForm;
