-- Drop existing triggers and functions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS set_client_number ON public.clients;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS generate_client_number();

-- Drop existing table if exists
DROP TABLE IF EXISTS public.clients;

-- Create new clients table
CREATE TABLE public.clients (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    client_number VARCHAR(10) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create function to get next client number
CREATE OR REPLACE FUNCTION get_next_client_number()
RETURNS VARCHAR AS $$
DECLARE
    last_number INTEGER;
    base_number INTEGER := 8000;
BEGIN
    -- Get the last client number
    SELECT COALESCE(
        MAX(CAST(SUBSTRING(client_number FROM 4) AS INTEGER)),
        base_number
    )
    INTO last_number
    FROM public.clients;
    
    -- Return new client number
    RETURN 'TE-' || (last_number + 1)::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Create function to handle client creation
CREATE OR REPLACE FUNCTION handle_client_creation()
RETURNS TRIGGER AS $$
BEGIN
    -- Only generate client number if it's not provided
    IF NEW.client_number IS NULL THEN
        NEW.client_number := get_next_client_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for client number generation
CREATE TRIGGER set_client_number
    BEFORE INSERT ON public.clients
    FOR EACH ROW
    EXECUTE FUNCTION handle_client_creation();

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing own data
DROP POLICY IF EXISTS "Users can view own client data" ON public.clients;
CREATE POLICY "Users can view own client data" ON public.clients
    FOR SELECT
    USING (auth.uid() = user_id OR user_id IS NULL);

-- Create policy for inserting data
DROP POLICY IF EXISTS "Users can insert own data" ON public.clients;
CREATE POLICY "Users can insert own data" ON public.clients
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create policy for updating own data
DROP POLICY IF EXISTS "Users can update own data" ON public.clients;
CREATE POLICY "Users can update own data" ON public.clients
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create index for phone search
CREATE INDEX idx_clients_phone ON public.clients(phone);

-- Create index for user_id
CREATE INDEX idx_clients_user_id ON public.clients(user_id);
