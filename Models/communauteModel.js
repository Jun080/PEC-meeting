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

export async function getCommunauteById(communauteId) {
    const { data, error } = await client
        .from('communautes')
        .select('*')
        .eq('id', communauteId)
        .single();
    if (error) throw error;
    return data;
}

export async function createCommunaute({ nom, description, referent, date_creation, lieu, status, image }) {
    const { data, error } = await client
        .from('communautes')
        .insert([
            { nom, description, referent, date_creation, lieu, status, image }
        ])
        .select();
    if (error) throw error;
    return data[0];
}

export async function getCommunauteMemberCount(communauteId) {
    const { count, error } = await client
        .from('communaute_membres')
        .select('*', { count: 'exact', head: true })
        .eq('communaute_id', communauteId);
    if (error) throw error;
    return count || 0;
}

export async function getAllCommunautesWithMemberCount() {
    const { data: communautes, error: communautesError } = await client
        .from('communautes')
        .select('*');
    
    if (communautesError) throw communautesError;
    
    const communautesWithCount = await Promise.all(
        communautes.map(async (communaute) => {
            const { count, error: countError } = await client
                .from('communaute_membres')
                .select('*', { count: 'exact', head: true })
                .eq('communaute_id', communaute.id);
                
            if (countError) {
                console.warn(`Erreur lors du comptage des membres pour la communauté ${communaute.id}:`, countError);
                return { ...communaute, member_count: 0 };
            }
            
            return { ...communaute, member_count: count || 0 };
        })
    );
    
    return communautesWithCount;
}