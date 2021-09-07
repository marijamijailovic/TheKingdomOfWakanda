import * as candidateService from "../../services/candidateService";
import * as adminService from "../../services/adminService";
import { candidatesRequest, candidatesSuccess, candidatesFailure } from "../candidatesSlice";

export function addAllCandidates(allCandidates) {
    return async dispatch => {
      dispatch(candidatesRequest())
      try {
        const response = await adminService.addCandidates(allCandidates);
        if(response.OK) {
          dispatch(candidatesSuccess(response.Data));
        } else {
          dispatch(candidatesFailure(response.ErrorText));
        }
      } catch (error) {
        dispatch(candidatesFailure(error.message));
      }
    }
  }
  
  export function getAllCandidates() {
    return async dispatch => {
      dispatch(candidatesRequest())
      try {
        const response = await candidateService.getCandidates();
        if(response.OK) {
          dispatch(candidatesSuccess(response.Data));
        } else {
          dispatch(candidatesFailure(response.ErrorText));
        }
      } catch (error) {
        dispatch(candidatesFailure(error.message));
      }
    }
  }
  
  export function getWinningCandidates() {
    return async dispatch => {
      dispatch(candidatesRequest())
      try {
        const response = await candidateService.getWinners();
        if(response.OK) {
          dispatch(candidatesSuccess(response.Data));
        } else {
          dispatch(candidatesFailure(response.ErrorText));
        }
      } catch (error) {
        dispatch(candidatesFailure(error.message));
      }
    }
  }