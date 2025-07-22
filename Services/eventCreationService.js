import { client } from '../supabase.js';

export async function createEvent(eventData) {
    try {
        const { data, error } = await client
            .from('evenements')
            .insert([eventData])
            .select()
            .single();

        if (error) throw error;

        return {
            success: true,
            message: 'Événement créé avec succès',
            event: data,
            data: data
        };
    } catch (error) {
        throw {
            success: false,
            message: error.message || 'Erreur lors de la création de l\'événement'
        };
    }
}

export async function updateEvent(eventId, eventData) {
    try {
        const { data, error } = await client
            .from('evenements')
            .update(eventData)
            .eq('id', eventId)
            .select()
            .single();

        if (error) throw error;

        return {
            success: true,
            message: 'Événement mis à jour avec succès',
            data: data
        };
    } catch (error) {
        throw {
            success: false,
            message: error.message || 'Erreur lors de la mise à jour de l\'événement'
        };
    }
}

export async function getUserEvents(userId) {
    try {
        const { data, error } = await client
            .from('evenements')
            .select('*')
            .eq('organisateur_id', userId)
            .order('date', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        throw {
            success: false,
            message: error.message || 'Erreur lors du chargement des événements'
        };
    }
}
