import { client } from '../supabase.js';

export async function getAllEvents() {
    try {
        const { data, error } = await client
            .from('evenements')
            .select('*')
            .order('date', { ascending: true });

        if (error) {
            throw new Error(`Erreur lors de la récupération des événements: ${error.message}`);
        }

        return data || [];

    } catch (error) {
        console.error('Erreur dans getAllEvents:', error);
        throw error;
    }
}

export async function getUpcomingEvents() {
    try {
        const now = new Date().toISOString();
        
        const { data, error } = await client
            .from('evenements')
            .select('*')
            .gte('date', now)
            .order('date', { ascending: true });

        if (error) {
            throw new Error(`Erreur lors de la récupération des événements: ${error.message}`);
        }

        return data || [];

    } catch (error) {
        console.error('Erreur dans getUpcomingEvents:', error);
        throw error;
    }
}

export async function getEventById(eventId) {
    try {
        const { data, error } = await client
            .from('evenements')
            .select('*')
            .eq('id', eventId)
            .single();

        if (error) {
            throw new Error(`Erreur lors de la récupération de l'événement: ${error.message}`);
        }

        return data;

    } catch (error) {
        console.error('Erreur dans getEventById:', error);
        throw error;
    }
}
