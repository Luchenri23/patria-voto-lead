import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Link, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  bucket?: string;
  hint?: string;
  maxSizeKB?: number;
}

const ImageUploadField = ({ label, value, onChange, accept = "image/*,video/*", bucket = "content-images", hint, maxSizeKB = 2048 }: ImageUploadFieldProps) => {
  const [mode, setMode] = useState<"upload" | "url">(value && !value.startsWith("blob:") ? "url" : "upload");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeKB * 1024) {
      toast({ title: "Arquivo muito grande", description: `O tamanho máximo é ${maxSizeKB >= 1024 ? `${(maxSizeKB / 1024).toFixed(0)}MB` : `${maxSizeKB}KB`}.`, variant: "destructive" });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
      const filePath = `uploads/${fileName}`;

      const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

      if (error) throw error;

      const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(filePath);
      onChange(publicData.publicUrl);
      toast({ title: "Upload concluído!", description: "Arquivo enviado com sucesso." });
    } catch (err: unknown) {
      toast({ title: "Erro no upload", description: String(err), variant: "destructive" });
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {hint && (
        <p className="text-xs text-muted-foreground">📐 {hint} • Máx: {maxSizeKB >= 1024 ? `${(maxSizeKB / 1024).toFixed(0)}MB` : `${maxSizeKB}KB`}</p>
      )}

      {/* Toggle between upload and URL */}
      <div className="flex gap-1 mb-2">
        <Button
          type="button"
          variant={mode === "upload" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("upload")}
          className="text-xs"
        >
          <Upload className="w-3 h-3 mr-1" /> Enviar Arquivo
        </Button>
        <Button
          type="button"
          variant={mode === "url" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("url")}
          className="text-xs"
        >
          <Link className="w-3 h-3 mr-1" /> Colar URL
        </Button>
      </div>

      {mode === "upload" ? (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full border-dashed border-2 h-20 flex flex-col gap-1"
          >
            {uploading ? (
              <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
            ) : (
              <>
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Clique para selecionar um arquivo</span>
              </>
            )}
          </Button>
        </div>
      ) : (
        <Input
          type="url"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
        />
      )}

      {/* Preview */}
      {value && (
        <div className="relative inline-block mt-2">
          {value.match(/\.(mp4|webm|ogg)(\?|$)/i) ? (
            <video src={value} className="h-20 rounded border border-border object-cover" controls />
          ) : (
            <img src={value} alt="Preview" className="h-20 rounded border border-border object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          )}
          <button
            type="button"
            onClick={handleClear}
            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-destructive/90"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
