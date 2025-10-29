import { t } from 'i18next';
import { noProfile } from '../public/assets/files';

export default function ChatItem({ user, unreadMessages }) {
  const { username, nickname, status, profile_picture, _id } = user;
  const unread = unreadMessages;

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
    <div className="flex items-center justify-between p-3 hover:bg-gray-800 cursor-pointer transition">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={
              profile_picture
                ? `${import.meta.env.VITE_APP_API_URL}/storage/${profile_picture}`
                : noProfile
            }
            alt={name}
            className="w-12 rounded-full object-fill"
          />

          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${statusColor(status)}`}
          ></span>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{nickname ?? username}</h3>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <span className="text-xs text-gray-500 mx-2">{t(status)}</span>
        {unread[_id] ? <span>{unread[_id]}</span> : ''}
      </div>
    </div>
  );
}
