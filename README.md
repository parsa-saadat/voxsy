### **Voxsy** 🗣️

#### **A Chat and Voice Service**

| Project Description | GitHub Link |
| :--- | :--- |
| **Backend** | **Developed By:** [Parsa SS](https://github.com/parsa-saadat) |
| **Frontend** | **Developed By:** [Sepehr Jam](https://github.com/SepehrJam) |

-----

### **Backend Setup** ⚙️

To get the **backend** of this project up and running, follow these steps:

1.  **Install Dependencies:** First, run the following command in your terminal to install all the required packages.

    ```bash
    npm i
    ```

2.  **Create `.env` File:** Create a file named `.env` in the root of your project and add the following environment variables.

      * **App Config:**
          * `STATUS=DEV` (Allowed values: `DEV` for development, `PROD` for production)
      * **Client Config:**
          * `CLIENT_URL=http://localhost:5173`
          * `SERVICE_URL=http://localhost:3000`
      * **Domain Config:**
          * `PORT=3000`
          * `HOST=localhost`
          * `PROTOCOL=http`
      * **CORS Config:**
          * `CORS_ORIGIN=*`
          * `CORS_METHODS=GET,POST,PUT,DELETE,PATCH`
          * `CORS_ALLOWED_HEADERS=Content-Type,Authorization`
      * **Log Config:**
          * `LOG_FILE_PATH=./log/http.log`
      * **MongoDB Config:**
          * `MONGO_URI=mongodb://localhost:27017/`
          * `MONGO_DATABASE_NAME=vox`
      * **Storage:**
          * `MAX_MB_UPLOAD_SIZE=5`
      <!-- * **Payment Config:**
          * `VERIFY_PAYMENT_CALLBACK_PAHT=/orders/verify`
          * `VERIFY_PAYMENT_CALLBACK_URL=http://localhost:3000/orders/verify`
      * **Zarinpal Payment Config:**
          * `ZARINPAL_MERCHANT_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`
          * `ZARINPAL_PAYMENT_REQUEST_URL=https://sandbox.zarinpal.com/pg/v4/payment/request.json`
          * `ZARINPAL_VRIFY_PAYMENT_URL=https://sandbox.zarinpal.com/pg/v4/payment/verify.json`
          * `ZARINPAL_REFUND_URL=https://sandbox.zarinpal.com/pg/v4/payment/refund.json`
          * `ZARINPAL_PAY_URL=https://sandbox.zarinpal.com/pg/StartPay` -->
      * **SMS Config (Kavenegar):**
          * `KAVENEGAR_API_KEY=...`
          * `KAVENEGAR_SENDER_NUMBER=...`
          * `KAVENEGAR_RECEIVER_NUMBER=...`
          * `KAVENEGAR_VERIFY_TEMPLATE_NAME=verify`
      * **Email Config:**
          * `MAIL_SERVICE=gmail`
          * `MAIL_USER=parsasaadat13881@gmail.com`
          * `MAIL_CLIENT_ID=...`
          * `MAIL_CLIENT_SECRET=...`
          * `MAIL_REFRESH_TOKEN=...`
          * `MAIL_HTML_AUTH_TEMPLATE_PATH=/templates/auth/auth.template.html`
      * **Security Config:**
          * `EXPIRE_AUTH_REQUEST_MIN=5`
          * `JWT_EXPIRES_IN=30d`
          * `JWT_SECRET=...`

3.  **Run the Server:** To run the server in development mode, execute the following command.

      * 💡 Note: If you don't have an SMS or Email system set up, change the `STATUS` value in the `.env` file to `DEV`.

    <!-- end list -->

    ```bash
    npm run start:dev
    ```

    Upon success, you should see the following message:

    `Server is running on localhost port 3000`