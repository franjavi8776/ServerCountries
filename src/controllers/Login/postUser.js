const { User } = require("../../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) res.status(400).send("Faltan Datos");

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { password: hashedPassword },
    });

    if (created) {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "tu_token_secret",
        { expiresIn: "1h" }
      );
      console.log(user, token);
      return res.status(201).json({ user, token });
    } else {
      return res.status(200).json({ message: "Usuario ya existe", user });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
