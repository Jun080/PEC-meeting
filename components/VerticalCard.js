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
                                children: [title || "Titre de l'événement"],
                            },
                            {
                                tag: "div",
                                attributes: [["class", "card-date"]],
                                children: [
                                    {
                                        tag: "p",
                                        children: [date || "Date non définie"],
                                    },
                                    {
                                        tag: "p",
                                        children: [place || "Lieu non défini"],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        tag: "p",
                        children: [price || "Prix non défini"],
                    },
                ],
            },
        ],
    };
};

export default VerticalCard;
