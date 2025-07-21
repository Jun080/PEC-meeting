import { client } from '../supabase.js';

export async function getAllUsers() {
  const { data, error } = await client.from('utilisateurs').select('*');
  if (error) throw error;
  return data;
}

export async function getUserById(id) {
    const { data, error } = await client
        .from('utilisateurs')
        .select('*')
        .eq('id', id)
        .single();
    if (error) throw error;
    return data;
}

export async function getUserByEmail(email) {
    const { data, error } = await client
        .from('utilisateurs')
        .select('*')
        .eq('mail', email)
        .maybeSingle(); 
    
    if (error) {
        throw error;
    }
    
    if (!data) {
        throw new Error('Utilisateur non trouvé');
    }
    
    return data;
}

export async function createUser(user) {
  const { data, error } = await client
    .from('utilisateurs')
    .insert([user])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateUser(id, userData) {
  const { data, error } = await client
    .from('utilisateurs')
    .update(userData)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function signInUser(email, password) {
  const { data, error } = await client
    .from('utilisateurs')
    .select('*')
    .eq('mail', email)
    .single();
  
  if (error || !data) {
    throw new Error('Email ou mot de passe incorrect');
  }
  
  const isPasswordValid = await window.dcodeIO.bcrypt.compare(password, data.mot_de_passe);
  
  if (!isPasswordValid) {
    throw new Error('Email ou mot de passe incorrect');
  }
  
  return { user: data };
}

export async function signOutUser() {
  return Promise.resolve();
}

export async function getCurrentUser() {
  const userString = localStorage.getItem('user');
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch (error) {
      throw new Error('Session invalide');
    }
  }
  throw new Error('Aucun utilisateur connecté');
}

export async function getUserProfile(userId) {
  const { data, error } = await client
    .from('utilisateurs')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}
