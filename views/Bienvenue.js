const Bienvenue = function () {
  return {
    tag: "div",
    attributes: [["class", "welcome"]],
    children: [
      {
        tag: "h1",
        children: ["Première fois sur le site ?"],
      },
      {
        tag: "section",
        children: [
          {
            tag: "div",
            children: [
              {
                tag: "h2",
                children: ["Top !"],
              },
              {
                tag: "p",
                children: ["de la semaine"],
              },
            ],
          },
          {
            tag: "div",
            attributes: [["class", "cards-row"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "card"]],
                children: ["carte 1"],
              },
              {
                tag: "div",
                attributes: [["class", "card"]],
                children: ["carte 2"],
              },
              {
                tag: "div",
                attributes: [["class", "card"]],
                children: ["carte 3"],
              },
              {
                tag: "div",
                attributes: [["class", "card"]],
                children: ["carte 4"],
              },
            ],
          },
        ],
      },
      {
        tag: "section",
        children: [
          {
            tag: "img",
            attributes: [["src", "../Assets/images/image1.png"]],
          },
          {
            tag: "div",
            attributes: [["class", "banner"]],
            children: [
              {
                tag: "h3",
                children: ["Pas intéressé.e ?"],
              },
              {
                tag: "p",
                children: [
                  "Recherche l'évènnement de tes rêves et plus encore !",
                ],
              },
              {
                tag: "button",
                children: ["rechercher"],
              },
            ],
          },
        ],
      },
      {
        tag: "section",
        children: [
          {
            tag: "h2",
            children: ["Évènnements spécialement pour vous !"],
          },
          {
            tag: "div",
            attributes: [["class", "cards-row"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "card"]],
                children: ["carte 1"],
              },
              {
                tag: "div",
                attributes: [["class", "card"]],
                children: ["carte 2"],
              },
              {
                tag: "div",
                attributes: [["class", "card"]],
                children: ["carte 3"],
              },
              {
                tag: "div",
                attributes: [["class", "card"]],
                children: ["carte 4"],
              },
            ],
          },
        ],
      },
      {
        tag: "section",
        children: [
          {
            tag: "h2",
            children: ["Évennements proches de chez vous"],
          },
          {
            tag: "div",
            children: [
              {
                tag: "div",
                children: ["Map"],
              },
              {
                tag: "div",
                attributes: [["class", "map-cards"]],
                children: [
                  {
                    tag: "div",
                    children: ["carte 1"],
                  },
                  {
                    tag: "div",
                    children: ["carte 2"],
                  },
                  {
                    tag: "div",
                    children: ["carte 3"],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        tag: "section",
        children: [
          {
            tag: "h2",
            children: ["Convaincu ?"],
          },
          {
            tag: "button",
            children: ["Accéder à la page d'accueil"],
          },
        ],
      },
    ],
  };
};

export default Bienvenue;
