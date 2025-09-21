// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/profile/details.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfileDetails() {
  const [profile, setProfile] = useState({ username: '', email: '', phone: '', country: '', balance: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-details">
      <h2>Profile Details</h2>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Country:</strong> {profile.country}</p>
      <p><strong>Balance:</strong> {profile.balance} XOF</p>
      <style jsx>{`
        .profile-details { padding: 20px; border: 1px solid #ccc; background: #f9f9f9; }
        p { margin: 5px 0; }
      `}</style>
    </div>
  );
}