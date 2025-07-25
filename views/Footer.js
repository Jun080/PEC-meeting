import { BrowserLink as Link } from "../components/BrowserRouter.js";

export default function Footer() {
  return {
    tag: "footer",
    attributes: [["class", "app-footer"]],
    children: [
      {
        tag: "div",
        attributes: [["class", "footer-container"]],
        children: [
          {
            tag: "div",
            attributes: [["class", "footer-content"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "footer-left"]],
                children: [
                  {
                    tag: "div",
                    attributes: [["class", "footer-section"]],
                    children: [
                      {
                        tag: "ul",
                        attributes: [["class", "footer-section"]],
                        children: [
                          { 
                            tag: "li", 
                            children: [
                              {
                                tag: Link,
                                attributes: [
                                  ["link", "/"],
                                  ["title", "Accueil"],
                                  ["class", "h2-footer footer-link"],
                                ],
                              }
                            ] 
                          },{ 
                            tag: "li", 
                            children: [
                              {
                                tag: Link,
                                attributes: [
                                  ["link", "/a-propos"],
                                  ["title", "À propos"],
                                  ["class", "h2-footer footer-link"],
                                ],
                              }
                            ] 
                          },
                          { 
                            tag: "li", 
                            children: [
                              {
                                tag: Link,
                                attributes: [
                                  ["link", "/evenements"],
                                  ["title", "Événements"],
                                  ["class", "h2-footer footer-link"],
                                ],
                              }
                            ] 
                          },
                          { 
                            tag: "li", 
                            children: [
                              {
                                tag: Link,
                                attributes: [
                                  ["link", "/communautes"],
                                  ["title", "Communautés"],
                                  ["class", "h2-footer footer-link"],
                                ],
                              }
                            ] 
                          },
                        ],
                      },
                    ],
                  },
                  {
                    tag: "div",
                    attributes: [["class", "footer-section"]],
                    children: [
                      {
                        tag: "p",
												attributes: [["class", "h2-footer"]],
                        children: ["Mon compte"]
                      },
                      {
                        tag: "ul",
												attributes: [["class", "footer-section-compte"]],
                        children: [
                          { 
                            tag: "li", 
                            children: [
                              {
                                tag: Link,
                                attributes: [
                                  ["link", "/users"],
                                  ["title", "Profil"],
                                  ["class", "footer-link h2"],
                                ],
                              }
                            ] 
                          },
                          { 
                            tag: "li", 
                            children: [
                              {
                                tag: Link,
                                attributes: [
                                  ["link", "/dashboard"],
                                  ["title", "Dashboard"],
                                  ["class", "footer-link h2"],
                                ],
                              }
                            ] 
                          },
                          { 
                            tag: "li", 
                            children: [
                              {
                                tag: Link,
                                attributes: [
                                  ["link", "/dashboard"],
                                  ["title", "Notifications"],
                                  ["class", "footer-link h2"],
                                ],
                              }
                            ] 
                          },
                          { 
                            tag: "li", 
                            children: [
                              {
                                tag: Link,
                                attributes: [
                                  ["link", "/evenements"],
                                  ["title", "Calendrier"],
                                  ["class", "footer-link h2"],
                                ],
                              }
                            ] 
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                tag: "div",
                attributes: [["class", "footer-right"]],
                children: [
                  {
                    tag: Link,
                    attributes: [
                      ["link", "/evenement/creer-evenement"],
                      ["title", ""],
                      ["class", "card-big cornflower-blue"],
                    ],
                    children: [
                      { tag: "p", children: ["Organiser un événement"] }
                    ],
                  },
                  {
                    tag: Link,
                    attributes: [
                      ["link", "/dashboard"],
                      ["title", ""],
                      ["class", "card-big alice-blue"],
                    ],
                    children: [
                      { tag: "p", children: ["Mon espace perso"] }
                    ],
                  },
                ],
              },
            ],
          },
          {
            tag: "div",
            attributes: [["class", "footer-bottom"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "footer-logo"]],
                children: [
                  {
                    tag: "img",
                    attributes: [
                      ["src", "/Assets/images/logo-meetup-connect.webp"],
                      ["alt", "Meetup Connect Logo"],
                      ["class", "logo-icon"]
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}
