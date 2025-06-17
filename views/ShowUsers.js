import { getAllUserNames } from "../Services/userService.js";

export default async function ShowUsers() {
  const users = await getAllUserNames();

  return {
    tag: "div",
    children: [
      {
        tag: "h1",
        children: ["Voici la liste de tous les utilisateurs:"],
      },
      {
        tag: "div",
        children: users.map((name) => ({
          tag: "div",
          children: [name],
        })),
      },
    ],
  };
}
