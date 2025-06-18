import Page404 from "../views/Page404.js";
import ShowUsers from "../views/ShowUsers.js";
import HomePage from "../views/HomePage.js";
import Layout from "../views/Layout.js";

export default {
  "/": {
    tag: Layout,
    attributes: [["content", { tag: HomePage }]],
  },
  "*": {
    tag: Page404,
  },
  "/users": {
    tag: ShowUsers,
  },
};
