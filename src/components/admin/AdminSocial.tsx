import { useSiteSocial, useInsertRow, useUpdateRow, useDeleteRow } from "@/hooks/useSiteContent";
import AdminListManager from "./AdminListManager";

const fields = [
  { name: "platform", label: "Plataforma", type: "select" as const, options: ["instagram", "tiktok", "facebook", "twitter"] },
  { name: "post_url", label: "URL do Post", type: "url" as const },
  { name: "image_url", label: "Imagem", type: "image" as const, accept: "image/*,video/*" },
  { name: "caption", label: "Legenda", type: "textarea" as const },
  { name: "post_type", label: "Tipo", type: "select" as const, options: ["image", "video"] },
  { name: "sort_order", label: "Ordem", placeholder: "0" },
];

const AdminSocial = () => {
  const { data, isLoading } = useSiteSocial();
  const insert = useInsertRow("site_social");
  const update = useUpdateRow("site_social");
  const del = useDeleteRow("site_social");

  return (
    <AdminListManager
      title="Social Wall"
      fields={fields}
      data={data as unknown as Record<string, unknown>[] | undefined}
      isLoading={isLoading}
      onAdd={d => insert.mutateAsync(d)}
      onUpdate={d => update.mutateAsync(d as Record<string, unknown> & { id: string })}
      onDelete={id => del.mutateAsync(id)}
      displayField="caption"
      secondaryField="platform"
    />
  );
};

export default AdminSocial;
