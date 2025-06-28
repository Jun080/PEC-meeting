import VerticalCard from "../components/VerticalCard.js";

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
                                tag: "h3",
                                children: ["Pas intéressé.e ?"],
                            },
                            {
                                tag: "p",
                                children: [
                                    "Recherche l'évènnement de tes rêves et plus encore !",
                                ],
                            },
                            {
                                tag: "button",
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
                        children: ["Évènnements spécialement pour vous !"],
                    },
                    {
                        tag: "div",
                        attributes: [["class", "cards-row"]],
                        children: [
                            {
                                tag: "div",
                                attributes: [["class", "vertical-card"]],
                                children: [
                                    {
                                        tag: "img",
                                        attributes: [
                                            [
                                                "src",
                                                "../Assets/images/eventImage.png",
                                            ],
                                        ],
                                    },
                                    {
                                        tag: "div",
                                        attributes: [["class", "card-content"]],
                                        children: [
                                            {
                                                tag: "div",
                                                attributes: [
                                                    ["class", "card-text"],
                                                ],
                                                children: [
                                                    {
                                                        tag: "p",
                                                        children: [
                                                            "Night Tapes",
                                                        ],
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [
                                                            [
                                                                "class",
                                                                "card-date",
                                                            ],
                                                        ],
                                                        children: [
                                                            {
                                                                tag: "p",
                                                                children: [
                                                                    "18 novembre 2025 - 19:30",
                                                                ],
                                                            },
                                                            {
                                                                tag: "p",
                                                                children: [
                                                                    "Point Ephémère - Paris",
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                tag: "p",
                                                children: ["18,9€"],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                tag: "div",
                                attributes: [["class", "vertical-card"]],
                                children: [
                                    {
                                        tag: "img",
                                        attributes: [
                                            [
                                                "src",
                                                "../Assets/images/eventImage.png",
                                            ],
                                        ],
                                    },
                                    {
                                        tag: "div",
                                        attributes: [["class", "card-content"]],
                                        children: [
                                            {
                                                tag: "div",
                                                attributes: [
                                                    ["class", "card-text"],
                                                ],
                                                children: [
                                                    {
                                                        tag: "p",
                                                        children: [
                                                            "Night Tapes",
                                                        ],
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [
                                                            [
                                                                "class",
                                                                "card-date",
                                                            ],
                                                        ],
                                                        children: [
                                                            {
                                                                tag: "p",
                                                                children: [
                                                                    "18 novembre 2025 - 19:30",
                                                                ],
                                                            },
                                                            {
                                                                tag: "p",
                                                                children: [
                                                                    "Point Ephémère - Paris",
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                tag: "p",
                                                children: ["18,9€"],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                tag: "div",
                                attributes: [["class", "vertical-card"]],
                                children: [
                                    {
                                        tag: "img",
                                        attributes: [
                                            [
                                                "src",
                                                "../Assets/images/eventImage.png",
                                            ],
                                        ],
                                    },
                                    {
                                        tag: "div",
                                        attributes: [["class", "card-content"]],
                                        children: [
                                            {
                                                tag: "div",
                                                attributes: [
                                                    ["class", "card-text"],
                                                ],
                                                children: [
                                                    {
                                                        tag: "p",
                                                        children: [
                                                            "Night Tapes",
                                                        ],
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [
                                                            [
                                                                "class",
                                                                "card-date",
                                                            ],
                                                        ],
                                                        children: [
                                                            {
                                                                tag: "p",
                                                                children: [
                                                                    "18 novembre 2025 - 19:30",
                                                                ],
                                                            },
                                                            {
                                                                tag: "p",
                                                                children: [
                                                                    "Point Ephémère - Paris",
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                tag: "p",
                                                children: ["18,9€"],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                tag: "div",
                                attributes: [["class", "vertical-card"]],
                                children: [
                                    {
                                        tag: "img",
                                        attributes: [
                                            [
                                                "src",
                                                "../Assets/images/eventImage.png",
                                            ],
                                        ],
                                    },
                                    {
                                        tag: "div",
                                        attributes: [["class", "card-content"]],
                                        children: [
                                            {
                                                tag: "div",
                                                attributes: [
                                                    ["class", "card-text"],
                                                ],
                                                children: [
                                                    {
                                                        tag: "p",
                                                        children: [
                                                            "Night Tapes",
                                                        ],
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [
                                                            [
                                                                "class",
                                                                "card-date",
                                                            ],
                                                        ],
                                                        children: [
                                                            {
                                                                tag: "p",
                                                                children: [
                                                                    "18 novembre 2025 - 19:30",
                                                                ],
                                                            },
                                                            {
                                                                tag: "p",
                                                                children: [
                                                                    "Point Ephémère - Paris",
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                tag: "p",
                                                children: ["18,9€"],
                                            },
                                        ],
                                    },
                                ],
                            },
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
                        children: ["Évennements proches de chez vous"],
                    },
                    {
                        tag: "div",
                        children: [
                            {
                                tag: "div",
                                children: ["Map"],
                            },
                            {
                                tag: "div",
                                attributes: [["class", "map-cards"]],
                                children: [
                                    {
                                        tag: "div",
                                        children: [
                                            {
                                                tag: "img",
                                                attributes: [
                                                    [
                                                        "src",
                                                        "../Assets/images/eventImage.png",
                                                    ],
                                                ],
                                            },
                                            {
                                                tag: "div",
                                                attributes: [
                                                    ["class", "card-content"],
                                                ],
                                                children: [
                                                    {
                                                        tag: "div",
                                                        attributes: [
                                                            [
                                                                "class",
                                                                "card-text",
                                                            ],
                                                        ],
                                                        children: [
                                                            {
                                                                tag: "p",
                                                                children: [
                                                                    "Night Tapes",
                                                                ],
                                                            },
                                                            {
                                                                tag: "div",
                                                                attributes: [
                                                                    [
                                                                        "class",
                                                                        "card-date",
                                                                    ],
                                                                ],
                                                                children: [
                                                                    {
                                                                        tag: "p",
                                                                        children:
                                                                            [
                                                                                "18 novembre 2025 - 19:30",
                                                                            ],
                                                                    },
                                                                    {
                                                                        tag: "p",
                                                                        children:
                                                                            [
                                                                                "Point Ephémère - Paris",
                                                                            ],
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        tag: "p",
                                                        children: ["18,9€"],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        tag: "div",
                                        children: [
                                            {
                                                tag: "img",
                                                attributes: [
                                                    [
                                                        "src",
                                                        "../Assets/images/eventImage.png",
                                                    ],
                                                ],
                                            },
                                            {
                                                tag: "div",
                                                attributes: [
                                                    ["class", "card-content"],
                                                ],
                                                children: [
                                                    {
                                                        tag: "div",
                                                        attributes: [
                                                            [
                                                                "class",
                                                                "card-text",
                                                            ],
                                                        ],
                                                        children: [
                                                            {
                                                                tag: "p",
                                                                children: [
                                                                    "Night Tapes",
                                                                ],
                                                            },
                                                            {
                                                                tag: "div",
                                                                attributes: [
                                                                    [
                                                                        "class",
                                                                        "card-date",
                                                                    ],
                                                                ],
                                                                children: [
                                                                    {
                                                                        tag: "p",
                                                                        children:
                                                                            [
                                                                                "18 novembre 2025 - 19:30",
                                                                            ],
                                                                    },
                                                                    {
                                                                        tag: "p",
                                                                        children:
                                                                            [
                                                                                "Point Ephémère - Paris",
                                                                            ],
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        tag: "p",
                                                        children: ["18,9€"],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        tag: "div",
                                        children: [
                                            {
                                                tag: "img",
                                                attributes: [
                                                    [
                                                        "src",
                                                        "../Assets/images/eventImage.png",
                                                    ],
                                                ],
                                            },
                                            {
                                                tag: "div",
                                                attributes: [
                                                    ["class", "card-content"],
                                                ],
                                                children: [
                                                    {
                                                        tag: "div",
                                                        attributes: [
                                                            [
                                                                "class",
                                                                "card-text",
                                                            ],
                                                        ],
                                                        children: [
                                                            {
                                                                tag: "p",
                                                                children: [
                                                                    "Night Tapes",
                                                                ],
                                                            },
                                                            {
                                                                tag: "div",
                                                                attributes: [
                                                                    [
                                                                        "class",
                                                                        "card-date",
                                                                    ],
                                                                ],
                                                                children: [
                                                                    {
                                                                        tag: "p",
                                                                        children:
                                                                            [
                                                                                "18 novembre 2025 - 19:30",
                                                                            ],
                                                                    },
                                                                    {
                                                                        tag: "p",
                                                                        children:
                                                                            [
                                                                                "Point Ephémère - Paris",
                                                                            ],
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        tag: "p",
                                                        children: ["18,9€"],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
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
                        children: ["Convaincu ?"],
                    },
                    {
                        tag: "button",
                        children: ["Accéder à la page d'accueil"],
                    },
                ],
            },
        ],
    };
};

export default Bienvenue;
