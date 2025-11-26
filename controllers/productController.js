// Mock de produtos (por enquanto)
let products = [
  { id: 1, name: "Nike Air Max", price: 450, image: "/images/nike1.jpg" },
  { id: 2, name: "Adidas Superstar", price: 350, image: "/images/adidas1.jpg" },
  { id: 3, name: "Puma RS-X", price: 400, image: "/images/puma1.jpg" },
  { id: 4, name: "Converse All Star", price: 300, image: "/images/converse1.jpg" }
];

export const getProducts = (req, res) => {
  res.json(products);
};

export const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Produto não encontrado" });
};

export const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  products.splice(index, 1);

  res.json({ message: "Produto deletado com sucesso" });
};
