const express = require("express");
const bachatBazaarRoutes = require("./bachatBazaarRoutes");

const router = express.Router();

router.use("/bachat-bazaar", bachatBazaarRoutes);

module.exports = router;