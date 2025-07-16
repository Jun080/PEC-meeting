const APropos = function () {
  return {
    tag: "div",
    attributes: [["class", "apropos-page"]],
    children: [
      {
        tag: "h1",
        children: ["À propos"],
      },
      {
        tag: "p",
        children: ["Découvrez notre plateforme de rencontres et d'événements communautaires."],
      },
    ],
  };
};

export default APropos;
