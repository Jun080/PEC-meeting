import { BrowserLink as Link } from "../components/BrowserRouter.js";

export default function Navbar(props = {}) {
  const isLoggedIn = props.isLoggedIn || false;
  
  return {
    tag: "nav",
    attributes: [["class", "app-navbar"]],
    children: [
      {
        tag: "div",
        attributes: [["class", "navbar-container"]],
        children: [            {
              tag: "div",
              attributes: [["class", "navbar-left"]],
              children: [
                {
                  tag: "a",
                  attributes: [
                    ["href", "/bienvenue"],
                    ["class", "navbar-logo-link"],
                  ],
                  events: {
                    click: [
                      function (event) {
                        event.preventDefault();
                        window.history.pushState({}, undefined, "/bienvenue");
                        window.dispatchEvent(new Event("pushstate"));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      },
                    ],
                  },
                  children: [
                    {
                      tag: "img",
                      attributes: [
                        ["src", "/Assets/images/favicon4x.png"],
                        ["alt", "Meetup Connect Logo"],
                        ["class", "navbar-logo"],
                      ],
                    }
                  ],
                },
              ],
            },
          {
            tag: "div",
            attributes: [["class", "navbar-center"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "search-container"]],
                children: [
                  {
                    tag: "input",
                    attributes: [
                      ["type", "text"],
                      ["placeholder", "Rechercher sur le site"],
                      ["class", "search-input"],
                    ],
                  },
                  {
                    tag: "button",
                    attributes: [["class", "search-button"]],
                    children: ["🔍"],
                  },
                ],
              },
            ],
          },
          {
            tag: "div",
            attributes: [["class", "navbar-right"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "nav-links"]],
                children: [
                  {
                    tag: Link,
                    attributes: [
                      ["link", "/a-propos"],
                      ["title", "À propos"],
                      ["class", "nav-link"],
                    ],
                  },
                  {
                    tag: Link,
                    attributes: [
                      ["link", "/evenements"],
                      ["title", "Évènements"],
                      ["class", "nav-link"],
                    ],
                  },
                  {
                    tag: Link,
                    attributes: [
                      ["link", "/communautes"],
                      ["title", "Communautés"],
                      ["class", "nav-link"],
                    ],
                  },
                  {
                    tag: Link,
                    attributes: [
                      ["link", "/dashboard"],
                      ["title", "Dashboard"],
                      ["class", "nav-link"],
                    ],
                  },
                ],
              },
              {
                tag: "div",
                attributes: [["class", "auth-button"]],
                children: [
                  isLoggedIn ? {
                    tag: Link,
                    attributes: [
                      ["link", "/compte"],
                      ["title", "Compte"],
                      ["class", "btn-auth"],
                    ],
                  } : {
                    tag: Link,
                    attributes: [
                      ["link", "/inscription"],
                      ["title", "Se connecter"],
                      ["class", "btn-auth"],
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
