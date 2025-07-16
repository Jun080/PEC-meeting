import { BrowserLink as Link } from "../components/BrowserRouter.js";
import Footer from "./Footer.js"; // Import Footer component
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
              {
                tag: Link,
                attributes: [
                  ["link", "/inscription"],
                  ["title", "Inscription"],
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
        tag: Footer, // Footer component in Footer.js
      },
    ],
  };
}
