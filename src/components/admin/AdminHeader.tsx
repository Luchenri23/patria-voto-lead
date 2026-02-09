import { useSiteHeader, useUpsertSingle } from "@/hooks/useSiteContent";
import AdminSingleForm from "./AdminSingleForm";

const fields = [
  { name: "logo_url", label: "Logo (imagem)", type: "image" as const, accept: "image/*" },
  { name: "logo_text", label: "Nome/Logo (texto)", placeholder: "Juliana Maciel" },
  { name: "logo_subtitle", label: "Subtítulo", placeholder: "Prefeita de Canoinhas" },
  { name: "cta_text", label: "Texto do Botão", placeholder: "Fale Conosco" },
  { name: "cta_link", label: "Link do Botão", placeholder: "#contato" },
  { name: "instagram_url", label: "Instagram URL", type: "url" as const },
  { name: "facebook_url", label: "Facebook URL", type: "url" as const },
  { name: "twitter_url", label: "Twitter URL", type: "url" as const },
  { name: "tiktok_url", label: "TikTok URL", type: "url" as const },
];

const AdminHeader = () => {
  const { data, isLoading } = useSiteHeader();
  const mutation = useUpsertSingle("site_header");
  return <AdminSingleForm title="Header" fields={fields} data={data as unknown as Record<string, unknown> | null} isLoading={isLoading} onSave={d => mutation.mutateAsync(d)} />;
};

export default AdminHeader;
