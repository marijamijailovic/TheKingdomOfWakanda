const PATH = {
    COMPILED_WKND: "../../frontend/src/artifacts/contracts/WKNDToken.sol/WKNDToken.json",
    COMPILED_VOTING: "../../frontend/src/artifacts/contracts/Voting.sol/Voting.json"
}

const RESPONSE_STATUS = {
    FAILED: "failed",
    SUCCESS: "success",
    SERVER_ERROR: 500,
    OK: 200,
    NOT_FOUND: 400,
}

const MESSAGE = {
    WRONG_INPUT: "Wrong input",
    
    ALREADY_REGISTERED: "Wakanda has been registered already",
    ALREADY_VOTED: "Wakanda has been voted already",
    ALREADY_ADDED: "Already added",

    SUCCESS_REGISTRATION: "Wakanda successfully registred",

    NO_NEW_CHALLENGER: "No new challenger"
}

module.exports = {
    PATH: PATH,
    RESPONSE_STATUS: RESPONSE_STATUS,
    MESSAGE: MESSAGE
}