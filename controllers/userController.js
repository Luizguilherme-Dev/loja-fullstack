let users = []; // mock de usuários

export const registerUser = (req, res) => {
  const { username, password } = req.body;
  const exists = users.find(u => u.username === username);
  if (exists) return res.status(400).json({ message: "Usuário já existe" });

  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  res.json({ message: "Usuário registrado com sucesso", user: newUser });
};

export const loginUser = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(400).json({ message: "Usuário ou senha inválidos" });

  res.json({ message: "Login realizado com sucesso", user });
};
