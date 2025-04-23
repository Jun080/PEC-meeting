const supabaseUrl = 'https://vshypoxmtakyykyzomjy.supabase.co'

const supabasePublicKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzaHlwb3htdGFreXlreXpvbWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MTE0NDgsImV4cCI6MjA2MDk4NzQ0OH0.lkQn4VImc8up0LyrPEHZUlyI6a-X9AGqCUK6NbcBSjs'

export const client = supabase.createClient(
    supabaseUrl,
    supabasePublicKey,
)