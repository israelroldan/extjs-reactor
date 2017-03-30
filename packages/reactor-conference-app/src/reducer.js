import { TOGGLE_MENU, ROUTE_DID_CHANGE, TOGGLE_SEARCH, SEARCH } from './actions';

const navStore = Ext.create('Ext.data.TreeStore', {
    root: {
        children: [
            { text: 'Schedule', id: '/', iconCls: 'x-font-icon md-icon-schedule', leaf: true },
            { text: 'Speakers', id: '/speakers', iconCls: 'x-font-icon md-icon-mic', leaf: true },
            { text: 'Calendar', id: '/calendar', iconCls: 'x-font-icon md-icon-event-available', leaf: true },
            { text: 'Maps', id: '/maps', iconCls: 'x-font-icon md-icon-map', leaf: true },
            { text: 'Notifications', id: '/notifications', iconCls: 'x-font-icon md-icon-notifications', leaf: true },
            { text: 'Attendees', id: '/attendees', iconCls: 'x-font-icon md-icon-people', leaf: true },
            { text: 'About this App', id: '/about', iconCls: 'x-font-icon md-icon-info-outline', leaf: true }
        ]
    }
})

const initialState = {
    navStore,
    showSearch: false
};

export default function rootReducer(state = initialState, action) {

    switch(action.type) {
        case TOGGLE_MENU: 
            if (action.show !== undefined) {
                return { ...state, showMenu: action.show };
            } else {
                return { ...state, showMenu: !state.showMenu };
            }
        case ROUTE_DID_CHANGE: 
            const { location } = action;
            const route = location.pathname;
            const node = navStore.getNodeById(route);
            
            return {
                ...state,
                title: node.get('text'),
                selectedNavNode: node
            }
        case TOGGLE_SEARCH:
            return {
                ...state,
                showSearch: !state.showSearch
            }
        case SEARCH:
            return {
                ...state,
                query: action.query
            }
        default: 
            return { ...state };
    }

}