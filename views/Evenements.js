const Evenements = function () {
  return {
    tag: "div",
    attributes: [["class", "evenements-page"]],
    children: [
      {
        tag: "h1",
        children: ["Évènements"],
      },
      {
        tag: "p",
        children: ["Découvrez tous les événements à venir dans votre région."],
      },
    ],
  };
};

export default Evenements;
