import React, { Component } from 'react';
import { Grid } from '@extjs/reactor/modern';
import { Template } from '@extjs/reactor';

export default class GridToolsExample extends Component {
    
    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        fields: ['name', 'cuisine'],
        storeId: 'restaurants',
        groupField: 'cuisine',
        sorters: ['cuisine', 'name'],
        data: [{
            name: 'Cheesecake Factory',
            cuisine: 'American'
        },{
            name: 'University Cafe',
            cuisine: 'American'
        },{
            name: 'Slider Bar',
            cuisine: 'American'
        },{
            name: 'Shokolaat',
            cuisine: 'American'
        },{
            name: 'Gordon Biersch',
            cuisine: 'American'
        },{
            name: 'Crepevine',
            cuisine: 'American'
        },{
            name: 'Creamery',
            cuisine: 'American'
        },{
            name: 'Old Pro',
            cuisine: 'American'
        },{
            name: 'Nola\'s',
            cuisine: 'Cajun'
        },{
            name: 'House of Bagels',
            cuisine: 'Bagels'
        },{
            name: 'The Prolific Oven',
            cuisine: 'Sandwiches'
        },{
            name: 'La Strada',
            cuisine: 'Italian'
        },{
            name: 'Buca di Beppo',
            cuisine: 'Italian'
        },{
            name: 'Pasta?',
            cuisine: 'Italian'
        },{
            name: 'Madame Tam',
            cuisine: 'Asian'
        },{
            name: 'Sprout Cafe',
            cuisine: 'Salad'
        },{
            name: 'Pluto\'s',
            cuisine: 'Salad'
        },{
            name: 'Junoon',
            cuisine: 'Indian'
        },{
            name: 'Bistro Maxine',
            cuisine: 'French'
        },{
            name: 'Three Seasons',
            cuisine: 'Vietnamese'
        },{
            name: 'Sancho\'s Taquira',
            cuisine: 'Mexican'
        },{
            name: 'Reposado',
            cuisine: 'Mexican'
        },{
            name: 'Siam Royal',
            cuisine: 'Thai'
        },{
            name: 'Krung Siam',
            cuisine: 'Thai'
        },{
            name: 'Thaiphoon',
            cuisine: 'Thai'
        },{
            name: 'Tamarine',
            cuisine: 'Vietnamese'
        },{
            name: 'Joya',
            cuisine: 'Tapas'
        },{
            name: 'Jing Jing',
            cuisine: 'Chinese'
        },{
            name: 'Patxi\'s Pizza',
            cuisine: 'Pizza'
        },{
            name: 'Evvia Estiatorio',
            cuisine: 'Mediterranean'
        },{
            name: 'Cafe 220',
            cuisine: 'Mediterranean'
        },{
            name: 'Cafe Renaissance',
            cuisine: 'Mediterranean'
        },{
            name: 'Kan Zeman',
            cuisine: 'Mediterranean'
        },{
            name: 'Gyros-Gyros',
            cuisine: 'Mediterranean'
        },{
            name: 'Mango Caribbean Cafe',
            cuisine: 'Caribbean'
        },{
            name: 'Coconuts Caribbean Restaurant & Bar',
            cuisine: 'Caribbean'
        },{
            name: 'Rose & Crown',
            cuisine: 'English'
        },{
            name: 'Baklava',
            cuisine: 'Mediterranean'
        },{
            name: 'Mandarin Gourmet',
            cuisine: 'Chinese'
        },{
            name: 'Bangkok Cuisine',
            cuisine: 'Thai'
        },{
            name: 'Darbar Indian Cuisine',
            cuisine: 'Indian'
        },{
            name: 'Mantra',
            cuisine: 'Indian'
        },{
            name: 'Janta',
            cuisine: 'Indian'
        },{
            name: 'Hyderabad House',
            cuisine: 'Indian'
        },{
            name: 'Starbucks',
            cuisine: 'Coffee'
        },{
            name: 'Peet\'s Coffee',
            cuisine: 'Coffee'
        },{
            name: 'Coupa Cafe',
            cuisine: 'Coffee'
        },{
            name: 'Lytton Coffee Company',
            cuisine: 'Coffee'
        },{
            name: 'Il Fornaio',
            cuisine: 'Italian'
        },{
            name: 'Lavanda',
            cuisine: 'Mediterranean'
        },{
            name: 'MacArthur Park',
            cuisine: 'American'
        },{
            name: 'St Michael\'s Alley',
            cuisine: 'Californian'
        },{
            name: 'Osteria',
            cuisine: 'Italian'
        },{
            name: 'Vero',
            cuisine: 'Italian'
        },{
            name: 'Cafe Renzo',
            cuisine: 'Italian'
        },{
            name: 'Miyake',
            cuisine: 'Sushi'
        },{
            name: 'Sushi Tomo',
            cuisine: 'Sushi'
        },{
            name: 'Kanpai',
            cuisine: 'Sushi'
        },{
            name: 'Pizza My Heart',
            cuisine: 'Pizza'
        },{
            name: 'New York Pizza',
            cuisine: 'Pizza'
        },{
            name: 'California Pizza Kitchen',
            cuisine: 'Pizza'
        },{
            name: 'Round Table',
            cuisine: 'Pizza'
        },{
            name: 'Loving Hut',
            cuisine: 'Vegan'
        },{
            name: 'Garden Fresh',
            cuisine: 'Vegan'
        },{
            name: 'Cafe Epi',
            cuisine: 'French'
        },{
            name: 'Tai Pan',
            cuisine: 'Chinese'
        }]
    })

    helperTpl = new Template(data => (
        <ul>
            { data.group.items.map((item, i) => <li key={i}>{item.data.name}</li>) }
        </ul>
    ))

    //-----------------------------------------------
    //Cell actions:
    onGear = (grid, info) => {
        Ext.Msg.alert('Settings', `Change settings for ${info.record.data.name}`);
    }

    onPin = (grid, info) => {
        Ext.Msg.alert('Pin', `Pinned item ${info.record.data.name}`);
    }

    onSearch = (grid, info) => {
        Ext.Msg.alert('Search', `Search for item ${info.record.data.name}`);
    }

    //-----------------------------------------------
    //Group actions:
    onGroupPrint = (grid, info) => {
        this.doGroup(info, 'Print Group');
    }

    onGroupRefresh = (grid, info) => {
        this.doGroup(info, 'Refresh Group');
    }

    onGroupSave = (grid, info) => {
        this.doGroup(info, 'Save Group');
    }

    doGroup = (info, action) => {
        Ext.Msg.alert(action, this.helperTpl.apply({ group: info.group }));
    }

    render() {
        return (
            <Grid title="Grid Tools"
                store={this.store}
                columnLines
                grouped
                columns={[{
                    text: 'Name',
                    dataIndex: 'name',
                    flex: 1,
                    cell: {
                        tools: {
                            pin: {
                                handler: this.onPin
                            }
                        }
                    }
                }, {
                    text: 'Cuisine',
                    dataIndex: 'cuisine',
                    flex: 1,
                    cell: {
                        tools: {
                            gear: {
                                handler: this.onGear,
                                zone: 'end'
                            }
                        }
                    }
                }, {
                    text: 'Actions',
                    width: 80,
                    cell: {
                        tools: {
                            search:{
                                handler: this.onSearch
                            } 
                        }
                    }
                }]}
                itemConfig={{
                    header:{
                        tools:{
                            refresh:  {
                                handler: this.onGroupRefresh
                            },
                            print: {
                                handler: this.onGroupPrint,
                                tooltip: 'Print group...',
                                zone: 'tail'
                            },
                            save: {
                                handler: this.onGroupSave,
                                zone: 'end'
                            }
                        }
                    }
                }}
                helperTpl={this.helperTpl}
            />
        )
    }
}