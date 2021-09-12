const express = require('express');
const adminController = require("./controllers/adminController");
const wakandaController = require("./controllers/wakandaController");

const router = express.Router();

router.post("/addCandidates", adminController.addAllCandidates);
router.post("/addDelegators", adminController.addDelegator);
router.post("/registration", wakandaController.wakandaRegistration);

router.get("/getWakandaStatus", wakandaController.getWakandaStatus);
router.get("/getWakandaBalance", wakandaController.getWakandaBalance);
router.get("/leaderboard", wakandaController.getWinningCandidates);
router.get("/getCandidates", wakandaController.getAllCandidates);
router.get("/getDelegators", wakandaController.getAllDelegators);


module.exports = router;
