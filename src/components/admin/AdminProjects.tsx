import { useSiteProjects, useInsertRow, useUpdateRow, useDeleteRow } from "@/hooks/useSiteContent";
import AdminListManager from "./AdminListManager";

const fields = [
  { name: "title", label: "Título", placeholder: "Nome do projeto" },
  { name: "description", label: "Descrição", type: "textarea" as const },
  { name: "category", label: "Categoria", type: "select" as const, options: ["Saúde", "Educação", "Infraestrutura", "Social"] },
  { name: "image_url", label: "URL da Imagem", type: "url" as const },
  { name: "video_url", label: "URL do Vídeo", type: "url" as const },
  { name: "status", label: "Status", type: "select" as const, options: ["Em andamento", "Concluído", "Planejado"] },
  { name: "sort_order", label: "Ordem", placeholder: "0" },
];

const AdminProjects = () => {
  const { data, isLoading } = useSiteProjects();
  const insert = useInsertRow("site_projects");
  const update = useUpdateRow("site_projects");
  const del = useDeleteRow("site_projects");

  return (
    <AdminListManager
      title="Projetos"
      fields={fields}
      data={data as unknown as Record<string, unknown>[] | undefined}
      isLoading={isLoading}
      onAdd={d => insert.mutateAsync(d)}
      onUpdate={d => update.mutateAsync(d as Record<string, unknown> & { id: string })}
      onDelete={id => del.mutateAsync(id)}
      displayField="title"
      secondaryField="category"
    />
  );
};

export default AdminProjects;
