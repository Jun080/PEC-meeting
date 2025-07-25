import { client } from '../supabase.js';

export async function getAllUsers() {
  try {
    const { data, error } = await client.functions.invoke('userModel');
    if (error) throw error;
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id) {
  try {
    const { data, error } = await client.functions.invoke('userModel', {
      body: { action: 'getById', id: id }
    });
    if (error) throw error;
    if (!data.data) throw new Error('Utilisateur non trouvé');
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    const { data, error } = await client.functions.invoke('userModel', {
      body: { action: 'getByEmail', email: email }
    });
    if (error) throw error;
    if (!data.data) throw new Error('Utilisateur non trouvé');
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function createUser(user) {
  try {
    const { data, error } = await client.functions.invoke('userModel', {
      body: { action: 'create', userData: user }
    });
    if (error) throw error;
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(id, userData) {
  try {
    const { data, error } = await client.functions.invoke('userModel', {
      body: { action: 'update', id: id, userData: userData }
    });
    if (error) throw error;
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function signInUser(email, password) {
  try {
    const { data, error } = await client.functions.invoke('userModel', {
      body: { action: 'signIn', email: email }
    });
    if (error) throw error;
    
    if (!data.data) {
      throw new Error('Email ou mot de passe incorrect');
    }
    
    const isPasswordValid = await window.dcodeIO.bcrypt.compare(password, data.data.mot_de_passe);
    
    if (!isPasswordValid) {
      throw new Error('Email ou mot de passe incorrect');
    }
    
    return { user: data.data };
  } catch (error) {
    throw error;
  }
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
  try {
    const { data, error } = await client.functions.invoke('userModel', {
      body: { action: 'getUserProfile', id: userId }
    });
    if (error) throw error;
    return data.data;
  } catch (error) {
    throw error;
  }
}
