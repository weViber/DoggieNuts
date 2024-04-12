const express = require("express");

const router = express.Router();

const controller = require("../controllers/email.controller");
const controllerZhCht = require("../controllers/emailZhCht.controller");

router.post("/email", controller.postEmail);
router.post("/emailZhcht", controllerZhCht.postEmailZhCht);

module.exports = router;
