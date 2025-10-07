import { useEffect, useState } from 'react';
import axios from 'axios';
import ChatItem from './ChatItem';
import { Link } from 'react-router-dom';

const chats = [
  {
    id: 1,
    name: 'John Davidson',
    message: 'Hey! How have you been?',
    time: '03:42',
    status: 'online',
  },
  {
    id: 2,
    name: 'Frank Jackson',
    message: "Let's move the meeting...",
    time: '03:42',
    status: 'online',
  },
  { id: 3, name: 'Melissa Naude', message: 'You keen for coffee?', time: '03:42', status: 'away' },
  {
    id: 4,
    name: 'Erik James',
    message: 'What happened last night?',
    time: '03:42',
    status: 'away',
  },
  {
    id: 5,
    name: 'Jeffery Friedman',
    message: 'How was the party?',
    time: '03:42',
    status: 'offline',
  },
];

export default function ChatList() {
  const token = localStorage.getItem('token');
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
    fetchChatList();
  }, []);

  const fetchChatList = async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/chats`, {
      headers: { Authorization: token },
    });
    setChatList(response.data.body);
  };
  return (
    <div className="flex-1 overflow-y-auto">
      {chatList?.users?.map((user) => (
        <Link to={`/${user._id}`}>
          <ChatItem key={user._id} user={user} unreadMessages={chatList.unseenMessages} />
        </Link>
      ))}
    </div>
  );
}
