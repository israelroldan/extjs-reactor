export const TOGGLE_MENU = 'ROOT::TOGGLE_MENU';
export const ROUTE_DID_CHANGE = 'ROOT::ROUTE_DID_CHANGE';

/**
 * Show/hide the menu
 * @param {Boolean} show 
 */
export function toggleMenu(show) {
    return {
        type: TOGGLE_MENU,
        show
    }
}

/**
 * To be fired when a new client side route is loaded
 * @param {Location} location 
 */
export function routeDidChange(location) {
    return {
        type: ROUTE_DID_CHANGE,
        location
    }
}