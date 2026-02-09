import { useSiteSections, useUpdateRow } from "@/hooks/useSiteContent";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const AdminSections = () => {
  const { data, isLoading } = useSiteSections();
  const update = useUpdateRow("site_sections");
  const { toast } = useToast();

  const toggle = async (id: string, visible: boolean) => {
    try {
      await update.mutateAsync({ id, visible });
      toast({ title: "Salvo!", description: "Visibilidade atualizada." });
    } catch {
      toast({ title: "Erro", variant: "destructive" });
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <h2 className="text-xl font-bold text-foreground mb-2">Visibilidade das Seções</h2>
      <p className="text-muted-foreground text-sm mb-6">Controle quais seções são exibidas no site público.</p>
      <div className="space-y-4">
        {data?.sort((a, b) => a.sort_order - b.sort_order).map((section) => (
          <div key={section.id} className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
            <Label className="font-semibold text-foreground cursor-pointer">{section.label}</Label>
            <Switch
              checked={section.visible}
              onCheckedChange={(checked) => toggle(section.id, checked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSections;
