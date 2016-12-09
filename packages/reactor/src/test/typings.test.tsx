import React = require('react')
import ReactDOM = require('react-dom')
import { reactify, install } from '../../index'

class Foo {}
interface Props {}
interface State {}
const Grid = reactify<Props, State>('grid')
const [ Grid1, Panel ] = reactify<Props, State, Props, State>('gird', 'panel')
const [ Grid2, Panel2 ] = reactify('grid', 'panel')
const [ Grid3, Panel3 ] = reactify('grid', 'panel') as [ new () => React.Component<string, boolean>, any]
const [ A, B, C, D, E ] = reactify('a', 'b', Foo, 'd', 'e')

install({ viewport: true })

ReactDOM.render(<Grid/>, document.getElementById('root'))