
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

export async function getAllCommunautesWithMemberCount() {
  const communautes = await getAllCommunautes();
  if (!Array.isArray(communautes)) return [];
  return Promise.all(
    communautes.map(async (communaute) => {
      const count = await getCommunauteMemberCount(communaute.id);
      return { ...communaute, member_count: count };
    })
  );
}