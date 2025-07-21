const VerticalCard = ({ imageUrl, title, date, place, price }) => {
    return {
        tag: "div",
        attributes: [["class", "vertical-card"]],
        children: [
            {
                tag: "img",
                attributes: [
                    ["src", imageUrl || "../Assets/images/eventImage.png"],
                ],
            },
            {
                tag: "div",
                attributes: [["class", "card-content"]],
                children: [
                    {
                        tag: "div",
                        attributes: [["class", "card-text"]],
                        children: [
                            {
                                tag: "p",
                                attributes: [["class", "h2"]],
                                children: [title || "Titre de l'événement"],
                            },
                            {
                                tag: "div",
                                attributes: [["class", "card-date"]],
                                children: [
                                    {
                                        tag: "p",
                                        attributes: [["class", "p-highlight"]],
                                        children: [date || "Date non définie"],
                                    },
                                    {
                                        tag: "p",
                                        attributes: [["class", "p-highlight"]],
                                        children: [place || "Lieu non défini"],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        tag: "p",
                        attributes: [["class", "h2"]],
                        children: [price || "Prix non défini"],
                    },
                ],
            },
        ],
    };
};

export default VerticalCard;
