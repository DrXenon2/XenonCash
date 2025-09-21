// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/profile/edit.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditProfile() {
  const [profile, setProfile] = useState({ username: '', email: '', phone: '', country: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/users/me', profile, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Error updating profile: ' + err.message);
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={profile.country}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
      {message && <p>{message}</p>}
      <style jsx>{`
        .edit-profile { padding: 20px; }
        label { display: block; margin: 10px 0; }
        input { margin-left: 10px; padding: 5px; width: 200px; }
        button { padding: 5px 10px; margin-top: 10px; }
      `}</style>
    </div>
  );
}