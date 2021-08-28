import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const changeRoute = (route = "/") => {
    history.push(route);
}

export const isEmpty = (string) => {
    if (string && !string.match(/^ *$/)) {
		return true;
	}
	return false;
}

export const isValidWakandaAddresses = (address) => {
    return address && address.match(/^(0x){1}[0-9a-fA-F]{40}$/);
}