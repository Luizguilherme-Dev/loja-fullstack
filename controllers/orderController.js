import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "loja",
  password: "positivo=10",
  port: 5432,
});

export const createOrder = async (req, res) => {
  try {
    const { userId, total, items } = req.body;

    const order = await pool.query(
      "INSERT INTO pedidos (user_id, total) VALUES ($1, $2) RETURNING id",
      [userId, total]
    );

    const orderId = order.rows[0].id;

    for (let item of items) {
      await pool.query(
        "INSERT INTO pedidos_itens (pedido_id, produto_id, quantidade, preco) VALUES ($1, $2, $3, $4)",
        [orderId, item.produto_id, item.quantidade, item.price]
      );
    }

    await pool.query("DELETE FROM carrinho WHERE user_id = $1", [userId]);

    res.json({ message: "Pedido criado", orderId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
};
