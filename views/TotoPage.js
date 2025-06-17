import createElement from "../lib/createElement.js";

function Toto() {
  return createElement(
    "div",
    createElement(
      "ul",
      {},
      createElement("li", {}, "fourchette"),
      createElement("li", {}, "couteau"),
      createElement("li", {}, "cuillère")
    )
  );
}

Toto.show = function () {};

export default Toto;
