import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import { useTranslation } from 'react-i18next';
import { BG } from '../public/assets/files';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function App() {
  const { i18n } = useTranslation();
  const dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;

  const { userId } = useParams();

  return (
    <div
      dir={dir}
      className="h-screen flex bg-cover bg-center text-gray-100"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="flex-1 flex bg-black/40 backdrop-blur-2xl rounded-2xl m-4 shadow-2xl overflow-hidden">
        <Sidebar />
        {userId ? (
          <ChatWindow userId={userId} />
        ) : (
          <div className="text-center text-xl mt-[50vh] w-full justify-center items-center ">
            {t('selectChat')}
          </div>
        )}
      </div>
    </div>
  );
}
