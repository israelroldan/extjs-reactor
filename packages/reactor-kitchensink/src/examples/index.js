import Grid from './Grid/Grid';
import Panel from './Panel/Panel';
import TabPanel from './TabPanel/TabPanel';
import Toolbar from './Toolbar/Toolbar';
import Tree from './Tree/Tree';
import TreeList from './TreeList/TreeList';
import List from './List/List';
import NestedList from './NestedList/NestedList';
import Animations from './Animations/Animations';
import Button from './Button/Button';
import Carousel from './Carousel/Carousel';
import TextField from './TextField/TextField';
import EmailField from './EmailField/EmailField';
import UrlField from './UrlField/UrlField';
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
import PivotGrid from './PivotGrid/PivotGrid';
import Video from './Video/Video';
import Audio from './Audio/Audio';
import ProgressBar from './ProgressBar/ProgressBar';
import Menu from './Menu/Menu';
import ActionSheet from './ActionSheet/ActionSheet';
import ToolTip from './ToolTip/ToolTip';
import Picker from './Picker/Picker';
import TouchEvents from './TouchEvents/TouchEvents';
import Msg from './Msg/Msg';
import Toast from './Toast/Toast';
import Calendar from './Calendar/Calendar';

const root = {
    id: 'root',
    children: [
        { text: 'Grid', component: Grid },
        { text: 'Panel', component: Panel },
        { text: 'TabPanel', component: TabPanel },
        { text: 'Toolbar', component: Toolbar },
        { text: 'Tree', component: Tree },
        { text: 'TreeList', component: TreeList },
        { text: 'List', component: List },
        { text: 'NestedList', component: NestedList },
        { text: 'Animations', component: Animations },
        { text: 'Button', component: Button },
        { text: 'Carousel', component: Carousel },
        { text: 'Form Fields', children: [
            { text: 'TextField', component: TextField },
            { text: 'EmailField', component: EmailField },
            { text: 'UrlField', component: UrlField },
            { text: 'PasswordField', component: PasswordField },
            { text: 'SpinnerField', component: SpinnerField },
            { text: 'CheckBoxField', component: CheckBoxField },
            { text: 'DatePickerField', component: DatePickerField },
            { text: 'SelectField', component: SelectField },
            { text: 'SliderField', component: SliderField },
            { text: 'ToggleField', component: ToggleField },
            { text: 'TextAreaField', component: TextAreaField },
            { text: 'RadioField', component: RadioField },
            { text: 'FormPanel', component: FormPanel }
        ] },
        { text: 'PivotGrid', component: PivotGrid },
        { text: 'Media', children: [
            { text: 'Video', component: Video },
            { text: 'Audio', component: Audio }
        ] },
        { text: 'ProgressBar', component: ProgressBar },
        { text: 'Menu', component: Menu },
        { text: 'ActionSheet', component: ActionSheet },
        { text: 'Picker', component: Picker },
        { text: 'TouchEvents', component: TouchEvents },
        { text: 'Msg', component: Msg },
        { text: 'Toast', component: Toast },
        { text: 'Calendar', component: Calendar }
    ]
};

function transform(node) {
    if (!node.id) node.id = node.text;
    node.leaf = !node.hasOwnProperty('children');

    if (node.children) {
        node.children.forEach(child => transform(child))
    }
}

transform(root);

console.log({root})

export default root;