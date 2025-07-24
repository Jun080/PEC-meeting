export function CommunityCarouselCard({ id, nom, description, image, member_count, variant = 'light', lieu }) {
    return {
        tag: "div",
        attributes: [
            ["class", `carousel-card ${variant}`],
            ["data-community-id", id]
        ],
        children: [
            {
                tag: "div",
                attributes: [["class", "carousel-card-image-container"]],
                children: [
                    {
                        tag: "img",
                        attributes: [
                            ["src", image || "/Assets/images/logo-meetup-connect.webp"],
                            ["alt", nom],
                            ["class", "carousel-card-image"]
                        ],
                        children: []
                    },
                    {
                        tag: "p",
                        attributes: [["class", "pastille pastille-dark-imperial-blue"]],
                        children: [member_count + ' membres']
                    }
                ]
            },
            {
                tag: "div",
                attributes: [["class", "carousel-card-content"]],
                children: [
                    {
                        tag: "div",
                        attributes: [["class", "carousel-card-datetime"]],
                        children: [
                            {
                                tag: "p",
                                attributes: [["class", "carousel-card-time h2-footer"]],
                                children: [lieu || "Lieu à définir"]
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attributes: [["class", "carousel-card-separator"]],
                        children: []
                    },
                    {
                        tag: "div",
                        attributes: [["class", "carousel-card-details"]],
                        children: [
                            {
                                tag: "div",
                                attributes: [["class", "carousel-card-details-texte"]],
                                children: [
                                    {
                                        tag: "h3",
                                        attributes: [["class", "carousel-card-title h1"]],
                                        children: [nom]
                                    }
                                ]
                            },
                            {
                                tag: "p",
                                attributes: [["class", "carousel-card-description"]],
                                children: [description || 'Description à venir']
                            }
                        ]
                    }
                ]
            }
        ]
    };
}

export default CommunityCarouselCard;
