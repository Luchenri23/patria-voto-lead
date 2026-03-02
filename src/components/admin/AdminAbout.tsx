import { useSiteAbout, useUpsertSingle } from "@/hooks/useSiteContent";
import AdminSingleForm from "./AdminSingleForm";

const fields = [
  { name: "biography", label: "Biografia (resumo)", type: "textarea" as const, placeholder: "Texto biográfico" },
  { name: "full_bio", label: "Bio Completa (texto longo)", type: "textarea" as const, placeholder: "Texto completo da bio - aparece ao clicar 'Ler Bio Completa'" },
  { name: "trajectory", label: "Trajetória (texto longo)", type: "textarea" as const, placeholder: "Texto da trajetória - aparece ao clicar 'Ver Trajetória'" },
  { name: "image_url", label: "Foto da Seção", type: "image" as const, accept: "image/*", hint: "600×800px (retrato)", maxSizeKB: 1024 },
  { name: "video_url", label: "Vídeo", type: "image" as const, accept: "video/*", hint: "1280×720px (16:9)", maxSizeKB: 10240 },
  { name: "stat_1_value", label: "Estatística 1 - Valor", placeholder: "32" },
  { name: "stat_1_label", label: "Estatística 1 - Rótulo", placeholder: "Anos" },
  { name: "stat_2_value", label: "Estatística 2 - Valor", placeholder: "2º" },
  { name: "stat_2_label", label: "Estatística 2 - Rótulo", placeholder: "Mandato" },
  { name: "stat_3_value", label: "Estatística 3 - Valor", placeholder: "1ª" },
  { name: "stat_3_label", label: "Estatística 3 - Rótulo", placeholder: "Mulher Amplanorte" },
];

const AdminAbout = () => {
  const { data, isLoading } = useSiteAbout();
  const mutation = useUpsertSingle("site_about");
  return <AdminSingleForm title="Seção Quem Sou" fields={fields} data={data as unknown as Record<string, unknown> | null} isLoading={isLoading} onSave={d => mutation.mutateAsync(d)} />;
};

export default AdminAbout;
