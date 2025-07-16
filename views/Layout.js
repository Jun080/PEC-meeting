import { BrowserLink as Link } from "../components/BrowserRouter.js";
import Footer from "./Footer.js";
import Navbar from "./Navbar.js";

// Fonction simulée pour vérifier l'état de connexion
function isUserLoggedIn() {
  // Pour l'instant, retourne false par défaut
  // À remplacer par votre logique d'authentification
  return localStorage.getItem('user') !== null;
}

export default function Layout(props) {
  const content = props.content;
  const params = props.params;
  const isLoggedIn = isUserLoggedIn();

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
        tag: Navbar,
        attributes: [["isLoggedIn", isLoggedIn]],
      },
      {
        tag: "main",
        attributes: [["class", "page-content"]],
        children: contentWithParams ? [contentWithParams] : [],
      },
      {
        tag: Footer,
      },
    ],
  };
}
