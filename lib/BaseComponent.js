export class BaseComponent {
  constructor() {
    this.state = {};
    this.observers = new Set();
    this.mounted = false;
    this.container = null;
    this.currentStructure = null;
  }

  setState(newState) {
    const prevState = { ...this.state };

    if (typeof newState === "function") {
      this.state = { ...this.state, ...newState(this.state) };
    } else {
      this.state = { ...this.state, ...newState };
    }

    this.notifyObservers(this.state, prevState);

    if (this.mounted && this.container) {
      this.regenerateView();
    }
  }

  addObserver(callback) {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  notifyObservers(newState, prevState) {
    this.observers.forEach((observer) => {
      try {
        observer(newState, prevState);
      } catch (error) {
        console.error("Erreur dans un observateur:", error);
      }
    });
  }

  render() {
    throw new Error(
      "La méthode render() doit être implémentée dans la classe enfant"
    );
  }

  mount(container) {
    this.container = container;
    this.mounted = true;
    this.regenerateView();
  }

  unmount() {
    this.mounted = false;
    this.observers.clear();
    this.container = null;
    this.currentStructure = null;
  }

  async regenerateView() {
    if (!this.container) return;

    try {
      const newStructure = await this.render();

      const { default: generateStructure } = await import(
        "./generateStructure.js"
      );
      const newElement = await generateStructure(newStructure);

      this.container.innerHTML = "";

      if (newElement.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        this.container.appendChild(newElement);
      } else if (newElement.children && newElement.children.length > 0) {
        while (newElement.firstChild) {
          this.container.appendChild(newElement.firstChild);
        }
      } else {
        this.container.appendChild(newElement);
      }

      this.currentStructure = newStructure;
    } catch (error) {
      console.error("Erreur lors de la régénération de la vue:", error);
      this.container.innerHTML = `<div style="color: red; padding: 1rem;">Erreur de rendu: ${error.message}</div>`;
    }
  }

  createElement(tag, attributes = [], children = []) {
    const processedAttributes = attributes.map(([key, value]) => {
      if (key === "style" && typeof value === "string") {
        const styleObject = {};
        value.split(";").forEach((rule) => {
          const [property, val] = rule.split(":").map((s) => s.trim());
          if (property && val) {
            const camelProperty = property.replace(
              /-([a-z])/g,
              (match, letter) => letter.toUpperCase()
            );
            styleObject[camelProperty] = val;
          }
        });
        return [key, styleObject];
      }
      return [key, value];
    });

    return {
      tag,
      attributes: processedAttributes,
      children: Array.isArray(children)
        ? children.filter((child) => child !== null && child !== undefined)
        : [],
    };
  }

  createEvent(eventName, handler) {
    return {
      [eventName]: [handler],
    };
  }

  createElementWithEvents(tag, attributes = [], events = {}, children = []) {
    const processedAttributes = attributes.map(([key, value]) => {
      if (key === "style" && typeof value === "string") {
        const styleObject = {};
        value.split(";").forEach((rule) => {
          const [property, val] = rule.split(":").map((s) => s.trim());
          if (property && val) {
            const camelProperty = property.replace(
              /-([a-z])/g,
              (match, letter) => letter.toUpperCase()
            );
            styleObject[camelProperty] = val;
          }
        });
        return [key, styleObject];
      }
      return [key, value];
    });

    return {
      tag,
      attributes: processedAttributes,
      events,
      children: Array.isArray(children)
        ? children.filter((child) => child !== null && child !== undefined)
        : [],
    };
  }

  renderIf(condition, element) {
    return condition ? element : null;
  }

  renderList(items, renderItem) {
    return items.map(renderItem).filter((item) => item !== null);
  }
}

export function createComponentFunction(ComponentClass) {
  return function (props = {}) {
    const componentId = `component-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const containerElement = {
      tag: "div",
      attributes: [
        ["id", componentId],
        ["class", "base-component-container"],
      ],
      children: [],
    };

    setTimeout(async () => {
      const container = document.getElementById(componentId);
      if (container) {
        try {
          const component = new ComponentClass(props);
          component.mount(container);

          container._componentInstance = component;
        } catch (error) {
          console.error("Erreur lors du montage du composant:", error);
          container.innerHTML = `<div style="color: red; padding: 1rem;">Erreur: ${error.message}</div>`;
        }
      }
    }, 0);

    return containerElement;
  };
}

export function component(ComponentClass) {
  return createComponentFunction(ComponentClass);
}
