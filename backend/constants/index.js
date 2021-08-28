const ACTION_TYPE = {
    REQUEST: "REQUEST",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE"
}

const MESSAGE = {
    WRONG_INPUT: "Wrong input",
    
    ALREADY_REGISTERED: "Wakanda has been registered already",
    ALREADY_VOTED: "Wakanda has been voted already",

    SUCCESS_REGISTRATION: "Wakanda successfully registred",
    SUCCESS_VOTE: "Wakanda successfully voted",
    
    FAILED_REGISTRATION: "Registration of wakanda failed",
    FAILED_GETING_BALANCE: "Geting balance of wakanda failed",
    FAILED_VOTING: "Voting failed",
    FAILED_GETING_LEADERBOARD: "Geting winning candidate failed",
    FAILED_GETING_CANIDATES: "Geting candidates failed"
}

module.exports = {
    ACTION_TYPE: ACTION_TYPE,
    MESSAGE: MESSAGE
}