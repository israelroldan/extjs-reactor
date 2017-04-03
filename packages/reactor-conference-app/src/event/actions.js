export const LOAD = 'events::LOAD';

export function loadEvent(id) {
    return (dispatch, getState) => {
        const store = getState().schedule.store;

        const doLoadEvent = () => {
            const event = store.getById(id).data;
            dispatch({ type: LOAD, event });
        };

        if (store.loading) {
            store.on('load', doLoadEvent);
        } else {
            doLoadEvent()
        }
    }
}