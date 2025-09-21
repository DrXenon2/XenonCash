const supabase = require('../utils/supabase');

const ProductModel = {
  // Créer un produit
  createProduct: async (name, description, commission_rate, price, niche) => {
    const { data, error } = await supabase.from('products').insert({
      name, description, commission_rate, price, niche, active: true
    }).select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  // Récupérer tous les produits actifs
  getActiveProducts: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true);
    if (error) throw new Error(error.message);
    return data;
  },

  // Récupérer un produit par ID
  getProductById: async (productId) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  // Mettre à jour un produit
  updateProduct: async (productId, updates) => {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', productId)
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  }
};

module.exports = ProductModel;