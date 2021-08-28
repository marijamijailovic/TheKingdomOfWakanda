import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export function changeRoute(route = "/") {
    history.push(route);
}