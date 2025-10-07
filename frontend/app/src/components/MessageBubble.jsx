import { useTranslation } from "react-i18next";

export default function MessageBubble({ message, sender }) {
  const { i18n } = useTranslation();
  const isMe = sender === "me";

  // تعیین کلاس راست/چپ
  const alignment = isMe ? "justify-end" : "justify-start";

  // رنگ پیام و گوشه‌ها
  const bubbleClass = `px-4 py-2 rounded-2xl max-w-xs bg-indigo-600 text-white ${
    isMe
      ? i18n.language === "fa"
        ? "rounded-bl-none"
        : "rounded-br-none"
      : i18n.language === "fa"
        ? "rounded-br-none"
        : "rounded-bl-none"
  }`;

  return (
    <div className={`flex ${alignment} mb-2`}>
      <div className={bubbleClass}>{message}</div>
    </div>
  );
}
