### **وُکسی (Voxsy)** 🗣️

#### **یک سرویس چت و صوتی**

| توضیحات پروژه | لینک گیت‌هاب |
| :--- | :--- |
| **بخش بک‌اند (Backend)** | **توسعه‌دهنده:** [پارسا سعادت](https://github.com/parsa-saadat) |
| **بخش فرانت‌اند (Frontend)** | **توسعه‌دهنده:** [سپهر جام](https://github.com/SepehrJam) |

-----

### **راه‌اندازی بک‌اند** ⚙️

برای راه‌اندازی بخش **بک‌اند** این پروژه، مراحل زیر را دنبال کنید:

1.  **نصب وابستگی‌ها (Requirements):** ابتدا دستور زیر را در ترمینال اجرا کنید تا تمام پکیج‌های مورد نیاز نصب شوند.

    ```bash
    npm i
    ```

2.  **ایجاد فایل `.env`:** یک فایل با نام `.env` در ریشه پروژه ایجاد کرده و متغیرهای محیطی زیر را در آن قرار دهید.

      * **تنظیمات اپلیکیشن:**
          * `STATUS=DEV` (مقادیر مجاز: `DEV` برای توسعه، `PROD` برای حالت تولید)
      * **تنظیمات کلاینت:**
          * `CLIENT_URL=http://localhost:5173`
          * `SERVICE_URL=http://localhost:3000`
      * **تنظیمات دامنه:**
          * `PORT=3000`
          * `HOST=localhost`
          * `PROTOCOL=http`
      * **تنظیمات CORS (هم‌رسانی منابع میان‌مبداء):**
          * `CORS_ORIGIN=*`
          * `CORS_METHODS=GET,POST,PUT,DELETE,PATCH`
          * `CORS_ALLOWED_HEADERS=Content-Type,Authorization`
      * **تنظیمات لاگ:**
          * `LOG_FILE_PATH=./log/http.log`
      * **تنظیمات MongoDB:**
          * `MONGO_URI=mongodb://localhost:27017/`
          * `MONGO_DATABASE_NAME=vox`
      * **تنظیمات ذخیره‌سازی:**
          * `MAX_MB_UPLOAD_SIZE=5`
      * **تنظیمات پرداخت:**
          * `VERIFY_PAYMENT_CALLBACK_PAHT=/orders/verify`
          * `VERIFY_PAYMENT_CALLBACK_URL=http://localhost:3000/orders/verify`
      * **تنظیمات پرداخت زرین‌پال:**
          * `ZARINPAL_MERCHANT_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
          * `ZARINPAL_PAYMENT_REQUEST_URL=https://sandbox.zarinpal.com/pg/v4/payment/request.json`
          * `ZARINPAL_VRIFY_PAYMENT_URL=https://sandbox.zarinpal.com/pg/v4/payment/verify.json`
          * `ZARINPAL_REFUND_URL=https://sandbox.zarinpal.com/pg/v4/payment/refund.json`
          * `ZARINPAL_PAY_URL=https://sandbox.zarinpal.com/pg/StartPay`
      * **تنظیمات پیامک (Kavenegar):**
          * `KAVENEGAR_API_KEY=...`
          * `KAVENEGAR_SENDER_NUMBER=...`
          * `KAVENEGAR_RECEIVER_NUMBER=...`
          * `KAVENEGAR_VERIFY_TEMPLATE_NAME=verify`
      * **تنظیمات ایمیل:**
          * `MAIL_SERVICE=gmail`
          * `MAIL_USER=parsasaadat13881@gmail.com`
          * `MAIL_CLIENT_ID=...`
          * `MAIL_CLIENT_SECRET=...`
          * `MAIL_REFRESH_TOKEN=...`
          * `MAIL_HTML_AUTH_TEMPLATE_PATH=/templates/auth/auth.template.html`
      * **تنظیمات امنیتی:**
          * `EXPIRE_AUTH_REQUEST_MIN=5`
          * `JWT_EXPIRES_IN=30d`
          * `JWT_SECRET=...`

3.  **اجرای سرور:** برای اجرای سرور در حالت توسعه، دستور زیر را اجرا کنید.

      * 💡 نکته: اگر به سیستم پیامک یا ایمیل دسترسی ندارید، مقدار `STATUS` را در فایل `.env` روی `DEV` تنظیم کنید.

    <!-- end list -->

    ```bash
    npm run start:dev
    ```

    در صورت موفقیت، پیام زیر نمایش داده خواهد شد:

    `Server is running on localhost port 3000`

-----