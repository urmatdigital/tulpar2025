-- Create clients table
CREATE TABLE IF NOT EXISTS public.clients (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    client_number VARCHAR(10) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create function to generate next client number
CREATE OR REPLACE FUNCTION generate_client_number()
RETURNS trigger AS $$
DECLARE
    last_number INTEGER;
    base_number INTEGER := 8659;
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

-- Create trigger to auto-generate client number
CREATE TRIGGER set_client_number
    BEFORE INSERT ON public.clients
    FOR EACH ROW
    EXECUTE FUNCTION generate_client_number();

-- Enable Row Level Security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own data
CREATE POLICY "Users can view own client data" ON public.clients
    FOR ALL
    USING (auth.uid() = user_id);

-- Create function to automatically create client record when user registers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.clients (user_id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
