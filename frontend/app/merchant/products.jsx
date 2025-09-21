// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/merchant/products.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', commission_rate: '', niche: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/merchant/products', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/merchant/products', newProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNewProduct({ name: '', description: '', price: '', commission_rate: '', niche: '' });
      // Rafraîchir la liste
      const response = await axios.get('/api/merchant/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="products-section">
      <h2>Manage Products</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price (XOF):
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Commission Rate (%):
          <input
            type="number"
            name="commission_rate"
            value={newProduct.commission_rate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Niche:
          <input
            type="text"
            name="niche"
            value={newProduct.niche}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
      <div className="product-list">
        <h3>Current Products</h3>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> {product.price} XOF</p>
            <p><strong>Commission:</strong> {product.commission_rate}%</p>
            <p><strong>Niche:</strong> {product.niche}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .products-section { padding: 20px; }
        .product-form { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; }
        label { display: block; margin: 10px 0; }
        input { margin-left: 10px; padding: 5px; width: 200px; }
        button { padding: 5px 10px; margin-top: 10px; }
        .product-list { margin-top: 20px; }
        .product-card { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; background: #f9f9f9; }
      `}</style>
    </div>
  );
}