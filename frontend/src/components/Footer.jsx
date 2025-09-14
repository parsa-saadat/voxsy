import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-discord-black text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-discord-blue mb-4">دیسکورد</h3>
            <p className="text-discord-gray">
              بهترین مکان برای گفتگو، ارتباط و ایجاد جامعه
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">محصول</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-discord-gray hover:text-white">دانلود</a></li>
              <li><a href="#" className="text-discord-gray hover:text-white">چرا دیسکورد؟</a></li>
              <li><a href="#" className="text-discord-gray hover:text-white">امنیت</a></li>
              <li><a href="#" className="text-discord-gray hover:text-white">نظرات</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">شرکت</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-discord-gray hover:text-white">درباره ما</a></li>
              <li><a href="#" className="text-discord-gray hover:text-white">فرصت‌های شغلی</a></li>
              <li><a href="#" className="text-discord-gray hover:text-white">برند</a></li>
              <li><a href="#" className="text-discord-gray hover:text-white">اخبار</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">منابع</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-discord-gray hover:text-white">دانشگاه</a></li>
              <li><a href="#" className="text-discord-gray hover:text-white">پشتیبانی فنی</a></li>
              <li><a href="#" className="text-discord-gray hover:text-white">بلاگ</a></li>
              <li><a href="#" className="text-discord-gray hover:text-white">نظرات</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-discord-gray mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <a href="#" className="text-2xl font-bold text-discord-blue flex items-center mb-4 md:mb-0">
            <i className="fab fa-discord ml-2"></i>
            دیسکورد
          </a>
          <button className="bg-discord-blue text-white px-6 py-2 rounded-full hover:bg-blue-600 transition">
            ثبت‌نام
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer