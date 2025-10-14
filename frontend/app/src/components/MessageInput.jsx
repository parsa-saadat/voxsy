import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function MessageInput({ userId }) {
  const token = localStorage.getItem('token');
  const { t } = useTranslation();

  const [message, setMessage] = useState({ content: '', files: [] });
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleAddFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const uploadFilesAndGetIds = async () => {
    const fileIds = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('files', file);

      const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/storage/upload`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });

      fileIds.push(res.data.body[0]._id);
    }

    return fileIds;
  };

  const sendMessage = async () => {
    if (!message.content.trim() && files.length === 0) return;

    try {
      let fileIds = [];

      if (files.length > 0) {
        fileIds = await uploadFilesAndGetIds();
      }

      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/message/send/${userId}`,
        { content: message.content, files: fileIds },
        { headers: { Authorization: token } },
      );

      setMessage({ content: '', files: [] });
      setFiles([]);
    } catch (err) {
      console.error('Send message failed:', err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 justify-center mb-2">
      <div
        className={`flex gap-1 text-xs ${files.length > 0 ? 'block h-full' : 'hidden h-0'}`}
      >
        {files.map((f, i) => (
          <span  key={i}>{f.name}</span>
        ))}
      </div>
      <div className="flex gap-4 w-[70%] items-center justify-center rounded p-3 bg-[--gary-dark] backdrop-blur-xl">
        <button onClick={handleAddFile}>
          <FontAwesomeIcon
            icon={faPlus}
            className="text-[--gray] font-bold hover:text-[--primary-color] transition-all mx-2"
          />
        </button>

        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <input
          value={message.content}
          onChange={(e) => setMessage({ content: e.target.value })}
          placeholder={t('typeMessage')}
          className="w-full bg-[--gray] p-2 placeholder:text-[--gray-dark] border-none outline-none text-[--gray-dark] rounded"
        />

        <button
          onClick={sendMessage}
          className="text-[--gray] font-bold hover:text-[--primary-color] transition-all mx-2"
        >
          {t('sendMessage')}
        </button>
      </div>
    </div>
  );
}
