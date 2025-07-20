import { client } from '../supabase.js';

export async function getCommunautesByReferent(referentId) {
    const { data, error } = await client
        .from('communautes')
        .select('*')
        .eq('referent', referentId);
    if (error) throw error;
    return data;
}

export async function getAllCommunautes() {
    const { data, error } = await client
        .from('communautes')
        .select('*');
    if (error) throw error;
    return data;
}

export async function createCommunaute({ nom, description, referent, date_creation, lieu, status }) {
    const { data, error } = await client
        .from('communautes')
        .insert([
            { nom, description, referent, date_creation, lieu, status }
        ])
        .select();
    if (error) throw error;
    return data[0];
} 