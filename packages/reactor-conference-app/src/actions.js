export const TOGGLE_MENU = 'ROOT::TOGGLE_MENU';
export const ROUTE_DID_CHANGE = 'ROOT::ROUTE_DID_CHANGE';
export const TOGGLE_SEARCH = 'ROOT::TOGGLE_SEARCH';
export const SEARCH = 'ROOT::SEARCH';
export const SET_TITLE = 'ROOT::SET_TITLE';

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

/**
 * Show/hide the search view
 */
export function toggleSearch() {
    return {
        type: TOGGLE_SEARCH
    }
}

export function search(query) {
    return {
        type: SEARCH,
        query
    }
}

/**
 * Updates the contents of the titlebar
 * @param {*} title 
 * @param {*} showBackButton 
 */
export function setTitle(title, backButtonURL) {
    return {
        type: SET_TITLE,
        title,
        backButtonURL
    }
}