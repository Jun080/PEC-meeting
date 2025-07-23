import { getCurrentUser } from "../Models/userModel.js";
import { getUserEventParticipations } from './eventParticipationService.js';
import { getUserEvents } from './eventCreationService.js';

export async function getUserCalendarEvents() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.id) {
            throw new Error('Utilisateur non connecté');
        }

        const userEvents = await getUserEvents(currentUser.id);
        
        const participations = await getUserEventParticipations(currentUser.id);
        const participationEvents = participations.map(p => ({
            ...p.evenements,
            isParticipant: true
        })).filter(e => e);

        const allEvents = [...userEvents.map(e => ({...e, isOrganizer: true}))];
        participationEvents.forEach(event => {
            if (!allEvents.find(e => e.id === event.id)) {
                allEvents.push(event);
            }
        });

        return allEvents;
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        throw error;
    }
}

export function organizeEventsByMonth(events) {
    const eventsByMonth = {};
    
    events.forEach(event => {
        const eventDate = new Date(event.date);
        const monthKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}`;
        
        if (!eventsByMonth[monthKey]) {
            eventsByMonth[monthKey] = {
                year: eventDate.getFullYear(),
                month: eventDate.getMonth(),
                events: []
            };
        }
        
        eventsByMonth[monthKey].events.push({
            ...event,
            day: eventDate.getDate()
        });
    });
    
    return eventsByMonth;
}

export function generateCalendarData(year, month, events = []) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    
    startDate.setDate(startDate.getDate() - (startDate.getDay() + 6) % 7);
    
    const calendar = [];
    const current = new Date(startDate);
    
    for (let week = 0; week < 6; week++) {
        const weekDays = [];
        for (let day = 0; day < 7; day++) {
            const dayEvents = events.filter(event => 
                event.day === current.getDate() && 
                current.getMonth() === month &&
                current.getFullYear() === year
            );
            
            weekDays.push({
                date: new Date(current),
                day: current.getDate(),
                isCurrentMonth: current.getMonth() === month,
                isToday: isToday(current),
                events: dayEvents,
                hasEvents: dayEvents.length > 0
            });
            
            current.setDate(current.getDate() + 1);
        }
        calendar.push(weekDays);
    }
    
    return {
        year,
        month,
        monthName: getMonthName(month),
        calendar,
        totalEvents: events.length
    };
}

function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

function getMonthName(monthIndex) {
    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return months[monthIndex];
}

export function getDayNames() {
    return ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
}

export function formatEventDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
    };
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    
    return {
        fullDate: date.toLocaleDateString('fr-FR', options),
        time: date.toLocaleTimeString('fr-FR', timeOptions),
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    };
}

export function generateGoogleCalendarLink(event) {
    const eventDate = new Date(event.date);
    const startDate = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000)
        .toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.nom,
        dates: `${startDate}/${endDate}`,
        details: event.description_longue || event.description_courte || 'Événement MeetUp Connect',
        location: event.adresse || event.lieu || '',
        sprop: 'website:meetupconnect.com'
    });
    
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
