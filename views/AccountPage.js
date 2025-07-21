import { getCurrentUser, getUserProfile } from '../Models/userModel.js';
import { uploadProfilePhoto, updateUserPhotoUrl, uploadCommunauteImage } from '../Services/storageService.js';
import { getCommunautesByReferent, createCommunaute } from '../Models/communauteModel.js';
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
                                            ["href", "/compte/likes"],
                                            ["class", "account-nav-link"],
                                            ["data-tab", "likes"]
                                        ],
                                        events: {
                                            click: [
                                                function (event) {
                                                    event.preventDefault();
                                                    switchTab('likes');
                                                }
                                            ]
                                        },
                                        children: ["Likes"]
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
                        attributes: [["class", "account-tab"], ["data-tab-content", "likes"]],
                        children: [
                            {
                                tag: "h2",
                                children: ["Mes likes"]
                            },
                            {
                                tag: "p",
                                children: ["Contenu de l'onglet Likes"]
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attributes: [["class", "account-tab"], ["data-tab-content", "communautes"]],
                        children: [
                            {
                                tag: "h2",
                                children: ["Mes communautés"]
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
                                        const status = document.getElementById('comm-status').value;
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
                                                status,
                                                image: imageUrl
                                            });
                                            alert('Communauté créée !');
                                            document.getElementById('create-communaute-form').reset();
                                            await afficherCommunautesUtilisateur();
                                        } catch (e) {
                                            alert('Erreur lors de la création : ' + e.message);
                                        }
                                    }]
                                },
                                children: [
                                    { tag: "input", attributes: [["type", "text"], ["id", "comm-nom"], ["placeholder", "Nom de la communauté"], ["required", true]] },
                                    { tag: "textarea", attributes: [["id", "comm-description"], ["placeholder", "Description"], ["required", true]] },
                                    { tag: "input", attributes: [["type", "text"], ["id", "comm-lieu"], ["placeholder", "Lieu"], ["required", true]] },
                                    { tag: "input", attributes: [["type", "text"], ["id", "comm-status"], ["placeholder", "Statut (ex: public/privé)"], ["required", true]] },
                                    { tag: "input", attributes: [["type", "file"], ["id", "comm-image"], ["accept", "image/*"]] },
                                    { tag: "button", attributes: [["type", "submit"]], children: ["Créer ma communauté"] }
                                ]
                            },
                            { tag: "div", attributes: [["id", "mes-communautes-list"]], children: [] }
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
    
    // Set input type based on field
    if (fieldType === 'birthdate') {
        input.type = "date";
        // Convert display text back to date format if needed
        if (text && text !== 'Date de naissance non renseignée') {
            // Try to parse the displayed date and convert to YYYY-MM-DD format
            try {
                const dateParts = text.split('/'); // Assuming DD/MM/YYYY format
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
        
        // Format date for display if it's a birthdate field
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
        // Afficher un indicateur de chargement
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
}

async function loadUserProfile() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.id) {
            throw new Error('Utilisateur non connecté');
        }

        userProfileData = await getUserProfile(currentUser.id);

        updateProfileDisplay();
        await afficherCommunautesUtilisateur(); // <-- ajout ici

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
        communautes.forEach(c => {
            const card = VerticalCard({
                imageUrl: c.image || '../Assets/images/eventImage.png',
                title: c.nom,
                place: c.lieu,
                description: c.description
            });
            container.appendChild(renderElement(card));
        });
    } catch (e) {
        container.innerHTML = '<p>Erreur lors du chargement des communautés.</p>';
    }
}

// Fonction utilitaire pour rendre un objet virtuel en DOM réel (si pas déjà présente)
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
