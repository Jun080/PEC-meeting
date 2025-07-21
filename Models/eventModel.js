import { client } from '../supabase.js';

export async function getAllEvents() {
    console.log('Requête getAllEvents vers Supabase...');
    const { data, error } = await client.from('evenements').select('*');
    console.log('Réponse Supabase - data:', data, 'error:', error);
    if (error) throw error;
    return data;
}

export async function getEventById(id) {
    const { data, error } = await client
        .from('evenements')
        .select('*')
        .eq('id', id)
        .single();
    if (error) throw error;
    return data;
}