import { ROUTE_DID_CHANGE, TOGGLE_CODE } from './actions';
import code from './code';
import examples from './examples';

// Here we initialize the Ext JS TreeStore for the navigation tree as part of our
// redux store.
const initialState = {
    navStore: Ext.create('Ext.data.TreeStore', {
        rootVisible: true,
        root: examples
    }),
    mode: 'full',
    center: false,
    showCode: true
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ROUTE_DID_CHANGE: {
            const { location } = action;
            const { navStore } = state;
            const key = location.pathname.slice(1);
            const node = navStore.getNodeById(key);
            
            return {
                ...state,
                component: node && node.get('component'),
                center: node && node.get('center'),
                selectedNavNode: node,
                files: code[location.pathname.slice(1)]
            }
        }
        case TOGGLE_CODE: {
            return { ...state, showCode: !state.showCode };
        }
        default: {
            return { ...state }
        }
    }
}