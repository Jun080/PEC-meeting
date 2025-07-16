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
                          { tag: "li", children: ["À propos"] },
                          { tag: "li", children: ["Événements"] },
                          { tag: "li", children: ["Communautés"] },
                          { tag: "li", children: ["Contact"] },
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
                          { tag: "li", children: ["Profil"] },
                          { tag: "li", children: ["Dashboard"] },
                          { tag: "li", children: ["Notifications"] },
                          { tag: "li", children: ["Calendrier"] },
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
                    tag: "div",
                    attributes: [["class", "action-box blue"]],
                    children: [
                      { tag: "p", children: ["Organiser un événement"] },
                      {
                        tag: "button",
                        attributes: [["class", "arrow-button"]],
                        children: ["→"],
                      },
                    ],
                  },
                  {
                    tag: "div",
                    attributes: [["class", "action-box white"]],
                    children: [
                      { tag: "p", children: ["Mon espace perso"] },
                      {
                        tag: "button",
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
