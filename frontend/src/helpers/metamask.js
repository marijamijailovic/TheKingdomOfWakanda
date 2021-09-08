import { globalConstants } from "../constants/global";
import { setItem } from "./storage";

export const connectToMetaMask = async () => {
    if(window.ethereum) {
        setItem(globalConstants.WEB3_SUPPORT, true);
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            return accounts[0];
        } catch (error) {
            throw new Error(error.message);
        }
    } else {
        setItem(globalConstants.WEB3_SUPPORT, false);
        return;
    }
}