const Communautes = function () {
  return {
    tag: "div",
    attributes: [["class", "communautes-page"]],
    children: [
      {
        tag: "h1",
        children: ["Communautés"],
      },
      {
        tag: "p",
        children: ["Rejoignez des communautés qui partagent vos centres d'intérêt."],
      },
    ],
  };
};

export default Communautes;
