import { globalConstants } from "../constants/global";
import { setItem } from "./storage";

export const connectToMetaMask = async () => {
    if(window.ethereum) {
        setItem(globalConstants.WEB3_SUPPORT, true);
        try {
            const account = await window.ethereum.request({ method: "eth_requestAccounts" });
            return account[0];
        } catch (error) {
            throw new Error(error.message);
        }
    } else {
        setItem(globalConstants.WEB3_SUPPORT, false);
        return;
    }
}

export const metaMaskAccountChange = () => {
    window.ethereum.on("accountsChanged", function (accounts) {
        setItem(globalConstants.META_MASK_ACCOUNT, accounts[0]);
    })
}