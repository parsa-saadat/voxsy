import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { noProfile } from '../public/assets/files';

export default function Header() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const { t, i18n } = useTranslation();

  const [userProfile, setUserProfile] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/users/${user._id}`, {
        headers: { Authorization: token },
      });
      setUserProfile(res.data.body);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const handleChangeClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('files', file);

      const uploadRes = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/storage/upload`,
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const fileId = uploadRes.data.body[0]._id;

      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/users/${user._id}/picture`,
        { storage_id: fileId },
        {
          headers: { Authorization: token },
        },
      );

      fetchUserProfile();
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'fa' ? 'en' : 'fa');
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
    <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900/60 backdrop-blur-lg">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="relative cursor-pointer" onClick={handleChangeClick}>
        <img
          src={
            userProfile?.profile_picture
              ? `${import.meta.env.VITE_APP_API_URL}/storage/${userProfile.profile_picture}`
              : noProfile
          }
          alt={userProfile?.nickname || 'user'}
          className="w-12 h-12 rounded-full object-cover border border-gray-700 hover:opacity-80 transition"
        />
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${statusColor(
            userProfile?.status,
          )}`}
        ></span>
      </div>

      <span>{userProfile.nickname || userProfile.username}</span>

      <button
        onClick={toggleLang}
        className="px-3 py-1 bg-[--primary-color] hover:bg-[--primary-hover] rounded-xl text-sm"
      >
        {i18n.language === 'fa' ? 'EN' : 'فا'}
      </button>
    </div>
  );
}
