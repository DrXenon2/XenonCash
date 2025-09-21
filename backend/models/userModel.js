const supabase = require('../utils/supabase');

const UserModel = {
  // Créer un utilisateur
  createUser: async (username, email, phone, country, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, phone, country } }
    });
    if (error) throw new Error(error.message);
    return data.user;
  },

  // Récupérer un utilisateur par ID
  getUserById: async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  // Mettre à jour le solde
  updateBalance: async (userId, amount) => {
    const { data, error } = await supabase
      .from('users')
      .update({ balance: amount })
      .eq('id', userId)
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  // Récupérer tous les utilisateurs (admin only)
  getAllUsers: async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = UserModel;