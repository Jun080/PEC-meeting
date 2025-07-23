import { client } from '../supabase.js';

export async function subscribeToEvent(userId, eventId) {
    try {
        const { data: existingParticipation, error: checkError } = await client
            .from('evenement_participants')
            .select('*')
            .eq('utilisateur_id', userId)
            .eq('evenement_id', eventId)
            .single();

        if (checkError && checkError.code !== 'PGRST116') {
            throw checkError;
        }

        if (existingParticipation) {
            throw new Error('Vous êtes déjà inscrit à cet événement');
        }

        const { data: event, error: eventError } = await client
            .from('evenements')
            .select('nombre_places_disponibles')
            .eq('id', eventId)
            .single();

        if (eventError) throw eventError;

        if (event.nombre_places_disponibles <= 0) {
            throw new Error('Plus de places disponibles pour cet événement');
        }

        const { data: insertResult, error: insertError } = await client
            .from('evenement_participants')
            .insert([{
                utilisateur_id: userId,
                evenement_id: eventId
            }]);

        if (insertError) {
            throw insertError;
        }

        const { data: updateResult, error: updateError } = await client
            .from('evenements')
            .update({ 
                nombre_places_disponibles: event.nombre_places_disponibles - 1 
            })
            .eq('id', eventId);

        if (updateError) {
            throw updateError;
        }

        return { success: true, message: 'Inscription réussie !' };
    } catch (error) {
        throw error;
    }
}

export async function unsubscribeFromEvent(userId, eventId) {
    try {
        const { data: participation, error: checkError } = await client
            .from('evenement_participants')
            .select('*')
            .eq('utilisateur_id', userId)
            .eq('evenement_id', eventId)
            .single();

        if (checkError) {
            if (checkError.code === 'PGRST116') {
                throw new Error('Vous n\'êtes pas inscrit à cet événement');
            }
            throw checkError;
        }

        const { error: deleteError } = await client
            .from('evenement_participants')
            .delete()
            .eq('utilisateur_id', userId)
            .eq('evenement_id', eventId);

        if (deleteError) throw deleteError;

        const { data: event, error: eventError } = await client
            .from('evenements')
            .select('nombre_places_disponibles')
            .eq('id', eventId)
            .single();

        if (eventError) throw eventError;

        const { error: updateError } = await client
            .from('evenements')
            .update({ 
                nombre_places_disponibles: event.nombre_places_disponibles + 1 
            })
            .eq('id', eventId);

        if (updateError) throw updateError;

        return { success: true, message: 'Désinscription réussie !' };
    } catch (error) {
        throw error;
    }
}

export async function isUserSubscribedToEvent(userId, eventId) {
    try {
        const { data, error } = await client
            .from('evenement_participants')
            .select('*')
            .eq('utilisateur_id', userId)
            .eq('evenement_id', eventId)
            .single();

        if (error && error.code !== 'PGRST116') {
            throw error;
        }

        return !!data;
    } catch (error) {
        return false;
    }
}

export async function getUserEventParticipations(userId) {
    try {
        const { data, error } = await client
            .from('evenement_participants')
            .select(`
                *,
                evenements (
                    id,
                    nom,
                    date,
                    adresse,
                    prix,
                    image,
                    description_courte,
                    description_longue
                )
            `)
            .eq('utilisateur_id', userId);

        if (error) throw error;
        return data;
    } catch (error) {
        throw error;
    }
}
