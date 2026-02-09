import { useSiteContact, useUpsertSingle } from "@/hooks/useSiteContent";
import AdminSingleForm from "./AdminSingleForm";

const fields = [
  { name: "address", label: "Endereço", type: "textarea" as const },
  { name: "phone", label: "Telefone", placeholder: "(47) 3621-7705" },
  { name: "email", label: "E-mail", placeholder: "gabinete@canoinhas.sc.gov.br" },
  { name: "working_hours", label: "Horário de Funcionamento", placeholder: "Segunda a Sexta: 8h às 17h" },
  { name: "map_embed_url", label: "URL do Mapa (embed)", type: "url" as const },
];

const AdminContact = () => {
  const { data, isLoading } = useSiteContact();
  const mutation = useUpsertSingle("site_contact");
  return <AdminSingleForm title="Contato" fields={fields} data={data as unknown as Record<string, unknown> | null} isLoading={isLoading} onSave={d => mutation.mutateAsync(d)} />;
};

export default AdminContact;
