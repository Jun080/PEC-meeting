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

export async function getPopularEvents(limit = 8) {
    try {
        const { data, error } = await client
            .from('evenement_participants')
            .select(`
                evenement_id,
                evenements (
                    id,
                    nom,
                    date,
                    adresse,
                    prix,
                    image,
                    description_courte,
                    description_longue,
                    nombre_places
                )
            `);

        if (error) throw error;

        const eventCounts = {};
        data.forEach(participation => {
            const eventId = participation.evenement_id;
            if (!eventCounts[eventId]) {
                eventCounts[eventId] = {
                    event: participation.evenements,
                    participantCount: 0
                };
            }
            eventCounts[eventId].participantCount++;
        });

        const popularEvents = Object.values(eventCounts)
            .sort((a, b) => b.participantCount - a.participantCount)
            .slice(0, limit)
            .map(item => ({
                ...item.event,
                participants_count: item.participantCount
            }));

        return popularEvents;
    } catch (error) {
        throw error;
    }
}

export async function getRecentEventsWithParticipants(limit = 8) {
    try {
        // Récupérer tous les événements triés par ID décroissant (les plus récents en premier)
        const { data: allEvents, error: eventsError } = await client
            .from('evenements')
            .select('*')
            .order('id', { ascending: false })
            .limit(limit);

        if (eventsError) throw eventsError;

        const eventsWithParticipants = await Promise.all(
            allEvents.map(async (event) => {
                const { data: participants, error: participantsError } = await client
                    .from('evenement_participants')
                    .select('evenement_id')
                    .eq('evenement_id', event.id);

                if (participantsError) throw participantsError;

                return {
                    ...event,
                    participants_count: participants.length
                };
            })
        );

        return eventsWithParticipants;
    } catch (error) {
        throw error;
    }
}
