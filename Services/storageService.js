import { client } from '../supabase.js';

export async function uploadProfilePhoto(file, userId) {
    try {
        if (!file) {
            throw new Error('Aucun fichier sélectionné');
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            throw new Error('Type de fichier non supporté. Utilisez JPG, PNG ou WebP.');
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `profile-${userId}-${Date.now()}.${fileExt}`;

        const { data, error } = await client.storage
            .from('utilisateurs-image')
            .upload(fileName, file, {
                upsert: true
            });

        const { data: publicUrlData } = client.storage
            .from('utilisateurs-image')
            .getPublicUrl(fileName);

        return publicUrlData.publicUrl;

    } catch (error) {
        console.error('Erreur dans uploadProfilePhoto:', error);
        throw error;
    }
}


export async function updateUserPhotoUrl(userId, photoUrl) {
    try {
        const { error } = await client
            .from('utilisateurs')
            .update({ image: photoUrl })
            .eq('id', userId);

        if (error) {
            throw new Error(`Erreur lors de la mise à jour: ${error.message}`);
        }

        return true;

    } catch (error) {
        console.error('Erreur dans updateUserPhotoUrl:', error);
        throw error;
    }
}

export async function uploadCommunauteImage(file, communauteName) {
    const fileExt = file.name.split('.').pop();
    const filePath = `communaute_${communauteName}_${Date.now()}.${fileExt}`;
    const { data, error } = await client.storage.from('communautes-images').upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
    });
    if (error) throw error;
    // Récupérer l'URL publique
    const { data: publicUrlData } = client.storage.from('communautes-images').getPublicUrl(filePath);
    return publicUrlData.publicUrl;
}
