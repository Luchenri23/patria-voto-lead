import { useSiteNews, useInsertRow, useUpdateRow, useDeleteRow } from "@/hooks/useSiteContent";
import AdminListManager from "./AdminListManager";

const fields = [
  { name: "title", label: "Título", placeholder: "Título da notícia" },
  { name: "excerpt", label: "Resumo", type: "textarea" as const },
  { name: "content", label: "Conteúdo Completo", type: "textarea" as const },
  { name: "category", label: "Categoria", type: "select" as const, options: ["Geral", "Saúde", "Educação", "Infraestrutura", "Meio Ambiente", "Social", "Cultura"] },
  { name: "image_url", label: "URL da Imagem", type: "url" as const },
  { name: "video_url", label: "URL do Vídeo", type: "url" as const },
  { name: "is_featured", label: "Destaque", type: "checkbox" as const },
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
