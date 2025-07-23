import { getAllEvents } from "../Models/eventModel.js";
import { getCurrentUser } from "../Models/userModel.js";
import { getAllEvents as getEventsFromModel, getEventById as getEventByIdFromModel } from '../Models/eventModel.js';

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

export async function getEventsNearUser() {
  const events = await getAllEvents();
  const user = await getCurrentUser();
  if (!user || !user.lieu) return [];
  const userCity = user.lieu.trim().toLowerCase();
  return events.filter(
    (event) => event.adresse && event.adresse.toLowerCase().includes(userCity)
  );
}

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

