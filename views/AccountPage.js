import { getCurrentUser, getUserProfile } from '../Models/userModel.js';
import { uploadProfilePhoto, updateUserPhotoUrl, uploadCommunauteImage } from '../Services/storageService.js';
import { getCommunautesByReferent, createCommunaute } from '../Models/communauteModel.js';
import { getCommunautesAbonnees } from '../Models/communauteMembresModel.js';
import { createEvent, getUserEvents } from '../Services/eventCreationService.js';
import { NotificationManager } from '../lib/EditableField.js';

import VerticalCard from '../components/VerticalCard.js';

let accountState = {
    user: null,
    prenomEdit: false,
    nomEdit: false,
    emailEdit: false,
    phoneEdit: false,
    birthdateEdit: false,
    cityEdit: false
};

let userProfileData = null;

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
                                                            accountState.prenomEdit === false ? {
                                                                tag: "h2",
                                                                attributes: [
                                                                    ["class", "profile-value h1 editable"],
                                                                    ["id", "profile-prenom"],
                                                                    ["data-field", "prenom"]
                                                                ],
                                                                events: {
                                                                    click: [() => toggleEdit('prenom')]
                                                                }
                                                            } : {
                                                                tag: "input",
                                                                attributes: [
                                                                    ["type", "text"],
                                                                    ["id", "profile-prenom"],
                                                                    ["data-field", "prenom"],
                                                                    ["class", "profile-edit-input"],
                                                                    ["value", formatValueForInput('prenom')]
                                                                ],
                                                                events: {
                                                                    blur: [async function (event) {
                                                                        const input = event.currentTarget;
                                                                        const newValue = input.value;
                                                                        try {
                                                                            await saveFieldValue('prenom', newValue);
                                                                            accountState.prenomEdit = false;
                                                                        } catch (error) {
                                                                            console.error('Erreur sauvegarde:', error);
                                                                        }
                                                                    }],
                                                                    keydown: [function (event) {
                                                                        if (event.key === "Enter") {
                                                                            event.currentTarget.blur();
                                                                        } else if (event.key === "Escape") {
                                                                            accountState.prenomEdit = false;
                                                                        }
                                                                    }]
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "profile-field"]],
                                                        children: [
                                                            accountState.nomEdit === false ? {
                                                                tag: "h2",
                                                                attributes: [
                                                                    ["class", "profile-value h1 editable"],
                                                                    ["id", "profile-nom"],
                                                                    ["data-field", "nom"]
                                                                ],
                                                                events: {
                                                                    click: [() => toggleEdit('nom')]
                                                                }
                                                            } : {
                                                                tag: "input",
                                                                attributes: [
                                                                    ["type", "text"],
                                                                    ["id", "profile-nom"],
                                                                    ["data-field", "nom"],
                                                                    ["class", "profile-edit-input"],
                                                                    ["value", formatValueForInput('nom')]
                                                                ],
                                                                events: {
                                                                    blur: [async function (event) {
                                                                        const input = event.currentTarget;
                                                                        const newValue = input.value;
                                                                        try {
                                                                            await saveFieldValue('nom', newValue);
                                                                            accountState.nomEdit = false;
                                                                        } catch (error) {
                                                                            console.error('Erreur sauvegarde:', error);
                                                                        }
                                                                    }],
                                                                    keydown: [function (event) {
                                                                        if (event.key === "Enter") {
                                                                            event.currentTarget.blur();
                                                                        } else if (event.key === "Escape") {
                                                                            accountState.nomEdit = false;
                                                                        }
                                                                    }]
                                                                }
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
                                                            accountState.emailEdit === false ? {
                                                                tag: "p",
                                                                attributes: [
                                                                    ["class", "profile-value h3 editable"],
                                                                    ["id", "profile-email"],
                                                                    ["data-field", "email"]
                                                                ],
                                                                events: {
                                                                    click: [() => toggleEdit('email')]
                                                                }
                                                            } : {
                                                                tag: "input",
                                                                attributes: [
                                                                    ["type", "email"],
                                                                    ["id", "profile-email"],
                                                                    ["data-field", "email"],
                                                                    ["class", "profile-edit-input"],
                                                                    ["value", formatValueForInput('email')]
                                                                ],
                                                                events: {
                                                                    blur: [async function (event) {
                                                                        const input = event.currentTarget;
                                                                        const newValue = input.value;
                                                                        try {
                                                                            await saveFieldValue('email', newValue);
                                                                            accountState.emailEdit = false;
                                                                        } catch (error) {
                                                                            console.error('Erreur sauvegarde:', error);
                                                                        }
                                                                    }],
                                                                    keydown: [function (event) {
                                                                        if (event.key === "Enter") {
                                                                            event.currentTarget.blur();
                                                                        } else if (event.key === "Escape") {
                                                                            accountState.emailEdit = false;
                                                                        }
                                                                    }]
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "profile-field"]],
                                                        children: [
                                                            accountState.phoneEdit === false ? {
                                                                tag: "p",
                                                                attributes: [
                                                                    ["class", "profile-value h3 editable"],
                                                                    ["id", "profile-phone"],
                                                                    ["data-field", "phone"]
                                                                ],
                                                                events: {
                                                                    click: [() => toggleEdit('phone')]
                                                                }
                                                            } : {
                                                                tag: "input",
                                                                attributes: [
                                                                    ["type", "tel"],
                                                                    ["id", "profile-phone"],
                                                                    ["data-field", "phone"],
                                                                    ["class", "profile-edit-input"],
                                                                    ["value", formatValueForInput('phone')]
                                                                ],
                                                                events: {
                                                                    blur: [async function (event) {
                                                                        const input = event.currentTarget;
                                                                        const newValue = input.value;
                                                                        try {
                                                                            await saveFieldValue('phone', newValue);
                                                                            accountState.phoneEdit = false;
                                                                        } catch (error) {
                                                                            console.error('Erreur sauvegarde:', error);
                                                                        }
                                                                    }],
                                                                    keydown: [function (event) {
                                                                        if (event.key === "Enter") {
                                                                            event.currentTarget.blur();
                                                                        } else if (event.key === "Escape") {
                                                                            accountState.phoneEdit = false;
                                                                        }
                                                                    }]
                                                                }
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
                                                            accountState.birthdateEdit === false ? {
                                                                tag: "p",
                                                                attributes: [
                                                                    ["class", "profile-value h3 editable"],
                                                                    ["id", "profile-birthdate"],
                                                                    ["data-field", "birthdate"]
                                                                ],
                                                                events: {
                                                                    click: [() => toggleEdit('birthdate')]
                                                                }
                                                            } : {
                                                                tag: "input",
                                                                attributes: [
                                                                    ["type", "date"],
                                                                    ["id", "profile-birthdate"],
                                                                    ["data-field", "birthdate"],
                                                                    ["class", "profile-edit-input"],
                                                                    ["value", formatValueForInput('birthdate')]
                                                                ],
                                                                events: {
                                                                    blur: [async function (event) {
                                                                        const input = event.currentTarget;
                                                                        const newValue = input.value;
                                                                        try {
                                                                            await saveFieldValue('birthdate', newValue);
                                                                            accountState.birthdateEdit = false;
                                                                        } catch (error) {
                                                                            console.error('Erreur sauvegarde:', error);
                                                                        }
                                                                    }],
                                                                    keydown: [function (event) {
                                                                        if (event.key === "Enter") {
                                                                            event.currentTarget.blur();
                                                                        } else if (event.key === "Escape") {
                                                                            accountState.birthdateEdit = false;
                                                                        }
                                                                    }]
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "profile-field"]],
                                                        children: [
                                                            accountState.cityEdit === false ? {
                                                                tag: "p",
                                                                attributes: [
                                                                    ["class", "profile-value h3 editable"],
                                                                    ["id", "profile-city"],
                                                                    ["data-field", "city"]
                                                                ],
                                                                events: {
                                                                    click: [() => toggleEdit('city')]
                                                                }
                                                            } : {
                                                                tag: "input",
                                                                attributes: [
                                                                    ["type", "text"],
                                                                    ["id", "profile-city"],
                                                                    ["data-field", "city"],
                                                                    ["class", "profile-edit-input"],
                                                                    ["value", formatValueForInput('city')]
                                                                ],
                                                                events: {
                                                                    blur: [async function (event) {
                                                                        const input = event.currentTarget;
                                                                        const newValue = input.value;
                                                                        try {
                                                                            await saveFieldValue('city', newValue);
                                                                            accountState.cityEdit = false;
                                                                        } catch (error) {
                                                                            console.error('Erreur sauvegarde:', error);
                                                                        }
                                                                    }],
                                                                    keydown: [function (event) {
                                                                        if (event.key === "Enter") {
                                                                            event.currentTarget.blur();
                                                                        } else if (event.key === "Escape") {
                                                                            accountState.cityEdit = false;
                                                                        }
                                                                    }]
                                                                }
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
                                        attributes: [["class", "h1"]],
                                        children: ["Mes ", {
                                            tag: "span",
                                            attributes: [["class", "gradient-fonce"]],
                                            children: ["prochains"]
                                        }, " évènements"]
                                    },
                                    {
                                        tag: "a",
                                        attributes: [
                                            ["href", "/evenement/creer-evenement"],
                                            ["class", "bouton-primary-1"]
                                        ],
                                        children: ["Créer un événement"]
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

function initializeEditableFields() {
    accountState.prenomEdit = false;
    accountState.nomEdit = false;
    accountState.emailEdit = false;
    accountState.phoneEdit = false;
    accountState.birthdateEdit = false;
    accountState.cityEdit = false;
    
    // Mettre à jour le contenu des champs avec les valeurs du profil
    setTimeout(() => {
        const fields = [
            { id: 'profile-prenom', field: 'prenom', editState: 'prenomEdit' },
            { id: 'profile-nom', field: 'nom', editState: 'nomEdit' },
            { id: 'profile-email', field: 'email', editState: 'emailEdit' },
            { id: 'profile-phone', field: 'phone', editState: 'phoneEdit' },
            { id: 'profile-birthdate', field: 'birthdate', editState: 'birthdateEdit' },
            { id: 'profile-city', field: 'city', editState: 'cityEdit' }
        ];
        
        fields.forEach(({ id, field, editState }) => {
            const element = document.getElementById(id);
            if (element && !accountState[editState]) {
                element.textContent = formatValueForDisplay(field);
            }
        });
    }, 100);
}

async function saveFieldValue(fieldType, value) {
    try {
        if (!userProfileData || !userProfileData.id) {
            throw new Error('Utilisateur non connecté');
        }
        
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
        if (!column) {
            throw new Error('Champ non reconnu');
        }

        const { error } = await client
            .from('utilisateurs')
            .update({ [column]: value })
            .eq('id', userProfileData.id);

        if (error) {
            throw new Error('Erreur lors de la sauvegarde: ' + error.message);
        } else {
            // Mettre à jour les données locales
            const fieldMapping = {
                'prenom': 'prenom',
                'nom': 'nom', 
                'email': 'mail',
                'phone': 'tel',
                'city': 'lieu',
                'birthdate': 'date_naissance'
            };
            userProfileData[fieldMapping[fieldType]] = value;
            
            const notification = new NotificationManager();
            const fieldLabels = {
                'prenom': 'Prénom',
                'nom': 'Nom',
                'email': 'Email',
                'phone': 'Téléphone',
                'city': 'Ville',
                'birthdate': 'Date de naissance'
            };
            notification.show(`${fieldLabels[fieldType]} mis à jour`);
        }
    } catch (error) {
        const notification = new NotificationManager();
        notification.show('Erreur lors de la sauvegarde', 'error');
        throw error;
    }
}

function toggleEdit(fieldName) {
    accountState[`${fieldName}Edit`] = !accountState[`${fieldName}Edit`];
}

function formatValueForInput(fieldName) {
    if (!userProfileData) return '';
    
    const fieldMapping = {
        'prenom': 'prenom',
        'nom': 'nom', 
        'email': 'mail',
        'phone': 'tel',
        'city': 'lieu',
        'birthdate': 'date_naissance'
    };
    
    const value = userProfileData[fieldMapping[fieldName]] || '';
    
    if (fieldName === 'birthdate' && value && value.includes('/')) {
        const parts = value.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
    }
    return value;
}

function formatValueForDisplay(fieldName) {
    if (!userProfileData) return '';
    
    const fieldMapping = {
        'prenom': 'prenom',
        'nom': 'nom', 
        'email': 'mail',
        'phone': 'tel',
        'city': 'lieu',
        'birthdate': 'date_naissance'
    };
    
    const value = userProfileData[fieldMapping[fieldName]] || '';
    
    if (fieldName === 'birthdate' && value) {
        try {
            return new Date(value).toLocaleDateString('fr-FR');
        } catch {
            return value;
        }
    }
    const emptyTexts = {
        'prenom': 'Prénom non renseigné',
        'nom': 'Nom non renseigné',
        'email': 'Email non renseigné',
        'phone': 'Téléphone non renseigné',
        'city': 'Ville non renseignée',
        'birthdate': 'Date de naissance non renseignée'
    };
    return value || emptyTexts[fieldName] || 'Non renseigné';
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
    if (tabName === 'communautes') {
        setTimeout(() => afficherCommunautesUtilisateur(), 100);
    }
}

async function loadUserProfile() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.id) {
            throw new Error('Utilisateur non connecté');
        }

        userProfileData = await getUserProfile(currentUser.id);

        // Mettre à jour l'affichage du profil
        const profileImgElement = document.getElementById('profile-img');
        if (profileImgElement && userProfileData.image) {
            profileImgElement.src = userProfileData.image;
            profileImgElement.alt = `Photo de profil de ${userProfileData.prenom || 'l\'utilisateur'}`;
        }
        
        initializeEditableFields();
        
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

async function afficherCommunautesUtilisateur() {
    const container = document.getElementById('mes-communautes-list');
    if (!container || !userProfileData) return;
    container.innerHTML = 'Chargement...';
    try {
        const communautesCreees = await getCommunautesByReferent(userProfileData.id);
        
        const abonneesIds = await getCommunautesAbonnees(userProfileData.id);
        
        let communautesAbonnees = [];
        if (abonneesIds.length > 0) {
            const idsCreees = communautesCreees.map(c => c.id);
            const idsARecuperer = abonneesIds.filter(id => !idsCreees.includes(id));
            if (idsARecuperer.length > 0) {
                const { client } = await import('../supabase.js');
                const { data, error } = await client
                    .from('communautes')
                    .select('*')
                    .in('id', idsARecuperer);
                if (error) throw error;
                communautesAbonnees = data;
            }
        }
        
        if (!communautesCreees.length && !communautesAbonnees.length) {
            container.innerHTML = '<p>Aucune communauté créée ou suivie.</p>';
            return;
        }
        
        container.innerHTML = '';
        
        if (communautesCreees.length) {            
            const creeesGrid = document.createElement('div');
            creeesGrid.className = 'user-communautes-grid';
            
            for (const communaute of communautesCreees) {
                const card = await createUserCommunauteCard(communaute);
                creeesGrid.appendChild(card);
            }
            
            container.appendChild(creeesGrid);
        }
        
        if (communautesAbonnees.length) {
            const titre2 = document.createElement('h2');
            titre2.className = 'h1';
            titre2.textContent = 'Communautés que je suis';
            container.appendChild(titre2);
            
            const abonneesGrid = document.createElement('div');
            abonneesGrid.className = 'user-communautes-grid';
            
            for (const communaute of communautesAbonnees) {
                const card = await createUserCommunauteCard(communaute);
                abonneesGrid.appendChild(card);
            }
            
            container.appendChild(abonneesGrid);
        }

    } catch (e) {
        console.error('Erreur lors du chargement des communautés:', e);
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

        const userEvents = await getUserEvents(currentUser.id);
        
        const participations = await getUserEventParticipations(currentUser.id);
        const participationEvents = participations.map(p => p.evenements).filter(e => e);

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

        if (organizedEvents.length > 0) {
            const organizedSection = document.createElement('div');
            organizedSection.className = 'user-events-section';
            organizedSection.innerHTML = '<h2 class="h1">Événements que j\'ai créés</h2>';
            
            const organizedGrid = document.createElement('div');
            organizedGrid.className = 'user-communautes-grid';
            
            organizedEvents.forEach(event => {
                const eventCard = createUserEventCard(event, true);
                organizedGrid.appendChild(eventCard);
            });

            organizedSection.appendChild(organizedGrid);
            container.appendChild(organizedSection);
        }

        if (participatingEvents.length > 0) {
            const participatingSection = document.createElement('div');
            participatingSection.className = 'user-events-section';
            participatingSection.innerHTML = '<h2 class="h1">Événements auxquels je participe</h2>';
            
            const participatingGrid = document.createElement('div');
            participatingGrid.className = 'user-communautes-grid';
            
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
    card.className = 'event-card';
    
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
    
    const description = event.description || 'Aucune description disponible';
    
    let priceOrParticipantsText;
    if (isOrganizer) {
        const participantsCount = event.nombre_places - (event.nombre_places_disponibles || 0);
        priceOrParticipantsText = `${participantsCount} / ${event.nombre_places} participants`;
    } else {
        priceOrParticipantsText = event.prix === 0 || event.prix === '0' ? 'Gratuit' : `${event.prix}€`;
    }
    
    card.innerHTML = `
        <div class="event-card-image">
            <img src="${event.image || '/Assets/images/banner-femme.webp'}" alt="${event.nom}" />
        </div>
        <div class="event-card-content">
            <div class="event-card-info">
                <h3 class="event-title">${event.nom}</h3>
                <p class="event-date-time highlight">${formattedDate} à ${formattedTime}</p>
                ${locationLine ? `<p class="event-location highlight">${locationLine}</p>` : ''}
                <p class="event-description">${description}</p>
            </div>
            <p class="event-price h2">${priceOrParticipantsText}</p>
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
    
    let memberCount = 0;
    try {
        const { getCommunauteMemberCount } = await import('../Models/communauteModel.js');
        memberCount = await getCommunauteMemberCount(communaute.id);
    } catch (error) {
        console.error('Erreur lors du chargement du nombre de membres:', error);
    }
    
    const date = communaute.date_creation ? new Date(communaute.date_creation) : null;
    const formattedDate = date ? formatDate(date) : '';
    
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