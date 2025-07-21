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
                        tag: "h4",
                        children: ["Accueil"]
                      },
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
                                  ["link", "/a-propos"],
                                  ["title", "À propos"],
                                  ["class", "footer-link"],
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
                                  ["class", "footer-link"],
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
                                  ["class", "footer-link"],
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
                                  ["link", "/a-propos"],
                                  ["title", "Contact"],
                                  ["class", "footer-link"],
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
                        tag: "h4",
                        children: ["Mon compte"]
                      },
                      {
                        tag: "ul",
                        children: [
                          { 
                            tag: "li", 
                            children: [
                              {
                                tag: Link,
                                attributes: [
                                  ["link", "/users"],
                                  ["title", "Profil"],
                                  ["class", "footer-link"],
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
                                  ["class", "footer-link"],
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
                                  ["class", "footer-link"],
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
                                  ["class", "footer-link"],
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
                      ["link", "/evenements"],
                      ["title", ""],
                      ["class", "action-box blue"],
                    ],
                    children: [
                      { tag: "p", children: ["Organiser un événement"] },
                      {
                        tag: "span",
                        attributes: [["class", "arrow-button"]],
                        children: ["→"],
                      },
                    ],
                  },
                  {
                    tag: Link,
                    attributes: [
                      ["link", "/dashboard"],
                      ["title", ""],
                      ["class", "action-box white"],
                    ],
                    children: [
                      { tag: "p", children: ["Mon espace perso"] },
                      {
                        tag: "span",
                        attributes: [["class", "arrow-button"]],
                        children: ["→"],
                      },
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
                    tag: "div",
                    attributes: [["class", "logo-icon"]],
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
