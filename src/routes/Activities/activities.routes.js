const { Router } = require("express");
const postActivity = require("../../controllers/Activities/postActivity");
const getActivities = require("../../controllers/Activities/getActivities");

const router = Router();

router.post("/", postActivity);
router.get("/", getActivities);

module.exports = router;
