import { getAllEvents as getEventsFromModel, getEventById as getEventByIdFromModel } from '../Models/eventModel.js';

export async function getAllEvents() {
    return await getEventsFromModel();
}

export async function getUpcomingEvents() {
    const allEvents = await getEventsFromModel();
    const now = new Date().toISOString();
    return allEvents.filter(event => event.date >= now);
}

export async function getEventById(eventId) {
    return await getEventByIdFromModel(eventId);
}
