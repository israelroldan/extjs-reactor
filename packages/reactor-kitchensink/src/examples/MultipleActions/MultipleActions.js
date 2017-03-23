import React, { Component } from 'react';
import { List, Panel } from '@extjs/reactor/modern';
import data from '../BasicList/data';

Ext.require([
    'Ext.Toast',
    'Ext.plugin.ListSwiper'
]);

export default class SimpleActionsExample extends Component {

    store = Ext.create('Ext.data.Store', { 
        data,
        sorters: ['last_name', 'first_name']
    });

    onItemAction = (list, index, record, action) => {
        Ext.toast(`${Ext.String.capitalize(action)} ${record.get('first_name')} ${record.get('last_name')}`);
    }

    render() {
        return (
            <List
                shadow
                itemTpl="{first_name} {last_name}"
                store={this.store}
                platformConfig={{
                    '!phone': {
                        height: 450,
                        width: 300
                    }
                }}
                plugins={{ 
                    type: 'listswiper',
                    actions: {
                        call: {
                            direction: 'left',
                            threshold: '25%',
                            widget: {
                                iconCls: 'x-fa fa-phone',
                                text: 'Call'
                            }
                        },
                        message: {
                            direction: 'left',
                            threshold: '50%',
                            widget: {
                                iconCls: 'x-fa fa-envelope',
                                text: 'Message'
                            }
                        },
                        edit: {
                            direction: 'right',
                            threshold: '25%',
                            widget: {
                                iconCls: 'x-fa fa-pencil',
                                text: 'Edit'
                            }
                        },
                        delete: {
                            direction: 'right',
                            threshold: '50%',
                            widget: {
                                iconCls: 'x-fa fa-trash',
                                text: 'Delete'
                            }
                        }
                    }
                }}
                onItemAction={this.onItemAction}
            >
                <Panel ui="instructions" docked="top">
                    <div style={{textAlign: 'center', color: '#888'}}>Swipe left to call or message, right to edit or delete.</div>
                </Panel>
            </List>
        )
    }

}