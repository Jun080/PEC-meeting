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

export async function createUser(user) {
  const { data, error } = await client
    .from('utilisateurs')
    .insert([user])
    .select()
    .single();
  if (error) throw error;
  return data;
}
