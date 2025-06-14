const root = document.getElementById("root");

function generateStructure(structure) {
    const elem = document.createElement(structure.tag);
    if (structure.attributes) {
        for (let attribute of structure.attributes) {
            const attrName = attribute[0];
            const attrValue = attribute[1];
            if (attrName === "style") {
                Object.assign(elem.style, attrValue);
            } else if (attrName === "class") {
                elem.className = attrValue;
            } else {
                elem.setAttribute(attrName, attrValue);
            }
        }
    }
    if (structure.events) {
        for (let eventName in structure.events) {
            for (let listener of structure.events[eventName]) {
                elem.addEventListener(eventName, listener);
            }
        }
    }
    if (structure.children) {
        for (let child of structure.children) {
            const childElem =
                typeof child === "string"
                    ? document.createTextNode(child)
                    : generateStructure(child);
            elem.appendChild(childElem);
        }
    }
    return elem;
}

function createElement(tag, attributes, ...children) {
    return {
        tag,
        attributes: Object.entries(attributes),
        children,
    };
}

function HashRouter(routes, rootElement) {
    function generatePage() {
        const path = window.location.hash.slice(1);
        const struct = routes[path] ?? routes["*"];
        const page = generateStructure(struct);
        if (rootElement.childNodes.length === 0) {
            rootElement.appendChild(page);
        } else {
            rootElement.innerHTML = "";
            rootElement.appendChild(page);
        }
    }

    window.addEventListener("hashchange", generatePage);
    generatePage();
}

const page404 = {
    tag: "h1",
    children: ["Tu t'es perdu.."],
};

const tableStructure = {
    tag: "div",
    children: ["testo"],
};

const routes = {
    "/home": tableStructure,
    "*": page404,
};

HashRouter(routes, root);
