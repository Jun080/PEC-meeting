const Dashboard = function () {
  return {
    tag: "div",
    attributes: [["class", "dashboard-page"]],
    children: [
      {
        tag: "h1",
        children: ["Dashboard"],
      },
      {
        tag: "p",
        children: ["Gérez votre profil, vos événements et vos communautés."],
      },
    ],
  };
};

export default Dashboard;
