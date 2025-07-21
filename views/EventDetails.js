import createElement from '../lib/createElement.js';
import { getEventById, getAllEvents } from '../Models/eventModel.js';
import { getUserById } from '../Models/userModel.js';
import { subscribeToEvent, unsubscribeFromEvent, isUserSubscribedToEvent } from '../Services/eventParticipationService.js';

export function EventDetails(props) {
    const params = props.params || {};
    const eventId = params.id;
    
    setTimeout(() => chargerDetailEvenement(), 100);
    
    return {
        tag: 'div',
        attributes: [['class', 'event-details-page']],
        children: [
            {
                tag: 'div',
                attributes: [['class', 'event-hero']],
                children: [
                    {
                        tag: 'div',
                        attributes: [['class', 'event-hero-card']],
                        children: [
                            {
                                tag: 'h1',
                                attributes: [['class', 'event-hero-title'], ['id', 'event-title']],
                                children: ['Chargement...']
                            },
                            {
                                tag: 'div',
                                attributes: [['class', 'event-hero-date'], ['id', 'event-date']],
                                children: ['Chargement...']
                            },
                            {
                                tag: 'div',
                                attributes: [['class', 'event-hero-location'], ['id', 'event-location']],
                                children: ['Chargement...']
                            },
                            {
                                tag: 'div',
                                attributes: [['class', 'event-hero-buttons']],
                                children: [
                                    {
                                        tag: 'button',
                                        attributes: [['class', 'event-subscribe-btn'], ['id', 'join-event-btn']],
                                        children: ['S\'inscrire à l\'événement']
                                    },
                                    {
                                        tag: 'button',
                                        attributes: [['class', 'event-share-btn']],
                                        children: ['🔗']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        attributes: [['class', 'event-hero-image'], ['id', 'event-hero-image']],
                        children: []
                    }
                ]
            },
            {
                tag: 'div',
                attributes: [['class', 'event-main-content']],
                children: [
                    {
                        tag: 'div',
                        attributes: [['class', 'event-content-left']],
                        children: [
                            {
                                tag: 'div',
                                attributes: [['class', 'event-about']],
                                children: [
                                    {
                                        tag: 'h2',
                                        children: ['À propos']
                                    },
                                    {
                                        tag: 'p',
                                        attributes: [['class', 'event-description'], ['id', 'event-description']],
                                        children: ['Chargement de la description...']
                                    }
                                ]
                            },
                            {
                                tag: 'div',
                                attributes: [['class', 'event-stats']],
                                children: [
                                    {
                                        tag: 'div',
                                        attributes: [['class', 'event-stat']],
                                        children: [
                                            {
                                                tag: 'div',
                                                attributes: [['class', 'event-stat-number'], ['id', 'event-participants']],
                                                children: ['00/00']
                                            },
                                            {
                                                tag: 'div',
                                                attributes: [['class', 'event-stat-label']],
                                                children: ['Inscrits']
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'div',
                                        attributes: [['class', 'event-stat']],
                                        children: [
                                            {
                                                tag: 'div',
                                                attributes: [['class', 'event-stat-label']],
                                                children: ['Prix :']
                                            },
                                            {
                                                tag: 'div',
                                                attributes: [['class', 'event-stat-number'], ['id', 'event-price']],
                                                children: ['0€']
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'div',
                                        attributes: [['class', 'event-stat']],
                                        children: [
                                            {
                                                tag: 'div',
                                                attributes: [['class', 'event-stat-label']],
                                                children: ['Organisé par:']
                                            },
                                            {
                                                tag: 'div',
                                                attributes: [['class', 'event-stat-number'], ['id', 'event-organizer']],
                                                children: ['---']
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        attributes: [['class', 'event-content-right']],
                        children: [
                            {
                                tag: 'div',
                                attributes: [['class', 'event-details-card']],
                                children: [
                                    {
                                        tag: 'h3',
                                        children: ['Détails']
                                    },
                                    {
                                        tag: 'div',
                                        attributes: [['class', 'event-details-list']],
                                        children: [
                                            {
                                                tag: 'div',
                                                attributes: [['class', 'event-detail-item']],
                                                children: [
                                                    {
                                                        tag: 'strong',
                                                        children: ['Conditions :']
                                                    },
                                                    {
                                                        tag: 'ul',
                                                        attributes: [['id', 'event-conditions']],
                                                        children: [
                                                            {
                                                                tag: 'li',
                                                                children: ['Chargement...']
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                tag: 'section',
                attributes: [['class', 'similar-events-section']],
                children: [
                    {
                        tag: 'h2',
                        children: ['D\'autres évènements similaires']
                    },
                    {
                        tag: 'div',
                        attributes: [['class', 'similar-events-carousel']],
                        children: [
                            {
                                tag: 'div',
                                attributes: [['class', 'similar-events-container']],
                                children: [
                                    {
                                        tag: 'div',
                                        attributes: [['class', 'similar-events-grid'], ['id', 'similar-events']],
                                        children: []
                                    }
                                ]
                            },
                            {
                                tag: 'div',
                                attributes: [['class', 'carousel-controls']],
                                children: [
                                    {
                                        tag: 'div',
                                        attributes: [['class', 'carousel-indicators'], ['id', 'carousel-indicators']],
                                        children: []
                                    },
                                    {
                                        tag: 'div',
                                        attributes: [['class', 'carousel-nav-buttons']],
                                        children: [
                                            {
                                                tag: 'button',
                                                attributes: [['class', 'carousel-nav-btn carousel-prev'], ['id', 'carousel-prev']],
                                                children: ['‹']
                                            },
                                            {
                                                tag: 'button',
                                                attributes: [['class', 'carousel-nav-btn carousel-next'], ['id', 'carousel-next']],
                                                children: ['›']
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    async function chargerDetailEvenement() {
        if (!eventId) {
            showError('ID d\'événement manquant');
            return;
        }

        try {
            const event = await getEventById(eventId);
            updateEventDisplay(event);
        } catch (error) {
            showError('Événement non trouvé');
        }
    }

    function showError(message) {
        const eventContent = document.getElementById('event-content');
        if (eventContent) {
            eventContent.innerHTML = `
                <div class="error-message">
                    <h2>Erreur</h2>
                    <p>${message}</p>
                    <button onclick="window.history.back()" class="back-to-events-btn">
                        Retour aux événements
                    </button>
                </div>
            `;
        }
    }

    function updateEventDisplay(event) {
        const eventTitle = document.getElementById('event-title');
        const eventDate = document.getElementById('event-date');
        const eventLocation = document.getElementById('event-location');
        const eventDescription = document.getElementById('event-description');
        const eventParticipants = document.getElementById('event-participants');
        const eventPrice = document.getElementById('event-price');
        const eventOrganizer = document.getElementById('event-organizer');
        const eventConditions = document.getElementById('event-conditions');
        const joinButton = document.getElementById('join-event-btn');
        const eventHeroImage = document.getElementById('event-hero-image');

        if (eventTitle) eventTitle.textContent = event.nom || 'Événement';
        if (eventDate) eventDate.textContent = formatDateWithTime(event.date);
        if (eventLocation) eventLocation.textContent = event.adresse || 'Lieu non précisé';
        
        if (eventDescription) {
            const description = event.description_longue || event.description_courte || 'Description non disponible';
            eventDescription.textContent = description;
        }
        
        if (eventParticipants) {
            const totalPlaces = event.nombre_places || 50;
            const placesDisponibles = event.nombre_places_disponibles || 0;
            const inscrits = totalPlaces - placesDisponibles;
            eventParticipants.textContent = `${inscrits}/${totalPlaces}`;
        }
        
        if (eventPrice) {
            const price = event.prix || 0;
            eventPrice.textContent = price > 0 ? `${price}€` : 'Gratuit';
        }
        
        if (eventOrganizer) {
            if (event.organisateur_id) {
                loadOrganizerName(event.organisateur_id);
            } else {
                eventOrganizer.textContent = 'Organisateur non défini';
            }
        }
        
        if (eventConditions) {
            const defaultConditions = getDefaultConditions(event.type_evenement);
            eventConditions.innerHTML = defaultConditions.map(condition => `<li>${condition}</li>`).join('');
        }

        if (eventHeroImage) {
            const imageUrl = event.image || '/Assets/images/eventImage.png';
            eventHeroImage.style.backgroundImage = `url(${imageUrl})`;
        }

        if (joinButton) {
            checkUserSubscriptionStatus(event.id);
        }

        // Charger les événements similaires
        loadSimilarEvents();
    }

    async function checkUserSubscriptionStatus(eventId) {
        try {
            const userStorage = localStorage.getItem('user');
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const currentUser = userStorage && isLoggedIn ? JSON.parse(userStorage) : null;
            
            if (!currentUser?.id || !isLoggedIn) {
                return setupJoinButton(eventId, false, false);
            }

            const isSubscribed = await isUserSubscribedToEvent(currentUser.id, eventId);
            setupJoinButton(eventId, isSubscribed, true);
        } catch (error) {
            setupJoinButton(eventId, false, false);
        }
    }

    function setupJoinButton(eventId, isSubscribed, isLoggedIn) {
        const joinButton = document.getElementById('join-event-btn');
        if (!joinButton) return;

        if (!isLoggedIn) {
            joinButton.textContent = 'Se connecter pour s\'inscrire';
            joinButton.classList.remove('joined');
            joinButton.onclick = () => {
                window.router.navigate('/connexion');
            };
            return;
        }

        if (isSubscribed) {
            joinButton.textContent = 'Se désinscrire';
            joinButton.classList.add('joined');
        } else {
            joinButton.textContent = 'S\'inscrire à l\'événement';
            joinButton.classList.remove('joined');
        }

        joinButton.onclick = () => {
            handleEventRegistration(eventId, !isSubscribed);
        };
    }

    async function loadOrganizerName(organizerId) {
        try {
            const organizer = await getUserById(organizerId);
            
            const eventOrganizer = document.getElementById('event-organizer');
            if (eventOrganizer && organizer) {
                const organizerName = getOrganizerDisplayName(organizer);
                eventOrganizer.textContent = organizerName;
            }
        } catch (error) {
            const eventOrganizer = document.getElementById('event-organizer');
            if (eventOrganizer) {
                eventOrganizer.textContent = 'Organisateur inconnu';
            }
        }
    }

    function getOrganizerDisplayName(organizer) {
        return organizer.prenom && organizer.nom ? `${organizer.prenom} ${organizer.nom}` :
               organizer.pseudo || organizer.username || organizer.nom_complet || organizer.full_name || 
               organizer.nom || organizer.prenom || 'Organisateur';
    }

    function getDefaultConditions(eventType) {
        const conditions = {
            'concert': ['+18 ans requis', 'Pièce d\'identité obligatoire', 'Alcool interdit à l\'entrée'],
            'conference': ['Inscription préalable requise', 'Arrivée 15 min avant le début', 'Silence pendant la présentation'],
            'sport': ['Équipement personnel requis', 'Assurance responsabilité civile', 'Condition physique appropriée'],
            'social': ['Respect des autres participants', 'Ponctualité appréciée', 'Bonne humeur obligatoire']
        };
        return conditions[eventType] || ['Inscription requise', 'Annulation 24h avant', 'Respect du lieu et des participants'];
    }

    async function handleEventRegistration(eventId, subscribe) {
        try {
            const userStorage = localStorage.getItem('user');
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const currentUser = userStorage && isLoggedIn ? JSON.parse(userStorage) : null;
            
            if (!currentUser?.id || !isLoggedIn) {
                alert('Vous devez être connecté pour vous inscrire à un événement');
                return window.router.navigate('/connexion');
            }

            const joinButton = document.getElementById('join-event-btn');
            if (joinButton) {
                joinButton.disabled = true;
                joinButton.textContent = subscribe ? 'Inscription...' : 'Désinscription...';
            }

            const result = subscribe ? 
                await subscribeToEvent(currentUser.id, eventId) : 
                await unsubscribeFromEvent(currentUser.id, eventId);

            setupJoinButton(eventId, subscribe, true);
            updateEventParticipantsDisplay(await getEventById(eventId));
            showNotification(result.message, 'success');

        } catch (error) {
            showNotification(error.message || 'Une erreur est survenue', 'error');
            setupJoinButton(eventId, !subscribe, true);
        } finally {
            const joinButton = document.getElementById('join-event-btn');
            if (joinButton) joinButton.disabled = false;
        }
    }

    function updateEventParticipantsDisplay(event) {
        const eventParticipants = document.getElementById('event-participants');
        if (eventParticipants) {
            const totalPlaces = event.nombre_places || 50;
            const placesDisponibles = event.nombre_places_disponibles || 0;
            const inscrits = totalPlaces - placesDisponibles;
            eventParticipants.textContent = `${inscrits}/${totalPlaces}`;
        }
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {success: '#4CAF50', error: '#f44336', info: '#2196F3'};
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `position:fixed;top:20px;right:20px;padding:1rem 2rem;background:${colors[type]||colors.info};color:white;border-radius:8px;z-index:10000;box-shadow:0 4px 12px rgba(0,0,0,0.3);opacity:0;transform:translateX(100%);transition:all 0.3s ease`;
        
        document.body.appendChild(notification);
        setTimeout(() => { notification.style.opacity='1'; notification.style.transform='translateX(0)'; }, 10);
        setTimeout(() => {
            notification.style.opacity='0';
            notification.style.transform='translateX(100%)';
            setTimeout(() => notification.parentNode?.removeChild(notification), 300);
        }, 3000);
    }

    function formatDateWithTime(dateString) {
        if (!dateString) return 'Date non précisée';
        const date = new Date(dateString);
        return `${date.toLocaleDateString('fr-FR', {day:'2-digit',month:'2-digit',year:'numeric'})} - ${date.toLocaleTimeString('fr-FR', {hour:'2-digit',minute:'2-digit'})}`;
    }

    function formatSimpleDate(dateString) {
        return dateString ? new Date(dateString).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'}) : 'Date à définir';
    }

    function truncateText(text, maxLength) {
        return text && text.length > maxLength ? text.substring(0, maxLength) + '...' : text || '';
    }

    async function loadSimilarEvents() {
        const similarEventsContainer = document.getElementById('similar-events');
        if (!similarEventsContainer) return;
        
        try {
            const allEvents = await getAllEvents();
            const otherEvents = allEvents.filter(e => e.id != eventId);
            
            if (otherEvents.length === 0) {
                similarEventsContainer.innerHTML = '<p style="color:white;text-align:center;padding:2rem;">Aucun autre événement disponible pour le moment.</p>';
                return;
            }
            
            similarEventsContainer.innerHTML = '';
            otherEvents.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'similar-event-card';
                eventCard.innerHTML = `
                    <div class="similar-event-image" style="background-image: url(${event.image || '/Assets/images/eventImage.png'})"></div>
                    <div class="similar-event-content">
                        <h4>${event.nom || 'Événement sans nom'}</h4>
                        <div class="similar-event-date">${formatSimpleDate(event.date)}</div>
                        <div class="similar-event-location">${event.adresse || 'Lieu à définir'}</div>
                        <div class="similar-event-description">${truncateText(event.description_courte || event.description_longue || 'Description à venir', 80)}</div>
                        <div class="similar-event-price">${event.prix > 0 ? event.prix + '€' : 'Gratuit'}</div>
                    </div>
                `;
                eventCard.onclick = () => window.router.navigate(`/evenements/${event.id}`);
                similarEventsContainer.appendChild(eventCard);
            });
            
            initializeCarousel();
        } catch (error) {
            similarEventsContainer.innerHTML = '<p style="color:white;text-align:center;padding:2rem;">Erreur lors du chargement des événements similaires.</p>';
        }
    }

    function initializeCarousel() {
        const container = document.getElementById('similar-events');
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        const indicatorsContainer = document.getElementById('carousel-indicators');
        
        if (!container || !prevBtn || !nextBtn) return;
        
        const cards = container.children;
        const cardsPerView = window.innerWidth <= 768 ? 1 : 2; // 2 cartes par vue sur desktop, 1 sur mobile
        const totalCards = cards.length;
        const totalSlides = Math.ceil(totalCards / cardsPerView);
        let currentSlide = 0;
        
        const cardGroups = [];
        for (let i = 0; i < totalCards; i += cardsPerView) {
            cardGroups.push(Array.from(cards).slice(i, i + cardsPerView));
        }
        
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
        
        function updateCarousel() {
            const containerWidth = container.parentElement.offsetWidth;
            const translateX = -(currentSlide * containerWidth);
            container.style.transform = `translateX(${translateX}px)`;
            
            const indicators = indicatorsContainer.children;
            Array.from(indicators).forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
            
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }
        
        function goToSlide(slideIndex) {
            currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1));
            updateCarousel();
        }
        
        function nextSlide() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateCarousel();
            }
        }
        
        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        }
        
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        updateCarousel();
        
        window.addEventListener('resize', () => setTimeout(initializeCarousel, 100));
    }
}
