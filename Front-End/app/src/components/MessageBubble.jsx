import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

export default function MessageBubble({ message }) {
  const { i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const isMe = message.sender_id === user._id;

  const alignment = isMe ? 'justify-end' : 'justify-start';

  const bubbleClass = `px-4 py-2 rounded-2xl max-w-xs lg:max-w-md text-white ${
    isMe
      ? i18n.language === 'fa'
        ? 'rounded-bl-none bg-[--primary-color]'
        : 'rounded-br-none bg-[--primary-color]'
      : i18n.language === 'fa'
        ? 'rounded-br-none bg-[--gray-dark]'
        : 'rounded-bl-none bg-[--gray-dark]'
  }`;

  const messageContainerClass = `flex items-end gap-2 mb-3 ${alignment}`;

  return (
    <div className={messageContainerClass}>
      <div className="flex flex-col max-w-[70%]">
        {message.files && message.files.length > 0 && (
          <div
            className="mb-2 grid gap-1"
            style={{
              gridTemplateColumns: message.files.length > 1 ? 'repeat(2, 1fr)' : '1fr',
            }}
          >
            {message.files.map((item, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_APP_API_URL}/storage/` + item}
                  className="w-full h-auto object-cover max-h-60"
                />
              </div>
            ))}
          </div>
        )}
        {message.content.length > 0 && (
          <div className={bubbleClass}>
            <span>{message.content}</span>
            <br />
            <div className="flex gap-2 justify-end">
              <span className="text-xs">{message.edited ? t('edited') : ''}</span>
              {isMe && (
                <span className="text-xs flex items-start justify-end mt-1">
                  {message.seen ? (
                    <div className="flex">
                      <FontAwesomeIcon icon={faCheck} className="me-[-10px]" />
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                  ) : (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                </span>
              )}
            </div>
          </div>
        )}

        <div
          className={`text-xs text-gray-500 mt-1 ${i18n.language == 'en' && isMe ? 'text-right' : ''} ${i18n.language == 'fa' && isMe ? 'text-left' : ''}`}
        >
          {new Date(message.create_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}
