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
    tag: Layout,
    attributes: [["content", { tag: Page404 }]],
  },
  "/users": {
    tag: Layout,
    attributes: [["content", { tag: ShowUsers }]],
  },
};

// TODO: gérer les routes en nesting (ex: /users/:id/likes) on devrait applatir les routes pour que la machine possède chaque route complète
// const v2 = {
//   "/": {
//     component: Layout,
//     routes: {
//       users: {
//         component: "",
//         routes: {
//           "": ShowUsers,
//           ":id": ShowUser,
//           routes: {
//             "": ShowUsers,
//             comments: ShowUser,
//           },
//         },
//       },
//       products: {
//         component: ShowProducts,
//       },
//     },
//   },
//   "*": {
//     tag: Layout,
//     attributes: [["content", { tag: Page404 }]],
//   },
//   "/users": {
//     tag: Layout,
//     attributes: [["content", { tag: ShowUsers }]],
//   },
// };
