import { createAsyncThunk } from "@reduxjs/toolkit";
import * as wakandaService from "../../services/wakandaService";

export const wakandaRegistration = createAsyncThunk("wakanda/wakandaRegistration", async (wakandaAddress) => {
    const response = await wakandaService.addWakanda(wakandaAddress);
    if(response.OK) {
        return response.Data;
    } else {
        return response.Error;
    }
});
  
export const getWakandaStatus = createAsyncThunk("wakanda/getWakandaStatus", async(wakandaAddress) => {
    const response = await wakandaService.getWakandaStatus(wakandaAddress);
    if(response.OK) {
        return response.Data;
    } else {
        return response.Error;
    }
});

export const getWakandaBalance = createAsyncThunk("wakanda/getWakandaBalance", async(wakandaAddress) => {
    const response = await wakandaService.getWakandaBalance(wakandaAddress);
    if(response.OK) {
        return response.Data;
    } else {
        return response.Error;
    }
});