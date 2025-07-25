import { client } from '../supabase.js';
import { authService } from '../Services/authService.js';
import { getEventById } from '../Services/eventService.js';

const EditEvent = async function () {
    if (!authService.isLoggedIn() && !authService.checkLocalAuth()) {
        window.location.pathname = '/connexion';
        return null;
    }

    const eventId = window.location.pathname.split('/').pop();
    const event = await getEventById(eventId);

    if (!event) {
        window.location.pathname = '/dashboard';
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            console.log('Structure de l\'événement actuel:', Object.keys(event));
            console.log('Événement actuel:', event);

            const dateValue = formData.get('date');
            console.log('Date from form:', dateValue);

            const updateData = {
                nom: formData.get('nom'),
                description_longue: formData.get('description'),
                description_courte: formData.get('description_courte'),
                adresse: formData.get('adresse')
            };

            try {
                const localDate = new Date(dateValue);
                console.log('Local date object:', localDate);
                if (!isNaN(localDate.getTime())) {
                    updateData.date = localDate.toISOString();
                } else {
                    throw new Error('Date invalide');
                }
            } catch (dateError) {
                console.error('Erreur de conversion de la date:', dateError);
                alert('La date fournie est invalide');
                return;
            }

            const nombrePlaces = parseInt(formData.get('nombre_places'));
            if (isNaN(nombrePlaces) || nombrePlaces < 1) {
                alert('Le nombre de places doit être un nombre positif');
                return;
            }

            const placesOccupees = event.nombre_places - (event.nombre_places_disponibles || 0);
            const nombrePlacesDisponibles = Math.max(0, nombrePlaces - placesOccupees);

            updateData.nombre_places = nombrePlaces;
            updateData.nombre_places_disponibles = nombrePlacesDisponibles;

            console.log('Données à mettre à jour:', updateData);

            const { data, error } = await client
                .from('evenements')
                .update(updateData)
                .eq('id', eventId)
                .select();

            console.log('Réponse Supabase:', { data, error });

            if (error) {
                console.error('Erreur Supabase:', error);
                throw error;
            }

            window.location.pathname = '/dashboard';
        } catch (error) {
            console.error('Erreur détaillée:', error);
            alert(`Erreur lors de la modification de l'événement: ${error.message || error}`);
        }
    };

    return {
        tag: "div",
        attributes: [["class", "create-event-page"]],
        children: [
            {
                tag: "h1",
                attributes: [["class", "h1"]],
                children: ["Modifier l'événement"]
            },
            {
                tag: "form",
                attributes: [["class", "create-event-form"]],
                events: {
                    submit: [handleSubmit]
                },
                children: [
                    {
                        tag: "div",
                        attributes: [["class", "form-group"]],
                        children: [
                            {
                                tag: "label",
                                attributes: [["for", "nom"]],
                                children: ["Nom de l'événement"]
                            },
                            {
                                tag: "input",
                                attributes: [
                                    ["type", "text"],
                                    ["id", "nom"],
                                    ["name", "nom"],
                                    ["value", event.nom],
                                    ["required", "true"]
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
                                attributes: [["for", "description_courte"]],
                                children: ["Description courte"]
                            },
                            {
                                tag: "textarea",
                                attributes: [
                                    ["id", "description_courte"],
                                    ["name", "description_courte"],
                                    ["maxlength", "100"],
                                    ["required", "true"]
                                ],
                                children: [event.description_courte || '']
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attributes: [["class", "form-group"]],
                        children: [
                            {
                                tag: "label",
                                attributes: [["for", "description"]],
                                children: ["Description détaillée"]
                            },
                            {
                                tag: "textarea",
                                attributes: [
                                    ["id", "description"],
                                    ["name", "description"],
                                    ["required", "true"]
                                ],
                                children: [event.description_longue || '']
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attributes: [["class", "form-group"]],
                        children: [
                            {
                                tag: "label",
                                attributes: [["for", "date"]],
                                children: ["Date et heure"]
                            },
                            {
                                tag: "input",
                                attributes: [
                                    ["type", "datetime-local"],
                                    ["id", "date"],
                                    ["name", "date"],
                                    ["value", new Date(event.date).toISOString().slice(0, 16)],
                                    ["required", "true"]
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
                                attributes: [["for", "adresse"]],
                                children: ["Adresse"]
                            },
                            {
                                tag: "input",
                                attributes: [
                                    ["type", "text"],
                                    ["id", "adresse"],
                                    ["name", "adresse"],
                                    ["value", event.adresse || ''],
                                    ["required", "true"]
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
                                attributes: [["for", "nombre_places"]],
                                children: ["Nombre de places"]
                            },
                            {
                                tag: "input",
                                attributes: [
                                    ["type", "number"],
                                    ["id", "nombre_places"],
                                    ["name", "nombre_places"],
                                    ["value", event.nombre_places],
                                    ["min", "1"],
                                    ["required", "true"]
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
                                attributes: [
                                    ["type", "submit"],
                                    ["class", "bouton-primary"]
                                ],
                                children: ["Enregistrer les modifications"]
                            }
                        ]
                    }
                ]
            }
        ]
    };
};

export default EditEvent;
