import { leadersConstants } from "../constants/global";

export const leadersReducer = (
        state = {
            showLeaderBoard: false,
            leadersData: null, 
            leadersError: ""
        }, 
        action = {}
    ) => {
    switch (action.type) {
        case leadersConstants.LEADERS_WAKANDA_REQUEST:
            return {
                ...state,
                showLeaderBoard: false,
                leadersData: null, 
                leadersError: ""
            }
        case leadersConstants.LEADERS_WAKANDA_SUCCESS:
            return {
                ...state,
                showLeaderBoard: true,
                leadersData: action.data.response,
                leadersError: ""
            };
        case leadersConstants.LEADERS_WAKANDA_FAILURE:
            return {
                ...state,
                showLeaderBoard: false,
                leadersData: null,
                leadersError: action.error
            };
        default:
            return state; 
    }
}