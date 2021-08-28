import { votingConstants } from "../constants/global";

export const votingReducer = (
        state = {
            voteData: null, 
            voteError: ""
        }, 
        action = {}
    ) => {
    switch (action.type) {
        case votingConstants.VOTE_WAKANDA_REQUEST:
            return {
                ...state,
                voteData: null, 
                voteError: ""
            }
        case votingConstants.VOTE_WAKANDA_SUCCESS:
            return {
                ...state,
                voteData: action.data.reason,
                voteError: ""
            };
        case votingConstants.VOTE_WAKANDA_FAILURE:
            return {
                ...state,
                voteData: null,
                voteError: action.error
            };
        default:
            return state; 
    }
}