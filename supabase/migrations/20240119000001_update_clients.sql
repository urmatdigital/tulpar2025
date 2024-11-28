-- Create clients table if not exists
CREATE TABLE IF NOT EXISTS public.clients (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    client_number VARCHAR(10) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add trigger for generating client numbers
CREATE OR REPLACE FUNCTION generate_client_number()
RETURNS trigger AS $$
DECLARE
    last_number INTEGER;
    base_number INTEGER := 8000;  -- Изменено на 8000
BEGIN
    -- Get the last client number
    SELECT COALESCE(
        MAX(CAST(SUBSTRING(client_number FROM 4) AS INTEGER)),
        base_number
    )
    INTO last_number
    FROM public.clients;
    
    -- Generate new client number
    NEW.client_number := 'TE-' || (last_number + 1)::TEXT;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for client number generation
DROP TRIGGER IF EXISTS set_client_number ON public.clients;
CREATE TRIGGER set_client_number
    BEFORE INSERT ON public.clients
    FOR EACH ROW
    EXECUTE FUNCTION generate_client_number();

-- Create function for handling new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.clients (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing own data
DROP POLICY IF EXISTS "Users can view own client data" ON public.clients;
CREATE POLICY "Users can view own client data" ON public.clients
    FOR ALL
    USING (auth.uid() = user_id);
