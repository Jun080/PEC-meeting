import VerticalCard from "../components/VerticalCard.js";
import HorizontalCard from "../components/HorizontalCard.js";
import { getAllPopularEvents } from "../Services/eventService.js";

function formatEventDate(dateString) {
    if (!dateString) return "Date inconnue";
    const date = new Date(dateString);
    const optionsDate = { day: "2-digit", month: "long", year: "numeric" };
    const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: false };
    const datePart = date.toLocaleDateString("fr-FR", optionsDate);
    const timePart = date.toLocaleTimeString("fr-FR", optionsTime);
    return `${datePart} - ${timePart}`;
}

export default async function Bienvenue() {
    // Récupérer les 4 premiers événements populaires triés par places achetées
    let topEvents = [];
    try {
        const events = await getAllPopularEvents();
        topEvents = events.slice(0, 4);
    } catch (e) {
        topEvents = [];
    }

    return {
        tag: "div",
        attributes: [["class", "welcome"]],
        children: [
            {
                tag: "h1",
                attributes: [["class", "h1-big"]],
                children: ["Première fois sur le site ?"],
            },
            {
                tag: "section",
                attributes: [["class", "first-section"]],
                children: [
                    {
                        tag: "div",
                        children: [
                            {
                                tag: "h2",
                                attributes: [["class", "h2-big"]],
                                children: ["Top !"],
                            },
                            {
                                tag: "p",
                                attributes: [["class", "p-highlight"]],
                                children: ["de la semaine"],
                            },
                        ],
                    },
                    {
                        tag: "div",
                        attributes: [["class", "cards-row"]],
                        children: topEvents.map((event) =>
                            VerticalCard({
                                imageUrl:
                                    event.imageUrl ||
                                    "../Assets/images/eventImage.png",
                                title: event.title || event.nom || "Événement",
                                date:
                                    event.date || event.date_event
                                        ? formatEventDate(
                                              event.date || event.date_event
                                          )
                                        : "Date inconnue",
                                place:
                                    event.place || event.lieu || "Lieu inconnu",
                                price:
                                    event.price ||
                                    (event.prix
                                        ? event.prix + "€"
                                        : "Prix inconnu"),
                            })
                        ),
                    },
                ],
            },
            {
                tag: "section",
                attributes: [["class", "second-section"]],
                children: [
                    {
                        tag: "img",
                        attributes: [["src", "../Assets/images/image1.png"]],
                    },
                    {
                        tag: "div",
                        attributes: [["class", "banner"]],
                        children: [
                            {
                                tag: "h2",
                                attributes: [["class", "h2"]],
                                children: ["Pas intéressé.e ?"],
                            },
                            {
                                tag: "p",
                                attributes: [["class", "p"]],
                                children: [
                                    "Recherche l'évènnement de tes rêves et plus encore !",
                                ],
                            },
                            {
                                tag: "button",
                                attributes: [["class", "bouton-primary-1"]],
                                children: ["rechercher"],
                            },
                        ],
                    },
                ],
            },
            {
                tag: "section",
                attributes: [["class", "third-section"]],
                children: [
                    {
                        tag: "h2",
                        attributes: [["class", "h2-big"]],
                        children: ["Évennements spécialement pour vous !"],
                    },
                    {
                        tag: "div",
                        attributes: [["class", "cards-row"]],
                        children: [
                            VerticalCard({
                                imageUrl: "../Assets/images/eventImage.png",
                                title: "Night Tapes",
                                date: "18 novembre 2025 - 19:30",
                                place: "Point Ephémère - Paris",
                                price: "18,13€",
                            }),
                            VerticalCard({
                                imageUrl: "../Assets/images/eventImage.png",
                                title: "Comedy Pigalle",
                                date: "À partir de 1,50€",
                                place: "Paris",
                                price: "",
                            }),
                            VerticalCard({
                                imageUrl: "../Assets/images/eventImage.png",
                                title: "Jeux de Société",
                                date: "13 juin 2025",
                                place: "Paris",
                                price: "5€",
                            }),
                            VerticalCard({
                                imageUrl: "../Assets/images/eventImage.png",
                                title: "DAY TRIP",
                                date: "10 septembre 2025",
                                place: "Etretat",
                                price: "18,13€",
                            }),
                        ],
                    },
                ],
            },
            {
                tag: "section",
                attributes: [["class", "fourth-section"]],
                children: [
                    {
                        tag: "h2",
                        attributes: [["class", "h2-big"]],
                        children: ["Évennements proches de chez vous"],
                    },
                    {
                        tag: "div",
                        children: [
                            {
                                tag: "div",
                                children: ["Map placeholder"],
                            },
                            {
                                tag: "div",
                                attributes: [["class", "map-cards"]],
                                children: [
                                    HorizontalCard({
                                        imageUrl:
                                            "../Assets/images/eventImage.png",
                                        title: "Night Tapes",
                                        date: "18 novembre 2025 - 19:30",
                                        place: "Point Ephémère - Paris",
                                        price: "18,13€",
                                    }),
                                    HorizontalCard({
                                        imageUrl:
                                            "../Assets/images/eventImage.png",
                                        title: "Night Tapes",
                                        date: "18 novembre 2025 - 19:30",
                                        place: "Point Ephémère - Paris",
                                        price: "18,13€",
                                    }),
                                    HorizontalCard({
                                        imageUrl:
                                            "../Assets/images/eventImage.png",
                                        title: "Night Tapes",
                                        date: "18 novembre 2025 - 19:30",
                                        place: "Point Ephémère - Paris",
                                        price: "18,13€",
                                    }),
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                tag: "section",
                attributes: [["class", "fifth-section"]],
                children: [
                    {
                        tag: "h2",
                        attributes: [["class", "h2-footer"]],
                        children: ["Convaincu ?"],
                    },
                    {
                        tag: "button",
                        attributes: [["class", "bouton-primary-1"]],
                        children: ["Accéder à la page d'accueil"],
                    },
                ],
            },
        ],
    };
}
