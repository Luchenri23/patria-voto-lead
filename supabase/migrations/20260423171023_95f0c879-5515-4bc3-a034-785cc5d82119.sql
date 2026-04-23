-- Add WhatsApp channel customization fields to site_contact
ALTER TABLE public.site_contact
  ADD COLUMN IF NOT EXISTS whatsapp_channel_title text NOT NULL DEFAULT 'Entre em meu canal no WhatsApp',
  ADD COLUMN IF NOT EXISTS whatsapp_channel_subtitle text NOT NULL DEFAULT 'e fique por dentro de todas as novidades!',
  ADD COLUMN IF NOT EXISTS whatsapp_channel_button_text text NOT NULL DEFAULT 'Entrar no canal',
  ADD COLUMN IF NOT EXISTS whatsapp_channel_url text;

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  whatsapp text NOT NULL,
  cidade text NOT NULL,
  data_nascimento date NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit contact"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin read contact messages"
  ON public.contact_messages
  FOR SELECT
  USING (is_admin());

CREATE POLICY "Admin manage contact messages"
  ON public.contact_messages
  FOR DELETE
  USING (is_admin());

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON public.contact_messages(created_at DESC);