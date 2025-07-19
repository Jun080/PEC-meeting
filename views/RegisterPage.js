import { createUser } from "../Models/userModel.js";

export default function RegisterPage() {
    return {
        tag: "div",
        attributes: [["class", "register-page"]],
        children: [
            {
                tag: "div",
                attributes: [["class", "register-container"]],
                children: [
                    {
                        tag: "div",
                        attributes: [["class", "register-left"]],
                        children: [
                            {
                                tag: "div",
                                attributes: [["class", "register-image"]],
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
                        attributes: [["class", "register-right"]],
                        children: [
                            {
                                tag: "div",
                                attributes: [["class", "register-right-inner"]],
                                children: [
                                    {
                                        tag: "div",
                                        attributes: [["class", "register-step step-1 active"]],
                                        children: [
                                            {
                                                tag: "div",
                                                attributes: [["class", "register-content"]],
                                                children: [
                                                    {
                                                        tag: "h1",
                                                        attributes: [["class", "register-title"]],
                                                        children: ["S'inscrire"]
                                                    },
                                                    {
                                                        tag: "p",
                                                        attributes: [["class", "register-subtitle"]],
                                                        children: ["Déjà inscrit ? ", { tag: "a", attributes: [["href", "/connexion"], ["class", "login-link"]], children: ["Connectez-vous ici !"] }]
                                                    },
                                                    {
                                                        tag: "form",
                                                        attributes: [["class", "register-form"], ["id", "register-form-step1"]],
                                                        children: [
                                                            {
                                                                tag: "div",
                                                                attributes: [["class", "error-message"]],
                                                                children: []
                                                            },
                                                            {
                                                                tag: "div",
                                                                attributes: [["class", "form-row"]],
                                                                children: [
                                                                    {
                                                                        tag: "div",
                                                                        attributes: [["class", "form-group"]],
                                                                        children: [
                                                                            {
                                                                                tag: "input",
                                                                                attributes: [
                                                                                    ["name", "nom"],
                                                                                    ["placeholder", "Nom*"],
                                                                                    ["required", true]
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
                                                                                    ["name", "prenom"],
                                                                                    ["placeholder", "Prénom*"],
                                                                                    ["required", true]
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                tag: "div",
                                                                attributes: [["class", "form-row"]],
                                                                children: [
                                                                    {
                                                                        tag: "div",
                                                                        attributes: [["class", "form-group"]],
                                                                        children: [
                                                                            {
                                                                                tag: "input",
                                                                                attributes: [
                                                                                    ["name", "mail"],
                                                                                    ["type", "email"],
                                                                                    ["placeholder", "Adresse mail*"],
                                                                                    ["required", true]
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
                                                                                    ["name", "tel"],
                                                                                    ["type", "tel"],
                                                                                    ["placeholder", "Numéro de téléphone*"],
                                                                                    ["required", true]
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                tag: "div",
                                                                attributes: [["class", "form-row form-row-alone"]],
                                                                children: [
                                                                    {
                                                                        tag: "div",
                                                                        attributes: [["class", "form-group"]],
                                                                        children: [
                                                                            {
                                                                                tag: "input",
                                                                                attributes: [
                                                                                    ["name", "mot_de_passe"],
                                                                                    ["type", "password"],
                                                                                    ["placeholder", "Mot de passe*"],
                                                                                    ["required", true]
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                tag: "button",
                                                                attributes: [
                                                                    ["type", "button"],
                                                                    ["class", "bouton-primary-1 m-auto"],
                                                                    ["id", "next-step-btn"]
                                                                ],
                                                                events: {
                                                                    click: [
                                                                        function() {
                                                                            const form = document.getElementById('register-form-step1');
                                                                            if (form.checkValidity()) {
                                                                                showStep2();
                                                                            } else {
                                                                                form.reportValidity();
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                children: ["Suivant"]
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
                                                                children: ["s'inscrire avec"]
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
                                    },
                                    {
                                        tag: "div",
                                        attributes: [["class", "register-step step-2"]],
                                        children: [
                                            {
                                                tag: "div",
                                                attributes: [["class", "register-content"]],
                                                children: [
                                                    {
                                                        tag: "button",
                                                        attributes: [
                                                            ["type", "button"],
                                                            ["class", "back-button"]
                                                        ],
                                                        events: {
                                                            click: [
                                                                function() {
                                                                    showStep1();
                                                                }
                                                            ]
                                                        },
                                                        children: ["Retour"]
                                                    },
                                                    {
                                                        tag: "h1",
                                                        attributes: [["class", "register-title"]],
                                                        children: ["Un peu plus de détails sur vous !"]
                                                    },
                                                    {
                                                        tag: "form",
                                                        attributes: [["class", "register-form"], ["id", "register-form-step2"]],
                                                        events: {
                                                            submit: [
                                                                async function (event) {
                                                                    event.preventDefault();
                                                                    await submitRegistration();
                                                                }
                                                            ]
                                                        },
                                                        children: [
                                                            {
                                                                tag: "div",
                                                                attributes: [["class", "error-message"]],
                                                                children: []
                                                            },
                                                            {
                                                                tag: "div",
                                                                attributes: [["class", "form-row"]],
                                                                children: [
                                                                    {
                                                                        tag: "div",
                                                                        attributes: [["class", "form-group"]],
                                                                        children: [
                                                                            {
                                                                                tag: "input",
                                                                                attributes: [
                                                                                    ["name", "lieu"],
                                                                                    ["placeholder", "Ville"]
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
                                                                                    ["name", "date_naissance"],
                                                                                    ["type", "date"],
                                                                                    ["placeholder", "Date de naissance"]
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                tag: "div",
                                                                attributes: [["class", "form-row form-row-alone"]],
                                                                children: [
                                                                    {
                                                                        tag: "div",
                                                                        attributes: [["class", "form-group"]],
                                                                        children: [
                                                                            {
                                                                                tag: "input",
                                                                                attributes: [
                                                                                    ["name", "centres_interet"],
                                                                                    ["placeholder", "Centre d'intérêt"]
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                tag: "div",
                                                                attributes: [["class", "form-buttons"]],
                                                                children: [
                                                                    {
                                                                        tag: "button",
                                                                        attributes: [
                                                                            ["type", "submit"],
                                                                            ["class", "bouton-primary-1 m-auto"]
                                                                        ],
                                                                        children: ["Je m'inscris !"]
                                                                    },
                                                                    {
                                                                        tag: "button",
                                                                        attributes: [
                                                                            ["type", "button"],
                                                                            ["class", "bouton-tertiary-2"]
                                                                        ],
                                                                        events: {
                                                                            click: [
                                                                                async function() {
                                                                                    await submitRegistration(true);
                                                                                }
                                                                            ]
                                                                        },
                                                                        children: ["Remplir mes informations plus tard"]
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
            }
        ]
    };
}

function showStep2() {
    const step1 = document.querySelector('.step-1');
    const step2 = document.querySelector('.step-2');
    
    step1.classList.remove('active');
    step2.classList.add('active');
}

function showStep1() {
    const step1 = document.querySelector('.step-1');
    const step2 = document.querySelector('.step-2');
    
    step2.classList.remove('active');
    step1.classList.add('active');
}

async function submitRegistration(skipOptional = false) {
    try {
        const step1Form = document.getElementById('register-form-step1');
        const step2Form = document.getElementById('register-form-step2');
        
        const nom = step1Form.elements["nom"].value;
        const prenom = step1Form.elements["prenom"].value;
        const mail = step1Form.elements["mail"].value;
        const tel = step1Form.elements["tel"].value;
        const mot_de_passe = step1Form.elements["mot_de_passe"].value;
        
        const lieu = skipOptional ? null : step2Form.elements["lieu"].value || null;
        const date_naissance = skipOptional ? null : step2Form.elements["date_naissance"].value || null;
        const centres_interet = skipOptional ? null : 
            (step2Form.elements["centres_interet"].value ? 
                step2Form.elements["centres_interet"].value.split(",").map(s => s.trim()) : 
                null);
        
        const userData = {
            nom,
            prenom,
            mail,
            tel,
            mot_de_passe: await window.dcodeIO.bcrypt.hash(mot_de_passe, 10),
            lieu,
            date_naissance,
            centres_interet,
            role: "user"
        };
        
        await createUser(userData);
        
        window.location.pathname = '/dashboard';
        
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        alert('Erreur lors de l\'inscription: ' + error.message);
        
        const errorDiv = document.querySelector('.step-2 .error-message') || 
                        document.querySelector('.step-1 .error-message');
        if (errorDiv) {
            errorDiv.textContent = 'Erreur lors de l\'inscription: ' + error.message;
            errorDiv.classList.add('show');
        }
    }
}