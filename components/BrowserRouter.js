import generateStructure from "../lib/generateStructure.js";
import Layout from "../views/Layout.js";

const browserRouterOptions = {};

export default function BrowserRouter(props) {
  const routes = props.routes;
  const rootElement = props.rootElement;
  const baseUrl = props.baseUrl ?? "";
  browserRouterOptions.baseUrl = baseUrl;

  //TODO: Modifier pour gérer l'async (marhce pas pour l'instant)
  async function generatePage() {
    const path = window.location.pathname.slice(baseUrl.length);
    const struct = (await routes[path]) ?? routes["*"];
    const layoutStructure = Layout(struct);
    const finalPage = generateStructure(layoutStructure);
    if (rootElement.childNodes.length === 0) rootElement.appendChild(finalPage);
    else rootElement.replaceChild(finalPage, rootElement.childNodes[0]);
  }

  window.addEventListener("popstate", generatePage);
  window.addEventListener("pushstate", generatePage);
  generatePage();
}

export function BrowserLink(props) {
  console.log(browserRouterOptions);
  const link = props.link;
  const title = props.title;

  return {
    tag: "a",
    attributes: [["href", browserRouterOptions.baseUrl + link]],
    events: {
      click: [
        function (event) {
          event.preventDefault();
          window.history.pushState(
            {},
            undefined,
            event.currentTarget.getAttribute("href")
          );
          window.dispatchEvent(new Event("pushstate"));
        },
      ],
    },
    children: [title],
  };
}
