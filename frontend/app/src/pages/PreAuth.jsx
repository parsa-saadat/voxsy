import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateIRPhoneSyntax } from '../utils/validators/phone.validator';
import { validateEmailSyntax } from '../utils/validators/email.validator';
import { Logo } from '../public/assets/files';
import i18n from '../i18n';

function PrePage() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'fa' ? 'en' : 'fa');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone && validateIRPhoneSyntax(phone)) {
      console.log(import.meta.env.VITE_APP_API_URL);
      axios
        .post(`${import.meta.env.VITE_APP_API_URL}/auth/pre`, {
          phone: phone,
          accept_rules: true,
        })
        .then((res) => {
          if (res.data.success) {
            setPhone(phone);
            toast.success(t('codeSended'));
            navigate(`/auth/verify?phone=${phone}`);
          } else {
            toast.error(t('SomethingWentWrong'));
          }
        });
    } else if (email && validateEmailSyntax(email)) {
      axios
        .post(`${import.meta.env.VITE_APP_API_URL}/auth/pre`, {
          email: email,
          accept_rules: true,
        })
        .then((res) => {
          if (res.data.success) {
            setEmail(email);
            toast.success(t('codeSended'));
            navigate(`/auth/verify?email=${email}`);
          } else {
            toast.error(t('SomethingWentWrong'));
          }
        });
    } else {
      toast.error(t('invalidEmailOrPhoneNumber'));
    }
  };

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
        <h3 className="mt-1 text-xl font-medium text-center text-gray-600 ">{t('welcome')}</h3>

        <p className="mt-1 text-center text-gray-500 ">{t('pre_description')}</p>

        <div className="w-full mt-4">
          <input
            onChange={(e) => {
              setPhone(e.target.value);
              setEmail(e.target.value);
            }}
            value={phone}
            required
            className="w-full bg-[--gray] p-2 placeholder:text-[--gray-dark] border-none outline-none text-center text-[--primary-color] rounded backdrop-blur-xl"
            type="tel"
            placeholder={t('emailOrPhone')}
            aria-label="PhoneNumber"
          />
        </div>

        <div className="flex items-center mt-4">
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

export default PrePage;
