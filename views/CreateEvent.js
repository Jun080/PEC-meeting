import { getCurrentUser } from '../Models/userModel.js';
import { createEvent } from '../Services/eventCreationService.js';

export default function CreateEvent() {
    return {
        tag: "div",
        attributes: [["class", "create-event-page"]],
        children: [
            {
                tag: "div",
                attributes: [["class", "create-event-container"]],
                children: [
                    {
                        tag: "div",
                        attributes: [["class", "create-event-header"]],
                        children: [
                            {
                                tag: "h1",
                                attributes: [["class", "create-event-title"]],
                                children: ["Créer un nouvel événement"]
                            },
                            {
                                tag: "p",
                                attributes: [["class", "create-event-subtitle"]],
                                children: ["Partagez votre passion avec la communauté"]
                            }
                        ]
                    },
                    {
                        tag: "form",
                        attributes: [["id", "create-event-form"], ["class", "create-event-form"]],
                        events: {
                            submit: [
                                async function (event) {
                                    event.preventDefault();
                                    await creerEvenement(event.target);
                                }
                            ]
                        },
                        children: [
                            {
                                tag: "div",
                                attributes: [["class", "form-row"]],
                                children: [
                                    {
                                        tag: "div",
                                        attributes: [["class", "form-group"]],
                                        children: [
                                            {
                                                tag: "label",
                                                attributes: [["for", "event-nom"]],
                                                children: ["Nom de l'événement *"]
                                            },
                                            {
                                                tag: "input",
                                                attributes: [
                                                    ["type", "text"],
                                                    ["id", "event-nom"],
                                                    ["name", "nom"],
                                                    ["required", "required"],
                                                    ["placeholder", "Donnez un nom accrocheur à votre événement"]
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        tag: "div",
                                        attributes: [["class", "form-group"]],
                                        children: [
                                            {
                                                tag: "label",
                                                attributes: [["for", "event-type"]],
                                                children: ["Catégorie *"]
                                            },
                                            {
                                                tag: "input",
                                                attributes: [
                                                    ["type", "text"],
                                                    ["id", "event-type"],
                                                    ["name", "categorie"],
                                                    ["required", "required"],
                                                    ["placeholder", "Ex: Concert, Conférence, Sport..."]
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                attributes: [["class", "form-row"]],
                                children: [
                                    {
                                        tag: "div",
                                        attributes: [["class", "form-group"]],
                                        children: [
                                            {
                                                tag: "label",
                                                attributes: [["for", "event-date"]],
                                                children: ["Date et heure *"]
                                            },
                                            {
                                                tag: "input",
                                                attributes: [
                                                    ["type", "datetime-local"],
                                                    ["id", "event-date"],
                                                    ["name", "date"],
                                                    ["required", "required"]
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        tag: "div",
                                        attributes: [["class", "form-group"]],
                                        children: [
                                            {
                                                tag: "label",
                                                attributes: [["for", "event-prix"]],
                                                children: ["Prix (€)"]
                                            },
                                            {
                                                tag: "input",
                                                attributes: [
                                                    ["type", "number"],
                                                    ["id", "event-prix"],
                                                    ["name", "prix"],
                                                    ["min", "0"],
                                                    ["step", "0.01"],
                                                    ["placeholder", "0.00 (gratuit)"]
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                attributes: [["class", "form-group"]],
                                children: [
                                    {
                                        tag: "label",
                                        attributes: [["for", "event-adresse"]],
                                        children: ["Adresse du lieu *"]
                                    },
                                    {
                                        tag: "input",
                                        attributes: [
                                            ["type", "text"],
                                            ["id", "event-adresse"],
                                            ["name", "adresse"],
                                            ["required", "required"],
                                            ["placeholder", "Adresse complète du lieu"]
                                        ]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                attributes: [["class", "form-row"]],
                                children: [
                                    {
                                        tag: "div",
                                        attributes: [["class", "form-group"]],
                                        children: [
                                            {
                                                tag: "label",
                                                attributes: [["for", "event-public"]],
                                                children: ["Visibilité *"]
                                            },
                                            {
                                                tag: "select",
                                                attributes: [
                                                    ["id", "event-public"],
                                                    ["name", "est_public"],
                                                    ["required", "required"]
                                                ],
                                                children: [
                                                    {
                                                        tag: "option",
                                                        attributes: [["value", ""]],
                                                        children: ["Choisir..."]
                                                    },
                                                    {
                                                        tag: "option",
                                                        attributes: [["value", "true"]],
                                                        children: ["Public"]
                                                    },
                                                    {
                                                        tag: "option",
                                                        attributes: [["value", "false"]],
                                                        children: ["Privé"]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        tag: "div",
                                        attributes: [["class", "form-group"]],
                                        children: [
                                            {
                                                tag: "label",
                                                attributes: [["for", "event-places"]],
                                                children: ["Nombre de places *"]
                                            },
                                            {
                                                tag: "input",
                                                attributes: [
                                                    ["type", "number"],
                                                    ["id", "event-places"],
                                                    ["name", "nombre_places"],
                                                    ["min", "1"],
                                                    ["required", "required"],
                                                    ["placeholder", "Ex: 50"]
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                attributes: [["class", "form-group"]],
                                children: [
                                    {
                                        tag: "label",
                                        attributes: [["for", "event-image"]],
                                        children: ["Image de l'événement"]
                                    },
                                    {
                                        tag: "input",
                                        attributes: [
                                            ["type", "file"],
                                            ["id", "event-image"],
                                            ["name", "image"],
                                            ["accept", "image/jpeg,image/jpg,image/png,image/webp"]
                                        ]
                                    },
                                    {
                                        tag: "small",
                                        attributes: [["class", "form-help"]],
                                        children: ["JPEG, PNG, WebP - Max 5MB"]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                attributes: [["class", "form-group"]],
                                children: [
                                    {
                                        tag: "label",
                                        attributes: [["for", "event-description-courte"]],
                                        children: ["Description courte"]
                                    },
                                    {
                                        tag: "textarea",
                                        attributes: [
                                            ["id", "event-description-courte"],
                                            ["name", "description_courte"],
                                            ["rows", "3"],
                                            ["maxlength", "200"],
                                            ["placeholder", "Résumé de votre événement (200 caractères max)"]
                                        ]
                                    },
                                    {
                                        tag: "small",
                                        attributes: [["class", "form-help character-count"]],
                                        children: ["0/200 caractères"]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                attributes: [["class", "form-group"]],
                                children: [
                                    {
                                        tag: "label",
                                        attributes: [["for", "event-description-longue"]],
                                        children: ["Description détaillée"]
                                    },
                                    {
                                        tag: "textarea",
                                        attributes: [
                                            ["id", "event-description-longue"],
                                            ["name", "description_longue"],
                                            ["rows", "5"],
                                            ["placeholder", "Décrivez votre événement en détail..."]
                                        ]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                attributes: [["class", "form-actions"]],
                                children: [
                                    {
                                        tag: "button",
                                        attributes: [["type", "button"], ["class", "btn-secondary"], ["onclick", "window.history.back()"]],
                                        children: ["Annuler"]
                                    },
                                    {
                                        tag: "button",
                                        attributes: [["type", "submit"], ["class", "btn-primary"]],
                                        children: ["Créer l'événement"]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
}

async function creerEvenement(form) {
    try {
        const formData = new FormData(form);
        const currentUser = JSON.parse(localStorage.getItem('user'));
        
        if (!currentUser || !currentUser.id) {
            alert('Vous devez être connecté pour créer un événement');
            window.router.navigate('/connexion');
            return;
        }

        showNotification('Création de l\'événement en cours...', 'info');

        // Gestion de l'upload d'image
        let imageUrl = '/Assets/images/eventImage.png'; // Image par défaut
        const imageFile = formData.get('image');
        
        if (imageFile && imageFile.size > 0) {
            try {
                // Import du service d'upload
                const { uploadCommunauteImage } = await import('../Services/storageService.js');
                imageUrl = await uploadCommunauteImage(imageFile, currentUser.id);
            } catch (imageError) {
                showNotification('Erreur lors de l\'upload de l\'image, image par défaut utilisée', 'warning');
            }
        }

        const eventData = {
            nom: formData.get('nom'),
            categorie: formData.get('categorie'),
            date: formData.get('date'),
            prix: parseFloat(formData.get('prix')) || 0,
            adresse: formData.get('adresse'),
            est_public: formData.get('est_public') === 'true',
            nombre_places: parseInt(formData.get('nombre_places')),
            nombre_places_disponibles: parseInt(formData.get('nombre_places')),
            image: imageUrl,
            description_courte: formData.get('description_courte'),
            description_longue: formData.get('description_longue'),
            organisateur_id: currentUser.id
        };

        const result = await createEvent(eventData);
        
        if (result.success) {
            showNotification(result.message, 'success');
            setTimeout(() => {
                // Rediriger vers la page de détails de l'événement créé
                if (result.event && result.event.id) {
                    window.router.navigate(`/evenements/${result.event.id}`);
                } else {
                    // Fallback vers la page compte si pas d'ID
                    window.router.navigate('/compte');
                }
            }, 2000);
        }

    } catch (error) {
        showNotification(error.message || 'Erreur lors de la création de l\'événement', 'error');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {success: '#4CAF50', error: '#f44336', info: '#2196F3', warning: '#ff9800'};
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${colors[type] || colors.info};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => { 
        notification.style.opacity = '1'; 
        notification.style.transform = 'translateX(0)'; 
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Compteur de caractères pour la description courte
setTimeout(() => {
    const textarea = document.getElementById('event-description-courte');
    const counter = document.querySelector('.character-count');
    
    if (textarea && counter) {
        textarea.addEventListener('input', function() {
            const count = this.value.length;
            counter.textContent = `${count}/200 caractères`;
            counter.style.color = count > 180 ? '#ff9800' : count === 200 ? '#f44336' : '#666';
        });
    }
}, 100);
