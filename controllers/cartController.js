import {
  getCartFromDB,
  addToCartDB,
  removeFromCartDB,
} from "../models/cartModel.js";

// Buscar carrinho
export const getCart = async (req, res) => {
  const userId = req.params.userId;

  try {
    const cart = await getCartFromDB(userId);
    res.json(cart);
  } catch (err) {
    console.error("Erro ao buscar carrinho:", err);
    res.status(500).json({ error: "Erro ao buscar carrinho" });
  }
};

// Adicionar ao carrinho
export const addToCart = async (req, res) => {
  const { userId, produtoId, quantidade } = req.body;

  try {
    const newItem = await addToCartDB(userId, produtoId, quantidade);
    res.json({ message: "Item adicionado ao carrinho", item: newItem });
  } catch (err) {
    console.error("Erro ao adicionar:", err);
    res.status(500).json({ error: "Erro ao adicionar item" });
  }
};

// Remover item do carrinho
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    await removeFromCartDB(userId, productId);
    res.json({ message: "Item removido do carrinho" });
  } catch (err) {
    console.error("Erro ao remover:", err);
    res.status(500).json({ error: "Erro ao remover item" });
  }
};
