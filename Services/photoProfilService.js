class PhotoProfilService {
    constructor() {
        this.photos = this.loadPhotos();
    }

    loadPhotos() {
        try {
            const photosString = localStorage.getItem('user_photos');
            return photosString ? JSON.parse(photosString) : {};
        } catch (error) {
            console.error('Erreur chargement photos:', error);
            return {};
        }
    }

    savePhotos() {
        try {
            localStorage.setItem('user_photos', JSON.stringify(this.photos));
        } catch (error) {
            console.error('Erreur sauvegarde photos:', error);
        }
    }

    setUserPhoto(userId, photoUrl) {
        this.photos[userId] = photoUrl;
        this.savePhotos();
    }

    getUserPhoto(userId) {
        return this.photos[userId] || null;
    }

    removeUserPhoto(userId) {
        delete this.photos[userId];
        this.savePhotos();
    }
}

export const photoProfilService = new PhotoProfilService();
