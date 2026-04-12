const express = require("express");
const bachatBazaarRoutes = require("./bachatBazaarRoutes");
const shopHubRoutes = require("./shopHubRoutes");
const xBeatRoutes = require("./xBeatRoutes");

const router = express.Router();

router.use("/bachat-bazaar", bachatBazaarRoutes);
router.use("/shophub", shopHubRoutes);
router.use("/x-beat", xBeatRoutes);

module.exports = router;