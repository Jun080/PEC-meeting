import { client } from '../supabase.js';

export async function getAllEvents() {
    const { data, error } = await client.from('evenements').select('*');
    if (error) throw error;
    return data;
}