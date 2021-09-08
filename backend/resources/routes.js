const adminController = require("./controllers/adminController");
const wakandaController = require("./controllers/wakandaController");

routes = (app) => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,POST");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
    });

    app.post("/addCandidates", adminController.addCandidates);
    app.post("/addDelegators", adminController.addDelegators);
    app.post("/registration", wakandaController.wakandaRegistration);

    app.get("/balance", wakandaController.getBalance);
    app.get("/leaderboard", wakandaController.getWinningCandidates);
    app.get("/getCandidates", wakandaController.getCandidates);
    app.get("/getDelegators", wakandaController.getDelegators);
}

module.exports = routes;
