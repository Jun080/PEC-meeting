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

    let struct = routes[path];
    let params = {};

    if (!struct) {
      const { matchedRoute, extractedParams } = findMatchingRoute(path, routes);
      struct = matchedRoute;
      params = extractedParams;
    }

    if (!struct) {
      struct = routes["*"];
    }

    if (struct && Object.keys(params).length > 0) {
      struct = { ...struct };

      if (struct.attributes) {
        struct.attributes = [...struct.attributes, ["params", params]];

        struct.attributes = struct.attributes.map((attr) => {
          if (attr[0] === "content" && attr[1].tag) {
            return [
              attr[0],
              {
                ...attr[1],
                attributes: [...(attr[1].attributes || []), ["params", params]],
              },
            ];
          }
          return attr;
        });
      } else {
        struct.attributes = [["params", params]];
      }
    }

    const finalPage = await generateStructure(struct);

    if (rootElement.childNodes.length === 0) rootElement.appendChild(finalPage);
    else rootElement.replaceChild(finalPage, rootElement.childNodes[0]);
  }

  function findMatchingRoute(currentPath, routes) {
    const pathSegments = currentPath.split("/").filter(Boolean);

    for (const [routePath, routeConfig] of Object.entries(routes)) {
      if (routePath === "*") continue;

      const routeSegments = routePath.split("/").filter(Boolean);

      if (pathSegments.length !== routeSegments.length) continue;

      const params = {};
      let isMatch = true;

      for (let i = 0; i < routeSegments.length; i++) {
        const routeSegment = routeSegments[i];
        const pathSegment = pathSegments[i];

        if (routeSegment.startsWith(":")) {
          const paramName = routeSegment.slice(1);
          params[paramName] = pathSegment;
        } else if (routeSegment !== pathSegment) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        return { matchedRoute: routeConfig, extractedParams: params };
      }
    }

    return { matchedRoute: null, extractedParams: {} };
  }

  window.addEventListener("popstate", generatePage);
  window.addEventListener("pushstate", generatePage);
  generatePage();
}

export function BrowserLink(props) {
  console.log(browserRouterOptions);
  const link = props.link;
  const title = props.title;
  const className = props.class;
  const children = props.children;

  const attributes = [["href", browserRouterOptions.baseUrl + link]];
  
  if (className) {
    attributes.push(["class", className]);
  }

  return {
    tag: "a",
    attributes: attributes,
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
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
      ],
    },
    children: children && children.length > 0 ? children : [title],
  };
}
