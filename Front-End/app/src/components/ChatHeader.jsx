import axios from 'axios';

import { noProfile } from '../public/assets/files';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ChatHeader({ userId }) {
  const token = localStorage.getItem('token');

  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/users/${userId}`, {
        headers: { Authorization: token },
      });
      setUserProfile(res.data.body);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-gray-500';
      case 'sleep':
        return 'bg-yellow-400';
      case 'dnd':
        return 'bg-red-400';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex justify-center gap-3 items-center p-4 border-b border-gray-700 bg-gray-900/60 backdrop-blur-lg">
      <div className="relative">
        <img
          src={
            userProfile?.profile_picture
              ? `${import.meta.env.VITE_APP_API_URL}/storage/${userProfile.profile_picture}`
              : noProfile
          }
          alt={userProfile?.nickname || 'user'}
          className="w-12 h-12 rounded-full object-cover border border-gray-700"
        />
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${statusColor(
            userProfile?.status,
          )}`}
        ></span>
      </div>

      <span>{userProfile.nickname || userProfile.username}</span>
    </div>
  );
}
