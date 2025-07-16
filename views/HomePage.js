import { getAllUserNames } from "../Services/userService.js";

const HomePage = function () {
  return {
    tag: "div",
    attributes: [["class", "homepage"]],
    children: [
      {
        tag: "h1",
        children: ["Ceci est la home page !"],
      },
    ],
  };
};

export default HomePage;
