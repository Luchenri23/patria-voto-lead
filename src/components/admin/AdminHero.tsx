import { useSiteHero, useUpsertSingle } from "@/hooks/useSiteContent";
import AdminSingleForm from "./AdminSingleForm";

const fields = [
  { name: "title", label: "Título Principal", placeholder: "Ex: Canoinhas em Boas Mãos" },
  { name: "subtitle", label: "Subtítulo", type: "textarea" as const, placeholder: "Texto de apoio" },
  { name: "cta_text", label: "Texto do Botão CTA", placeholder: "Ver Realizações" },
  { name: "cta_link", label: "Link do CTA", placeholder: "#trabalho" },
  { name: "image_url", label: "Imagem de Fundo", type: "image" as const, accept: "image/*" },
];

const AdminHero = () => {
  const { data, isLoading } = useSiteHero();
  const mutation = useUpsertSingle("site_hero");
  return <AdminSingleForm title="Hero Section" fields={fields} data={data as unknown as Record<string, unknown> | null} isLoading={isLoading} onSave={d => mutation.mutateAsync(d)} />;
};

export default AdminHero;
