import { getCurrentUser, getUserProfile } from '../Models/userModel.js';
import { uploadProfilePhoto, updateUserPhotoUrl, uploadCommunauteImage } from '../Services/storageService.js';
import { getCommunautesByReferent, createCommunaute } from '../Models/communauteModel.js';
import { createEvent, getUserEvents } from '../Services/eventCreationService.js';
import VerticalCard from '../components/VerticalCard.js';

export default function AccountPage() {
    setTimeout(() => loadUserProfile(), 100);

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
                        children: ["Mon profil"]
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
                                            ["href", "/compte"],
                                            ["class", "account-nav-link active"],
                                            ["data-tab", "general"]
                                        ],
                                        events: {
                                            click: [
                                                function (event) {
                                                    event.preventDefault();
                                                    switchTab('general');
                                                }
                                            ]
                                        },
                                        children: ["General"]
                                    },
                                    {
                                        tag: "a",
                                        attributes: [
                                            ["href", "/compte/evenements"],
                                            ["class", "account-nav-link"],
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
                                        children: ["Évènements"]
                                    },
                                    {
                                        tag: "a",
                                        attributes: [
                                            ["href", "/compte/communautes"],
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
                                        children: ["Communautés"]
                                    },
                                    {
                                        tag: "a",
                                        attributes: [
                                            ["href", "/compte/calendrier"],
                                            ["class", "account-nav-link"],
                                            ["data-tab", "calendrier"]
                                        ],
                                        events: {
                                            click: [
                                                function (event) {
                                                    event.preventDefault();
                                                    switchTab('calendrier');
                                                }
                                            ]
                                        },
                                        children: ["Calendrier"]
                                    }
                                ]
                            },
                            {
                                tag: "a",
                                attributes: [
                                    ["href", "/dashboard"],
                                    ["class", "bouton-primary-3"]
                                ],
                                children: ["Dashboard"]
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
                        attributes: [["class", "account-tab active"], ["data-tab-content", "general"]],
                        children: [
                            {
                                tag: "div",
                                attributes: [["class", "profile-section"]],
                                children: [
                                    {
                                        tag: "div",
                                        attributes: [["class", "profile-photo"]],
                                        children: [
                                            {
                                                tag: "div",
                                                attributes: [["class", "profile-photo-container"]],
                                                events: {
                                                    click: [triggerPhotoUpload]
                                                },
                                                children: [
                                                    {
                                                        tag: "img",
                                                        attributes: [
                                                            ["class", "profile-img"],
                                                            ["id", "profile-img"]
                                                        ]
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [
                                                            ["class", "photo-overlay"],
                                                        ],
                                                        children: [
                                                            {
                                                                tag: "p",
                                                                children: ["Changer"]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                tag: "input",
                                                attributes: [
                                                    ["type", "file"],
                                                    ["id", "photo-upload-input"],
                                                    ["accept", "image/jpeg,image/jpg,image/png,image/webp"],
                                                    ["style", { display: "none" }]
                                                ],
                                                events: {
                                                    change: [handlePhotoUpload]
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        tag: "div",
                                        attributes: [["class", "profile-info"]],
                                        children: [
                                            {
                                                tag: "div",
                                                attributes: [["class", "profile-first-row"]],
                                                children: [
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "profile-field"]],
                                                        children: [
                                                            {
                                                                tag: "h2",
                                                                attributes: [
                                                                    ["class", "profile-value h1 editable"],
                                                                    ["id", "profile-prenom"],
                                                                    ["data-field", "prenom"]
                                                                ],
                                                                events: {
                                                                    click: [makeEditable]
                                                                },
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "profile-field"]],
                                                        children: [
                                                            {
                                                                tag: "h2",
                                                                attributes: [
                                                                    ["class", "profile-value h1 editable"],
                                                                    ["id", "profile-nom"],
                                                                    ["data-field", "nom"]
                                                                ],
                                                                events: {
                                                                    click: [makeEditable]
                                                                },
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                tag: "div",
                                                attributes: [["class", "profile-row"]],
                                                children: [
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "profile-field"]],
                                                        children: [
                                                            {
                                                                tag: "p",
                                                                attributes: [
                                                                    ["class", "profile-value h3 editable"],
                                                                    ["id", "profile-email"],
                                                                    ["data-field", "email"]
                                                                ],
                                                                events: {
                                                                    click: [makeEditable]
                                                                },
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "profile-field"]],
                                                        children: [
                                                            {
                                                                tag: "p",
                                                                attributes: [
                                                                    ["class", "profile-value h3 editable"],
                                                                    ["id", "profile-phone"],
                                                                    ["data-field", "phone"]
                                                                ],
                                                                events: {
                                                                    click: [makeEditable]
                                                                },
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                tag: "div",
                                                attributes: [["class", "profile-row"]],
                                                children: [
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "profile-field"]],
                                                        children: [
                                                            {
                                                                tag: "p",
                                                                attributes: [
                                                                    ["class", "profile-value h3 editable"], 
                                                                    ["id", "profile-birthdate"],
                                                                    ["data-field", "birthdate"]
                                                                ],
                                                                events: {
                                                                    click: [makeEditable]
                                                                },
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "profile-field"]],
                                                        children: [
                                                            {
                                                                tag: "p",
                                                                attributes: [
                                                                    ["class", "profile-value h3 editable"],
                                                                    ["id", "profile-city"],
                                                                    ["data-field", "city"]
                                                                ],
                                                                events: {
                                                                    click: [makeEditable]
                                                                },
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
                                attributes: [["class", "profile-content"]],
                                children: [
                                    {
                                        tag: "button",
                                        attributes: [["class", "bouton-primary-1"]],
                                        events: {
                                            click: [
                                                async function () {
                                                    const { authService } = await import('../Services/authService.js');
                                                    await authService.logout();
                                                }
                                            ]
                                        },
                                        children: ["Se déconnecter"]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attributes: [["class", "account-tab"], ["data-tab-content", "evenements"]],
                        children: [
                            {
                                tag: "div",
                                attributes: [["class", "events-header"]],
                                children: [
                                    {
                                        tag: "h2",
                                        children: ["Mes évènements"]
                                    },
                                    {
                                        tag: "a",
                                        attributes: [
                                            ["href", "/evenement/creer-evenement"],
                                            ["class", "btn-create-event"]
                                        ],
                                        children: [
                                            {
                                                tag: "span",
                                                attributes: [["class", "btn-icon"]],
                                                children: ["+"]
                                            },
                                            "Créer un événement"
                                        ]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                attributes: [["id", "user-events-list"], ["class", "user-events-container"]],
                                children: [
                                    {
                                        tag: "p",
                                        children: ["Chargement de vos évènements..."]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attributes: [["class", "account-tab"], ["data-tab-content", "communautes"]],
                        children: [
                            {
                                tag: "h2",
                                attributes: [["class", "h1"]],
                                children: ["Toutes mes ", {
                                tag: "span",
                                attributes: [["class", "gradient-fonce"]],
                                children: ["communautés"]
                                }],
                            },
                            { 
                                tag: "div", 
                                    attributes: [["id", "mes-communautes-list"]]
                            },
                            {
                                tag: "h2",
                                attributes: [["class", "h1"]],
                                children: ["Envie de créer votre communauté ? "],
                            },
                            {
                                tag: "form",
                                attributes: [["id", "create-communaute-form"]],
                                events: {
                                    submit: [async function (event) {
                                        event.preventDefault();
                                        const nom = document.getElementById('comm-nom').value;
                                        const description = document.getElementById('comm-description').value;
                                        const lieu = document.getElementById('comm-lieu').value;
                                        // const status = document.getElementById('comm-status').value;
                                        const imageInput = document.getElementById('comm-image');
                                        let imageUrl = '';
                                        if (imageInput && imageInput.files && imageInput.files[0]) {
                                            try {
                                                imageUrl = await uploadCommunauteImage(imageInput.files[0], nom);
                                            } catch (e) {
                                                alert('Erreur lors de l\'upload de l\'image : ' + e.message);
                                                return;
                                            }
                                        }
                                        const date_creation = new Date().toISOString();
                                        try {
                                            const newComm = await createCommunaute({
                                                nom,
                                                description,
                                                referent: userProfileData.id,
                                                date_creation,
                                                lieu,
                                                status: 'public',
                                                image: imageUrl
                                            });
                                            
                                            window.location.pathname = `/communautes/${newComm.id}`;
                                            
                                        } catch (e) {
                                            alert('Erreur lors de la création : ' + e.message);
                                        }
                                    }]
                                },
                                children: [
                                    { tag: "input", attributes: [["type", "text"], ["id", "comm-nom"], ["placeholder", "Nom de la communauté"], ["required", true]] },
                                    { tag: "textarea", attributes: [["id", "comm-description"], ["placeholder", "Description"], ["required", true]] },
                                    { tag: "input", attributes: [["type", "text"], ["id", "comm-lieu"], ["placeholder", "Lieu"], ["required", true]] },
                                    // { tag: "input", attributes: [["type", "text"], ["id", "comm-status"], ["placeholder", "Statut (ex: public/privé)"], ["required", true]] },
                                    { tag: "input", attributes: [["type", "file"], ["id", "comm-image"], ["accept", "image/*"]] },
                                    { tag: "button", attributes: [["type", "submit"], ["class", "bouton-primary-1"]], children: ["Créer ma communauté"] }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attributes: [["class", "account-tab"], ["data-tab-content", "calendrier"]],
                        children: [
                            {
                                tag: "h2",
                                children: ["Mon calendrier"]
                            },
                            {
                                tag: "p",
                                children: ["Contenu de l'onglet Calendrier"]
                            }
                        ]
                    }
                ]
            }
        ]
    };
}

let userProfileData = null;

function makeEditable(event) {
    const element = event.currentTarget;
    const textNode = element.childNodes[0];
    const text = textNode.textContent;
    const fieldType = element.dataset.field;

    const input = document.createElement("input");
    
    if (fieldType === 'birthdate') {
        input.type = "date";
        if (text && text !== 'Date de naissance non renseignée') {
            try {
                const dateParts = text.split('/'); 
                if (dateParts.length === 3) {
                    const day = dateParts[0].padStart(2, '0');
                    const month = dateParts[1].padStart(2, '0');
                    const year = dateParts[2];
                    input.value = `${year}-${month}-${day}`;
                } else {
                    input.value = '';
                }
            } catch (error) {
                input.value = '';
            }
        } else {
            input.value = '';
        }
    } else {
        input.type = "text";
        input.value = text;
    }
    
    input.className = "profile-edit-input";

    element.appendChild(input);
    input.focus();
    element.removeChild(textNode);
    element.removeEventListener("click", makeEditable);

    input.addEventListener("blur", async function onBlur(event) {
        const input = event.currentTarget;
        const newValue = input.value;
        let displayValue = newValue;
        
        
        if (fieldType === 'birthdate' && newValue) {
            displayValue = formatDate(newValue);
        } else if (fieldType === 'birthdate' && !newValue) {
            displayValue = 'Date de naissance non renseignée';
        }
        
        const textNode = document.createTextNode(displayValue);
        const element = input.parentNode;

        await saveFieldValue(fieldType, newValue);

        element.replaceChild(textNode, input);
        element.addEventListener("click", makeEditable);
    });

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            input.blur();
        }
    });
}

async function saveFieldValue(fieldType, value) {
    try {
        if (!userProfileData || !userProfileData.id) return;
        const { client } = await import('../supabase.js');

        const fieldMapping = {
            'prenom': 'prenom',
            'nom': 'nom',
            'email': 'mail',
            'phone': 'tel',
            'city': 'lieu',
            'birthdate': 'date_naissance'
        };

        const column = fieldMapping[fieldType];
        if (!column) return;

        const { error } = await client
            .from('utilisateurs')
            .update({ [column]: value })
            .eq('id', userProfileData.id);

        if (error) {
            alert('Erreur lors de la sauvegarde');
        } else {
            userProfileData[column] = value;
        }
    } catch (error) {
        alert('Erreur lors de la sauvegarde');
    }
}

function triggerPhotoUpload() {
    const fileInput = document.getElementById('photo-upload-input');
    if (fileInput) {
        fileInput.click();
    }
}

async function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const profileImg = document.getElementById('profile-img');
        const photoContainer = profileImg.parentElement;

        const photoUrl = await uploadProfilePhoto(file, userProfileData.id);

        await updateUserPhotoUrl(userProfileData.id, photoUrl);

        userProfileData.image = photoUrl;

        profileImg.src = photoUrl;
        profileImg.alt = `Photo de profil de ${userProfileData.prenom || 'l\'utilisateur'}`;

        event.target.value = '';

    } catch (error) {
        alert(`Erreur lors de l'upload de la photo: ${error.message}`);

        const loadingIndicator = document.querySelector('.photo-loading');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }

        event.target.value = '';
    }
}

function switchTab(tabName) {
    const navLinks = document.querySelectorAll('.account-nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    const activeLink = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    const tabContents = document.querySelectorAll('.account-tab');
    tabContents.forEach(tab => tab.classList.remove('active'));

    const activeTab = document.querySelector(`[data-tab-content="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    if (tabName === 'evenements') {
        setTimeout(() => chargerEvenementsUtilisateur(), 100);
    }
}

async function loadUserProfile() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.id) {
            throw new Error('Utilisateur non connecté');
        }

        userProfileData = await getUserProfile(currentUser.id);

        updateProfileDisplay();
        await afficherCommunautesUtilisateur(); 

    } catch (error) {
        if (error.message.includes('connecté') || error.message.includes('Session')) {
            alert('Vous devez être connecté pour accéder à cette page');
            window.location.hash = '#/connexion';
            return;
        }

        alert('Erreur lors du chargement du profil: ' + error.message);
    }
}

function updateProfileDisplay() {
    if (!userProfileData) return;

    const prenomElement = document.getElementById('profile-prenom');
    if (prenomElement) {
        prenomElement.textContent = userProfileData.prenom || 'Prénom';
    }

    const nomElement = document.getElementById('profile-nom');
    if (nomElement) {
        nomElement.textContent = userProfileData.nom || 'Nom';
    }

    const emailElement = document.getElementById('profile-email');
    if (emailElement) {
        emailElement.textContent = userProfileData.mail || 'Mail non renseigné';
    }

    const phoneElement = document.getElementById('profile-phone');
    if (phoneElement) {
        phoneElement.textContent = userProfileData.tel || 'Téléphone non renseigné';
    }

    const birthdateElement = document.getElementById('profile-birthdate');
    if (birthdateElement) {
        if (userProfileData.date_naissance) {
            birthdateElement.textContent = formatDate(userProfileData.date_naissance);
        } else {
            birthdateElement.textContent = 'Date de naissance non renseignée';
        }
    }

    const cityElement = document.getElementById('profile-city');
    if (cityElement) {
        cityElement.textContent = userProfileData.lieu || 'Ville non renseignée';
    }

    const profileImgElement = document.getElementById('profile-img');
    if (profileImgElement && userProfileData.image) {
        profileImgElement.src = userProfileData.image;
        profileImgElement.alt = `Photo de profil de ${userProfileData.prenom || 'l\'utilisateur'}`;
    }
}

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Date invalide';
        }

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    } catch (error) {
        return 'Date invalide';
    }
}

async function afficherCommunautesUtilisateur() {
    const container = document.getElementById('mes-communautes-list');
    if (!container || !userProfileData) return;
    container.innerHTML = 'Chargement...';
    try {
        const communautes = await getCommunautesByReferent(userProfileData.id);
        if (!communautes.length) {
            container.innerHTML = '<p>Aucune communauté créée.</p>';
            return;
        }
        container.innerHTML = '';
        
        const communautesGrid = document.createElement('div');
        communautesGrid.className = 'user-communautes-grid';
        
        for (const communaute of communautes) {
            const card = await createUserCommunauteCard(communaute);
            communautesGrid.appendChild(card);
        }
        
        container.appendChild(communautesGrid);
    } catch (e) {
        container.innerHTML = '<p>Erreur lors du chargement des communautés.</p>';
    }
}

async function chargerEvenementsUtilisateur() {
    const container = document.getElementById('user-events-list');
    if (!container) return;

    try {

        const { getUserEventParticipations } = await import('../Services/eventParticipationService.js');

        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.id) {
            container.innerHTML = '<div class="user-events-empty"><p>Vous devez être connecté pour voir vos évènements.</p></div>';
            return;
        }

        // Charger les événements organisés par l'utilisateur
        const userEvents = await getUserEvents(currentUser.id);
        
        // Charger les événements auxquels l'utilisateur participe
        const { getUserEventParticipations } = await import('../Services/eventParticipationService.js');
        const participations = await getUserEventParticipations(currentUser.id);
        const participationEvents = participations.map(p => p.evenements).filter(e => e);

        // Combiner et éviter les doublons
        const allEvents = [...userEvents];
        participationEvents.forEach(event => {
            if (!allEvents.find(e => e.id === event.id)) {
                allEvents.push(event);
            }
        });
        
        if (allEvents.length === 0) {
            container.innerHTML = '<div class="user-events-empty"><p>Aucun événement trouvé. Créez votre premier événement !</p></div>';
            return;
        }

        // Séparer les événements organisés des événements auxquels on participe
        const organizedEvents = userEvents;
        const participatingEvents = participationEvents.filter(event => 
            !organizedEvents.find(e => e.id === event.id)
        );

        const eventsGrid = document.createElement('div');
        eventsGrid.className = 'user-events-grid';
        
        participations.forEach(participation => {
            const event = participation.evenements;
            if (event) {
                const eventCard = createUserEventCard(event);
                eventsGrid.appendChild(eventCard);
            }
        });

        container.innerHTML = '';

        // Section événements organisés
        if (organizedEvents.length > 0) {
            const organizedSection = document.createElement('div');
            organizedSection.className = 'user-events-section';
            organizedSection.innerHTML = '<h3 class="user-events-section-title">Événements que j\'organise</h3>';
            
            const organizedGrid = document.createElement('div');
            organizedGrid.className = 'user-events-grid';
            
            organizedEvents.forEach(event => {
                const eventCard = createUserEventCard(event, true);
                organizedGrid.appendChild(eventCard);
            });

            organizedSection.appendChild(organizedGrid);
            container.appendChild(organizedSection);
        }

        // Section événements auxquels on participe
        if (participatingEvents.length > 0) {
            const participatingSection = document.createElement('div');
            participatingSection.className = 'user-events-section';
            participatingSection.innerHTML = '<h3 class="user-events-section-title">Événements auxquels je participe</h3>';
            
            const participatingGrid = document.createElement('div');
            participatingGrid.className = 'user-events-grid';
            
            participatingEvents.forEach(event => {
                const eventCard = createUserEventCard(event, false);
                participatingGrid.appendChild(eventCard);
            });

            participatingSection.appendChild(participatingGrid);
            container.appendChild(participatingSection);
        }

    } catch (error) {
        container.innerHTML = '<div class="user-events-empty"><p>Erreur lors du chargement de vos évènements.</p></div>';
    }
}

function createUserEventCard(event, isOrganizer = false) {
    const card = document.createElement('div');
    card.className = `user-event-card${isOrganizer ? ' user-event-card-organizer' : ''}`;
    
    const date = new Date(event.date);
    const formattedDate = formatEventDate(date);
    const formattedTime = formatEventTime(date);
    
    let locationLine = '';
    if (event.lieu) {
        locationLine = event.lieu;
    }
    if (event.adresse) {
        locationLine += locationLine ? ` - ${event.adresse}` : event.adresse;
    }
    
    const priceText = event.prix === 0 || event.prix === '0' ? 'Gratuit' : `${event.prix}€`;
    
    card.innerHTML = `
        <div class="user-event-card-image">
            <img src="${event.image || '/Assets/images/banner-femme.webp'}" alt="${event.nom}" />
            ${isOrganizer ? '<div class="organizer-badge">Organisateur</div>' : ''}
        </div>
        <div class="user-event-card-content">
            <div class="user-event-card-info">
                <h4 class="user-event-title">${event.nom}</h4>
                <p class="user-event-date-time">${formattedDate} à ${formattedTime}</p>
                ${locationLine ? `<p class="user-event-location">${locationLine}</p>` : ''}
                ${isOrganizer ? `<p class="user-event-participants">${(event.nombre_places - (event.nombre_places_disponibles || 0))} / ${event.nombre_places} participants</p>` : ''}
            </div>
            <p class="user-event-price">${priceText}</p>
        </div>
    `;
    
    card.addEventListener('click', () => {
        window.router.navigate(`/evenements/${event.id}`);
    });
    
    return card;
}

async function createUserCommunauteCard(communaute) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    // Récupérer le nombre de membres
    let memberCount = 0;
    try {
        const { getCommunauteMemberCount } = await import('../Models/communauteModel.js');
        memberCount = await getCommunauteMemberCount(communaute.id);
    } catch (error) {
        console.error('Erreur lors du chargement du nombre de membres:', error);
    }
    
    const date = communaute.date_creation ? new Date(communaute.date_creation) : null;
    const formattedDate = date ? formatCommunauteDate(date) : '';
    
    const locationLine = communaute.lieu || '';
    
    const description = communaute.description || 'Aucune description disponible';
    
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
            <p class="event-price h2">${memberText}</p>
        </div>
    `;
    
    card.addEventListener('click', () => {
        window.location.pathname = `/communaute/${communaute.id}`;
    });
    
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

function formatEventDate(date) {
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

function renderElement(obj) {
    if (typeof obj === 'string') return document.createTextNode(obj);
    const el = document.createElement(obj.tag);
    if (obj.attributes) {
        obj.attributes.forEach(([key, value]) => {
            if (typeof value === 'object' && key === 'style') {
                Object.assign(el.style, value);
            } else {
                el.setAttribute(key, value);
            }
        });
    }
    if (obj.events) {
        Object.entries(obj.events).forEach(([event, handlers]) => {
            handlers.forEach(handler => el.addEventListener(event, handler));
        });
    }
    if (obj.children) {
        obj.children.forEach(child => el.appendChild(renderElement(child)));
    }
    return el;
}

async function creerEvenement(form) {
    // Cette fonction a été déplacée vers CreateEvent.js
    // Redirection vers la page de création
    window.location.hash = '#/creer-evenement';
}

function showNotification(message, type = 'info') {
    // Cette fonction a été déplacée vers CreateEvent.js  
    // Notification simple pour AccountPage
    alert(message);
}
