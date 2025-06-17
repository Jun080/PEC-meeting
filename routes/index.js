import Gallery from "../views/GalleryPage.js";
import Page404 from "../views/Page404.js";
import TablePage from "../views/TablePage.js";
import ShowUsers from "../views/ShowUsers.js";
import HomePage from "../views/HomePage.js";

export default {
    "/": {
        tag: HomePage,
    },
    "/home": {
        tag: TablePage,
    },
    "/gallery": {
        tag: Gallery,
    },
    "*": {
        tag: Page404,
    },
    "/users": {
        tag: ShowUsers,
    },
};
