import createElement from '../lib/createElement.js';
import { getEventById, getAllEvents } from '../Models/eventModel.js';
import { getUserById } from '../Models/userModel.js';

export function EventDetails(props) {
    const params = props.params || {};
    const eventId = params.id;
    
    // Déclencher le chargement automatiquement une fois le composant créé
    setTimeout(() => chargerDetailEvenement(), 100);
    
    return {
        tag: 'div',
        attributes: [['class', 'event-details-page']],
        children: [
            // Header avec carte bleue à gauche et image à droite (design exact)
            {
                tag: 'div',
                attributes: [['class', 'event-hero']],
                children: [
                    // Carte bleue à gauche
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
                    // Image à droite
                    {
                        tag: 'div',
                        attributes: [['class', 'event-hero-image'], ['id', 'event-hero-image']],
                        children: []
                    }
                ]
            },
            // Section principale avec description et détails
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
            // Section événements similaires
            {
                tag: 'div',
                attributes: [['class', 'similar-events-section']],
                children: [
                    {
                        tag: 'h2',
                        children: ['D\'autres évènements similaires']
                    },
                    {
                        tag: 'div',
                        attributes: [['class', 'similar-events-grid'], ['id', 'similar-events']],
                        children: []
                    }
                ]
            }
        ]
    };

    async function chargerDetailEvenement() {
        console.log('EventDetails - eventId:', eventId);
        
        if (!eventId) {
            console.error('Aucun ID d\'événement fourni');
            showError('ID d\'événement manquant');
            return;
        }

        try {
            console.log('Chargement de l\'événement avec ID:', eventId);
            const event = await getEventById(eventId);
            console.log('Événement récupéré:', event);
            console.log('Champs disponibles:', Object.keys(event));
            updateEventDisplay(event);
        } catch (error) {
            console.error('Erreur lors du chargement de l\'événement:', error);
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

        // Utiliser les VRAIS champs de la BDD selon les logs
        if (eventTitle) eventTitle.textContent = event.nom || 'Événement';
        if (eventDate) eventDate.textContent = formatDateWithTime(event.date);
        if (eventLocation) eventLocation.textContent = event.adresse || 'Lieu non précisé';
        
        // Utiliser description_courte ou description_longue
        if (eventDescription) {
            const description = event.description_longue || event.description_courte || 'Description non disponible';
            eventDescription.textContent = description;
        }
        
        // Mise à jour des statistiques avec les vrais champs
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
            // Récupérer le nom de l'organisateur à partir de son ID
            if (event.organisateur_id) {
                loadOrganizerName(event.organisateur_id);
            } else {
                eventOrganizer.textContent = 'Organisateur non défini';
            }
        }
        
        // Conditions basées sur le type_evenement de la BDD
        if (eventConditions) {
            const defaultConditions = getDefaultConditions(event.type_evenement);
            eventConditions.innerHTML = defaultConditions.map(condition => `<li>${condition}</li>`).join('');
        }

        // Image à droite - utiliser le bon champ
        if (eventHeroImage) {
            const imageUrl = event.image || '/Assets/images/eventImage.png';
            eventHeroImage.style.backgroundImage = `url(${imageUrl})`;
        }

        // Bouton d'inscription
        if (joinButton) {
            // Pour l'instant pas d'info sur l'inscription dans les logs, on garde la logique par défaut
            joinButton.onclick = () => {
                handleEventRegistration(event.id, true);
            };
        }

        // Charger les événements similaires
        loadSimilarEvents();
    }

    // Fonction pour charger le nom de l'organisateur
    async function loadOrganizerName(organizerId) {
        try {
            console.log('Chargement de l\'organisateur avec ID:', organizerId);
            const organizer = await getUserById(organizerId);
            console.log('Organisateur récupéré:', organizer);
            
            const eventOrganizer = document.getElementById('event-organizer');
            if (eventOrganizer && organizer) {
                // Utiliser prénom + nom ou pseudo ou nom complet selon ce qui est disponible
                const organizerName = getOrganizerDisplayName(organizer);
                eventOrganizer.textContent = organizerName;
            }
        } catch (error) {
            console.error('Erreur lors du chargement de l\'organisateur:', error);
            const eventOrganizer = document.getElementById('event-organizer');
            if (eventOrganizer) {
                eventOrganizer.textContent = 'Organisateur inconnu';
            }
        }
    }

    // Fonction pour déterminer le nom d'affichage de l'organisateur
    function getOrganizerDisplayName(organizer) {
        // Vérifier les champs possibles (selon la structure de la table utilisateurs)
        if (organizer.prenom && organizer.nom) {
            return `${organizer.prenom} ${organizer.nom}`;
        } else if (organizer.pseudo || organizer.username) {
            return organizer.pseudo || organizer.username;
        } else if (organizer.nom_complet || organizer.full_name) {
            return organizer.nom_complet || organizer.full_name;
        } else if (organizer.nom) {
            return organizer.nom;
        } else if (organizer.prenom) {
            return organizer.prenom;
        } else {
            return 'Organisateur';
        }
    }

    // Fonction pour obtenir des conditions par défaut selon le type d'événement
    function getDefaultConditions(eventType) {
        const conditionsByType = {
            'concert': ['+18 ans requis', 'Pièce d\'identité obligatoire', 'Alcool interdit à l\'entrée'],
            'conference': ['Inscription préalable requise', 'Arrivée 15 min avant le début', 'Silence pendant la présentation'],
            'sport': ['Équipement personnel requis', 'Assurance responsabilité civile', 'Condition physique appropriée'],
            'social': ['Respect des autres participants', 'Ponctualité appréciée', 'Bonne humeur obligatoire'],
            'default': ['Inscription requise', 'Annulation 24h avant', 'Respect du lieu et des participants']
        };
        
        return conditionsByType[eventType] || conditionsByType['default'];
    }

    // Fonction pour gérer l'inscription/désinscription
    async function handleEventRegistration(eventId, subscribe) {
        try {
            console.log(`${subscribe ? 'Inscription' : 'Désinscription'} à l'événement ${eventId}`);
            // TODO: Implémenter l'API d'inscription
            // await subscribeToEvent(eventId, subscribe);
            
            // Pour l'instant, on simule juste le changement d'état
            const joinButton = document.getElementById('join-event-btn');
            if (joinButton) {
                if (subscribe) {
                    joinButton.textContent = 'Se désinscrire';
                    joinButton.classList.add('joined');
                } else {
                    joinButton.textContent = 'S\'inscrire à l\'événement';
                    joinButton.classList.remove('joined');
                }
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
        }
    }

    function formatDateWithTime(dateString) {
        if (!dateString) return 'Date non précisée';
        const date = new Date(dateString);
        const dateFormatted = date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const timeFormatted = date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        return `${dateFormatted} - ${timeFormatted}`;
    }

    async function loadSimilarEvents() {
        const similarEventsContainer = document.getElementById('similar-events');
        if (similarEventsContainer) {
            try {
                const allEvents = await getAllEvents();
                const otherEvents = allEvents.filter(e => e.id != eventId).slice(0, 2);
                
                similarEventsContainer.innerHTML = '';
                otherEvents.forEach(event => {
                    const eventCard = document.createElement('div');
                    eventCard.className = 'similar-event-card';
                    
                    // Utiliser les VRAIS champs de la BDD
                    const eventName = event.nom || 'Événement sans nom';
                    const eventDate = formatSimpleDate(event.date) || 'Date à définir';
                    const eventLocation = event.adresse || 'Lieu à définir';
                    const eventDescription = truncateText(event.description_courte || event.description_longue || 'Description à venir', 80);
                    const eventPrice = event.prix || 0;
                    const eventImage = event.image || '/Assets/images/eventImage.png';
                    
                    eventCard.innerHTML = `
                        <div class="similar-event-image" style="background-image: url(${eventImage})"></div>
                        <div class="similar-event-content">
                            <h4>${eventName}</h4>
                            <div class="similar-event-date">${eventDate}</div>
                            <div class="similar-event-location">${eventLocation}</div>
                            <div class="similar-event-description">${eventDescription}</div>
                            <div class="similar-event-price">${eventPrice > 0 ? eventPrice + '€' : 'Gratuit'}</div>
                        </div>
                    `;
                    eventCard.onclick = () => window.router.navigate(`/evenements/${event.id}`);
                    similarEventsContainer.appendChild(eventCard);
                });
                
                if (otherEvents.length === 0) {
                    similarEventsContainer.innerHTML = '<p style="color: white; text-align: center; padding: 2rem;">Aucun autre événement disponible pour le moment.</p>';
                }
            } catch (error) {
                console.error('Erreur lors du chargement des événements similaires:', error);
                if (similarEventsContainer) {
                    similarEventsContainer.innerHTML = '<p style="color: white; text-align: center; padding: 2rem;">Erreur lors du chargement des événements similaires.</p>';
                }
            }
        }
    }

    function formatSimpleDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    function truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    function formatDate(dateString) {
        if (!dateString) return 'Date non précisée';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}
