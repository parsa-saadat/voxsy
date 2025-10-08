import ChatList from './ChatList';
import Header from './Header';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {

  const { t } = useTranslation();
  return (
    <div className="w-1/3 bg-gray-900/70 backdrop-blur-md border-r border-gray-700 flex flex-col">
      <Header />
      <div className="p-3 border-b border-gray-700 text-sm text-gray-400">{t('chats')}</div>
      <ChatList />
    </div>
  );
}
