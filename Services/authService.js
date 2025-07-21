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

    async signInWithGoogle() {
        const { client } = await import("../supabase.js");
        
        try {
            const { data, error } = await client.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth-callback`
                }
            });
            
            if (error) throw error;
            
            return data;
        } catch (error) {
            console.error('Erreur lors de la connexion Google:', error);
            throw error;
        }
    }
//Not working for now

/*
    async signInWithFacebook() {
        const { client } = await import("../supabase.js");
        
        try {
            const { data, error } = await client.auth.signInWithOAuth({
                provider: 'facebook',
                options: {
                    redirectTo: `${window.location.origin}/auth-callback`
                }
            });
            
            if (error) throw error;
            
            return data;
        } catch (error) {
            console.error('Erreur lors de la connexion Facebook:', error);
            throw error;
        }
    }
*/        

    async handleOAuthCallback() {
        const { client } = await import("../supabase.js");
        
        try {
            const { data, error } = await client.auth.getSession();
            
            if (error) {
                console.error('Erreur getSession:', error);
                throw error;
            }
            
            if (data.session) {
                const user = data.session.user;
                
                // Check if user exist else create user
                const { getUserByEmail, createUser } = await import("../Models/userModel.js");
                let dbUser;
                
                try {
                    dbUser = await getUserByEmail(user.email);
                    
                    // Update user info if available 
                    let needsUpdate = false;
                    
                    if (user.user_metadata?.given_name && (!dbUser.prenom || dbUser.prenom === 'Utilisateur')) {
                        dbUser.prenom = user.user_metadata.given_name;
                        needsUpdate = true;
                    }
                    
                    if (user.user_metadata?.family_name && (!dbUser.nom || dbUser.nom === 'Nom' || dbUser.nom === '')) {
                        dbUser.nom = user.user_metadata.family_name;
                        needsUpdate = true;
                    }
                    
                    // Update photo 
                    if ((user.user_metadata?.avatar_url || user.user_metadata?.picture) && 
                        (!dbUser.image || dbUser.image === '')) {
                        dbUser.image = user.user_metadata.avatar_url || user.user_metadata.picture;
                        needsUpdate = true;
                    }
                    
                    // Save updates
                    if (needsUpdate) {
                        const { updateUser } = await import("../Models/userModel.js");
                        try {
                            const updateData = {
                                prenom: dbUser.prenom,
                                nom: dbUser.nom
                            };
                            
                            // Add image URL if available
                            if (dbUser.image) {
                                updateData.image = dbUser.image;
                            }
                            
                            await updateUser(dbUser.id, updateData);
                        } catch (updateError) {
                            console.error('Erreur mise à jour utilisateur:', updateError);
                            
                            // Fallback to localStorage for photo if database update fails
                            if (dbUser.image) {
                                const { photoProfilService } = await import("./photoProfilService.js");
                                photoProfilService.setUserPhoto(dbUser.id, dbUser.image);
                            }
                        }
                    }
                    
                    // Also save photo to localStorage service as backup
                    if ((user.user_metadata?.avatar_url || user.user_metadata?.picture)) {
                        const { photoProfilService } = await import("./photoProfilService.js");
                        photoProfilService.setUserPhoto(dbUser.id, user.user_metadata.avatar_url || user.user_metadata.picture);
                    }
                } catch (err) {

                    
                    // Extract name from Google metadata
                    let prenom = 'Utilisateur';
                    let nom = '';
                    
                    if (user.user_metadata?.given_name) {
                        prenom = user.user_metadata.given_name;
                    }
                    
                    if (user.user_metadata?.family_name) {
                        nom = user.user_metadata.family_name;
                    }
                    
                    // Fallback to full_name if individual names not available
                    if (!user.user_metadata?.given_name && user.user_metadata?.full_name) {
                        const nameParts = user.user_metadata.full_name.split(' ');
                        prenom = nameParts[0] || 'Utilisateur';
                        nom = nameParts.slice(1).join(' ') || '';
                    }
                    
                    // Fallback to name 
                    if (!prenom || prenom === 'Utilisateur') {
                        prenom = user.user_metadata?.name || 'Utilisateur';
                    }
                    
                    const newUserData = {
                        mail: user.email,
                        prenom: prenom,
                        nom: nom,
                        mot_de_passe: '' // OAuth users don't need password
                    };
                    
                    // Add photo URL from Google
                    if (user.user_metadata?.avatar_url || user.user_metadata?.picture) {
                        newUserData.image = user.user_metadata.avatar_url || user.user_metadata.picture;
                    }
                    
                    dbUser = await createUser(newUserData);
                    
                    // Save photo to localStorage service
                    if ((user.user_metadata?.avatar_url || user.user_metadata?.picture) && !dbUser.image) {
                        const { photoProfilService } = await import("./photoProfilService.js");
                        photoProfilService.setUserPhoto(dbUser.id, user.user_metadata.avatar_url || user.user_metadata.picture);
                    }
                }
                
                this.user = dbUser;
                this.isAuthenticated = true;
                
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('user', JSON.stringify(dbUser));
                
                return { user: dbUser };
            }
            
            return null;
        } catch (error) {
            console.error('Erreur lors du traitement OAuth:', error);
            this.clearAuthState();
            throw error;
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

    async getUserPhoto(userId = null) {
        const targetUserId = userId || (this.user ? this.user.id : null);
        if (!targetUserId) return null;

        // First try to get from database (column 'image')
        if (this.user && this.user.image) {
            return this.user.image;
        }

        //localStorage service
        try {
            const { photoProfilService } = await import("./photoProfilService.js");
            return photoProfilService.getUserPhoto(targetUserId);
        } catch (error) {
            console.error('Erreur récupération photo:', error);
            return null;
        }
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
