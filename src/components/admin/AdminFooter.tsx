import { useSiteFooter, useUpsertSingle } from "@/hooks/useSiteContent";
import AdminSingleForm from "./AdminSingleForm";

const fields = [
  { name: "copyright_text", label: "Texto de Copyright" },
  { name: "slogan", label: "Slogan", placeholder: "Trabalhando por uma Canoinhas melhor" },
  { name: "transparency_url", label: "URL Portal Transparência", type: "url" as const },
  { name: "privacy_url", label: "URL Política de Privacidade", type: "url" as const },
];

const AdminFooter = () => {
  const { data, isLoading } = useSiteFooter();
  const mutation = useUpsertSingle("site_footer");
  return <AdminSingleForm title="Rodapé" fields={fields} data={data as unknown as Record<string, unknown> | null} isLoading={isLoading} onSave={d => mutation.mutateAsync(d)} />;
};

export default AdminFooter;
