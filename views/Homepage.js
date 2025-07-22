import { getPopularEvents, getRecentEventsWithParticipants } from '../Services/eventParticipationService.js';

export default async function Homepage() {
  const result = {
    tag: "div",
    attributes: [["class", "homepage-page"]],
    children: [
      {
        tag: "div",
        attributes: [["class", "container"]],
        children: [
          {
            tag: "section",
            attributes: [["class", "homepage-header"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "homepage-header-content"]],
                children: [
                  {
                    tag: "div",
                    children: [
                      {
                        tag: "h1",
                        attributes: [["class", "h1-big"]],
                        children: [
                          "Faites vivre vos ",
                          {
                            tag: "span",
                            attributes: [["class", "gradient-fonce"]],
                            children: ["idées"]
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
            tag: "div",
            attributes: [["class", "apropos-image-section"]],
            children: [
              {
                tag: "img",
                attributes: [
                  ["src", "../Assets/images/header-personne-plage.webp"],
                  ["alt", "Personne sur la plage"],
                  ["class", "apropos-full-image"]
                ]
              }
            ]
          },
          {
            tag: "section",
            attributes: [["class", "latest-events-section"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "text-container"]],
                children: [
                  {
                    tag: "h2",
                    attributes: [["class", "h2-big"]],
                    children: [
                      "Événements les plus ",
                      {
                        tag: "span",
                        attributes: [["class", "gradient-fonce"]],
                        children: ["populaires"]
                      }
                    ]
                  },
                  {
                    tag: "p",
                    attributes: [["class", "p-text-latest-events"]],
                    children: ["Des rencontres inspirantes, des ateliers uniques, des moments à vivre ensemble. Voici les événements les plus attendus du moment; inscris toi avant qu’il ne soit trop tard !"]
                  },
                  {
                    tag: "div",
                    attributes: [["class", "similar-events-carousel"]],
                    children: [
                      {
                        tag: "div",
                        attributes: [["class", "similar-events-container"]],
                        children: [
                          {
                            tag: "div",
                            attributes: [["class", "similar-events-grid"], ["id", "latest-events"]],
                            children: []
                          }
                        ]
                      },
                      {
                        tag: "div",
                        attributes: [["class", "carousel-controls"]],
                        children: [
                          {
                            tag: "div",
                            attributes: [["class", "carousel-indicators"], ["id", "homepage-carousel-indicators"]],
                            children: []
                          },
                          {
                            tag: "div",
                            attributes: [["class", "carousel-nav-buttons"]],
                            children: [
                              {
                                tag: "button",
                                attributes: [["class", "carousel-nav-btn carousel-prev"], ["id", "homepage-carousel-prev"], ["aria-label", "Événements précédents"]],
                              },
                              {
                                tag: "button",
                                attributes: [["class", "carousel-nav-btn carousel-next"], ["id", "homepage-carousel-next"], ["aria-label", "Événements suivants"]],
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                  tag: "div",
                  attributes: [["class", "view-all-events-container"]],
                  children: [
                    {
                      tag: "a",
                      attributes: [
                        ["class", "bouton-primary-1"],
                        ["href", "/evenements"]
                      ],
                      children: ["Voir tous les événements"]
                    }
                  ]
                }
                ]
              }
            ]
          },
          {
              tag: "section",
              attributes: [["class", "banner-femme"]],
              children: [
                  {
                      tag: "img",
                      attributes: [["src", "../Assets/images/banner-femme.webp"]],
                  },
                  {
                      tag: "div",
                      attributes: [["class", "banner"]],
                      children: [
                          {
                              tag: "h2",
                              attributes: [["class", "h2"]],
                              children: ["Organise ton propre événement"],
                          },
                          {
                              tag: "p",
                              attributes: [["class", "p"]],
                              children: [
                                  "Une idée, un projet, une envie\u00A0? Crée ton événement et invite ta communauté en quelques clics",
                              ],
                          },
                          {
                              tag: "a",
                              attributes: [["class", "bouton-primary-1"], ["href", "/evenement/creer-evenement"]],
                              children: ["Je crée mon événement !"],
                          },
                      ],
                  },
              ],
          },
          {
            tag: "section",
            attributes: [["class", "latest-events-section bottom-events"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "text-container"]],
                children: [
                  {
                    tag: "h2",
                    attributes: [["class", "h2-big"]],
                    children: [
                      {
                        tag: "span",
                        attributes: [["class", "gradient-clair"]],
                        children: ["Derniers"]
                      },
                      " événements ajoutés"
                    ]
                  },
                  {
                    tag: "p",
                    attributes: [["class", "p-text-latest-events"]],
                    children: ["Ça bouge ici\u00A0! Ne manque pas les derniers événements ajoutés à la plateforme. Qu’il s’agisse d’ateliers, de rencontres ou d’activités originales, tu trouveras toujours quelque chose à rejoindre"]
                  },
                  {
                    tag: "div",
                    attributes: [["class", "similar-events-carousel"]],
                    children: [
                      {
                        tag: "div",
                        attributes: [["class", "similar-events-container"]],
                        children: [
                          {
                            tag: "div",
                            attributes: [["class", "similar-events-grid"], ["id", "bottom-events"]],
                            children: []
                          }
                        ]
                      },
                      {
                        tag: "div",
                        attributes: [["class", "carousel-controls"]],
                        children: [
                          {
                            tag: "div",
                            attributes: [["class", "carousel-indicators"], ["id", "bottom-carousel-indicators"]],
                            children: []
                          },
                          {
                            tag: "div",
                            attributes: [["class", "carousel-nav-buttons"]],
                            children: [
                              {
                                tag: "button",
                                attributes: [["class", "carousel-nav-btn carousel-prev"], ["id", "bottom-carousel-prev"], ["aria-label", "Événements précédents"]]
                              },
                              {
                                tag: "button",
                                attributes: [["class", "carousel-nav-btn carousel-next"], ["id", "bottom-carousel-next"], ["aria-label", "Événements suivants"]]
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
      }
    ]
  };

  setTimeout(() => {
    loadLatestEvents();
    loadBottomEvents();
  }, 0);

  return result;
};

async function loadLatestEvents() {
    const latestEventsContainer = document.getElementById('latest-events');
    if (!latestEventsContainer) return;
    
    try {
        const popularEvents = await getPopularEvents(8);
        
        if (popularEvents.length === 0) {
            latestEventsContainer.innerHTML = '<p style="color:white;text-align:center;padding:2rem;">Aucun événement populaire disponible pour le moment.</p>';
            return;
        }
        
        latestEventsContainer.innerHTML = '';
        popularEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            
            const description = event.description_courte || event.description_longue || 'Description à venir';
            const participantsCount = event.participants_count || 0;
            const participantsText = participantsCount <= 1 ? `${participantsCount} participant` : `${participantsCount} participants`;
            
            eventCard.innerHTML = `
                <div class="event-card-image">
                    <img src="${event.image || '/Assets/images/banner-femme.webp'}" alt="${event.nom}" />
                </div>
                <div class="event-card-content">
                    <div class="event-card-info">
                        <h3 class="event-title">${event.nom || 'Événement sans nom'}</h3>
                        <p class="event-date-time highlight">${formatSimpleDate(event.date)}</p>
                        <p class="event-location highlight">${event.adresse || 'Lieu à définir'}</p>
                        <p class="event-description">${truncateText(description, 80)}</p>
                    </div>
                    <p class="event-price h2">${participantsText}</p>
                    <p class="event-price h2">${event.prix ? event.prix + '€' : 'Gratuit'}</p>
                </div>
            `;
            eventCard.onclick = () => window.router.navigate(`/evenements/${event.id}`);
            latestEventsContainer.appendChild(eventCard);
        });
        
        initializeHomepageCarousel();
    } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
        latestEventsContainer.innerHTML = '<p style="color:white;text-align:center;padding:2rem;">Erreur lors du chargement des événements.</p>';
    }
}

async function loadBottomEvents() {
    const bottomEventsContainer = document.getElementById('bottom-events');
    if (!bottomEventsContainer) return;
    
    try {
        const recentEvents = await getRecentEventsWithParticipants(8);
        
        if (recentEvents.length === 0) {
            bottomEventsContainer.innerHTML = '<p style="color:white;text-align:center;padding:2rem;">Aucun événement récent disponible.</p>';
            return;
        }
        
        bottomEventsContainer.innerHTML = '';
        recentEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card event-card-bright-gray';
            
            const description = event.description_courte || event.description_longue || 'Description à venir';
            const participantsCount = event.participants_count || 0;
            const participantsText = participantsCount <= 1 ? `${participantsCount} participant` : `${participantsCount} participants`;
            
            eventCard.innerHTML = `
                <div class="event-card-image">
                    <img src="${event.image || '/Assets/images/banner-femme.webp'}" alt="${event.nom}" />
                </div>
                <div class="event-card-content">
                    <div class="event-card-info">
                        <h3 class="event-title">${event.nom || 'Événement sans nom'}</h3>
                        <p class="event-date-time highlight">${formatSimpleDate(event.date)}</p>
                        <p class="event-location highlight">${event.adresse || 'Lieu à définir'}</p>
                        <p class="event-description">${truncateText(description, 80)}</p>
                    </div>
                    <p class="event-price h2">${participantsText}</p>
                    <p class="event-price h2">${event.prix ? event.prix + '€' : 'Gratuit'}</p>
                </div>
            `;
            eventCard.onclick = () => window.router.navigate(`/evenements/${event.id}`);
            bottomEventsContainer.appendChild(eventCard);
        });
        
        initializeBottomCarousel();
    } catch (error) {
        console.error('Erreur lors du chargement des événements du bas:', error);
        bottomEventsContainer.innerHTML = '<p style="color:white;text-align:center;padding:2rem;">Erreur lors du chargement des événements.</p>';
    }
}

function initializeHomepageCarousel() {
    const container = document.getElementById('latest-events');
    const prevBtn = document.getElementById('homepage-carousel-prev');
    const nextBtn = document.getElementById('homepage-carousel-next');
    const indicatorsContainer = document.getElementById('homepage-carousel-indicators');
    
    if (!container || !prevBtn || !nextBtn) return;
    
    const cards = container.children;
    const cardsPerView = window.innerWidth <= 768 ? 1 : 2;
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
    
    window.addEventListener('resize', () => setTimeout(initializeHomepageCarousel, 100));
}

function initializeBottomCarousel() {
    const container = document.getElementById('bottom-events');
    const prevBtn = document.getElementById('bottom-carousel-prev');
    const nextBtn = document.getElementById('bottom-carousel-next');
    const indicatorsContainer = document.getElementById('bottom-carousel-indicators');
    
    if (!container || !prevBtn || !nextBtn) return;
    
    const cards = container.children;
    const cardsPerView = window.innerWidth <= 768 ? 1 : 2;
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
    
    window.addEventListener('resize', () => setTimeout(initializeBottomCarousel, 100));
}

function truncateText(text, maxLength) {
    return text && text.length > maxLength ? text.substring(0, maxLength) + '...' : text || '';
}

function formatSimpleDate(dateString) {
    return dateString ? new Date(dateString).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'}) : 'Date à définir';
}