🛒 Loja Fullstack

Projeto de e-commerce desenvolvido com React + Node.js + PostgreSQL.
Possui sistema de login, cadastro, carrinho funcional, upload de imagens e pedidos.

-------

🚀 Tecnologias Usadas

💻 Frontend
React
React Router
Toastify

⚙ Backend
Node.js + Express
PostgreSQL
JWT
Bcrypt
Cloudinary

------

📦 Funcionalidades

✔️ Cadastro e login com JWT
✔️ CRUD de produtos
✔️ Upload de imagens com Cloudinary
✔️ Carrinho persistido no banco
✔️ Finalização de pedido
✔️ API REST

------

Como Rodar o Projeto 

1 - Clone o repositorio
git clone https://github.com/Luizguilherme-Dev/loja-fullstack.git


2 - Backend

cd Backend
npm install
npm run dev

3 - Front-End

cd Frontend
npm install
npm start

Importante: backend roda em "localhost:5000" e front end em "localhost:5173"

------

🗄 Banco de dados
O projeto usa PostgreSQL.

Crie um banco chamado: Loja

E configure seu .env no backend:
DB_USER=postgres
DB_PASS=sua_senha
DB_NAME=loja
DB_HOST=localhost
PORT=5000

------


📦 Endpoints Principais
Produtos:

POST /products
GET /products
DELETE /products/:id

Carrinho:

GET /cart/:userId
POST /cart/add
DELETE /cart/remove/:userId/:productId

Usuário:

POST /auth/register
POST /auth/login

Pedidos:
POST /orders

🧑‍💻 Autor
Desenvolvido por Luiz Guilherme 🚀

------

Screenshots

Home
<img width="1336" height="643" alt="Home png" src="https://github.com/user-attachments/assets/fc54e12a-ac8b-4e2b-afaa-99c904156c69" />

Carrinho
<img width="1333" height="255" alt="Carrinho png" src="https://github.com/user-attachments/assets/76835fbf-f56d-4cad-be82-d1f3d3f06bc8" />

Login
<img width="1343" height="638" alt="Login png" src="https://github.com/user-attachments/assets/3b5a1368-b74f-4502-bddf-14d83d57bdf0" />
