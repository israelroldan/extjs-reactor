import Grid from './Grid/Grid';
import ReduxGrid from './ReduxGrid/ReduxGrid';
import Panel from './Panel/Panel';
import TabPanel from './TabPanel/TabPanel';
import Toolbar from './Toolbar/Toolbar';
import Tree from './Tree/Tree';
import TreeList from './TreeList/TreeList';

import BasicList from './BasicList/BasicList';
import GroupedList from './GroupedList/GroupedList';
import PullRefreshList from './PullRefreshList/PullRefreshList';
import DisclosureList from './DisclosureList/DisclosureList';
import PagingList from './PagingList/PagingList';
import SimpleActions from './SimpleActions/SimpleActions';
import MultipleActions from './MultipleActions/MultipleActions';
import UndoableActions from './UndoableActions/UndoableActions';

import NestedList from './NestedList/NestedList';
import Animations from './Animations/Animations';
import Button from './Button/Button';
import SegmentedButton from './SegmentedButton/SegmentedButton';
import Carousel from './Carousel/Carousel';
import TextField from './TextField/TextField';
import FieldSet from './FieldSet/FieldSet';
import EmailField from './EmailField/EmailField';
import URLField from './URLField/URLField';
import PasswordField from './PasswordField/PasswordField';
import SpinnerField from './SpinnerField/SpinnerField';
import CheckBoxField from './CheckBoxField/CheckBoxField';
import DatePickerField from './DatePickerField/DatePickerField';
import SelectField from './SelectField/SelectField';
import SliderField from './SliderField/SliderField';
import ToggleField from './ToggleField/ToggleField';
import TextAreaField from './TextAreaField/TextAreaField';
import RadioField from './RadioField/RadioField';
import Gauge from './Gauge/Gauge';
import FormPanel from './FormPanel/FormPanel';
import FullStackedArea from './FullStackedArea/FullStackedArea';
import FullStackedBar from './FullStackedBar/FullStackedBar';
import PivotGrid from './PivotGrid/PivotGrid';
import Video from './Video/Video';
import Audio from './Audio/Audio';
import ProgressBar from './ProgressBar/ProgressBar';
import EdgeMenu from './EdgeMenu/EdgeMenu';
import ActionSheet from './ActionSheet/ActionSheet';
import ToolTip from './ToolTip/ToolTip';
import Picker from './Picker/Picker';
import TouchEvents from './TouchEvents/TouchEvents';
import Msg from './Msg/Msg';
import Toast from './Toast/Toast';
import Calendar from './Calendar/Calendar';
import TitleBar from './TitleBar/TitleBar';
import BasicScatter from './BasicScatter/BasicScatter';
import BasicRadar from './BasicRadar/BasicRadar';
import BasicPie from './BasicPie/BasicPie';
import BasicLine from './BasicLine/BasicLine';
import BasicGauge from './BasicGauge/BasicGauge';
import BasicBar from './BasicBar/BasicBar';
import BasicArea from './BasicArea/BasicArea';
import BasicColumn from './BasicColumn/BasicColumn';
import Stacked from './Stacked/Stacked';
import ColumnWithRenderer from './ColumnWithRenderer/ColumnWithRenderer';
import MultiaxisColumn from './MultiaxisColumn/MultiaxisColumn';
import Basic3DColumn from './Basic3DColumn/Basic3DColumn';
import ThreeDGrouped from './3DGrouped/3DGrouped';
import ThreeDStacked from './3DStacked/3DStacked';
import ThreeDColumnWithRenderer from './3DColumnWithRenderer/3DColumnWithRenderer';
import NegativeValues from './NegativeValues/NegativeValues';
import Candlestick from './Candlestick/Candlestick';
import OHLC from './OHLC/OHLC';
import Navigator from './Navigator/Navigator';
import Draw from './Draw/Draw';
import Ripple from './Ripple/Ripple';
import ComboBoxField from './ComboBoxField/ComboBoxField';
import SalesPerEmployee from './SalesPerEmployee/SalesPerEmployee';
import StackedArea from './StackedArea/StackedArea';
import StackedBar from './StackedBar/StackedBar';
import PurchasesByDay from './PurchasesByDay/PurchasesByDay';
import PivotHeatmap from './PivotHeatmap/PivotHeatmap';
import ConfigurablePivotHeatmap from './ConfigurablePivotHeatmap/ConfigurablePivotHeatmap';
import D3TreeHierarchy from './D3TreeHierarchy/D3TreeHierarchy';
import TreeMap from './TreeMap/TreeMap';
import TreeMapTooltip from './TreeMapTooltip/TreeMapTooltip';
import ConfigurablePivotTreeMap from './ConfigurablePivotTreeMap/ConfigurablePivotTreeMap';
import Pack from './Pack/Pack';
import Sunburst from './Sunburst/Sunburst';
import ZoomableSunburst from './ZoomableSunburst/ZoomableSunburst';
import BasicMarkers from './BasicMarkers/BasicMarkers';
import Spline from './Spline/Spline';
import SplineMarkers from './SplineMarkers/SplineMarkers';
import Plot from './Plot/Plot';
import WithRenderer from './WithRenderer/WithRenderer';
import Realtime from './Realtime/Realtime';
import Spie from './Spie/Spie';
import Donut from './Donut/Donut';
import DoubleDonut from './DoubleDonut/DoubleDonut';
import ThreeDPie from './3DPie/3DPie';
import CustomIcons from './CustomIcons/CustomIcons';
import Bubble from './Bubble/Bubble';
import Filled from './Filled/Filled';
import Marked from './Marked/Marked';
import Multiaxis from './Multiaxis/Multiaxis';
import SearchField from './SearchField/SearchField';
import FileField from './FileField/FileField';
import CardLayout from './card/card';
import FitLayout from './fit/fit';
import HboxLayout from './hbox/hbox';
import VboxLayout from './vbox/vbox';
import FormLayout from './form/form';
import InProgress from '../InProgress';
import NegativeValuesArea from './NegativeValuesArea/NegativeValuesArea';
import Resizable from './resizable/resizable';
import NumberField from './NumberField/NumberField';

const root = {
    id: 'root',
    children: [
        { text: 'Animations', component: Animations },
        { text: 'Buttons', children: [
            { text: 'Button', component: Button, center: true },
            { text: 'SegmentedButton', component: SegmentedButton, center: true },
        ]},
        { text: 'Calendar', component: Calendar },
        { text: 'Carousel', component: Carousel },
        { text: 'Charts', children: [
            { text: 'Area', children: [
                { text: 'Basic Area', component: BasicArea },
                { text: 'Stacked Area', component: StackedArea},
                { text: 'Full Stacked Area', component: FullStackedArea},
                { text: 'Negative Values Area', component: NegativeValuesArea}
            ] },
            { text: 'Bar', children: [
                { text: 'Basic Bar', component: BasicBar },
                { text: 'Stacked Bar', component: StackedBar },
                { text: 'Full Stacked Bar', component: FullStackedBar}
            ] },
            { text: 'Column', children: [
                { text: 'Basic Column', component: BasicColumn },
                { text: 'Stacked', component: Stacked },
                { text: 'Column With Renderer', component: ColumnWithRenderer },
                { text: 'Multiaxis Column', component: MultiaxisColumn }
            ] },
            { text: '3D Column', children: [
                { text: 'Basic 3D Column', component: Basic3DColumn },
                { text: '3D Grouped', component: ThreeDGrouped },
                { text: '3D Stacked', component: ThreeDStacked },
                { text: 'Negative Values', component: NegativeValues },
                { text: '3D Column With Renderer', component: ThreeDColumnWithRenderer }
            ]},
            { text: 'Financial', children: [
                { text: 'Candlestick', component: Candlestick },
                { text: 'OHLC', component: OHLC }
            ] },
            { text: 'Gauge', children: [
                { text: 'Basic Gauge', component: BasicGauge }
            ] },
            { text: 'Line', children: [
                { text: 'Basic Line', component: BasicLine },
                { text: 'Basic Markers', component: BasicMarkers },
                { text: 'Spline', component: Spline },
                { text: 'Spline Markers', component: SplineMarkers },
                { text: 'Plot', component: Plot },
                { text: 'With Renderer', component: WithRenderer },
                { text: 'Realtime', component: Realtime }
            ] },
            { text: 'Navigator', component: Navigator },
            { text: 'Pie', children: [
                { text: 'Basic Pie', component: BasicPie },
                { text: 'Spie', component: Spie },
                { text: 'Donut', component: Donut },
                { text: 'Double Donut', component: DoubleDonut },
                { text: '3D Pie', component: ThreeDPie }
            ] },
            { text: 'Radar', children: [
                { text: 'Basic Radar', component: BasicRadar },
                { text: 'Filled', component: Filled },
                { text: 'Marked', component: Marked },
                { text: 'Multiaxis', component: Multiaxis }
            ] },
            { text: 'Scatter', children: [
                { text: 'Basic Scatter', component: BasicScatter },
                { text: 'Custom Icons', component: CustomIcons },
                { text: 'Bubble', component: Bubble }
            ] }
        ] },
        { text: 'D3', children: [
            { text: 'Heatmap', children: [
                { text: 'Purchases By Day', component: PurchasesByDay },
                { text: 'Sales Per Employee', component: SalesPerEmployee },
                { text: 'Pivot Heatmap', component: PivotHeatmap },
                { text: 'Configurable Pivot Heatmap', component: ConfigurablePivotHeatmap }
            ]},
            { text: 'Hierarchy', children: [
                { text: 'D3 Tree Hierarchy', component: D3TreeHierarchy },
                { text: 'TreeMap', component: TreeMap },
                { text: 'TreeMap Tooltip', component: TreeMapTooltip },
                { text: 'Configurable Pivot TreeMap', component: ConfigurablePivotTreeMap },
                { text: 'Pack', component: Pack },
                { text: 'Sunburst', component: Sunburst },
                { text: 'Zoomable Sunburst', component: ZoomableSunburst }
            ]}
        ] },
        { text: 'Draw', component: Draw },
        { text: 'EdgeMenu', component: EdgeMenu, center: true },
        { text: 'Form Fields', children: [
            { text: 'CheckBoxField', component: CheckBoxField, center: true },
            { text: 'ComboBoxField', component: ComboBoxField, center: true },
            { text: 'DatePickerField', component: DatePickerField, center: true },
            { text: 'EmailField', component: EmailField , center: true},
            { text: 'FieldSet', component: FieldSet, center: true },
            { text: 'FileField', component: FileField, center: true },
            { text: 'FormPanel', component: FormPanel },
            { text: 'Gauge', component: Gauge, center: true },
            { text: 'NumberField', component: NumberField, center: true },
            { text: 'PasswordField', component: PasswordField, center: true },
            { text: 'RadioField', component: RadioField, center: true },
            { text: 'SearchField', component: SearchField, center: true },
            { text: 'SelectField', component: SelectField, center: true },
            { text: 'SliderField', component: SliderField, center: true },
            { text: 'SpinnerField', component: SpinnerField, center: true },
            { text: 'TextAreaField', component: TextAreaField, center: true },
            { text: 'TextField', component: TextField, center: true },
            { text: 'ToggleField', component: ToggleField, center: true },
            { text: 'URLField', component: URLField, center: true }
        ] },
        { text: 'Grids', children: [
            { text: 'Grid', component: Grid },
            { text: 'PivotGrid', component: PivotGrid },
            { text: 'Redux Grid', component: ReduxGrid }
        ] },
        { text: 'Layouts', children: [
            { text: 'card', component: CardLayout },
            { text: 'fit', component: FitLayout },
            { text: 'form', component: FormLayout },
            { text: 'hbox', component: HboxLayout },
            { text: 'resizable', component: Resizable },
            { text: 'vbox', component: VboxLayout }
        ]},
        { text: 'Lists', children: [
            { text: 'Basic List', component: BasicList, center: !Ext.os.is.Phone },
            { text: 'Grouped', component: GroupedList, center: !Ext.os.is.Phone },
            { text: 'Disclosure', component: DisclosureList, center: !Ext.os.is.Phone },
            { text: 'Pull Refresh', component: PullRefreshList, center: !Ext.os.is.Phone },
            { text: 'Paging', component: PagingList, center: !Ext.os.is.Phone },
            { text: 'Swiper', children: [
                { text: 'Simple Actions', component: SimpleActions, center: !Ext.os.is.Phone },
                { text: 'Multiple Actions', component: MultipleActions, center: !Ext.os.is.Phone },
                { text: 'Undoable Actions', component: UndoableActions, center: !Ext.os.is.Phone },
            ]},
            { text: 'NestedList', component: NestedList, center: !Ext.os.is.Phone }
        ]},
        { text: 'Media', children: [
            { text: 'Video', component: Video },
            { text: 'Audio', component: Audio }
        ] },
        { text: 'Msg', component: Msg, center: true },
        { text: 'Panel', component: Panel, center: true },
        { text: 'Picker', component: Picker },
        { text: 'ProgressBar', component: ProgressBar, center: true },
        { text: 'Ripple', component: Ripple, center: true },
        { text: 'TabPanel', component: TabPanel },
        { text: 'TitleBar', component: TitleBar },
        { text: 'Toast', component: Toast, center: true },
        { text: 'Toolbar', component: Toolbar },
        { text: 'ToolTip', component: ToolTip, center: true  },
        { text: 'Touch Events', component: TouchEvents },
        { text: 'Trees', children: [
            { text: 'Tree', component: Tree },
            { text: 'TreeList', component: TreeList }
        ] }
    ]
};

function transform(node) {
    if (!node.id) node.id = node.text.replace(/\s/g, '');
    node.leaf = !node.hasOwnProperty('children');

    if (node.children) {
        node.children.forEach(child => transform(child))
    }
}

transform(root);

export default root;