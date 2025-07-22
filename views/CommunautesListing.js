import { getAllCommunautesWithMemberCount } from '../Models/communauteModel.js';
import { ajouterMembreCommunaute, retirerMembreCommunaute, estMembreCommunaute } from '../Models/communauteMembresModel.js';
import { getCurrentUser } from '../Models/userModel.js';

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
    const communauteCard = await createCommunauteCard(communaute);
    container.appendChild(communauteCard);
  }
}

async function createCommunauteCard(communaute) {
  const card = document.createElement('div');
  card.className = 'event-card';
  
  const date = communaute.date_creation ? new Date(communaute.date_creation) : null;
  const formattedDate = date ? formatCommunauteDate(date) : '';
  
  const locationLine = communaute.lieu || '';
  
  const description = communaute.description || 'Aucune description disponible';
  
  const memberCount = communaute.member_count || 0;
  const memberText = memberCount === 0 ? 'Aucun membre' : 
                    memberCount === 1 ? '1 membre' : 
                    `${memberCount} membres`;
  
  card.innerHTML = `
    <div class="event-card-image">
      <img src="${communaute.image || '/Assets/images/banner-femme.webp'}" alt="${communaute.nom}" />
    </div>
    <div class="event-card-content">
      <div class="event-card-info">
        <h3 class="event-title">${communaute.nom || 'Communauté sans nom'}</h3>
        ${formattedDate ? `<p class="event-date-time highlight">Créée le ${formattedDate}</p>` : ''}
        ${locationLine ? `<p class="event-location highlight">${locationLine}</p>` : ''}
        <p class="event-description">${description}</p>
      </div>
      <div class="event-card-actions">
        <p class="event-price h2">${memberText}</p>
        <button class="btn-comm-action bouton-primary-2" data-communaute-id="${communaute.id}">
          <span class="btn-text">...</span>
        </button>
      </div>
    </div>
  `;
  
  const cardContent = card.querySelector('.event-card-info');
  cardContent.addEventListener('click', () => {
    window.location.pathname = `/communaute/${communaute.id}`;
  });
  
  const button = card.querySelector('.btn-comm-action');
  const buttonText = button.querySelector('.btn-text');
  
  try {
    const user = await getCurrentUser();
    if (user && user.id !== communaute.referent) {
      button.disabled = true;
      const isMember = await estMembreCommunaute(user.id, communaute.id);
      buttonText.textContent = isMember ? 'Quitter' : 'Rejoindre';
      button.disabled = false;
      
      button.onclick = async (e) => {
        e.stopPropagation();
        button.disabled = true;
        try {
          if (isMember) {
            await retirerMembreCommunaute(user.id, communaute.id);
            buttonText.textContent = 'Rejoindre';
          } else {
            await ajouterMembreCommunaute(user.id, communaute.id);
            buttonText.textContent = 'Quitter';
          }
          setTimeout(() => loadCommunautes());
        } catch (error) {
          alert('Erreur : ' + error.message);
        } finally {
          button.disabled = false;
        }
      };
    } else {
      button.style.display = 'none';
    }
  } catch (error) {
    button.style.display = 'none';
  }
  
  return card;
}

function formatCommunauteDate(date) {
  const options = { 
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  };
  return date.toLocaleDateString('fr-FR', options);
}

export default CommunautesListing;
