export const ROUTE_DID_CHANGE = 'ROUTE_DID_CHANGE';

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