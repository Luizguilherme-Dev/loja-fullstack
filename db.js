import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "loja", // coloque o nome do seu banco
  password: "positivo=10",
  port: 5432,
});

pool.connect()
  .then(() => console.log("Conectado ao PostgreSQL!"))
  .catch((err) => console.error("Erro ao conectar:", err));

export default pool;
