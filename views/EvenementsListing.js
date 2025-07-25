import { getUpcomingEvents } from '../Services/eventService.js';
import { CarouselCard } from '../components/CarouselCard.js';

let eventsData = [];

const EvenementsListing = function () {
  setTimeout(() => loadEvents());
  
  return {
    tag: "div",
    attributes: [["class", "evenements-page"]],
    children: [
      {
        tag: "div",
        attributes: [["class", "evenements-header"]],
        children: [
          {
            tag: "h1",
            attributes: [["class", "h1"]],
            children: ["Tous nos ", {
              tag: "span",
              attributes: [["class", "gradient-fonce"]],
              children: ["événements"]
            }],
          }
        ]
      },
      {
        tag: "div",
        attributes: [["class", "evenements-content"]],
        children: [
          {
            tag: "div",
            attributes: [["class", "evenements-filters"], ["id", "evenements-filters"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "filter-group"]],
                children: [
                  {
                    tag: "label",
                    attributes: [["for", "filter-location"]],
                    children: ["Localisation"]
                  },
                  {
                    tag: "select",
                    attributes: [["id", "filter-location"], ["class", "filter-select"]],
                    children: [
                      {
                        tag: "option",
                        attributes: [["value", ""]],
                        children: ["Tous les lieux"]
                      }
                    ]
                  }
                ]
              },
              {
                tag: "div",
                attributes: [["class", "filter-group"]],
                children: [
                  {
                    tag: "label",
                    attributes: [["for", "filter-date"]],
                    children: ["Date"]
                  },
                  {
                    tag: "select",
                    attributes: [["id", "filter-date"], ["class", "filter-select"]],
                    children: [
                      {
                        tag: "option",
                        attributes: [["value", ""]],
                        children: ["Toutes les dates"]
                      },
                      {
                        tag: "option",
                        attributes: [["value", "today"]],
                        children: ["Aujourd'hui"]
                      },
                      {
                        tag: "option",
                        attributes: [["value", "tomorrow"]],
                        children: ["Demain"]
                      },
                      {
                        tag: "option",
                        attributes: [["value", "week"]],
                        children: ["Cette semaine"]
                      },
                      {
                        tag: "option",
                        attributes: [["value", "month"]],
                        children: ["Ce mois"]
                      }
                    ]
                  }
                ]
              },
              {
                tag: "div",
                attributes: [["class", "filter-group"]],
                children: [
                  {
                    tag: "label",
                    attributes: [["for", "filter-price"]],
                    children: ["Prix"]
                  },
                  {
                    tag: "select",
                    attributes: [["id", "filter-price"], ["class", "filter-select"]],
                    children: [
                      {
                        tag: "option",
                        attributes: [["value", ""]],
                        children: ["Tous les prix"]
                      },
                      {
                        tag: "option",
                        attributes: [["value", "free"]],
                        children: ["Gratuit"]
                      },
                      {
                        tag: "option",
                        attributes: [["value", "paid"]],
                        children: ["Payant"]
                      }
                    ]
                  }
                ]
              },
              {
                tag: "div",
                attributes: [["class", "filter-group"]],
                children: [
                  {
                    tag: "label",
                    attributes: [["for", "filter-category"]],
                    children: ["Catégorie"]
                  },
                  {
                    tag: "select",
                    attributes: [["id", "filter-category"], ["class", "filter-select"]],
                    children: [
                      {
                        tag: "option",
                        attributes: [["value", ""]],
                        children: ["Toutes les catégories"]
                      }
                    ]
                  }
                ]
              },
              {
                tag: "div",
                attributes: [["class", "filter-actions"]],
                children: [
                  {
                    tag: "button",
                    attributes: [["id", "clear-filters"], ["class", "bouton-primary-2"]],
                    children: ["Effacer les filtres"]
                  }
                ]
              }
            ]
          },
          {
            tag: "div",
            attributes: [["class", "events-grid"], ["id", "events-grid"]],
            children: []
          }
        ]
      }
    ],
  };
};

async function loadEvents() {
  try {
    const loadingElement = document.getElementById('events-loading');
    const gridElement = document.getElementById('events-grid');
        
    eventsData = await getUpcomingEvents();
    
    populateLocationFilter(eventsData);
    populateCategoryFilter(eventsData);
    
    setupFilterEvents();
        
    displayEvents(eventsData, gridElement);
    
  } catch (error) {
    
    const loadingElement = document.getElementById('events-loading');
    if (loadingElement) {
      loadingElement.innerHTML = '<p>Erreur lors du chargement des événements</p>';
    }
  }
}

function populateLocationFilter(events) {
  const locationFilter = document.getElementById('filter-location');
  if (!locationFilter) return;
    
  const locations = [...new Set(events
    .map(event => event.adresse)
    .filter(adresse => adresse)
  )].sort();
    
  locations.forEach(location => {
    const option = document.createElement('option');
    option.value = location.toLowerCase();
    option.textContent = location;
    locationFilter.appendChild(option);
  });
}

function populateCategoryFilter(events) {
  const categoryFilter = document.getElementById('filter-category');
  if (!categoryFilter) return;
  
  const categories = [...new Set(events
    .map(event => event.categorie)
    .filter(categorie => categorie)
  )].sort();
    
  while (categoryFilter.children.length > 1) {
    categoryFilter.removeChild(categoryFilter.lastChild);
  }
  
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.toLowerCase();
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function setupFilterEvents() {
  const filterElements = [
    'filter-location',
    'filter-date', 
    'filter-price',
    'filter-category'
  ];
  
  filterElements.forEach(filterId => {
    const element = document.getElementById(filterId);
    if (element) {
      element.addEventListener('change', applyFilters);
    }
  });
  
  const clearButton = document.getElementById('clear-filters');
  if (clearButton) {
    clearButton.addEventListener('click', clearFilters);
  }
}

function applyFilters() {
  const locationFilter = document.getElementById('filter-location')?.value;
  const dateFilter = document.getElementById('filter-date')?.value;
  const priceFilter = document.getElementById('filter-price')?.value;
  const categoryFilter = document.getElementById('filter-category')?.value;
  
  let filteredEvents = [...eventsData];
  
  if (locationFilter) {
    filteredEvents = filteredEvents.filter(event => {
      return event.adresse && event.adresse.toLowerCase().includes(locationFilter);
    });
  }
  
  if (dateFilter) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    filteredEvents = filteredEvents.filter(event => {
      const eventDate = new Date(event.date);
      const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
      
      switch (dateFilter) {
        case 'today':
          return eventDay.getTime() === today.getTime();
        case 'tomorrow':
          return eventDay.getTime() === tomorrow.getTime();
        case 'week':
          return eventDate >= today && eventDate <= weekEnd;
        case 'month':
          return eventDate >= today && eventDate <= monthEnd;
        default:
          return true;
      }
    });
  }
  
  if (priceFilter) {
    filteredEvents = filteredEvents.filter(event => {
      const price = parseFloat(event.prix) || 0;
      switch (priceFilter) {
        case 'free':
          return price === 0;
        case 'paid':
          return price > 0;
        default:
          return true;
      }
    });
  }
  
  if (categoryFilter) {
    filteredEvents = filteredEvents.filter(event => {
      return event.categorie && event.categorie.toLowerCase() === categoryFilter;
    });
  }
  
  const gridElement = document.getElementById('events-grid');
  displayEvents(filteredEvents, gridElement);
}

function clearFilters() {
  const filterElements = [
    'filter-location',
    'filter-date', 
    'filter-price',
    'filter-category'
  ];
  
  filterElements.forEach(filterId => {
    const element = document.getElementById(filterId);
    if (element) {
      element.value = '';
    }
  });
  
  const gridElement = document.getElementById('events-grid');
  displayEvents(eventsData, gridElement);
}

function displayEvents(events, container) {
  if (!container) return;
  container.innerHTML = '';
  if (events.length === 0) {
    container.innerHTML = '<div class="no-events"><p>Aucun événement à venir pour le moment.</p></div>';
    return;
  }
  events.forEach(event => {
    const cardVNode = CarouselCard({
      id: event.id,
      title: event.nom,
      description: event.description_courte || event.description_longue || '',
      image: event.image,
      date: event.date,
      time: formatEventTime(new Date(event.date)),
      location: (event.lieu ? event.lieu : '') + (event.adresse ? (event.lieu ? ' - ' : '') + event.adresse : ''),
      price: event.prix,
      showPrice: true,
      variant: 'dark'
    });
    const card = renderVNode(cardVNode);
    card.addEventListener('click', () => {
      window.location.pathname = `/evenements/${event.id}`;
    });
    container.appendChild(card);
  });
}

function renderVNode(vnode) {
  if (typeof vnode === 'string') return document.createTextNode(vnode);
  const el = document.createElement(vnode.tag);
  if (vnode.attributes) {
    vnode.attributes.forEach(([key, value]) => el.setAttribute(key, value));
  }
  if (vnode.children) {
    vnode.children.forEach(child => el.appendChild(renderVNode(child)));
  }
  return el;
}

function formatEventTime(date) {
  const options = { 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return date.toLocaleTimeString('fr-FR', options);
}

export default EvenementsListing;