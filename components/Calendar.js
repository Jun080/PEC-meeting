import { 
    getUserCalendarEvents, 
    organizeEventsByMonth, 
    generateCalendarData, 
    getDayNames,
    generateGoogleCalendarLink 
} from '../Services/calendarService.js';

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let userEvents = [];
let eventsByMonth = {};

function navigateToPreviousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendarDisplay();
}

function navigateToNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendarDisplay();
}

async function initializeCalendar() {
    try {
        userEvents = await getUserCalendarEvents();
        eventsByMonth = organizeEventsByMonth(userEvents);
        
        updateCalendarDisplay();
        updateStatsDisplay();
        
    } catch (error) {
        console.error('Erreur lors de l\'initialisation du calendrier:', error);
        showCalendarError('Erreur lors du chargement de vos événements');
    }
}

function updateCalendarDisplay() {
    const monthKey = `${currentYear}-${currentMonth}`;
    const monthEvents = eventsByMonth[monthKey]?.events || [];
    
    const calendarData = generateCalendarData(currentYear, currentMonth, monthEvents);
    
    const monthYearElement = document.getElementById('current-month-year');
    if (monthYearElement) {
        monthYearElement.textContent = `${calendarData.monthName} ${calendarData.year}`;
    }
    
    updateCalendarDays(calendarData.calendar);
}

function updateCalendarDays(calendar) {
    const daysContainer = document.getElementById('calendar-days');
    if (!daysContainer) return;
    
    daysContainer.innerHTML = '';
    
    calendar.forEach(week => {
        week.forEach(dayData => {
            const dayElement = createDayElement(dayData);
            daysContainer.appendChild(dayElement);
        });
    });
}

function createDayElement(dayData) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    if (!dayData.isCurrentMonth) {
        dayElement.classList.add('other-month');
    }
    if (dayData.isToday) {
        dayElement.classList.add('today');
    }
    if (dayData.hasEvents) {
        dayElement.classList.add('has-events');
    }
    
    const dayNumber = document.createElement('div');
    dayNumber.className = 'calendar-day-number';
    dayNumber.textContent = dayData.day;
    dayElement.appendChild(dayNumber);
    
    if (dayData.events.length > 0) {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'calendar-events-indicators';
        
        const maxIndicators = Math.min(dayData.events.length, 3);
        for (let i = 0; i < maxIndicators; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'calendar-event-indicator';
            indicatorsContainer.appendChild(indicator);
        }
        
        if (dayData.events.length > 3) {
            const countElement = document.createElement('div');
            countElement.className = 'calendar-event-count';
            countElement.textContent = `+${dayData.events.length - 3}`;
            indicatorsContainer.appendChild(countElement);
        }
        
        dayElement.appendChild(indicatorsContainer);
        
        const eventsContainer = createDayEventsContainer(dayData.events);
        dayElement.appendChild(eventsContainer);
        
        dayElement.addEventListener('click', () => {
            toggleDayEvents(dayElement);
        });
    }
    
    return dayElement;
}

function createDayEventsContainer(events) {
    const container = document.createElement('div');
    container.className = 'calendar-day-events';
    
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'calendar-day-event';
        
        const eventTitle = document.createElement('div');
        eventTitle.className = 'calendar-event-title';
        eventTitle.textContent = event.nom;
        
        const eventTime = document.createElement('div');
        eventTime.className = 'calendar-event-time';
        const eventDate = new Date(event.date);
        eventTime.textContent = eventDate.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const googleBtn = document.createElement('button');
        googleBtn.textContent = '+ Google Calendar';
        googleBtn.className = 'calendar-export-btn';
        googleBtn.style.fontSize = '0.7rem';
        googleBtn.style.padding = '0.3rem 0.6rem';
        googleBtn.style.marginTop = '0.3rem';
        googleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            exportEventToGoogleCalendar(event);
        });
        
        eventElement.appendChild(eventTitle);
        eventElement.appendChild(eventTime);
        eventElement.appendChild(googleBtn);
        container.appendChild(eventElement);
    });
    
    return container;
}

function toggleDayEvents(dayElement) {
    document.querySelectorAll('.calendar-day.show-events').forEach(day => {
        if (day !== dayElement) {
            day.classList.remove('show-events');
        }
    });
    
    dayElement.classList.toggle('show-events');
}

function updateStatsDisplay() {
    const totalEventsElement = document.getElementById('total-events-count');
    if (totalEventsElement) {
        totalEventsElement.textContent = userEvents.length;
    }
}

function exportEventToGoogleCalendar(event) {
    const googleCalendarUrl = generateGoogleCalendarLink(event);
    window.open(googleCalendarUrl, '_blank');
}

function exportAllToGoogleCalendar() {
    if (userEvents.length === 0) {
        alert('Aucun événement à exporter');
        return;
    }
    
    const allEventsText = userEvents.map(event => {
        const eventDate = new Date(event.date);
        return `• ${event.nom} - ${eventDate.toLocaleDateString('fr-FR')} à ${eventDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    }).join('\\n');
    
    const summaryEvent = {
        nom: `Mes événements MeetUp Connect (${userEvents.length} événements)`,
        date: new Date().toISOString(),
        description_longue: `Récapitulatif de tous vos événements MeetUp Connect:\\n\\n${allEventsText}`,
        adresse: 'Voir détails des événements individuels'
    };
    
    exportEventToGoogleCalendar(summaryEvent);
}

function showCalendarError(message) {
    const container = document.getElementById('calendar-container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-gray);">
                <p>${message}</p>
            </div>
        `;
    }
}

export default function Calendar() {
    setTimeout(initializeCalendar, 100);

    return {
        tag: "div",
        attributes: [["class", "calendar-container"], ["id", "calendar-container"]],
        children: [
            {
                tag: "div",
                attributes: [["class", "calendar-header"]],
                children: [
                    {
                        tag: "div",
                        attributes: [["class", "calendar-stats"]],
                        children: [
                            {
                                tag: "div",
                                attributes: [["class", "calendar-stats-card"]],
                                children: [
                                    {
                                        tag: "p",
                                        attributes: [["class", "calendar-stats-number"], ["id", "total-events-count"]],
                                        children: ["0"]
                                    },
                                    {
                                        tag: "p",
                                        attributes: [["class", "calendar-stats-label"]],
                                        children: ["événements inscrits"]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attributes: [["class", "calendar-navigation"]],
                        children: [
                            {
                                tag: "button",
                                attributes: [["class", "calendar-nav-btn"], ["id", "prev-month"], ["aria-label", "Mois précédent"]],
                                events: {
                                    click: [navigateToPreviousMonth]
                                },
                                children: ["‹"]
                            },
                            {
                                tag: "h3",
                                attributes: [["class", "calendar-month-year"], ["id", "current-month-year"]],
                                children: [""]
                            },
                            {
                                tag: "button",
                                attributes: [["class", "calendar-nav-btn"], ["id", "next-month"], ["aria-label", "Mois suivant"]],
                                events: {
                                    click: [navigateToNextMonth]
                                },
                                children: ["›"]
                            }
                        ]
                    }
                ]
            },
            {
                tag: "div",
                attributes: [["class", "calendar-grid"]],
                children: [
                    {
                        tag: "div",
                        attributes: [["class", "calendar-weekdays"]],
                        children: getDayNames().map(day => ({
                            tag: "div",
                            attributes: [["class", "calendar-weekday"]],
                            children: [day]
                        }))
                    },
                    {
                        tag: "div",
                        attributes: [["class", "calendar-days"], ["id", "calendar-days"]],
                        children: []
                    }
                ]
            },
            {
                tag: "div",
                attributes: [["class", "calendar-actions"]],
                children: [
                    {
                        tag: "button",
                        attributes: [["class", "calendar-export-btn"], ["id", "export-to-google"]],
                        events: {
                            click: [exportAllToGoogleCalendar]
                        },
                        children: [
                            "📅 Ajouter tous mes événements à Google Calendar"
                        ]
                    }
                ]
            }
        ]
    };
}
