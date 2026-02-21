import { useSiteHero, useUpsertSingle } from "@/hooks/useSiteContent";
import AdminSingleForm from "./AdminSingleForm";

const fields = [
  { name: "title", label: "Título Principal", placeholder: "Ex: Canoinhas em Boas Mãos" },
  { name: "subtitle", label: "Subtítulo", type: "textarea" as const, placeholder: "Texto de apoio" },
  { name: "cta_text", label: "Texto do Botão CTA", placeholder: "Ver Realizações" },
  { name: "cta_link", label: "Link do CTA", placeholder: "#trabalho" },
  { name: "cta2_text", label: "Texto do 2º Botão", placeholder: "Agenda da Prefeita" },
  { name: "image_url", label: "Imagem de Fundo", type: "image" as const, accept: "image/*" },
  { name: "badge_text", label: "Badge Superior (ex: Gestão 2025-2028)", placeholder: "Gestão 2025-2028 • Canoinhas/SC" },
  { name: "card_name", label: "Nome no Card", placeholder: "Juliana Maciel" },
  { name: "card_subtitle", label: "Subtítulo do Card", placeholder: "Prefeita de Canoinhas" },
  { name: "card_stat1_value", label: "Card Stat 1 - Valor", placeholder: "2º" },
  { name: "card_stat1_label", label: "Card Stat 1 - Label", placeholder: "Mandato" },
  { name: "card_stat2_value", label: "Card Stat 2 - Valor", placeholder: "PL" },
  { name: "card_stat2_label", label: "Card Stat 2 - Label", placeholder: "Partido" },
  { name: "badge_right", label: "Badge Direita do Card", placeholder: "Presidente Amplanorte" },
  { name: "badge_left", label: "Badge Esquerda do Card", placeholder: "Reeleita em 2024" },
  { name: "card_image_url", label: "Foto do Card (substitui emoji)", type: "image" as const, accept: "image/*" },
  { name: "video_url", label: "Vídeo de Fundo (URL)", type: "url" as const, placeholder: "https://exemplo.com/video.mp4" },
  { name: "fallback_color", label: "Cor de Fundo (fallback)", placeholder: "#1a365d" },
];

const AdminHero = () => {
  const { data, isLoading } = useSiteHero();
  const mutation = useUpsertSingle("site_hero");
  return <AdminSingleForm title="Hero Section" fields={fields} data={data as unknown as Record<string, unknown> | null} isLoading={isLoading} onSave={d => mutation.mutateAsync(d)} />;
};

export default AdminHero;
