import React = require('react')
import { reactify, install } from '../../index'

interface GridProperty {}
interface GridState {}
interface GridInterface {}

const Grid = reactify<GridInterface, GridProperty, GridState>('grid')
