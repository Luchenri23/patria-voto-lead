import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/prefeitura/Header";
import Footer from "@/components/prefeitura/Footer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: item, isLoading } = useQuery({
    queryKey: ["site_projects", id],
    queryFn: async () => {
      const { data, error } = await db.from("site_projects").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Projeto não encontrado</h1>
          <Button asChild><Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao início</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <article className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button variant="ghost" className="mb-6 text-muted-foreground" asChild>
            <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Voltar</Link>
          </Button>

          <div className="flex gap-3 mb-4">
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">{item.category}</span>
            <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm font-semibold rounded-full">{item.status}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{item.title}</h1>

          {item.image_url && (
            <img src={item.image_url} alt={item.title} className="w-full rounded-2xl mb-8 object-cover max-h-[500px]" />
          )}

          {item.description && (
            <div className="prose prose-lg max-w-none text-foreground whitespace-pre-wrap">
              {item.description}
            </div>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
