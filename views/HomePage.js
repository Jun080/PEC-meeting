import { getAllUserNames } from "../Services/userService.js";

const ShowUsers = function () {
  const users = getAllUserNames();

  return {
    tag: "div",
    children: [
      {
        tag: "h1",
        children: ["Ceci est la home page !"],
      },
    ],
  };
};

export default ShowUsers;
