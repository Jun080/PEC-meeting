import Page404 from "../views/Page404.js";
import ShowUsers from "../views/ShowUsers.js";
import HomePage from "../views/HomePage.js";

export default {
    "/": {
        tag: HomePage,
    },
    "*": {
        tag: Page404,
    },
    "/users": {
        tag: ShowUsers,
    },
};
