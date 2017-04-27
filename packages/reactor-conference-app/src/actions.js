export const TOGGLE_MENU = 'ROOT::TOGGLE_MENU';
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