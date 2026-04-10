import { useSiteAbout, useUpsertSingle } from "@/hooks/useSiteContent";
import AdminSingleForm from "./AdminSingleForm";

const fields = [
  { name: "biography", label: "Biografia (resumo)", type: "textarea" as const, placeholder: "Texto biográfico" },
  { name: "full_bio", label: "Bio Completa (texto longo)", type: "textarea" as const, placeholder: "Texto completo da bio - aparece ao clicar 'Ler Bio Completa'" },
  { name: "trajectory", label: "Trajetória (texto longo)", type: "textarea" as const, placeholder: "Texto da trajetória - aparece ao clicar 'Ver Trajetória'" },
  { name: "image_url", label: "Foto da Seção", type: "image" as const, accept: "image/*", hint: "600×800px (retrato)", maxSizeKB: 1024 },
  { name: "video_url", label: "Vídeo", type: "image" as const, accept: "video/*", hint: "1280×720px (16:9)", maxSizeKB: 10240 },

  // Card 1
  { name: "stat_1_value", label: "Card 1 — Título (destaque colorido)", placeholder: "32" },
  { name: "stat_1_subtitle", label: "Card 1 — Subtítulo", placeholder: "Anos" },
  { name: "stat_1_line1", label: "Card 1 — Linha 1", placeholder: "Prefeita mais jovem de SC" },
  { name: "stat_1_line2", label: "Card 1 — Linha 2", placeholder: "" },
  { name: "stat_1_line3", label: "Card 1 — Linha 3", placeholder: "" },
  { name: "stat_1_label", label: "Card 1 — Rótulo antigo (não exibido)", placeholder: "Pode deixar vazio" },

  // Card 2
  { name: "stat_2_value", label: "Card 2 — Título (destaque colorido)", placeholder: "3" },
  { name: "stat_2_subtitle", label: "Card 2 — Subtítulo", placeholder: "Mandatos" },
  { name: "stat_2_line1", label: "Card 2 — Linha 1", placeholder: "3 Eleições em 4 anos" },
  { name: "stat_2_line2", label: "Card 2 — Linha 2", placeholder: "(2021-2021-2023-2024)" },
  { name: "stat_2_line3", label: "Card 2 — Linha 3", placeholder: "" },
  { name: "stat_2_label", label: "Card 2 — Rótulo antigo (não exibido)", placeholder: "Pode deixar vazio" },

  // Card 3
  { name: "stat_3_value", label: "Card 3 — Título (destaque colorido)", placeholder: "1ª" },
  { name: "stat_3_subtitle", label: "Card 3 — Subtítulo", placeholder: "Mulher Prefeita de Canoinhas" },
  { name: "stat_3_line1", label: "Card 3 — Linha 1", placeholder: "1ª mulher Presidente da AMPLANORTE" },
  { name: "stat_3_line2", label: "Card 3 — Linha 2", placeholder: "" },
  { name: "stat_3_line3", label: "Card 3 — Linha 3", placeholder: "" },
  { name: "stat_3_label", label: "Card 3 — Rótulo antigo (não exibido)", placeholder: "Pode deixar vazio" },
];

const AdminAbout = () => {
  const { data, isLoading } = useSiteAbout();
  const mutation = useUpsertSingle("site_about");
  return <AdminSingleForm title="Seção Quem Sou" fields={fields} data={data as unknown as Record<string, unknown> | null} isLoading={isLoading} onSave={d => mutation.mutateAsync(d)} />;
};

export default AdminAbout;
