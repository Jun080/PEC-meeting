import { signOutUser } from "../Models/userModel.js";

class AuthService {
    constructor() {
        this.user = null;
        this.isAuthenticated = false;
        this.initializeAuth();
    }

    initializeAuth() {
        const userString = localStorage.getItem('user');
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (isLoggedIn && userString) {
            try {
                this.user = JSON.parse(userString);
                this.isAuthenticated = true;
            } catch (error) {
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

    requireAuth() {
        if (!this.isLoggedIn() && !this.checkLocalAuth()) {
            window.location.pathname = '/connexion';
            return false;
        }
        return true;
    }
}

export const authService = new AuthService();

export function requireAuth() {
    return authService.requireAuth();
}

export function redirectIfAuthenticated() {
    if (authService.isLoggedIn() || authService.checkLocalAuth()) {
        window.location.pathname = '/compte';
        return true;
    }
    return false;
}
