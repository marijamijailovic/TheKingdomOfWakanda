import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { setItem } from "../../helpers/storage";
import { globalConstants } from "../../constants/global";

const initialState = {
    connected: false,
}

export const metaMaskConnect = createAsyncThunk("metamask/metaMaskConnect", async ()=>{
    if(window.ethereum) {
        setItem(globalConstants.WEB3_SUPPORT, true);
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            if(accounts[0]){
                setItem(globalConstants.META_MASK_ACCOUNT, accounts[0]);
                return true;
            } else{
                return false;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    } else {
        setItem(globalConstants.WEB3_SUPPORT, false);
        return false;
    }
});

const metamaskSlice = createSlice({
    name: "metamask",
    initialState,
    reducers: {},
    extraReducers: {
        [metaMaskConnect.fulfilled]: (state, action) => {
            state.connected = action.payload;
            return state;
        }
    }
})

export default metamaskSlice.reducer;