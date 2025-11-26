import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "loja",
  password: "positivo=10",
  port: 5432,
});

// Buscar carrinho do usuário
export const getCartFromDB = async (userId) => {
  const result = await pool.query(
    `SELECT 
        c.produto_id AS id,
        p.nome AS name,
        p.preco AS price,
        p.imagem AS image,
        c.quantidade AS quantity
     FROM carrinho c
     JOIN produtos p ON p.id = c.produto_id
     WHERE c.user_id = $1`,
    [userId]
  );

  return result.rows;
};

// Adicionar item ao carrinho
export const addToCartDB = async (userId, produtoId, quantidade = 1) => {
  const result = await pool.query(
    "INSERT INTO carrinho (user_id, produto_id, quantidade) VALUES ($1, $2, $3) RETURNING *",
    [userId, produtoId, quantidade]
  );
  return result.rows[0];
};

// Remover item do carrinho
export const removeFromCartDB = async (userId, produtoId) => {
  await pool.query(
    "DELETE FROM carrinho WHERE user_id = $1 AND produto_id = $2",
    [userId, produtoId]
  );
};
