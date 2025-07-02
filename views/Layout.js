import { BrowserLink as Link } from "../components/BrowserRouter.js";

export default function Layout(props) {
  const content = props.content;
  const params = props.params;

  let contentWithParams = content;
  if (params && content && content.tag) {
    contentWithParams = {
      ...content,
      attributes: [...(content.attributes || []), ["params", params]],
    };
  }

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
              {
                tag: Link,
                attributes: [
                  ["link", "/inscription"],
                  ["title", "Inscription"],
                ],
              },
              {
                tag: Link,
                attributes: [
                  ["link", "/bienvenue"],
                  ["title", "Bienvenue"],
                ],
              },
            ],
          },
        ],
      },
      {
        tag: "main",
        attributes: [["class", "page-content"]],
        children: contentWithParams ? [contentWithParams] : [],
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
