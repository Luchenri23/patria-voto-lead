import { useSiteNews, useInsertRow, useUpdateRow, useDeleteRow } from "@/hooks/useSiteContent";
import AdminListManager from "./AdminListManager";

const fields = [
  { name: "title", label: "Título", placeholder: "Título da notícia" },
  { name: "excerpt", label: "Resumo", type: "textarea" as const },
  { name: "content", label: "Conteúdo Completo", type: "textarea" as const },
  { name: "category", label: "Categoria", type: "select" as const, options: ["Geral", "Saúde", "Educação", "Infraestrutura", "Meio Ambiente", "Social", "Cultura"] },
  { name: "image_url", label: "Imagem", type: "image" as const, accept: "image/*", hint: "800×450px (16:9)", maxSizeKB: 1024 },
  { name: "video_url", label: "Vídeo", type: "image" as const, accept: "video/*", hint: "1280×720px (16:9)", maxSizeKB: 10240 },
  { name: "is_featured", label: "Destaque", type: "checkbox" as const },
  { name: "external_url", label: "URL Externa", type: "url" as const, placeholder: "https://..." },
];

const AdminNews = () => {
  const { data, isLoading } = useSiteNews();
  const insert = useInsertRow("site_news");
  const update = useUpdateRow("site_news");
  const del = useDeleteRow("site_news");

  return (
    <AdminListManager
      title="Notícias"
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

export default AdminNews;
