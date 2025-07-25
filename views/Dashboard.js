import { authService } from "../Services/authService.js";
import VerticalCard from '../components/VerticalCard.js';
import { getUserEvents } from '../Services/eventCreationService.js';
import { getCommunautesByReferent, getCommunauteMemberCount } from '../Models/communauteModel.js';
import { client } from '../supabase.js';

const Dashboard = async function () {
  if (!authService.isLoggedIn() && !authService.checkLocalAuth()) {
    window.location.pathname = '/connexion';
    return null;
  }

  const user = authService.getUser();
  const userName = user?.prenom || "Utilisateur";
  const userId = user?.id;

  const userEvents = await getUserEvents(userId);
  const userCommunautes = await getCommunautesByReferent(userId);

  const switchTab = (tabName) => {
    const tabs = document.querySelectorAll('.account-tab');
    const links = document.querySelectorAll('.account-nav-link');

    tabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.getAttribute('data-tab-content') === tabName) {
        tab.classList.add('active');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-tab') === tabName) {
        link.classList.add('active');
      }
    });
  };

  const createEventCard = (event) => {
    const date = new Date(event.date);
    const formattedDate = formatDate(date);
    const formattedTime = formatEventTime(date);

    let locationLine = '';
    if (event.lieu) {
      locationLine = event.lieu;
    }
    if (event.adresse) {
      locationLine += locationLine ? ` - ${event.adresse}` : event.adresse;
    }

    const participantsCount = event.nombre_places - (event.nombre_places_disponibles || 0);
    const participantsText = `${participantsCount} / ${event.nombre_places} participants`;

    return {
      tag: "div",
      attributes: [["class", "event-card"]],
      children: [
        {
          tag: "div",
          attributes: [["class", "event-card-image"]],
          children: [
            {
              tag: "img",
              attributes: [
                ["src", event.image || '/Assets/images/banner-femme.webp'],
                ["alt", event.nom]
              ]
            }
          ]
        },
        {
          tag: "div",
          attributes: [["class", "event-card-content"]],
          children: [
            {
              tag: "div",
              attributes: [["class", "event-card-info"]],
              children: [
                {
                  tag: "h3",
                  attributes: [["class", "event-title"]],
                  children: [event.nom]
                },
                {
                  tag: "p",
                  attributes: [["class", "event-date-time highlight"]],
                  children: [`${formattedDate} à ${formattedTime}`]
                },
                ...(locationLine ? [{
                  tag: "p",
                  attributes: [["class", "event-location highlight"]],
                  children: [locationLine]
                }] : []),
                {
                  tag: "p",
                  attributes: [["class", "event-description"]],
                  children: [event.description_courte || 'Aucune description courte disponible']
                }
              ]
            },
            {
              tag: "p",
              attributes: [["class", "event-price h2"]],
              children: [participantsText]
            },
            {
              tag: "div",
              attributes: [["class", "card-actions"]],
              children: [
                {
                  tag: "button",
                  attributes: [["class", "bouton-secondary-2"]],
                  events: {
                    click: [
                      function () {
                        window.location.href = `/modifier-evenement/${event.id}`;
                      }
                    ]
                  },
                  children: ["Modifier"]
                },
                {
                  tag: "button",
                  attributes: [["class", "bouton-danger"]],
                  events: {
                    click: [
                      async function () {
                        if (confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
                          try {
                            const { error } = await client
                              .from('evenements')
                              .delete()
                              .eq('id', event.id);
                            if (error) throw error;
                            window.location.reload();
                          } catch (error) {
                            console.error('Erreur lors de la suppression:', error);
                            alert('Erreur lors de la suppression de l\'événement');
                          }
                        }
                      }
                    ]
                  },
                  children: ["Supprimer"]
                }
              ]
            }
          ]
        }
      ]
    };
  };

  const createCommunauteCard = async (communaute) => {
    let memberCount = 0;
    try {
      memberCount = await getCommunauteMemberCount(communaute.id);
    } catch (error) {
      console.error('Erreur lors du chargement du nombre de membres:', error);
    }

    const date = communaute.date_creation ? new Date(communaute.date_creation) : null;
    const formattedDate = date ? formatDate(date) : '';

    const memberText = memberCount === 0 ? 'Aucun membre' :
      memberCount === 1 ? '1 membre' :
        `${memberCount} membres`;

    return {
      tag: "div",
      attributes: [["class", "event-card"]],
      children: [
        {
          tag: "div",
          attributes: [["class", "event-card-image"]],
          children: [
            {
              tag: "img",
              attributes: [
                ["src", communaute.image || '/Assets/images/banner-femme.webp'],
                ["alt", communaute.nom]
              ]
            }
          ]
        },
        {
          tag: "div",
          attributes: [["class", "event-card-content"]],
          children: [
            {
              tag: "div",
              attributes: [["class", "event-card-info"]],
              children: [
                {
                  tag: "h3",
                  attributes: [["class", "event-title"]],
                  children: [communaute.nom || 'Communauté sans nom']
                },
                ...(formattedDate ? [{
                  tag: "p",
                  attributes: [["class", "event-date-time highlight"]],
                  children: [`Créée le ${formattedDate}`]
                }] : []),
                ...(communaute.lieu ? [{
                  tag: "p",
                  attributes: [["class", "event-location highlight"]],
                  children: [communaute.lieu]
                }] : []),
                {
                  tag: "p",
                  attributes: [["class", "event-description"]],
                  children: [communaute.description || 'Aucune description disponible']
                }
              ]
            },
            {
              tag: "p",
              attributes: [["class", "event-price h2"]],
              children: [memberText]
            },
            {
              tag: "div",
              attributes: [["class", "card-actions"]],
              children: [
                {
                  tag: "button",
                  attributes: [["class", "bouton-secondary-2"]],
                  events: {
                    click: [
                      function () {
                        window.location.href = `/modifier-communaute/${communaute.id}`;
                      }
                    ]
                  },
                  children: ["Modifier"]
                },
                {
                  tag: "button",
                  attributes: [["class", "bouton-danger"]],
                  events: {
                    click: [
                      async function () {
                        if (confirm("Êtes-vous sûr de vouloir supprimer cette communauté ?")) {
                          try {
                            // Supprimer d'abord les membres de la communauté
                            const { error: membersError } = await client
                              .from('communaute_membres')
                              .delete()
                              .eq('communaute_id', communaute.id);

                            if (membersError) throw membersError;

                            // Ensuite supprimer la communauté
                            const { error: communauteError } = await client
                              .from('communautes')
                              .delete()
                              .eq('id', communaute.id);

                            if (communauteError) throw communauteError;

                            window.location.reload();
                          } catch (error) {
                            console.error('Erreur lors de la suppression:', error);
                            alert('Erreur lors de la suppression de la communauté');
                          }
                        }
                      }
                    ]
                  },
                  children: ["Supprimer"]
                }
              ]
            }
          ]
        }
      ]
    };
  };

  const createCommunauteCards = async () => {
    const cards = [];
    for (const communaute of userCommunautes) {
      const card = await createCommunauteCard(communaute);
      cards.push(card);
    }
    return cards;
  };

  const communauteCards = await createCommunauteCards();

  return {
    tag: "div",
    attributes: [["class", "account-page"]],
    children: [
      {
        tag: "aside",
        attributes: [["class", "account-sidebar"]],
        children: [
          {
            tag: "h1",
            attributes: [["class", "h2"]],
            children: ["Dashboard"]
          },
          {
            tag: "nav",
            attributes: [["class", "account-nav"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "account-nav-links"]],
                children: [
                  {
                    tag: "a",
                    attributes: [
                      ["href", "#"],
                      ["class", "account-nav-link active"],
                      ["data-tab", "evenements"]
                    ],
                    events: {
                      click: [
                        function (event) {
                          event.preventDefault();
                          switchTab('evenements');
                        }
                      ]
                    },
                    children: ["Gestion des Événements"]
                  },
                  {
                    tag: "a",
                    attributes: [
                      ["href", "#"],
                      ["class", "account-nav-link"],
                      ["data-tab", "communautes"]
                    ],
                    events: {
                      click: [
                        function (event) {
                          event.preventDefault();
                          switchTab('communautes');
                        }
                      ]
                    },
                    children: ["Gestion des Communautés"]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        tag: "main",
        attributes: [["class", "account-content"]],
        children: [
          {
            tag: "div",
            attributes: [
              ["class", "account-tab active"],
              ["data-tab-content", "evenements"]
            ],
            children: [
              {
                tag: "div",
                attributes: [["class", "section-header"]],
                children: [
                  {
                    tag: "h2",
                    attributes: [["class", "h2"]],
                    children: ["Gestion des Événements"]
                  },
                ]
              },
              {
                tag: "div",
                attributes: [["class", "user-communautes-grid"]],
                children: userEvents.length > 0 ? userEvents.map(event => createEventCard(event)) : [
                  {
                    tag: "p",
                    children: ["Aucun événement créé pour le moment."]
                  }
                ]
              }
            ]
          },
          {
            tag: "div",
            attributes: [
              ["class", "account-tab"],
              ["data-tab-content", "communautes"]
            ],
            children: [
              {
                tag: "div",
                attributes: [["class", "section-header"]],
                children: [
                  {
                    tag: "h2",
                    attributes: [["class", "h2"]],
                    children: ["Gestion des Communautés"]
                  },
                ]
              },
              {
                tag: "div",
                attributes: [["class", "user-communautes-grid"]],
                children: communauteCards.length > 0 ? communauteCards : [
                  {
                    tag: "p",
                    children: ["Aucune communauté créée pour le moment."]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
};

function formatDate(date) {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  return date.toLocaleDateString('fr-FR', options);
}

function formatEventTime(date) {
  const options = {
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleTimeString('fr-FR', options);
}

export default Dashboard;