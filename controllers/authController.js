import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserDB, getUserByEmailDB } from "../models/userModel.js";

// Criar novo usuário
export const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const userExists = await getUserByEmailDB(email);
    if (userExists) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const newUser = await createUserDB(nome, email, senhaHash);

    res.json({
      message: "Usuário criado com sucesso",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

// Login
export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await getUserByEmailDB(email);

    if (!user) {
      return res.status(400).json({ error: "Email não encontrado" });
    }

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "segredo_jwt_123",
      { expiresIn: "3h" }
    );

    res.json({
      message: "Login realizado",
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};
