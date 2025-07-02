import { getAllUsers } from "../Models/userModel.js";

export default async function ShowUsers() {
  const users = await getAllUsers();

  return {
    tag: "div",
    attributes: [["class", "users-list"]],
    children: [
      {
        tag: "h1",
        attributes: [["class", "h1"]],
        children: ["Liste des utilisateurs"],
      },
      {
        tag: "p",
        attributes: [["class", "p"]],
        children: [`${users.length} utilisateur(s) inscrit(s)`],
      },
      {
        tag: "div",
        attributes: [["class", "users-grid"]],
        children: users.map((user) => ({
          tag: "div",
          attributes: [["class", "user-card"]],
          children: [
            {
              tag: "h3",
              attributes: [["class", "h3"]],
              children: [`${user.prenom || "Prénom"} ${user.nom || "Nom"}`],
            },
            {
              tag: "p",
              attributes: [["class", "user-email"]],
              children: [user.email || "Email non renseigné"],
            },
            {
              tag: "p",
              attributes: [["class", "user-id"]],
              children: [`ID: ${user.id}`],
            },
            {
              tag: "a",
              attributes: [
                ["href", `/user/${user.id}`],
                ["class", "btn-primary"],
              ],
              children: ["Voir le profil"],
            },
          ],
        })),
      },
    ],
  };
}
