Ext.require('Ext.calendar.model.*');
import './EventModel';

let favorites = localStorage.getItem('favoriteEvents');
favorites = favorites ? JSON.parse(favorites) : [];

const initialState = {
    store: Ext.create('Ext.calendar.store.Calendars', {
        eventStoreDefaults: {
            model: 'ConferenceApp.calendar.model.EventModel',
            proxy: {
                type: 'ajax',
                url: '/resources/schedule.json'
            },
            filters: item => favorites.indexOf(item.get('id')) >= 0
        },
        data: [{
            id: 1,
            name: 'myCal'
        }]
    })
}

export default function calendarReducer(state = initialState, action) {
    switch(action.type) {
        default:
            return { ...state };
    }
}