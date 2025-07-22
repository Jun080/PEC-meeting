import { getAllEvents } from "../Models/eventModel.js";
import { getCurrentUser } from "../Models/userModel.js";

export async function getAllPopularEvents() {
  const events = await getAllEvents();
  const eventsWithPlacesAchetees = events
    .map((event) => ({
      ...event,
      placesAchetees:
        (event.nombre_places || 0) - (event.nombre_places_disponibles || 0),
    }))
    .sort((a, b) => b.placesAchetees - a.placesAchetees);
  return eventsWithPlacesAchetees;
}

export async function getMatchingEvents(searchTerm) {
  const events = await getAllEvents();
  const user = await getCurrentUser();
  const userInterests = user["centres_interet"] || [];
  const matchingEvents = events.filter((event) => {
    if (!event.categorie) return false;
    return userInterests.includes(event.categorie);
  });
  return matchingEvents;
}
