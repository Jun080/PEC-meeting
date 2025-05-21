import { client } from '../supabase.js';

export async function getAllUsers() {
  const { data, error } = await client.from('utilisateurs').select('*');
  if (error) throw error;
  return data;
}

export async function getUserById(id) {
    const { data, error } = await client
        .from('utilisateurs')
        .select('*')
        .eq('id', id)
        .single();
    if (error) throw error;
    return data;
}
