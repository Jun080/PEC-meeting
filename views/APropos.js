const APropos = function () {
  return {
    tag: "div",
    attributes: [["class", "apropos-page"]],
    children: [
      {
        tag: "div",
        attributes: [["class", "container"]],
        children: [
          {
            tag: "section",
            attributes: [["class", "a-propos-header"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "apropos-header"]],
                children: [
                  {
                    tag: "div",
                    children: [
                      {
                        tag: "h1",
                        attributes: [["class", "h1-big gradient-fonce"]],
                        children: ["Meetup Connect, c'est quoi\u00A0?"]
                      }
                    ]
                  },
                  {
                    tag: "div",
                    children: [
                      {
                        tag: "p",
                        children: [
                          "Meetup Connect est une ",
                          {
                            tag: "strong",
                            children: ["plateforme collaborative"]
                          },
                          " pensée pour faciliter les rencontres, encourager les initiatives locales et faire vivre les idées de chacun"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                tag: "div",
                attributes: [["class", "apropos-content"]],
                children: [
                  {
                    tag: "p",
                    children: [
                      "Créée pour les passionné·es de culture, de nature, de tech, ou simplement de bons moments à partager, la plateforme permet à toute personne inscrite de :"
                    ]
                  },
                  {
                    tag: "ul",
                    attributes: [["class", "apropos-features"]],
                    children: [
                      {
                        tag: "li",
                        children: [
                          {
                            tag: "p",
                            children: [
                              {
                                tag: "strong",
                                children: ["Rejoindre"]
                              },
                              " des communautés engagées"
                            ]
                          }
                        ]
                      },
                      {
                        tag: "li",
                        children: [
                          {
                            tag: "p",
                            children: [
                              {
                                tag: "strong",
                                children: ["Participer"]
                              },
                              " à des événements variés"
                            ]
                          }
                        ]
                      },
                      {
                        tag: "li",
                        children: [
                          {
                            tag: "p",
                            children: [
                              {
                                tag: "strong",
                                children: ["Organiser"]
                              },
                              " ses propres activités, publiques ou privées"
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            tag: "div",
            attributes: [["class", "apropos-image-section"]],
            children: [
              {
                tag: "img",
                attributes: [
                  ["src", "../Assets/images/header-personne-plage.webp"],
                  ["alt", "Personne sur la plage"],
                  ["class", "apropos-full-image"]
                ]
              }
            ]
          },
          {
            tag: "section",
            attributes: [["class", "apropos-communautes container-small"]],
            children: [
              {
                tag: "h2",
                children: ["Une communauté en mouvement"]
              },
              {
                tag: "p",
                children: [
                  "Rencontres, ateliers, conférences, soirées, balades, cleanwalks, sessions gaming... ",
                  {
                    tag: "strong",
                    children: ["Chaque jour"]
                  },
                  ", Meetup Connect connecte des personnes prêtes à vivre et créer ensemble."
                ]
              },
              {
                tag: "div",
                attributes: [["class", "apropos-bento"]],
                children: [
                  {
                    tag: "div",
                    attributes: [["class", "bento-left bento-users"]],
                    children: [
                      {
                        tag: "img",
                        attributes: [
                          ["src", "../Assets/images/svg/planet-bottom-left.svg"],
                          ["alt", ""],
                          ["class", "planet-bottom-left"]
                        ]
                      },
                      {
                        tag: "img",
                        attributes: [
                          ["src", "../Assets/images/svg/planet-top-right.svg"],
                          ["alt", ""],
                          ["class", "planet-top-right"]
                        ]
                      },
                      {
                        tag: "p",
                        attributes: [["class", "h1-big"]],
                        children: ["+\u00A0140"]
                      },
                      {
                        tag: "p",
                        attributes: [["class", "h2"]],
                        children: ["communautés actives !"]
                      }
                    ]
                  },
                  {
                    tag: "div",
                    attributes: [["class", "bento-right"]],
                    children: [
                      {
                        tag: "div",
                        attributes: [["class", "bento-right-top"]],
                        children: [
                          {
                            tag: "p",
                            attributes: [["class", "h1-big"]],
                            children: ["+\u00A01.5k"]
                          },
                          {
                            tag: "p",
                            attributes: [["class", "h2"]],
                            children: ["d'utilisateurs engagés"]
                          }
                        ]
                      },
                      {
                        tag: "div",
                        attributes: [["class", "bento-right-bottom"]],
                        children: [
                          {
                            tag: "div",
                            attributes: [["class", "bento-stars"]],
                            children: [
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/icons/icons-star-full.svg"],
                                  ["alt", "Star"]
                                ]
                              },
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/icons/icons-star-full.svg"],
                                  ["alt", "Star"]
                                ]
                              },
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/icons/icons-star-full.svg"],
                                  ["alt", "Star"]
                                ]
                              },
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/icons/icons-star-full.svg"],
                                  ["alt", "Star"]
                                ]
                              },
                              {
                                tag: "img",
                                attributes: [
                                  ["src", "../Assets/images/icons/icons-star-mid.svg"],
                                  ["alt", "Star"]
                                ]
                              }
                            ]
                          },
                          {
                            tag: "div",
                            attributes: [["class", "bento-events"]],
                            children: [
                              {
                                tag: "p",
                                attributes: [["class", "h1"]],
                                children: ["~\u00A05"]
                              },
                              {
                                tag: "p",
                                attributes: [["class", "h3"]],
                                children: ["nouveaux évènements par jour"]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            tag: "section",
            attributes: [["class", "apropos-mission"]],
            children: [
              {
                tag: "div",
                attributes: [["class", "container"]],
                children: [
                  {
                    tag: "h2",
                    attributes: [["class", "h2-big"]],
                    children: [
                      "Notre ",
                      {
                        tag: "strong",
                        children: ["mission"]
                      },
                      " ?"
                    ]
                  },
                  {
                    tag: "div",
                    attributes: [["class", "text-container"]],
                    children: [
                      {
                        tag: "p",
                        children: [
                          "Favoriser les rencontres humaines autour de centres d'intérêt communs.",
                        ]
                      },
                      {
                        tag: "p",
                        children: [
                          "Que vous soyez organisateur·rice d'événements, passionné·e ou simple curieux·se, vous trouverez toujours un espace pour vous exprimer, vous réunir et créer"
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
  };
};

export default APropos;
