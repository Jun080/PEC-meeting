import { client } from '../supabase.js';
import { authService } from '../Services/authService.js';
import { getCommunauteById } from '../Models/communauteModel.js';

const EditCommunaute = async function () {
    if (!authService.isLoggedIn() && !authService.checkLocalAuth()) {
        window.location.pathname = '/connexion';
        return null;
    }

    const communauteId = window.location.pathname.split('/').pop();
    const communaute = await getCommunauteById(communauteId);

    if (!communaute) {
        window.location.pathname = '/dashboard';
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const { error } = await client
                .from('communautes')
                .update({
                    nom: formData.get('nom'),
                    description: formData.get('description'),
                    lieu: formData.get('lieu')
                })
                .eq('id', communauteId);

            if (error) throw error;
            window.location.pathname = '/dashboard';
        } catch (error) {
            console.error('Erreur lors de la modification:', error);
            alert('Erreur lors de la modification de la communauté');
        }
    };

    return {
        tag: "div",
        attributes: [["class", "create-event-page"]],
        children: [
            {
                tag: "h1",
                attributes: [["class", "h1"]],
                children: ["Modifier la communauté"]
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
                                children: ["Nom de la communauté"]
                            },
                            {
                                tag: "input",
                                attributes: [
                                    ["type", "text"],
                                    ["id", "nom"],
                                    ["name", "nom"],
                                    ["value", communaute.nom],
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
                                attributes: [["for", "description"]],
                                children: ["Description"]
                            },
                            {
                                tag: "textarea",
                                attributes: [
                                    ["id", "description"],
                                    ["name", "description"],
                                    ["required", "true"]
                                ],
                                children: [communaute.description || '']
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attributes: [["class", "form-group"]],
                        children: [
                            {
                                tag: "label",
                                attributes: [["for", "lieu"]],
                                children: ["Lieu"]
                            },
                            {
                                tag: "input",
                                attributes: [
                                    ["type", "text"],
                                    ["id", "lieu"],
                                    ["name", "lieu"],
                                    ["value", communaute.lieu || '']
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

export default EditCommunaute;
