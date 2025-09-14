import React from 'react'

const Features = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100%' height='100%'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ccircle cx='50' cy='40' r='20' fill='%235865F2'/%3E%3Crect x='30' y='70' width='40' height='10' rx='5' fill='%2323272A'/%3E%3C/svg%3E" alt="فضای گفتگو" className="w-full max-w-md mx-auto rounded-lg shadow-xl" />
          </div>
          <div className="md:w-1/2 md:pr-10">
            <h2 className="text-3xl font-bold mb-6">فضایی برای تنها بودن با جامعه شما</h2>
            <p className="text-lg text-gray-700 mb-6">
              سرورهای دیسکورد به کانال‌های سازمان‌یافته‌ای تقسیم می‌شوند که در آن‌ها می‌توانید با هم همکاری کنید، اشتراک‌گذاری کنید و فقط در مورد روز خود بدون مسدود کردن یک گروه چت، صحبت کنید.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-16">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100%' height='100%'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Cpath d='M30,30 L70,30 L70,70 L30,70 Z' fill='%235865F2'/%3E%3Ccircle cx='50' cy='50' r='15' fill='%2323272A'/%3E%3C/svg%3E" alt="اتاق صوتی" className="w-full max-w-md mx-auto rounded-lg shadow-xl" />
          </div>
          <div className="md:w-1/2 md:pl-10">
            <h2 className="text-3xl font-bold mb-6">جایی که گفتگو آسان است</h2>
            <p className="text-lg text-gray-700 mb-6">
              در یک کانال صوتی بنشینید وقتی که وقت آزاد دارید. دوستانتان در سرور شما می‌توانند ببینند که شما آنجا هستید و فوراً داخل بیایند تا بدون تماس گرفتن با هم صحبت کنند.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100%' height='100%'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ccircle cx='30' cy='30' r='15' fill='%235865F2'/%3E%3Ccircle cx='70' cy='30' r='15' fill='%235865F2'/%3E%3Ccircle cx='50' cy='70' r='15' fill='%2323272A'/%3E%3C/svg%3E" alt="جامعه" className="w-full max-w-md mx-auto rounded-lg shadow-xl" />
          </div>
          <div className="md:w-1/2 md:pr-10">
            <h2 className="text-3xl font-bold mb-6">از چند نفر تا جامعه‌ای کامل</h2>
            <p className="text-lg text-gray-700 mb-6">
              از مدیریت یک انجمن کوچک تا یک شبکه اجتماعی بزرگ، امکانات مدیریّت و ابزارهای شخصی‌سازی به شما کمک می‌کند تا فضایی اختصاصی برای خود ایجاد کنید.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features