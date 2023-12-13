# 餐廳清單
此網站是由Exepress + Node.js + sequelize + mySQL 製成的餐廳清單網站，可以瀏覽清單頁面、新增、刪除、編輯餐廳清單內容，以及有登入登出系統。

## Features - 產品功能

1. 使用者可以註冊帳號。
2. 使用者可以使用FACEBOOK帳號登入。
3. 使用者可以使用搜尋功能查詢餐廳。
4. 使用者可以新增一間餐廳頁面資訊。
5. 使用者可以編輯現有的餐廳頁面資訊。
6. 使用者可以刪除現有的餐廳頁面資訊。
   

## Screen Photo - 專案畫面
![image](https://github.com/angel-retry/ac_exercise_restuarantList_CRUD/assets/71422058/58802488-ab17-4756-aa3c-e058b32a8657)
![image](https://github.com/angel-retry/ac_exercise_restuarantList_CRUD/assets/71422058/53acb62f-b45c-4586-9903-ebf85213fea1)


## Installing - 專案安裝流程
1. 請選擇好此專案存放位置後，打開terminal，並且cd到剛選擇好的專案位置，輸入下列指令，完成複製此專案(以下指令都在terminal內完成)。
```
git clone https://github.com/angel-retry/ac_exercise_restuarantList_CRUD.git
```
2. 完成複製專案後，cd此專案名稱，進入此專案資料夾。
```
cd ac_exercise_restuarantList_CRUD
```
3. 接下來安裝npm套件，請輸入以下指令開始安裝npm套件。
```
npm install
```
4. 請查看config資料夾中的config.json檔中development資訊，請打開MySQL Workbentch建立database名為resturant_list，也請確認資料庫username、password及host內容是否與development資訊內容相同(如果不同，應可修改development資訊內容，以致可連接你的MySQL Workbentch)。
```js
"development": {
    "username": "root",
    "password": "password",
    "database": "resturant_list",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
```
5. 請在終端機輸入以下內容。透過sequelize連接至資料庫，查看MySQL Workbentch的Schemas，重新整理後resturant_listy資料庫當中是否有出現此lists資料表以及sequelizemeta資料表出現，有的話代表連接成功。
```
npx sequelize db:migrate
```
6. 接下來匯入seed檔案，輸入以下內容就可把seed資料匯入進去，查看MySQL Workbentch的Schemas，重新整理後，查看lists資料表是否有資料有匯入，有資料表示連接成功。
```
npx sequelize db:seed:all
```

7. 請建立.env檔案，設置環境變數SESSION_SECRET，此檔案內容可參考.env.example內容，xxxxx為你要輸入變數(請隨意命名)。
   其中 clientID 與 clientSecret 需要到個人的 [Facebook for developersLinks](https://developers.facebook.com/)取得應用程式編號、應用程式密鑰。
```
SESSION_SECRET = SKIP
FACEBOOK_CLIENT_ID=SKIP
FACEBOOK_CLIENT_SECRET=SKIP
FACEBOOK_CALLBACK_URL=SKIP
```

8. 請在終端機輸入以下內容，此專案要在development狀態才可開啟，但請注意是否有設置過SESSION_SECRET命名變數過。
```
export NODE_ENV = development

//假如再設置.env檔之前有宣告過SESSION_SECRET，記得在終端機輸入指令把它刪掉，避免混淆
unset SESSION_SECRET
```
9. 以上，已成功連接MySQL資料庫且有匯入seed資料，可以開始使用此網站，輸入以下內容開啟網站。
```
npm run dev
```
10. 接下來會在terminal看到以下內容，代表伺服器建立成功。
```
> restaurant-list@1.0.0 dev
> nodemon app.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Example app listening on port 3000
```
11.現在，可開啟任一瀏覽器輸入[http://localhost:3000](http://localhost:3000) 開始使用此網站。

## Development tool - 開發工具
bcryptjs: ^2.4.3
connect-flash: ^0.1.1
dotenv: ^16.0.3
express: ^4.18.2
express-handlebars: ^7.0.4
express-session: ^1.17.3
handlebars: ^4.7.8
method-override: ^3.0.0
mysql2: ^3.2.0
passport: ^0.6.0
passport-facebook: ^3.0.0
passport-local: ^1.0.0
sequelize: ^6.30.0
sequelize-cli: ^6.6.0
