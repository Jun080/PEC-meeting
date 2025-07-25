export function createUserAvatar(user, size = '40px') {
    const photoUrl = user.image;
    
    if (photoUrl) {
        return {
            tag: "img",
            attributes: [
                ["src", photoUrl],
                ["alt", `Photo de ${user.prenom || 'Utilisateur'}`],
                ["class", "user-avatar"],
                ["style", `width: ${size}; height: ${size}; border-radius: 50%; object-fit: cover;`]
            ]
        };
    } else {
        // Fallback: initiales de l'user
        const initials = `${(user.prenom || 'U')[0]}${(user.nom || '')[0]}`.toUpperCase();
        return {
            tag: "div",
            attributes: [
                ["class", "user-avatar-placeholder"],
                ["style", `width: ${size}; height: ${size}; border-radius: 50%; background: #1d4ed8; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: calc(${size} / 2.5);`]
            ],
            children: [initials]
        };
    }
}

export async function getUserAvatarAsync(userId, size = '40px') {
    try {
        const { authService } = await import("./authService.js");
        const photoUrl = await authService.getUserPhoto(userId);
        
        if (photoUrl) {
            return {
                tag: "img",
                attributes: [
                    ["src", photoUrl],
                    ["alt", "Photo de profil"],
                    ["class", "user-avatar"],
                    ["style", `width: ${size}; height: ${size}; border-radius: 50%; object-fit: cover;`]
                ]
            };
        } else {
            return {
                tag: "div",
                attributes: [
                    ["class", "user-avatar-placeholder"],
                    ["style", `width: ${size}; height: ${size}; border-radius: 50%; background: #1d4ed8; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;`]
                ],
                children: ["👤"]
            };
        }
    } catch (error) {
        console.error('Erreur récupération avatar:', error);
        return {
            tag: "div",
            attributes: [
                ["class", "user-avatar-placeholder"],
                ["style", `width: ${size}; height: ${size}; border-radius: 50%; background: #ccc; color: white; display: flex; align-items: center; justify-content: center;`]
            ],
            children: ["👤"]
        };
    }
}
