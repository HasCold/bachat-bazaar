const express = require("express");
const bachatBazaarRoutes = require("./bachatBazaarRoutes");
const shopHubRoutes = require("./shopHubRoutes");

const router = express.Router();

router.use("/bachat-bazaar", bachatBazaarRoutes);
router.use("/shophub", shopHubRoutes);

module.exports = router;