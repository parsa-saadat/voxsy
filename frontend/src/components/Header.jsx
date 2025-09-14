import React from 'react'

const Header = () => {
  return (
    <header className="bg-discord-blue py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-white text-2xl font-bold flex items-center">
          <i className="fab fa-discord ml-2"></i>
          دیسکورد
        </a>
        
        <nav className="hidden md:flex space-x-6 space-x-reverse">
          <a href="#" className="text-white hover:text-gray-300">دانلود</a>
          <a href="#" className="text-white hover:text-gray-300">چرا دیسکورد؟</a>
          <a href="#" className="text-white hover:text-gray-300">نیتورک</a>
          <a href="#" className="text-white hover:text-gray-300">امنیت</a>
          <a href="#" className="text-white hover:text-gray-300">پشتیبانی</a>
        </nav>
        
        <button className="bg-white text-discord-blue px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 hover:shadow-lg transition">
          ورود
        </button>
        
        <button className="md:hidden text-white">
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
    </header>
  )
}

export default Header