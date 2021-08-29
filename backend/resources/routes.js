const constants = require("../constants");
const transaction = require("./transaction");

routes = (app, contract, defaultAccount) => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,POST");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
    });

    app.post("/registration", async (req, res) => { 
        try {
            const wakandaAddress = req.body.wakandaAddress;
            if(wakandaAddress){
                const isRegistred = await contract.wakandaTokenContract.methods.isRegistered(wakandaAddress).call();
                if(!isRegistred) {
                    const response = await transaction.registrationTx(wakandaAddress, defaultAccount);
                    if(response) {
                        res.json({"status":"success", "reason": constants.MESSAGE.SUCCESS_REGISTRATION });
                    }
                }
                else {
                    const isInactive = await contract.wakandaTokenContract.methods.isInactive(wakandaAddress).call();
                    if(!isInactive){
                        res.status(200).json({"status":"success", "reason": constants.MESSAGE.ALREADY_REGISTERED});
                    } else {
                        res.status(200).json({"status":"success", "reason": constants.MESSAGE.ALREADY_VOTED});
                    }
                }
            } else{
                res.status(400).json({"status":"failed", "reason": constants.MESSAGE.WRONG_INPUT});
            }
        } catch(error) {
            console.log(error);
            res.status(500).json({"status":"failed", "reason": constants.MESSAGE.FAILED_REGISTRATION});
        }
    });

    app.get('/balance', async (req,res)=>{
        try {
            const wakandaAddress = req.query.wakandaAddress;
            if(wakandaAddress){
                    const response = await contract.wakandaTokenContract.methods.balanceOf(wakandaAddress).call();
                    res.json({"status":"success", response});
            }else{
                res.status(400).json({"status":"failed", "reason": constants.MESSAGE.WRONG_INPUT});
            }
        } catch(error) {
            res.status(500).json({"status":"failed", "reason": constants.MESSAGE.FAILED_GETING_BALANCE});
        }
    });
 
    app.post("/vote", async (req, res) => {
        try {
            const wakandaAddress = req.body.wakandaAddress;
            const candidateId = req.body.candidateId;
            const candidate = req.body.candidate;
            const amountOfVotes = req.body.amountOfVotes;
            if(wakandaAddress || candidateId || candidate || amountOfVotes) {
                //const response = await contract.votingContract.methods.vote(wakandaAddress, candidateId, candidate, amountOfVotes).send({from: defaultAccount});
                const response = await transaction.votingTx(wakandaAddress, candidateId, candidate, amountOfVotes, defaultAccount);
                if(response){
                    res.json({"status":"success", "reason": constants.MESSAGE.SUCCESS_VOTE});
                }
            } else{
                res.status(400).json({"status":"failed", "reason": constants.MESSAGE.WRONG_INPUT});
            } 
        } catch (error) {
            console.log(error);
            res.status(500).json({"status":"failed", "reason":constants.MESSAGE.FAILED_VOTING});
        }
    });

    app.get('/leaderboard', async (req,res) => {
        try {
            const response = await contract.votingContract.methods.winningCandidates().call();
            res.json({"status":"success", response})
        } catch (error) {
            res.status(500).json({"status":"failed", "reason":constants.MESSAGE.FAILED_GETING_LEADERBOARD});
        }
    });
}

module.exports = routes;
