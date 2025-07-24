import { getPopularEvents, getRecentEventsWithParticipants } from '../Services/eventParticipationService.js';
import { getAllCommunautesWithMemberCount } from '../Models/communauteModel.js';
import { CarouselCard } from '../components/CarouselCard.js';
import { CommunityCarouselCard } from '../components/CommunityCarouselCard.js';
import generateStructure from '../lib/generateStructure.js';
// Chargement du carousel des communautés
async function loadCommunityCarousel() {
    const communityContainer = document.getElementById('community-carousel');
    if (!communityContainer) return;
    try {
        const communautes = await getAllCommunautesWithMemberCount();
        if (!communautes || communautes.length === 0) {
            communityContainer.innerHTML = '<p style="color:white;text-align:center;padding:2rem;">Aucune communauté disponible.</p>';
            return;
        }
        communityContainer.innerHTML = '';
        for (let i = 0; i < communautes.length; i++) {
            const c = communautes[i];
            const cardStructure = CommunityCarouselCard({
                id: c.id,
                nom: c.nom || 'Communauté',
                description: c.description || 'Description à venir',
                image: c.image || '/Assets/images/logo-meetup-connect.webp',
                member_count: c.member_count || 0,
                variant: 'dark',
                lieu: c.lieu || 'Lieu à définir'
            });
            const cardElement = await generateStructure(cardStructure);
            cardElement.addEventListener('click', () => {
                window.router.navigate(`/communautes/${c.id}`);
            });
            communityContainer.appendChild(cardElement);
        }
        initializeCommunityCarousel();
    } catch (error) {
        console.error('Erreur lors du chargement des communautés:', error);
        communityContainer.innerHTML = '<p style="color:white;text-align:center;padding:2rem;">Erreur lors du chargement des communautés.</p>';
    }
}

function initializeCommunityCarousel() {
    const container = document.getElementById('community-carousel');
    const prevBtn = document.getElementById('community-carousel-prev');
    const nextBtn = document.getElementById('community-carousel-next');
    const indicatorsContainer = document.getElementById('community-carousel-indicators');
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
        const remOffset = currentSlide * 2;
        container.style.transform = `translateX(calc(${translateX}px - ${remOffset}rem))`;
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
    window.addEventListener('resize', () => setTimeout(initializeCommunityCarousel, 100));
}

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
                        ["class", "bouton-primary-4"],
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
                              tag: "p",
                              attributes: [["class", "p-samll"]],
                              children: [
                                  "Une idée, un projet, une envie\u00A0?",
                              ],
                          },
                          {
                              tag: "h2",
                              attributes: [["class", "h2-footer"]],
                              children: ["Organise ton propre événement"],
                          },
                          {
                              tag: "a",
                              attributes: [["class", "bouton-primary-4"], ["href", "/evenement/creer-evenement"]],
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
          },
          {
            tag: "section",
            attributes: [["class", "homepage-communautes container-small"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "homepage-bento"]],
                children: [
                  {
                    tag: "div",
                    attributes: [["class", "bento-left bento-users"]],
                    children: [
                      {
                        tag: "img",
                        attributes: [
                          ["src", "../Assets/images/svg/planet-bottom-left.svg"],
                          ["alt", ""],
                          ["class", "planet-bottom-left"]
                        ]
                      },
                      {
                        tag: "img",
                        attributes: [
                          ["src", "../Assets/images/svg/planet-top-right.svg"],
                          ["alt", ""],
                          ["class", "planet-top-right"]
                        ]
                      },
                      {
                        tag: "p",
                        attributes: [["class", "h1-big"]],
                        children: ["+\u00A01.5k"]
                      },
                      {
                        tag: "p",
                        attributes: [["class", "h2"]],
                        children: ["communautés actives !"]
                      }
                    ]
                  },
                  {
                    tag: "div",
                    attributes: [["class", "bento-right"]],
                    children: [
                      {
                        tag: "div",
                        attributes: [["class", "bento-right-top"]],
                        children: [
                          {
                            tag: "p",
                            attributes: [["class", "h1-big"]],
                            children: ["352"]
                          },
                          {
                            tag: "p",
                            attributes: [["class", "h2"]],
                            children: ["évènements en cours !"]
                          }
                        ]
                      },
                      {
                        tag: "div",
                        attributes: [["class", "bento-right-middle"]],
                        children: [
                          {
                            tag: "div",
                            attributes: [["class", "bento-events"]],
                            children: [
                              {
                                tag: "p",
                                attributes: [["class", "h1"]],
                                children: ["+\u00A0140"]
                              },
                              {
                                tag: "p",
                                attributes: [["class", "h3"]],
                                children: ["communautés"]
                              }
                            ]
                          },
                          {
                            tag: "div",
                            attributes: [["class", "bento-disponible"]],
                            children: [
                              {
                                tag: "p",
                                attributes: [["class", "h3"]],
                                children: ["disponible"]
                              },
                              {
                                tag: "p",
                                attributes: [["class", "h1"]],
                                children: ["24h/24"]
                              }
                            ]
                          },
                          {
                            tag: "div",
                            attributes: [["class", "bento-logo"]],
                            children: [
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/svg/logo-icon.svg"],
                                  ["alt", "Star"]
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        tag: "div",
                        attributes: [["class", "bento-right-bottom"]],
                        children: [
                          {
                            tag: "div",
                            attributes: [["class", "bento-stars"]],
                            children: [
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/icons/icons-star-full.svg"],
                                  ["alt", "Star"]
                                ]
                              },
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/icons/icons-star-full.svg"],
                                  ["alt", "Star"]
                                ]
                              },
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/icons/icons-star-full.svg"],
                                  ["alt", "Star"]
                                ]
                              },
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/icons/icons-star-full.svg"],
                                  ["alt", "Star"]
                                ]
                              },
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/icons/icons-star-mid.svg"],
                                  ["alt", "Star"]
                                ]
                              }
                            ]
                          },
                          {
                            tag: "div",
                            attributes: [["class", "bento-events"]],
                            children: [
                              {
                                tag: "p",
                                attributes: [["class", "h1"]],
                                children: ["~\u00A05"]
                              },
                              {
                                tag: "p",
                                attributes: [["class", "h3"]],
                                children: ["nouveaux évènements par jour"]
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
            tag: "section",
            attributes: [["class", "apropos-simplicite"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "container-small"]],
                children: [
                  {
                    tag: "h2",
                    attributes: [["class", "h2-big simplicite-title"]],
                    children: [
                      {
                        tag: "span",
                        attributes: [["class", "gradient-fonce"]],
                        children: ["Meetup Connect"]
                      },
                      ", comment ça fonctionne ?"
                    ]
                  },
                  {
                    tag: "div",
                    attributes: [["class", "etapes-container"]],
                    children: [
                      {
                        tag: "div",
                        attributes: [["class", "etape etape-1"]],
                        children: [
                          {
                            tag: "div",
                            attributes: [["class", "etape-content"]],
                            children: [
                              {
                                tag: "h3",
                                attributes: [["class", "h1"]],
                                children: ["Inscris-toi"]
                              },
                              {
                                tag: "p",
                                children: ["Crée ton compte gratuitement en quelques secondes seulement !"]
                              },
                              {
                                tag: "a",
                                attributes: [["class", "bouton-primary-1"], ["href", "/inscription"]],
                                children: ["Je m'inscris"]
                              }
                            ]
                          },
                          {
                            tag: "div",
                            attributes: [["class", "etape-image"]],
                            children: [
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/inscription-rapide.webp"],
                                  ["alt", "Inscription rapide et gratuite"]
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        tag: "div",
                        attributes: [["class", "etape etape-2"]],
                        children: [
                          {
                            tag: "div",
                            attributes: [["class", "etape-content"]],
                            children: [
                              {
                                tag: "h3",
                                attributes: [["class", "h1"]],
                                children: ["Explore"]
                              },
                              {
                                tag: "p",
                                children: ["Découvre les communautés et événements qui te ressemblent"]
                              },
                              {
                                tag: "a",
                                attributes: [["class", "bouton-primary-1"], ["href", "/evenement/creer-evenement"]],
                                children: ["Créer mon événement"]
                              }
                            ]
                          },
                          {
                            tag: "div",
                            attributes: [["class", "etape-image"]],
                            children: [
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/creation-evenement.webp"],
                                  ["alt", "Création d'événement en quelques clics"]
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        tag: "div",
                        attributes: [["class", "etape etape-3"]],
                        children: [
                          {
                            tag: "div",
                            attributes: [["class", "etape-content"]],
                            children: [
                              {
                                tag: "h3",
                                attributes: [["class", "h1"]],
                                children: ["Participe"]
                              },
                              {
                                tag: "p",
                                children: ["Rejoins un événement ou crée le tien en toute simplicité !"]
                              },
                              {
                                tag: "a",
                                attributes: [["class", "bouton-primary-1"], ["href", "/evenements"]],
                                children: ["Je commence !"]
                              }
                            ]
                          },
                          {
                            tag: "div",
                            attributes: [["class", "etape-image"]],
                            children: [
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/exploration-intuitive.webp"],
                                  ["alt", "Exploration intuitive des communautés et événements"]
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        tag: "div",
                        attributes: [["class", "etape etape-4"]],
                        children: [
                          {
                            tag: "div",
                            attributes: [["class", "etape-content"]],
                            children: [
                              {
                                tag: "h3",
                                attributes: [["class", "h1"]],
                                children: ["Ne rate rien"]
                              },
                              {
                                tag: "p",
                                children: ["Active les notifications pour rester informé en temps réel !"]
                              },
                              {
                                tag: "button",
                                attributes: [["class", "bouton-primary-1"]],
                                children: ["Activer les notifications"]
                              }
                            ]
                          },
                          {
                            tag: "div",
                            attributes: [["class", "etape-image"]],
                            children: [
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/notification-temps-reel.webp"],
                                  ["alt", "Notifications en temps réel pour ne rien rater"]
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
            tag: "section",
            attributes: [["class", "latest-events-section community-carousel-section"]],
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
                        attributes: [["class", "gradient-fonce"]],
                        children: ["Communautés"]
                      },
                      " les plus populaires du moment !"
                    ]
                  },
                  {
                    tag: "p",
                    attributes: [["class", "p-text-latest-events"]],
                    children: ["Ces communautés comptent parmi les plus actives du moment. Membres engagés, événements réguliers et belle ambiance au rendez-vous !"]
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
                            attributes: [["class", "similar-events-grid"], ["id", "community-carousel"]],
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
                            attributes: [["class", "carousel-indicators"], ["id", "community-carousel-indicators"]],
                            children: []
                          },
                          {
                            tag: "div",
                            attributes: [["class", "carousel-nav-buttons"]],
                            children: [
                              {
                                tag: "button",
                                attributes: [["class", "carousel-nav-btn carousel-prev"], ["id", "community-carousel-prev"], ["aria-label", "Communautés précédentes"]]
                              },
                              {
                                tag: "button",
                                attributes: [["class", "carousel-nav-btn carousel-next"], ["id", "community-carousel-next"], ["aria-label", "Communautés suivantes"]]
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
                              tag: "p",
                              attributes: [["class", "p-samll"]],
                              children: [
                                  "Rassemble les bonnes personnes",
                              ],
                          },
                          {
                              tag: "h2",
                              attributes: [["class", "h2-footer"]],
                              children: ["Fais vivre tes idées en créant ta communauté !"],
                          },
                          {
                              tag: "a",
                              attributes: [["class", "bouton-primary-4"], ["href", "/compte"]],
                              children: ["Je crée ma communauté !"],
                          },
                      ],
                  },
              ],
          }
        ]
      }
    ]
  };

  setTimeout(() => {
    loadLatestEvents();
    loadBottomEvents();
    loadCommunityCarousel();
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
        
        for (let i = 0; i < popularEvents.length; i++) {
            const event = popularEvents[i];
            const eventData = {
                id: event.id,
                title: event.nom || 'Événement sans nom',
                description: event.description_courte || event.description_longue || 'Description à venir',
                image: event.image || '/Assets/images/eventImage.png',
                date: event.date,
                time: event.heure || '20:00',
                location: event.adresse || 'Lieu à définir',
                price: event.prix || 0,
                showPrice: true,
                variant: 'dark'
            };
            
            const cardStructure = CarouselCard(eventData);
            
            const cardElement = await generateStructure(cardStructure);
            
            cardElement.addEventListener('click', () => {
                window.router.navigate(`/evenements/${event.id}`);
            });
            
            latestEventsContainer.appendChild(cardElement);
        }
        
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
        
        for (let i = 0; i < recentEvents.length; i++) {
            const event = recentEvents[i];
            const eventData = {
                id: event.id,
                title: event.nom || 'Événement sans nom',
                description: event.description_courte || event.description_longue || 'Description à venir',
                image: event.image || '/Assets/images/eventImage.png',
                date: event.date,
                time: event.heure || '20:00',
                location: event.adresse || 'Lieu à définir',
                price: event.prix || 0,
                showPrice: true,
                variant: 'light'
            };
            
            const cardStructure = CarouselCard(eventData);
            
            const cardElement = await generateStructure(cardStructure);
            
            cardElement.addEventListener('click', () => {
                window.router.navigate(`/evenements/${event.id}`);
            });
            
            bottomEventsContainer.appendChild(cardElement);
        }
        
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
        const remOffset = currentSlide * 2;
        container.style.transform = `translateX(calc(${translateX}px - ${remOffset}rem))`;
        
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
        const remOffset = currentSlide * 2; // 2rem pour chaque slide
        container.style.transform = `translateX(calc(${translateX}px - ${remOffset}rem))`;
        
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