import { getAllEvents } from "../Models/eventModel.js";

export async function getAllPopularEvents() {
    const events = await getAllEvents();
    const eventsWithPlacesAchetees = events
        .map((event) => ({
            ...event,
            placesAchetees:
                (event.nombre_places || 0) -
                (event.nombre_places_disponibles || 0),
        }))
        .sort((a, b) => b.placesAchetees - a.placesAchetees)
        .slice(0, 4);
    return eventsWithPlacesAchetees;
}
