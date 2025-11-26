import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "loja",
  password: "positivo=10",
  port: 5432,
});

// Criar usuário
export const createUserDB = async (nome, email, senhaHash) => {
  const result = await pool.query(
    "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email",
    [nome, email, senhaHash]
  );
  return result.rows[0];
};

// Buscar usuário por email
export const getUserByEmailDB = async (email) => {
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );
  return result.rows[0];
};
