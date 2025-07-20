const VerticalCard = ({ imageUrl, title, place, description, eventsCount }) => {
    return {
        tag: "div",
        attributes: [["class", "vertical-card custom-comm-card"]],
        children: [
            {
                tag: "img",
                attributes: [
                    ["src", imageUrl || "../Assets/images/eventImage.png"],
                    ["class", "comm-card-img"]
                ],
            },
            {
                tag: "div",
                attributes: [["class", "comm-card-content"]],
                children: [
                    {
                        tag: "p",
                        attributes: [["class", "comm-card-title"]],
                        children: [title || "Nom de la communauté"],
                    },
                    {
                        tag: "p",
                        attributes: [["class", "comm-card-place"]],
                        children: [place || "Lieu non défini"],
                    },
                    {
                        tag: "p",
                        attributes: [["class", "comm-card-desc"]],
                        children: [description || "Description non renseignée"],
                    },
                    eventsCount !== undefined ? {
                        tag: "p",
                        attributes: [["class", "comm-card-events"]],
                        children: [eventsCount + " événements"]
                    } : null
                ].filter(Boolean)
            },
        ],
    };
};

export default VerticalCard;
