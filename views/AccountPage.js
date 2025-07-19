import { getCurrentUser, getUserProfile } from '../Models/userModel.js';

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
                                                function(event) {
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
                                                function(event) {
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
                                                function(event) {
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
                                                function(event) {
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
                                                tag: "img",
                                                attributes: [
                                                    ["src", "../Assets/images/logo.png"],
                                                    ["alt", "Photo de profil"],
                                                    ["class", "profile-img"],
                                                    ["id", "profile-img"]
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        tag: "div",
                                        attributes: [["class", "profile-info"]],
                                        children: [
                                            {
                                                tag: "h2",
                                                attributes: [["class", "profile-name h1"], ["id", "profile-name"]],
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
                                                                attributes: [["class", "profile-value h3"], ["id", "profile-email"]],
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "profile-field"]],
                                                        children: [
                                                            {
                                                                tag: "p",
                                                                attributes: [["class", "profile-value h3"], ["id", "profile-phone"]],
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
                                                                attributes: [["class", "profile-value h3"], ["id", "profile-birthdate"]],
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "profile-field"]],
                                                        children: [
                                                            {
                                                                tag: "p",
                                                                attributes: [["class", "profile-value h3"], ["id", "profile-city"]],
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
                                                async function() {
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
                                tag: "p",
                                children: ["Contenu de l'onglet Communautés"]
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
        
    } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
        
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

    const nameElement = document.getElementById('profile-name');
    if (nameElement) {
        const fullName = `${userProfileData.prenom || 'Prénom'} ${userProfileData.nom || 'Nom'}`;
        nameElement.textContent = fullName;
    }

    const emailElement = document.getElementById('profile-email');
    if (emailElement) {
        emailElement.textContent = userProfileData.mail || 'Non renseigné';
    }

    const phoneElement = document.getElementById('profile-phone');
    if (phoneElement) {
        phoneElement.textContent = userProfileData.tel || 'Non renseigné';
    }

    const birthdateElement = document.getElementById('profile-birthdate');
    if (birthdateElement) {
        if (userProfileData.date_naissance) {
            birthdateElement.textContent = formatDate(userProfileData.date_naissance);
        } else {
            birthdateElement.textContent = 'Non renseigné';
        }
    }

    const cityElement = document.getElementById('profile-city');
    if (cityElement) {
        cityElement.textContent = userProfileData.lieu || 'Non renseigné';
    }

    const profileImgElement = document.getElementById('profile-img');
    if (profileImgElement && userProfileData.photo_url) {
        profileImgElement.src = userProfileData.photo_url;
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
        console.error('Erreur lors du formatage de la date:', error);
        return 'Date invalide';
    }
}
