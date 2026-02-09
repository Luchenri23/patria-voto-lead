import { useSiteFooterLinks, useInsertRow, useUpdateRow, useDeleteRow } from "@/hooks/useSiteContent";
import AdminListManager from "./AdminListManager";

const fields = [
  { name: "label", label: "Texto do Link", placeholder: "Portal da Transparência" },
  { name: "url", label: "URL", type: "url" as const, placeholder: "https://..." },
  { name: "visible", label: "Visível no site", type: "checkbox" as const },
  { name: "sort_order", label: "Ordem", placeholder: "0" },
];

const AdminFooterLinks = () => {
  const { data, isLoading } = useSiteFooterLinks();
  const insert = useInsertRow("site_footer_links");
  const update = useUpdateRow("site_footer_links");
  const del = useDeleteRow("site_footer_links");

  return (
    <AdminListManager
      title="Links do Rodapé (Transparência)"
      fields={fields}
      data={data as unknown as Record<string, unknown>[] | undefined}
      isLoading={isLoading}
      onAdd={d => insert.mutateAsync(d)}
      onUpdate={d => update.mutateAsync(d as Record<string, unknown> & { id: string })}
      onDelete={id => del.mutateAsync(id)}
      displayField="label"
      secondaryField="url"
    />
  );
};

export default AdminFooterLinks;
