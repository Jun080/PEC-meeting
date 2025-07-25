
import { client } from '../supabase.js';

export async function getAllCommunautes() {
  try {
    const { data, error } = await client.functions.invoke('communauteModel', { body: {} });
    if (error) throw error;
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function getCommunautesByReferent(referentId) {
  try {
    const { data, error } = await client.functions.invoke('communauteModel', { body: { action: 'getByReferent', referent: referentId } });
    if (error) throw error;
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function getCommunauteById(id) {
  try {
    const { data, error } = await client.functions.invoke('communauteModel', { body: { action: 'getById', id } });
    if (error) throw error;
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function createCommunaute(communauteData) {
  try {
    const { data, error } = await client.functions.invoke('communauteModel', { body: { action: 'create', communauteData } });
    if (error) throw error;
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCommunaute(id, communauteData) {
  try {
    const { data, error } = await client.functions.invoke('communauteModel', { body: { action: 'update', id, communauteData } });
    if (error) throw error;
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCommunaute(id) {
  try {
    const { data, error } = await client.functions.invoke('communauteModel', { body: { action: 'delete', id } });
    if (error) throw error;
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function getCommunauteMemberCount(communaute_id) {
  try {
    const { data, error } = await client.functions.invoke('communauteMembresModel', { body: { action: 'countByCommunauteId', communaute_id } });
    if (error) throw error;
    return data.data?.count || 0;
  } catch (error) {
    throw error;
  }
}

export async function deleteCommunaute(communauteId) {
    try {
        const { error } = await client
            .from('communautes')
            .delete()
            .eq('id', communauteId);
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Erreur lors de la suppression de la communauté:', error);
        throw error;
    }
}

export async function getAllCommunautesWithMemberCount() {

    const { data: communautes, error: communautesError } = await client
        .from('communautes')
        .select('*');

    if (communautesError) throw communautesError;

    const communautesWithCount = await Promise.all(
        communautes.map(async (communaute) => {
            const { count, error: countError } = await client
                .from('communaute_membres')
                .select('*', { count: 'exact', head: true })
                .eq('communaute_id', communaute.id);

            if (countError) {
                console.warn(`Erreur lors du comptage des membres pour la communauté ${communaute.id}:`, countError);
                return { ...communaute, member_count: 0 };
            }

            return { ...communaute, member_count: count || 0 };
        })
    );

    return communautesWithCount;

  const communautes = await getAllCommunautes();
  if (!Array.isArray(communautes)) return [];
  return Promise.all(
    communautes.map(async (communaute) => {
      const count = await getCommunauteMemberCount(communaute.id);
      return { ...communaute, member_count: count };
    })
  );
}