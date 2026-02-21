import { useSiteArticles, useInsertRow, useUpdateRow, useDeleteRow } from "@/hooks/useSiteContent";
import AdminListManager from "./AdminListManager";

const fields = [
  { name: "title", label: "Título", placeholder: "Título do artigo" },
  { name: "content", label: "Conteúdo", type: "textarea" as const },
  { name: "author", label: "Autor", placeholder: "Juliana Maciel" },
  { name: "external_url", label: "URL Externa", type: "url" as const, placeholder: "https://..." },
];

const AdminArticles = () => {
  const { data, isLoading } = useSiteArticles();
  const insert = useInsertRow("site_articles");
  const update = useUpdateRow("site_articles");
  const del = useDeleteRow("site_articles");

  return (
    <AdminListManager
      title="Artigos"
      fields={fields}
      data={data as unknown as Record<string, unknown>[] | undefined}
      isLoading={isLoading}
      onAdd={d => insert.mutateAsync(d)}
      onUpdate={d => update.mutateAsync(d as Record<string, unknown> & { id: string })}
      onDelete={id => del.mutateAsync(id)}
      displayField="title"
      secondaryField="author"
    />
  );
};

export default AdminArticles;
