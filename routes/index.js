import Page404 from "../views/Page404.js";
import ShowUsers from "../views/ShowUsers.js";
import ShowUser from "../views/ShowUser.js";
import Layout from "../views/Layout.js";
import RegisterPage from "../views/RegisterPage.js";
import LoginPage from "../views/LoginPage.js";
import Bienvenue from "../views/Bienvenue.js";
import APropos from "../views/APropos.js";
import EvenementsListing from "../views/EvenementsListing.js";
import CommunautesListing from "../views/CommunautesListing.js";
import Dashboard from "../views/Dashboard.js";
import AccountPage from "../views/AccountPage.js";
import OAuthCallback from "../views/OAuthCallback.js";
import { EventDetails } from "../views/EventDetails.js";
import { CommunauteDetails } from "../views/CommunauteDetails.js";
import CreateEvent from "../views/CreateEvent.js";
import Homepage from "../views/Homepage.js";

export default {
  "/": {
    tag: Layout,
    attributes: [["content", { tag: Homepage }]],
  },
  "/users": {
    tag: Layout,
    attributes: [["content", { tag: ShowUsers }]],
  },
  "/user/:id": {
    tag: Layout,
    attributes: [["content", { tag: ShowUser }]],
  },
  "/inscription": {
    tag: RegisterPage,
  },
  "/connexion": {
    tag: LoginPage,
  },
  "/bienvenue": {
    tag: Layout,
    attributes: [["content", { tag: Bienvenue }]],
  },
  "/a-propos": {
    tag: Layout,
    attributes: [["content", { tag: APropos }]],
  },
  "/evenements": {
    tag: Layout,
    attributes: [["content", { tag: EvenementsListing }]],
  },
  "/evenements/:id": {
    tag: Layout,
    attributes: [["content", { tag: EventDetails }]],
  },
  "/communautes": {
    tag: Layout,
    attributes: [["content", { tag: CommunautesListing }]],
  },
  "/communautes/:id": {
    tag: Layout,
    attributes: [["content", { tag: CommunauteDetails }]],
  },
  "/dashboard": {
    tag: Layout,
    attributes: [["content", { tag: Dashboard }]],
  },
  "/compte": {
    tag: Layout,
    attributes: [["content", { tag: AccountPage }]],
  },
  "/evenement/creer-evenement": {
    tag: Layout,
    attributes: [["content", { tag: CreateEvent }]],
  },
  "/auth-callback": {
    tag: OAuthCallback,
  },
  "*": {
    tag: Layout,
    attributes: [["content", { tag: Page404 }]],
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
