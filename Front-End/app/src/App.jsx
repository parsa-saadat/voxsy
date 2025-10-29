import './index.css';
import './i18n';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import { Bounce, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import PrePage from './pages/PreAuth';
import { BG } from './public/assets/files';
import VerifyPage from './pages/VerifyAuth';

export default function App() {
  const { i18n } = useTranslation();

  const pos = i18n.language === 'fa' ? 'top-right' : 'top-left';
  const dir = i18n.language === 'fa' ? true : false;

  return (
    <>
      <ToastContainer
        position={pos}
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        pauseOnFocusLoss
        rtl={dir ?? false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/:userId" element={<Chat />} />
          <Route path="/auth/pre" element={<PrePage />} />
          <Route path="/auth/verify" element={<VerifyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
