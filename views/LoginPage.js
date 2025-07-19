import { authService, redirectIfAuthenticated } from "../Services/authService.js";

export default function LoginPage() {
    if (redirectIfAuthenticated()) {
        return { tag: "div", children: ["Redirection..."] };
    }

    return {
        tag: "div",
        attributes: [["class", "login-page"]],
        children: [
            {
                tag: "div",
                attributes: [["class", "login-container"]],
                children: [
                    {
                        tag: "div",
                        attributes: [["class", "login-left"]],
                        children: [
                            {
                                tag: "div",
                                attributes: [["class", "login-image"]],
                                children: [
                                    {
                                        tag: "div",
                                        attributes: [["class", "meetup-logo"]],
                                        children: []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attributes: [["class", "login-right"]],
                        children: [
                            {
                                tag: "div",
                                attributes: [["class", "login-right-inner"]],
                                children: [
                                    {
                                        tag: "div",
                                        attributes: [["class", "login-header"]],
                                        children: [
                                            {
                                                tag: "a",
                                                attributes: [["href", "/"], ["class", "bouton-tertiary-2"]],
                                                children: ["Se connecter plus tard"]
                                            }
                                        ]
                                    },
                                    {
                                        tag: "div",
                                        attributes: [["class", "login-content"]],
                                        children: [
                                            {
                                                tag: "h1",
                                                attributes: [["class", "login-title"]],
                                                children: ["Se connecter"]
                                            },
                                            {
                                                tag: "p",
                                                attributes: [["class", "login-subtitle"]],
                                                children: ["Pas encore inscrit ? ", { tag: "a", attributes: [["href", "/inscription"], ["class", "signup-link"]], children: ["C'est par ici !"] }]
                                            },
                                            {
                                                tag: "form",
                                                attributes: [["class", "login-form"]],
                                                events: {
                                                    submit: [
                                                        async function (event) {
                                                            event.preventDefault();
                                                            const form = event.target;
                                                            const email = form.elements["email"].value;
                                                            const password = form.elements["password"].value;

                                                            try {
                                                                const result = await authService.login(email, password);
                                            
                                                                window.location.pathname = '/compte';
                                                                
                                                            } catch (error) {
                                                                const errorDiv = document.querySelector('.error-message');
                                                                if (errorDiv) {
                                                                    errorDiv.textContent = 'Erreur de connexion: ' + error.message;
                                                                    errorDiv.classList.add('show');
                                                                }
                                                            }
                                                        },
                                                    ],
                                                },
                                                children: [
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "error-message"]],
                                                        children: []
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "form-group"]],
                                                        children: [
                                                            {
                                                                tag: "input",
                                                                attributes: [
                                                                    ["id", "email"],
                                                                    ["name", "email"],
                                                                    ["type", "email"],
                                                                    ["placeholder", "Votre email"],
                                                                    ["required", true],
                                                                    ["autocomplete", "email"]
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "form-group"]],
                                                        children: [
                                                            {
                                                                tag: "input",
                                                                attributes: [
                                                                    ["id", "password"],
                                                                    ["name", "password"],
                                                                    ["type", "password"],
                                                                    ["placeholder", "Votre mot de passe"],
                                                                    ["required", true],
                                                                    ["autocomplete", "current-password"]
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        tag: "button",
                                                        attributes: [
                                                            ["type", "submit"],
                                                            ["class", "bouton-primary-1 m-auto"]
                                                        ],
                                                        children: ["Je me connecte !"]
                                                    }
                                                ]
                                            },
                                            {
                                                tag: "div",
                                                attributes: [["class", "social-login"]],
                                                children: [
                                                    {
                                                        tag: "p",
                                                        attributes: [["class", "social-title"]],
                                                        children: ["se connecter avec"]
                                                    },
                                                    {
                                                        tag: "div",
                                                        attributes: [["class", "social-buttons"]],
                                                        children: [
                                                            {
                                                                tag: "button",
                                                                attributes: [["class", "bouton-secondary-2"], ["type", "button"]],
                                                                children: [
                                                                    {
                                                                        tag: "span",
                                                                        children: []
                                                                    },
                                                                    "Google"
                                                                ]
                                                            },
                                                            {
                                                                tag: "button",
                                                                attributes: [["class", "bouton-secondary-2"], ["type", "button"]],
                                                                children: [
                                                                    {
                                                                        tag: "span",
                                                                        children: []
                                                                    },
                                                                    "Facebook"
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
}