const { User } = require("../../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan Datos" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "tu_token_secret",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ access: true, token });
    } else {
      return res.status(403).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = login;
