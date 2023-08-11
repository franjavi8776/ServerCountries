const { Router } = require("express");
const postUser = require("../../controllers/Login/postUser");
const login = require("../../controllers/Login/login");

const router = Router();

router.post("/register", postUser);
router.post("/login", login);

module.exports = router;
