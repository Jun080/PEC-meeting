import { BrowserLink as Link } from "../components/BrowserRouter.js";

export default function Layout(props) {
    const content = props.content
  return {
    tag: "div",
    attributes: [["class", "layout"]],
    children: [
      {
        tag: "div",
        attributes: [["class", "header"]],
        children: [
          {
            tag: "nav",
            children: [
              {
                tag: Link,
                attributes: [
                  ["link", "/"],
                  ["title", "Accueil"],
                ],
              },
              {
                tag: Link,
                attributes: [
                  ["link", "/users"],
                  ["title", "Utilisateurs"],
                ],
              },
            ],
          },
        ],
      },
      {
        tag: "main",
        attributes: [["class", "page-content"]],
        children: content ? [content] : [],
      },
      {
        tag: "footer",
        attributes: [["class", "app-footer"]],
        children: [
          {
            tag: "p",
            children: ["2025 Meetup"],
          },
        ],
      },
    ],
  };
}
