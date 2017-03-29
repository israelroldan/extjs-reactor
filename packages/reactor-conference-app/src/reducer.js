import { TOGGLE_MENU, ROUTE_DID_CHANGE } from './actions';

const navStore = Ext.create('Ext.data.TreeStore', {
    root: {
        children: [
            { text: 'Schedule', id: '/', iconCls: 'x-fa fa-clock-o', leaf: true },
            { text: 'Speakers', id: '/speakers', iconCls: 'x-fa fa-microphone', leaf: true },
            { text: 'Calendar', id: '/calendar', iconCls: 'x-fa fa-calendar', leaf: true },
            { text: 'Maps', id: '/maps', iconCls: 'x-fa fa-map', leaf: true },
            { text: 'Notifications', id: '/notifications', iconCls: 'x-fa fa-bell', leaf: true },
            { text: 'Attendees', id: '/attendees', iconCls: 'x-fa fa-group', leaf: true },
            { text: 'About this App', id: '/about', iconCls: 'x-fa fa-info-circle', leaf: true }
        ]
    }
})

const initialState = {
    navStore
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
        default: 
            return { ...state };
    }

}