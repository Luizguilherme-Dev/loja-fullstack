import express from "express";
import cors from "cors";
import pkg from "pg";
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload"; 
import uploadRoutes from "./routes/upload.js";
import cartRoutes from "./routes/cart.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from "dotenv";
dotenv.config();


const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Para upload de imagens
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

// Conexão com o PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

pool.connect()
  .then(() => console.log("Conectado ao PostgreSQL"))
  .catch((err) => console.error("Erro ao conectar:", err));

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: "dtqs4cjin",
  api_key: "134418299423383",
  api_secret: "OPo6IL3v2Rh_MwN4e1PFl7QIo7s"
});

// ROTA PARA CADASTRAR PRODUTO + IMAGEM
app.post("/products", async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;

    let imagemUrl = null;

    // Se veio imagem, enviar para o Cloudinary
    if (req.files?.imagem) {
      const imagem = req.files.imagem;

      const uploadResult = await cloudinary.uploader.upload(imagem.tempFilePath, {
        folder: "produtos",
      });

      imagemUrl = uploadResult.secure_url;
    }

    // Inserir no banco
    const result = await pool.query(
      "INSERT INTO produtos (nome, preco, estoque, imagem) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, preco, estoque, imagemUrl]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error("Erro ao cadastrar produto:", err);
    res.status(500).json({ error: "Erro ao cadastrar produto" });
  }
});

// ROTA PARA LISTAR PRODUTOS
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM produtos ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

// ROTA PARA DELETAR PRODUTO POR ID
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM produtos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json({ message: "Produto deletado com sucesso", produto: result.rows[0] });

  } catch (err) {
    console.error("Erro ao deletar produto:", err);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
});


// ROTA DE UPLOAD MANUAL (se precisar)
app.use("/api/upload", uploadRoutes);

//Use do carrinho
app.use("/cart", cartRoutes);

//Use dos usuarios
app.use("/auth", authRoutes);

//Use das ordens
app.use("/orders", orderRoutes);

// INICIAR SERVIDOR
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
