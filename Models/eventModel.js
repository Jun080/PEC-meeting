import { client } from '../supabase.js';

export async function getAllEvents() {
    try {
        const { data, error } = await client.functions.invoke('eventModel');
        if (error) throw error;
        return data.data;
    } catch (error) {
        throw error;
    }
}

export async function getEventById(eventId) {
    try {
        const allEvents = await getAllEvents();
        const event = allEvents.find(event => event.id == eventId);
        if (!event) {
            throw new Error(`Événement avec l'ID ${eventId} non trouvé`);
        }
        return event;
    } catch (error) {
        throw error;
    }
}