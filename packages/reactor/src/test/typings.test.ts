import React = require('react')
import { reactify, install } from '../../index'

class Foo {}
interface Props {}
interface State {}
interface Grid {}
interface Panel {}
const Grid = reactify<Grid, Props, State>('grid')
const [ Grid1, Panel ] = reactify<Grid, Props, State, Panel, Props, State>('gird', 'panel')
const [ Grid2, Panel2 ] = reactify('grid', 'panel')
const [ Grid3, Panel3 ] = reactify('grid', 'panel') as [ Grid & React.Component<string, boolean>, any]
const [ A, B, C, D, E ] = reactify('a', 'b', Foo, 'd', 'e')

install({ viewport: true })