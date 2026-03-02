import { useSiteProjects, useInsertRow, useUpdateRow, useDeleteRow } from "@/hooks/useSiteContent";
import AdminListManager from "./AdminListManager";

const fields = [
  { name: "title", label: "Título", placeholder: "Nome do projeto" },
  { name: "description", label: "Descrição", type: "textarea" as const },
  { name: "category", label: "Categoria", type: "select" as const, options: ["Saúde", "Educação", "Infraestrutura", "Social"] },
  { name: "image_url", label: "Imagem", type: "image" as const, accept: "image/*", hint: "800×450px (16:9)", maxSizeKB: 1024 },
  { name: "video_url", label: "Vídeo", type: "image" as const, accept: "video/*", hint: "1280×720px (16:9)", maxSizeKB: 10240 },
  { name: "status", label: "Status", type: "select" as const, options: ["Em andamento", "Concluído", "Planejado"] },
  { name: "sort_order", label: "Ordem", placeholder: "0" },
  { name: "external_url", label: "URL Externa", type: "url" as const, placeholder: "https://..." },
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
