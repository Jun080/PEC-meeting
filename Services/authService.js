import { signOutUser } from "../Models/userModel.js";

// Service d'authentification
class AuthService {
    constructor() {
        this.user = null;
        this.isAuthenticated = false;
        this.initializeAuth();
    }

    initializeAuth() {
        // Pour l'authentification personnalisée, vérifier localStorage
        const userString = localStorage.getItem('user');
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (isLoggedIn && userString) {
            try {
                this.user = JSON.parse(userString);
                this.isAuthenticated = true;
                console.log('Utilisateur restauré depuis localStorage:', this.user);
            } catch (error) {
                console.log('Erreur lors de la restauration de l\'utilisateur');
                this.clearAuthState();
            }
        }
    }

    async login(email, password) {
        const { signInUser } = await import("../Models/userModel.js");
        
        try {
            const result = await signInUser(email, password);
            this.user = result.user;
            this.isAuthenticated = true;
            
            // Stocker dans localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(result.user));
            
            return result;
        } catch (error) {
            this.clearAuthState();
            throw error;
        }
    }

    async logout() {
        try {
            await signOutUser();
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        } finally {
            this.clearAuthState();
            window.location.pathname = '/';
        }
    }

    clearAuthState() {
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
    }

    getUser() {
        return this.user;
    }

    isLoggedIn() {
        return this.isAuthenticated;
    }

    // Vérifier si l'utilisateur est connecté depuis localStorage
    checkLocalAuth() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userString = localStorage.getItem('user');
        
        if (isLoggedIn && userString) {
            try {
                this.user = JSON.parse(userString);
                this.isAuthenticated = true;
                return true;
            } catch (error) {
                this.clearAuthState();
                return false;
            }
        }
        return false;
    }

    // Middleware pour protéger les routes
    requireAuth() {
        if (!this.isLoggedIn() && !this.checkLocalAuth()) {
            window.location.pathname = '/connexion';
            return false;
        }
        return true;
    }
}

// Instance singleton
export const authService = new AuthService();

// Fonction utilitaire pour vérifier l'authentification
export function requireAuth() {
    return authService.requireAuth();
}

// Fonction pour rediriger si déjà connecté
export function redirectIfAuthenticated() {
    if (authService.isLoggedIn() || authService.checkLocalAuth()) {
        window.location.pathname = '/dashboard';
        return true;
    }
    return false;
}
