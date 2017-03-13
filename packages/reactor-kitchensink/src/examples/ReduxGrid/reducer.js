// actions
export const FILTER_CHANGE = 'FILTER_CHANGE';

export function filterChange(searchStr) {
    return {
        type: FILTER_CHANGE,
        searchStr
    };
}

const gridStore = Ext.create('Ext.data.Store', {
    fields: ['employeeNo', 'forename', 'surname', 'email', {
        name: 'fullName',
        calculate: ({forename, surname}) => `${forename} ${surname}`
    }],
    autoLoad: true,
    groupField: 'department',
    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: '/KitchenSink/BigData'
    }     
});

// reducer
const initialState = {
    gridStore,
    searchStr: null
};

export function reducer(state = initialState, action) {
    switch(action.type) {
        case FILTER_CHANGE:
            const { searchStr } = action;
            gridStore.filter({
                property: 'fullName', 
                value: searchStr,
                disableOnEmpty: true,
                anyMatch: true
            });
            return {
                ...state,
                searchStr
            }
        default:
            return { ...state }
    }
}