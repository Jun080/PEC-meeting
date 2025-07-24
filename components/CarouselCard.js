export function CarouselCard(eventData) {
    const {
        id,
        title,
        description,
        image,
        date,
        time,
        location,
        price,
        showPrice = true,
        variant = 'light'
    } = eventData;

    const formatPrice = (price) => {
        if (price === 0 || price === "0") return "Gratuit";
        if (typeof price === "number") return `${price}€`;
        return price;
    };

    const formattedPrice = formatPrice(price);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        const month = months[date.getMonth()];
        const day = date.getDate().toString().padStart(2, '0');
        return { month, day };
    };

    const { month, day } = formatDate(date);

    return {
        tag: "div",
        attributes: [
            ["class", `carousel-card ${variant}`],
            ["data-event-id", id]
        ],
        children: [
            {
                tag: "div",
                attributes: [
                    ["class", "carousel-card-image-container"]
                ],
                children: [
                    {
                        tag: "img",
                        attributes: [
                            ["src", image || "/Assets/images/eventImage.png"],
                            ["alt", title],
                            ["class", "carousel-card-image"]
                        ],
                        children: []
                    },
                    ...(showPrice && price !== undefined ? [{
                        tag: "div",
                        attributes: [
                            ["class", "pastille pastille-dark-imperial-blue"]
                        ],
                        children: [formattedPrice]
                    }] : [])
                ]
            },

            {
                tag: "div",
                attributes: [
                    ["class", "carousel-card-content"]
                ],
                children: [
                    {
                        tag: "div",
                        attributes: [
                            ["class", "carousel-card-datetime"]
                        ],
                        children: [
                            {
                                tag: "div",
                                attributes: [
                                    ["class", "carousel-card-date"]
                                ],
                                children: [
                                    {
                                        tag: "div",
                                        attributes: [
                                            ["class", "carousel-card-month"]
                                        ],
                                        children: [month]
                                    },
                                    {
                                        tag: "div",
                                        attributes: [
                                            ["class", "carousel-card-day"]
                                        ],
                                        children: [day]
                                    }
                                ]
                            },
                            {
                                tag: "div",
                                attributes: [
                                    ["class", "carousel-card-time"]
                                ],
                                children: [time]
                            }
                        ]
                    },

                    {
                        tag: "div",
                        attributes: [
                            ["class", "carousel-card-separator"]
                        ],
                        children: []
                    },

                    {
                        tag: "div",
                        attributes: [
                            ["class", "carousel-card-details"]
                        ],
                        children: [
                            {
                                tag: "div",
                                attributes: [
                                    ["class", "carousel-card-location"]
                                ],
                                children: [
                                    {
                                        tag: "span",
                                        attributes: [
                                            ["class", "carousel-card-location-icon"]
                                        ],
                                        children: ["📍"]
                                    },
                                    {
                                        tag: "span",
                                        attributes: [
                                            ["class", "carousel-card-location-text"]
                                        ],
                                        children: [location]
                                    }
                                ]
                            },

                            {
                                tag: "h3",
                                attributes: [
                                    ["class", "carousel-card-title"]
                                ],
                                children: [title]
                            },

                            {
                                tag: "p",
                                attributes: [
                                    ["class", "carousel-card-description"]
                                ],
                                children: [description]
                            }
                        ]
                    }
                ]
            }
        ]
    };
}

export default CarouselCard;
