import { createBrowserHistory } from "history";
import { isEmpty, isString } from "underscore";
export const history = createBrowserHistory();

export const changeRoute = (route = "/") => {
    history.push(route);
}

export const isEmptyString = (string) => {
    return isString(string) && string === "";
}

export const isValidWakandaAddresses = (address) => {
    return address && address.match(/^(0x){1}[0-9a-fA-F]{40}$/);
}

export const isNull = (obj) => {
	return obj === undefined || obj === null;
}

export const isValid = (obj, property) => {
    return obj && property;
}