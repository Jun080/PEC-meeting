import { authService } from "../Services/authService.js";

export default function OAuthCallback() {
    // Prevent multiple callback executions
    if (window.oauthCallbackExecuted) {
        return {
            tag: "div",
            attributes: [["class", "oauth-callback"]],
            children: [
                {
                    tag: "div",
                    attributes: [["class", "loading-container"]],
                    children: [
                        {
                            tag: "h2",
                            children: ["Connexion en cours..."]
                        },
                        {
                            tag: "p",
                            children: ["Traitement en cours, veuillez patienter."]
                        }
                    ]
                }
            ]
        };
    }

    window.oauthCallbackExecuted = true;

    // Handle OAuth callback immediately
    setTimeout(async () => {
        try {
            const result = await authService.handleOAuthCallback();
            if (result && result.user) {
                // Redirect to account page on login success
                window.location.pathname = '/compte';
            } else {
                // No session found, redirect to login
                window.location.pathname = '/connexion';
            }
        } catch (error) {
            console.error('Erreur OAuth callback:', error);
            alert('Erreur lors de la connexion');
            window.location.pathname = '/connexion';
        }
    }, 500); // Small delay to ensure Supabase has processed the callback

    return {
        tag: "div",
        attributes: [["class", "oauth-callback"]],
        children: [
            {
                tag: "div",
                attributes: [["class", "loading-container"]],
                children: [
                    {
                        tag: "h2",
                        children: ["Connexion en cours..."]
                    },
                    {
                        tag: "p",
                        children: ["Veuillez patienter pendant que nous finalisons votre connexion."]
                    }
                ]
            }
        ]
    };
}
