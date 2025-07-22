import { client } from '../supabase.js';

// Ajouter un utilisateur comme membre d'une communauté
export async function ajouterMembreCommunaute(utilisateur_id, communaute_id) {
    const { data, error } = await client
        .from('communaute_membres')
        .insert([{ utilisateur_id, communaute_id }]);
    if (error) throw error;
    return data;
}

// Retirer un utilisateur d'une communauté
export async function retirerMembreCommunaute(utilisateur_id, communaute_id) {
    const { data, error } = await client
        .from('communaute_membres')
        .delete()
        .eq('utilisateur_id', utilisateur_id)
        .eq('communaute_id', communaute_id);
    if (error) throw error;
    return data;
}

// Vérifier si un utilisateur est membre d'une communauté
export async function estMembreCommunaute(utilisateur_id, communaute_id) {
    const { data, error } = await client
        .from('communaute_membres')
        .select('*')
        .eq('utilisateur_id', utilisateur_id)
        .eq('communaute_id', communaute_id)
        .maybeSingle();
    if (error) throw error;
    return !!data;
}

// Récupérer toutes les communautés auxquelles un utilisateur est abonné
export async function getCommunautesAbonnees(utilisateur_id) {
    const { data, error } = await client
        .from('communaute_membres')
        .select('communaute_id')
        .eq('utilisateur_id', utilisateur_id);
    if (error) throw error;
    return data.map(row => row.communaute_id);
} 