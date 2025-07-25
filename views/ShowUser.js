import { getUserById } from "../Models/userModel.js";

const ShowUser = async function (params) {
  const userId = params?.id || params?.params?.id;

  if (!userId) {
    return {
      tag: "div",
      children: ["Utilisateur non trouvé"],
    };
  }

  try {
    const user = await getUserById(parseInt(userId));

    return {
      tag: "div",
      children: [
        {
          tag: "h1",
          children: [
            `Profil de ${user.prenom || "Utilisateur"} ${user.nom || ""}`,
          ],
        },
        {
          tag: "div",
          children: [
            {
              tag: "div",
              children: [
                {
                  tag: "strong",
                  children: ["ID : "],
                },
                {
                  tag: "span",
                  children: [user.id.toString()],
                },
              ],
            },
            {
              tag: "div",
              children: [
                {
                  tag: "strong",
                  children: ["Prénom : "],
                },
                {
                  tag: "span",
                  children: [user.prenom || "Non renseigné"],
                },
              ],
            },
            {
              tag: "div",
              children: [
                {
                  tag: "strong",
                  children: ["Nom : "],
                },
                {
                  tag: "span",
                  children: [user.nom || "Non renseigné"],
                },
              ],
            },
            {
              tag: "div",
              children: [
                {
                  tag: "strong",
                  children: ["Email : "],
                },
                {
                  tag: "span",
                  children: [user.email || "Non renseigné"],
                },
              ],
            },
            {
              tag: "div",
              children: [
                {
                  tag: "strong",
                  children: ["Date de création : "],
                },
                {
                  tag: "span",
                  children: [user.created_at || "Non renseigné"],
                },
              ],
            },
          ],
        },
        {
          tag: "div",
          children: [
            {
              tag: "a",
              attributes: [["href", "/users"]],
              children: ["Retour à la liste"],
            },
          ],
        },
      ],
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);

    return {
      tag: "div",
      children: [
        {
          tag: "h1",
          children: ["Utilisateur non trouvé"],
        },
        {
          tag: "div",
          children: [
            {
              tag: "p",
              children: [`Aucun utilisateur trouvé avec l'ID : ${userId}`],
            },
          ],
        },
      ],
    };
  }
};

export default ShowUser;
