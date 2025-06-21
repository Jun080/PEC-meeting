import Page404 from "../views/Page404.js";
import ShowUsers from "../views/ShowUsers.js";
import HomePage from "../views/HomePage.js";
import Layout from "../views/Layout.js";
import RegisterPage from "../views/RegisterPage.js";

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
  "/inscription": {
    tag: Layout,
    attributes: [["content", { tag: RegisterPage }]],
  },
};

// TODO: gérer les routes en nesting (ex: /users/:id/likes) on devrait applatir les routes pour que la machine possède chaque route complète. Si l'on crée un route du style /:event faire en sorte que si l'event possède le même nom qu'une autre page fixe (style /users) cela ne crée pas de conflit et que la page fixe soit prioritaire, sinon on peut utiliser l'id /:id pour qu'il n'y ait pas de problème
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
