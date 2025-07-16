import VerticalCard from "../components/VerticalCard.js";
import HorizontalCard from "../components/HorizontalCard.js";

const Bienvenue = function () {
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
                                title: "Concert d'Ilian",
                                date: "12 avril 2025 - 19h",
                                place: "Paris",
                                price: "7€",
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
};

export default Bienvenue;
