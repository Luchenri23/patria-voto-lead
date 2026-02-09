import { useSiteSocialLinks, useInsertRow, useUpdateRow, useDeleteRow } from "@/hooks/useSiteContent";
import AdminListManager from "./AdminListManager";

const fields = [
  { name: "platform", label: "Plataforma", type: "select" as const, options: ["instagram", "facebook", "twitter", "tiktok", "youtube", "whatsapp", "linkedin", "outro"] },
  { name: "label", label: "Nome de exibição", placeholder: "Instagram" },
  { name: "url", label: "URL do perfil", type: "url" as const, placeholder: "https://instagram.com/..." },
  { name: "icon_url", label: "Ícone personalizado (imagem)", type: "image" as const, accept: "image/*" },
  { name: "visible", label: "Visível no site", type: "checkbox" as const },
  { name: "sort_order", label: "Ordem", placeholder: "0" },
];

const AdminSocialLinks = () => {
  const { data, isLoading } = useSiteSocialLinks();
  const insert = useInsertRow("site_social_links");
  const update = useUpdateRow("site_social_links");
  const del = useDeleteRow("site_social_links");

  return (
    <AdminListManager
      title="Redes Sociais (Links)"
      fields={fields}
      data={data as unknown as Record<string, unknown>[] | undefined}
      isLoading={isLoading}
      onAdd={d => insert.mutateAsync(d)}
      onUpdate={d => update.mutateAsync(d as Record<string, unknown> & { id: string })}
      onDelete={id => del.mutateAsync(id)}
      displayField="label"
      secondaryField="platform"
    />
  );
};

export default AdminSocialLinks;
