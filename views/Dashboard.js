import { authService } from "../Services/authService.js";

const Dashboard = function () {
  console.log('Dashboard - authService.isLoggedIn():', authService.isLoggedIn());
  console.log('Dashboard - authService.checkLocalAuth():', authService.checkLocalAuth());
  console.log('Dashboard - authService.getUser():', authService.getUser());
  
  if (!authService.isLoggedIn() && !authService.checkLocalAuth()) {
    console.log('Dashboard - Redirection vers connexion');
    window.location.pathname = '/connexion';
  }

  const user = authService.getUser();
  const userEmail = user?.mail || user?.email || "Utilisateur";
  const userName = user?.prenom || "Utilisateur";

  return {
    tag: "div",
    attributes: [["class", "dashboard-page"]],
    children: [
      {
        tag: "div",
        attributes: [["class", "dashboard-header"]],
        children: [
          {
            tag: "h1",
            children: [`Bonjour ${userName}`],
          },
          {
            tag: "button",
            attributes: [["class", "logout-button"]],
            events: {
              click: [
                function() {
                  authService.logout();
                }
              ]
            },
            children: ["Se déconnecter"]
          }
        ]
      },
      {
        tag: "p",
        children: ["Gérez votre profil, vos événements et vos communautés."],
      },
    ],
  };
};

export default Dashboard;
