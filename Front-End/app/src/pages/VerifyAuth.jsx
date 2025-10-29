import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { validateEmailSyntax } from '../utils/validators/email.validator';
import { validateIRPhoneSyntax } from '../utils/validators/phone.validator';
import { Logo } from '../public/assets/files';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

function VerifyPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  // get phone with querys
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const phone = urlParams.get('phone');
  const email = urlParams.get('phone');

  const { t } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'fa' ? 'en' : 'fa');
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (phone && validateIRPhoneSyntax(phone)) {
      axios
        .post(`${import.meta.env.VITE_APP_API_URL}/auth/login`, {
          phone: phone,
          code,
        })
        .then((res) => {
          const { token, username, _id, phone, role } = res.data.body;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify({ username, _id, phone, role }));
          toast.success(t('successLogin'));
          navigate('/');
        })
        .catch((err) => {
          toast.error(t('invalidCode'));
        });
    } else if (email && validateEmailSyntax(email)) {
      axios
        .post(`${import.meta.env.VITE_APP_API_URL}/auth/login`, {
          email: email,
          code,
        })
        .then((res) => {
          const { token, username, _id, email, role } = res.data.body;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify({ username, _id, email, role }));
          toast.success(t('successLogin'));
          navigate('/');
        })
        .catch((err) => {
          toast.error(t('invalidCode'));
        });
    }
  }

  return (
    <div className=" w-full max-w-sm mx-auto overflow-hidden bg-[--gray-dark] mt-10 rounded border border-[--gray-darker] backdrop-blur-xl">
      <button
        onClick={toggleLang}
        className="m-3 px-3 py-1 bg-[--primary-color] hover:bg-[--primary-hover] rounded-xl text-sm"
      >
        {i18n.language === 'fa' ? 'EN' : 'فا'}
      </button>
      <div className="px-6 pb-4">
        <div className="flex justify-center mx-auto mt-5 mb-2">
          <img className="w-40  object-cover" src={Logo} alt="" />
        </div>

        <h3 className="my-1 text-xl font-medium text-center text-gray-600 ">{t('codeSended')}</h3>

        <p className="mt-1 text-center text-gray-500 ">{t('loginDescription')}</p>

        <div className="w-full mt-4">
          <input
            onChange={(e) => {
              setCode(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }}
            value={code}
            required
            className="w-full bg-[--gray] text-center p-2 placeholder:text-[--gray-dark] border-none outline-none text-[--primary-color] rounded backdrop-blur-xl"
            type="text"
            placeholder={t('code')}
            aria-label="PhoneNumber"
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="w-full px-6 py-2 text-sm font-medium tracking-wide text-[--gary-dark] capitalize transition-colors duration-300 transform bg-[--gray] rounded hover:bg-[--primary-color]"
          >
            {t('next')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyPage;
