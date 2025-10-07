import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "fa" ? "en" : "fa");
  };

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900/60 backdrop-blur-lg">
      <h1 className="text-lg font-semibold">{t("chatTitle")}</h1>
      <button
        onClick={toggleLang}
        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm"
      >
        {i18n.language === "fa" ? "EN" : "فا"}
      </button>
    </div>
  );
}
