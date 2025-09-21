// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/app/dashboard/profile/page.jsx
import React from 'react';
import Link from 'next/link';
import ProfileDetails from './details';
import EditProfile from './edit';
import Password from './password';

export default function ProfilePage() {
  return (
    <div className="profile-container">
      <h1>Profile - XenonCash</h1>
      <nav>
        <Link href="/dashboard/profile/details">Details</Link> | 
        <Link href="/dashboard/profile/edit">Edit</Link> | 
        <Link href="/dashboard/profile/password">Change Password</Link>
      </nav>
      <ProfileDetails />
      <EditProfile />
      <Password /> {/* Inclu le composant Password directement ici ou via lien ci-dessus */}
    </div>
  );
}