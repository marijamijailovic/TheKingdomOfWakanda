const adminController = require("./controllers/adminController");
const wakandaController = require("./controllers/wakandaController");

routes = (app) => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,POST");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
    });

    app.post("/addCandidates", adminController.addAllCandidates);
    app.post("/addDelegators", adminController.addDelegator);
    app.post("/registration", wakandaController.wakandaRegistration);

    app.get("/getWakandaStatus", wakandaController.getWakandaStatus);
    app.get("/leaderboard", wakandaController.getWinningCandidates);
    app.get("/getCandidates", wakandaController.getAllCandidates);
    app.get("/getDelegators", wakandaController.getAllDelegators);
}

module.exports = routes;
