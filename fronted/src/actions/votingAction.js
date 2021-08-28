import * as votingService from "../services/votingService";
import { votingConstants, leadersConstants } from '../constants/global';

export function voteWakanda(wakandaAddress, candidateId, candidate, amountOfVotes) {
    return async (dispatch) => {
        dispatch(request());
        let response = await votingService.vote(wakandaAddress, candidateId, candidate, amountOfVotes);
        if(response.OK) {
            dispatch(success(response.Data));
        } else {
            dispatch(failure(response.ErrorText));
        }
    };

    function request() {
        return { type: votingConstants.VOTE_WAKANDA_REQUEST };
    }
    function success(data) {
        return { type: votingConstants.VOTE_WAKANDA_SUCCESS, data };
    }
    function failure(error) {
        return { type: votingConstants.VOTE_WAKANDA_FAILURE, error };
    }
}

export function showLeadrboard() {
    return async (dispatch) => {
        dispatch(request());
        let response = await votingService.getLeaderboard()
        if(response.OK) {
            dispatch(success(response.Data));
        } else {
            dispatch(failure(response.ErrorText));
        }
    };

    function request() {
        return { type: leadersConstants.LEADERS_WAKANDA_REQUEST };
    }
    function success(data) {
        return { type: leadersConstants.LEADERS_WAKANDA_SUCCESS, data };
    }
    function failure(error) {
        return { type: leadersConstants.LEADERS_WAKANDA_FAILURE, error };
    }
}