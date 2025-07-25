import BrowserRouter from "./components/BrowserRouter.js";
import routes from "./routes/index.js";

// Objet router global pour faciliter la navigation
window.router = {
    navigate: (path) => {
        window.history.pushState({}, undefined, path);
        window.dispatchEvent(new Event("pushstate"));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

BrowserRouter({
    routes,
    rootElement: document.getElementById("root"),
    baseUrl: "",
});
