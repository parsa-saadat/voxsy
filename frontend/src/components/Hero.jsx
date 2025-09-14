import React from 'react'

const Hero = () => {
  return (
    <section className="hero-bg text-white py-20 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">مکانی برای گفتگو و ارتباط</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10">
          دیسکورد مکانی برای ایجاد جامعه‌ی شما است؛ جایی که می‌توانید با دوستان خود ملاقات کنید، هر روز چت کنید و زمان بیشتری را با هم بگذرانید.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse">
          <button className="bg-white text-discord-black rounded-full py-4 px-8 text-lg font-medium download-btn flex items-center justify-center w-full md:w-auto">
            <i className="fas fa-download ml-2"></i>
            دانلود برای ویندوز
          </button>
          <button className="bg-discord-black text-white rounded-full py-4 px-8 text-lg font-medium download-btn w-full md:w-auto">
            باز کردن دیسکورد در مرورگر
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero