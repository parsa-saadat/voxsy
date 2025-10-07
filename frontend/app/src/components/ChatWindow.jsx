import { useEffect, useState } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function ChatWindow({ userId }) {
  const token = localStorage.getItem('token');

  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [messages, setMessage] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  const fetchMessages = async () => {
    await axios
      .get(`${import.meta.env.VITE_APP_API_URL}/message/${userId}`, {
        headers: { Authorization: token },
      })
      .then((r) => {
        setMessage(r.data.body);
      });
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-800/50 backdrop-blur-md">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg.content}
            sender={msg.sender_id}
            seen={msg.seen}
            edited={msg.edited}
            files={msg.files}
          />
        ))}
      </div>
      <MessageInput />
    </div>
  );
}
