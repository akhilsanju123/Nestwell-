/*
# Create NestWell enquiry capture

1. New Tables
- `nestwell_enquiries` stores contact, project interest, preferred visit date, and message submitted from public enquiry and site-visit forms.
- `id` is a generated UUID primary key.
- `name`, `phone`, and `email` identify the visitor.
- `project`, `visit_date`, `message`, and `source` preserve the enquiry context.
- `created_at` records when the enquiry was received.
2. Security
- Row-level security is enabled.
- Anonymous and authenticated visitors may submit enquiries and the public client may not read, update, or delete them.
- Insert grants are limited to the fields used by the public forms.
3. Notes
- This is a single-tenant lead capture table; there is no sign-in flow in this website.
*/

CREATE TABLE IF NOT EXISTS public.nestwell_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  project text,
  visit_date date,
  message text,
  source text NOT NULL DEFAULT 'website',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.nestwell_enquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT (name, phone, email, project, visit_date, message, source) ON public.nestwell_enquiries TO anon, authenticated;

DROP POLICY IF EXISTS "Public visitors can submit enquiries" ON public.nestwell_enquiries;
CREATE POLICY "Public visitors can submit enquiries"
ON public.nestwell_enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(name)) BETWEEN 2 AND 120
  AND length(trim(phone)) BETWEEN 7 AND 30
  AND length(trim(coalesce(email, ''))) <= 160
  AND length(trim(coalesce(message, ''))) <= 2000
  AND length(trim(coalesce(project, ''))) <= 160
  AND length(trim(coalesce(source, ''))) <= 80
);
