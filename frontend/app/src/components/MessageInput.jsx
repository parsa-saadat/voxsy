import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';

export default function MessageInput() {
  const [text, setText] = useState('');
  const { t } = useTranslation();

  const sendMessage = () => {
    if (!text.trim()) return;
    console.log('Send:', text);
    setText('');
  };

  return (
    <div className="flex items-center gap-2 justify-center mb-2">
      <div className="flex gap-4 w-[70%] items-center justify-center rounded p-3 bg-[--gary-dark] backdrop-blur-xl">
        <button>
          <FontAwesomeIcon
            icon={faPlus}
            className="text-[--gray] font-bold hover:text-[--primary-color] transition-all mx-2"
          />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('typeMessage')}
          className="w-full bg-[--gray] p-2 placeholder:text-[--gray-dark] border-none outline-none text-[--gray-dark] rounded"
        />
        <button
          onClick={sendMessage}
          className="text-[--gray] font-bold hover:text-[--primary-color] transition-all mx-2"
        >
          {t("sendMessage")}
        </button>
      </div>
    </div>
  );
}
