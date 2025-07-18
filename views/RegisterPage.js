import { createUser } from "../Models/userModel.js";

export default function UserPage() {
    return {
        tag: "form",
        events: {
            submit: [
                async function (event) {
                    event.preventDefault();
                    const form = event.target;
                    const prenom = form.elements["prenom"].value;
                    const nom = form.elements["nom"].value;
                    const mail = form.elements["mail"].value;
                    const tel = form.elements["tel"].value;
                    const mot_de_passe = form.elements["mot_de_passe"].value;
                    const date_naissance = form.elements["date_naissance"].value;
                    const centres_interet = form.elements["centres_interet"].value
                        ? form.elements["centres_interet"].value.split(",").map(s => s.trim())
                        : null;
                    const lieu = form.elements["lieu"].value;
                    const role = form.elements["role"].value;

                    try {
                        const hashedPassword = await window.dcodeIO.bcrypt.hash(mot_de_passe, 10);
                        await createUser({
                            prenom,
                            nom,
                            mail,
                            tel,
                            mot_de_passe: hashedPassword,
                            date_naissance: date_naissance || null,
                            centres_interet,
                            lieu,
                            role,
                        });
                        alert("Utilisateur créé !");
                        form.reset();
                    } catch (e) {
                        alert("Erreur: " + e.message);
                    }
                },
            ],
        },
        children: [
            { tag: "input", attributes: [["name", "prenom"], ["placeholder", "Prénom"], ["required", true]] },
            { tag: "input", attributes: [["name", "nom"], ["placeholder", "Nom"], ["required", true]] },
            { tag: "input", attributes: [["name", "mail"], ["placeholder", "Email"], ["type", "email"], ["required", true]] },
            { tag: "input", attributes: [["name", "tel"], ["placeholder", "Téléphone"]] },
            { tag: "input", attributes: [["name", "mot_de_passe"], ["placeholder", "Mot de passe"], ["type", "password"], ["required", true]] },
            { tag: "input", attributes: [["name", "date_naissance"], ["placeholder", "Date de naissance"], ["type", "date"]] },
            { tag: "input", attributes: [["name", "centres_interet"], ["placeholder", "Centres d'intérêt (séparés par des virgules)"]] },
            { tag: "input", attributes: [["name", "lieu"], ["placeholder", "Lieu"]] },
            { tag: "input", attributes: [["name", "role"], ["placeholder", "Rôle"]] },
            { tag: "button", attributes: [["type", "submit"]], children: ["Créer"] },
        ],
    };
}