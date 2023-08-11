const { User } = require("../../db.js");

const postUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) res.status(400).send("Faltan Datos");

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { password },
    });

    if (created) {
      return res.status(201).json(user);
    } else {
      return res.status(200).json({ message: "Usuario ya existe", user });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
