import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "@/components/prefeitura/Header";
import Footer from "@/components/prefeitura/Footer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: item, isLoading } = useQuery({
    queryKey: ["site_news", id],
    queryFn: async () => {
      const { data, error } = await db.from("site_news").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const formatDate = (date: string) => {
    try { return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }); }
    catch { return date; }
  };

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
          <h1 className="text-3xl font-bold text-foreground mb-4">Notícia não encontrada</h1>
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

          <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-4">{item.category}</span>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{item.title}</h1>

          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-8">
            <Calendar className="w-4 h-4" />
            {formatDate(item.published_at)}
          </div>

          {item.image_url && (
            <img src={item.image_url} alt={item.title} className="w-full rounded-2xl mb-8 object-cover max-h-[500px]" />
          )}

          {item.content ? (
            <div className="prose prose-lg max-w-none text-foreground whitespace-pre-wrap">
              {item.content}
            </div>
          ) : (
            <p className="text-muted-foreground text-lg">{item.excerpt}</p>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default NewsDetail;
