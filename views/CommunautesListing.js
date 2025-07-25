import { getAllCommunautesWithMemberCount } from '../Models/communauteModel.js';
import { CommunityCarouselCard } from '../components/CommunityCarouselCard.js';

let communautesData = [];

const CommunautesListing = function () {
  setTimeout(() => loadCommunautes());
  
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
            children: ["Toutes nos ", {
              tag: "span",
              attributes: [["class", "gradient-fonce"]],
              children: ["communautés"]
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
            attributes: [["class", "evenements-filters"], ["id", "communautes-filters"]],
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
            attributes: [["class", "events-grid"], ["id", "communautes-grid"]],
            children: []
          }
        ]
      }
    ],
  };
};

async function loadCommunautes() {
  try {
    const loadingElement = document.getElementById('communautes-loading');
    const gridElement = document.getElementById('communautes-grid');
        
    const allCommunautes = await getAllCommunautesWithMemberCount();
    communautesData = allCommunautes;
    
    populateLocationFilter(communautesData);
    
    setupFilterEvents();
        
    displayCommunautes(communautesData, gridElement);
    
  } catch (error) {
    console.error('Erreur lors du chargement des communautés:', error);
    const loadingElement = document.getElementById('communautes-loading');
    if (loadingElement) {
      loadingElement.innerHTML = '<p>Erreur lors du chargement des communautés</p>';
    }
  }
}


function populateLocationFilter(communautes) {
  const locationFilter = document.getElementById('filter-location');
  if (!locationFilter) return;
    
  const locations = [...new Set(communautes
    .map(communaute => communaute.lieu)
    .filter(lieu => lieu)
  )].sort();
    
  locations.forEach(location => {
    const option = document.createElement('option');
    option.value = location.toLowerCase();
    option.textContent = location;
    locationFilter.appendChild(option);
  });
}

function setupFilterEvents() {
  const filterElements = [
    'filter-location'
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

async function applyFilters() {
  const locationFilter = document.getElementById('filter-location')?.value;
  
  let filteredCommunautes = [...communautesData];
  
  if (locationFilter) {
    filteredCommunautes = filteredCommunautes.filter(communaute => {
      return communaute.lieu && communaute.lieu.toLowerCase().includes(locationFilter);
    });
  }
  
  const gridElement = document.getElementById('communautes-grid');
  await displayCommunautes(filteredCommunautes, gridElement);
}

async function clearFilters() {
  const filterElements = [
    'filter-location'
  ];
  
  filterElements.forEach(filterId => {
    const element = document.getElementById(filterId);
    if (element) {
      element.value = '';
    }
  });
  
  const gridElement = document.getElementById('communautes-grid');
  await displayCommunautes(communautesData, gridElement);
}

async function displayCommunautes(communautes, container) {
  if (!container) return;
  container.innerHTML = '';
  if (communautes.length === 0) {
    container.innerHTML = '<div class="no-events"><p>Aucune communauté disponible pour le moment.</p></div>';
    return;
  }
  for (const communaute of communautes) {
    const cardVNode = CommunityCarouselCard({ ...communaute, variant: 'dark' });
    const card = renderVNode(cardVNode);
    await enhanceCommunityCard(card, communaute);
    container.appendChild(card);
  }
}

async function enhanceCommunityCard(card, communaute) {
  const title = card.querySelector('.carousel-card-title');
  if (title) {
    title.style.cursor = 'pointer';
    title.addEventListener('click', () => {
      window.router.navigate(`/communautes/${communaute.id}`);
    });
  }
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

export default CommunautesListing;
