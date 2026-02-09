import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Home, Layout, User, Briefcase, Newspaper, FileText, Share2, Phone, Settings } from "lucide-react";
import AdminHero from "@/components/admin/AdminHero";
import AdminAbout from "@/components/admin/AdminAbout";
import AdminProjects from "@/components/admin/AdminProjects";
import AdminNews from "@/components/admin/AdminNews";
import AdminArticles from "@/components/admin/AdminArticles";
import AdminSocial from "@/components/admin/AdminSocial";
import AdminContact from "@/components/admin/AdminContact";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminFooter from "@/components/admin/AdminFooter";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-muted">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5" />
          <span className="font-bold">Painel Admin - Juliana Maciel</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-sm text-primary-foreground/70 hover:text-primary-foreground flex items-center gap-1">
            <Home className="w-4 h-4" /> Ver Site
          </a>
          <Button variant="ghost" size="sm" onClick={signOut} className="text-primary-foreground hover:bg-primary-foreground/10">
            <LogOut className="w-4 h-4 mr-1" /> Sair
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="flex flex-wrap gap-1 h-auto bg-card p-2 rounded-xl border border-border">
            <TabsTrigger value="header" className="flex items-center gap-1"><Layout className="w-4 h-4" /> Header</TabsTrigger>
            <TabsTrigger value="hero" className="flex items-center gap-1"><Home className="w-4 h-4" /> Hero</TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-1"><User className="w-4 h-4" /> Quem Sou</TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> Projetos</TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-1"><Newspaper className="w-4 h-4" /> Notícias</TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-1"><FileText className="w-4 h-4" /> Artigos</TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-1"><Share2 className="w-4 h-4" /> Social</TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-1"><Phone className="w-4 h-4" /> Contato</TabsTrigger>
            <TabsTrigger value="footer" className="flex items-center gap-1"><Settings className="w-4 h-4" /> Rodapé</TabsTrigger>
          </TabsList>

          <TabsContent value="header"><AdminHeader /></TabsContent>
          <TabsContent value="hero"><AdminHero /></TabsContent>
          <TabsContent value="about"><AdminAbout /></TabsContent>
          <TabsContent value="projects"><AdminProjects /></TabsContent>
          <TabsContent value="news"><AdminNews /></TabsContent>
          <TabsContent value="articles"><AdminArticles /></TabsContent>
          <TabsContent value="social"><AdminSocial /></TabsContent>
          <TabsContent value="contact"><AdminContact /></TabsContent>
          <TabsContent value="footer"><AdminFooter /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
