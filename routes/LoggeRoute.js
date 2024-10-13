const express = require("express");
const { viewLogs } = require("../controller/LoggeController");
const router = express.Router();

router.get("/view-logs", viewLogs);

module.exports = router;