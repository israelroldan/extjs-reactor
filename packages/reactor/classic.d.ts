declare class Button extends React.Component<ButtonProps, any> { }
export interface ButtonProps {
	allowDepress?: boolean
	arrowAlign?: string
	arrowCls?: string
	arrowVisible?: boolean
	baseCls?: string
	baseParams?: any
	clickEvent?: string
	cls?: string
	destroyMenu?: boolean
	disabled?: boolean
	enableToggle?: boolean
	glyph?: number | string
	handleMouseEvents?: boolean
	handler?: Function | string
	hidden?: boolean
	href?: string
	hrefTarget?: string
	icon?: string
	iconAlign?: string
	iconCls?: string
	menu?: Menu | string | any
	menuAlign?: string
	minWidth?: number
	overflowText?: string
	padding?: number | string
	params?: any
	pressed?: boolean
	preventDefault?: boolean
	repeat?: boolean | any
	scale?: string
	scope?: any
	showEmptyMenu?: boolean
	tabIndex?: number
	text?: string
	textAlign?: string
	toggleGroup?: string
	toggleHandler?: Function | string
	tooltip?: string | any
	tooltipType?: string
	value?: string | number
}
declare class Cycle extends React.Component<CycleProps, any> { }
export interface CycleProps {
	changeHandler?: Function | string
	forceGlyph?: number | string
	forceIcon?: string
	prependText?: string
	showText?: boolean
}
declare class SegmentedButton extends React.Component<SegmentedButtonProps, any> { }
export interface SegmentedButtonProps {
	allowDepress?: boolean
	allowMultiple?: boolean
	allowToggle?: boolean
	defaultUI?: string
	forceSelection?: boolean
	value?: string | number | string[] | number[]
	vertical?: boolean
}
declare class SplitButton extends React.Component<SplitButtonProps, any> { }
export interface SplitButtonProps {
	arrowHandler?: Function | string
	arrowTooltip?: string
}
declare class CalendarEvent extends React.Component<CalendarEventProps, any> { }
export interface CalendarEventProps {
	timeFormat?: string
}
declare class CalendarFormAdd extends React.Component<CalendarFormAddProps, any> { }
export interface CalendarFormAddProps {
	title?: string
}
declare class CalendarCalendarPicker extends React.Component<CalendarCalendarPickerProps, any> { }
export interface CalendarCalendarPickerProps {
}
declare class CalendarFormEdit extends React.Component<CalendarFormEditProps, any> { }
export interface CalendarFormEditProps {
	title?: string
}
declare class CalendarDaysHeader extends React.Component<CalendarDaysHeaderProps, any> { }
export interface CalendarDaysHeaderProps {
}
declare class CalendarWeeksHeader extends React.Component<CalendarWeeksHeaderProps, any> { }
export interface CalendarWeeksHeaderProps {
}
declare class CalendarList extends React.Component<CalendarListProps, any> { }
export interface CalendarListProps {
	enableToggle?: boolean
}
declare class CalendarDay extends React.Component<CalendarDayProps, any> { }
export interface CalendarDayProps {
	view?: any
	visibleDays?: any
}
declare class CalendarDays extends React.Component<CalendarDaysProps, any> { }
export interface CalendarDaysProps {
	dayHeader?: any
	eventRelayers?: any
	view?: any
}
declare class CalendarMonth extends React.Component<CalendarMonthProps, any> { }
export interface CalendarMonthProps {
	value?: any
	view?: any
	visibleWeeks?: number
}
declare class Calendar extends React.Component<CalendarProps, any> { }
export interface CalendarProps {
	calendarList?: any
	compact?: boolean
	compactOptions?: any
	createButton?: any
	createButtonPosition?: string
	dateTitle?: any
	nextButton?: any
	previousButton?: any
	sideBar?: any
	store?: any
	switcherPosition?: string
	timezoneOffset?: number
	titleBar?: any
	todayButton?: any
	value?: any
	views?: any
}
declare class CalendarWeek extends React.Component<CalendarWeekProps, any> { }
export interface CalendarWeekProps {
	firstDayOfWeek?: number
	value?: any
	view?: any
	visibleDays?: number
}
declare class CalendarWeeks extends React.Component<CalendarWeeksProps, any> { }
export interface CalendarWeeksProps {
	dayHeader?: any
	eventRelayers?: any
	view?: any
}
declare class CalendarDayView extends React.Component<CalendarDayViewProps, any> { }
export interface CalendarDayViewProps {
}
declare class CalendarDaysView extends React.Component<CalendarDaysViewProps, any> { }
export interface CalendarDaysViewProps {
	allowSelection?: boolean
	displayOverlap?: boolean
	draggable?: boolean
	droppable?: boolean
	endTime?: number
	resizeEvents?: boolean
	showNowMarker?: boolean
	startTime?: number
	timeFormat?: string
	timeRenderer?: Function
	value?: any
	visibleDays?: number
}
declare class CalendarMonthView extends React.Component<CalendarMonthViewProps, any> { }
export interface CalendarMonthViewProps {
	value?: any
	visibleWeeks?: number
}
declare class CalendarMultiView extends React.Component<CalendarMultiViewProps, any> { }
export interface CalendarMultiViewProps {
	compact?: boolean
	compactOptions?: any
	defaultView?: string
	store?: any
	timezoneOffset?: number
	value?: any
	views?: any
}
declare class CalendarWeekView extends React.Component<CalendarWeekViewProps, any> { }
export interface CalendarWeekViewProps {
	firstDayOfWeek?: number
	value?: any
	visibleDays?: number
}
declare class CalendarWeeksView extends React.Component<CalendarWeeksViewProps, any> { }
export interface CalendarWeeksViewProps {
	addOnSelect?: boolean
	allowSelection?: boolean
	compactOptions?: any
	dayFormat?: string
	draggable?: boolean
	droppable?: boolean
	firstDayOfWeek?: number
	overflowText?: string
	showOverflow?: string
	value?: any
	visibleDays?: number
	visibleWeeks?: number
	weekendDays?: number[]
}
declare class Axis extends React.Component<AxisProps, any> { }
export interface AxisProps {
	adjustByMajorUnit?: boolean
	background?: any
	chart?: any
	fields?: array
	floating?: number | any
	grid?: any
	hidden?: boolean
	increment?: number
	label?: any
	labelInSpan?: boolean
	layout?: any
	limits?: array | any
	linkedTo?: Axis | string | number
	majorTickSteps?: number
	margin?: number
	maximum?: number
	maxZoom?: number
	minimum?: number
	minorTickSteps?: number
	minZoom?: number
	needHighPrecision?: boolean
	position?: string
	reconcileRange?: boolean
	renderer?: Function
	segmenter?: any
	style?: any
	title?: string | any
	titleMargin?: number
	visibleRange?: array
}
declare class Axis3D extends React.Component<Axis3DProps, any> { }
export interface Axis3DProps {
	position?: string
}
declare class Cartesian extends React.Component<CartesianProps, any> { }
export interface CartesianProps {
	flipXY?: boolean
	innerPadding?: any
}
declare class Interaction extends React.Component<InteractionProps, any> { }
export interface InteractionProps {
	chart?: any
	enabled?: boolean
}
declare class Legend extends React.Component<LegendProps, any> { }
export interface LegendProps {
	rect?: array
	toggleable?: boolean
}
declare class Polar extends React.Component<PolarProps, any> { }
export interface PolarProps {
	center?: array
	innerPadding?: number
	radius?: number
}
declare class SpaceFilling extends React.Component<SpaceFillingProps, any> { }
export interface SpaceFillingProps {
}
declare class Component extends React.Component<ComponentProps, any> { }
export interface ComponentProps {
	alignTarget?: string
	anchor?: string
	autoEl?: string | any
	autoRender?: boolean | string | HTMLElement | any
	autoScroll?: boolean
	autoShow?: boolean
	baseCls?: string
	border?: number | string | boolean
	childEls?: any | string[] | any[]
	cls?: string | string[]
	columnWidth?: number
	componentCls?: string
	componentLayout?: string | any
	constraintInsets?: any | string
	constrainTo?: any
	contentEl?: string
	data?: any
	defaultAlign?: string
	disabled?: boolean
	disabledCls?: string
	dock?: string
	draggable?: boolean | any
	flex?: number
	floating?: boolean
	formBind?: boolean
	frame?: boolean
	height?: number | string
	hidden?: boolean
	hideMode?: string
	html?: string | any
	id?: string
	itemId?: string
	liquidLayout?: boolean
	liveDrag?: boolean
	loader?: any
	margin?: number | string
	maskElement?: string
	maxHeight?: number
	maxWidth?: number
	minHeight?: number
	minWidth?: number
	modelValidation?: boolean
	overCls?: string
	overflowX?: string
	overflowY?: string
	padding?: number | string
	plugins?: any | any[]
	region?: string
	renderData?: any
	renderSelectors?: any
	renderTo?: string | HTMLElement | any
	renderTpl?: any | string | string[]
	resizable?: boolean | any
	resizeHandles?: string
	scrollable?: boolean | string | any
	shrinkWrap?: boolean | number
	stateEvents?: string[]
	style?: string | any
	toFrontOnShow?: boolean
	touchAction?: any
	tpl?: any | string | string[]
	tplWriteMode?: string
	ui?: string
	userCls?: string | string[]
	weight?: number
	width?: number | string
	xtype?: any
}
declare class Box extends React.Component<BoxProps, any> { }
export interface BoxProps {
	alignTarget?: string
	anchor?: string
	autoEl?: string | any
	autoRender?: boolean | string | HTMLElement | any
	autoScroll?: boolean
	autoShow?: boolean
	baseCls?: string
	border?: number | string | boolean
	childEls?: any | string[] | any[]
	cls?: string | string[]
	columnWidth?: number
	componentCls?: string
	componentLayout?: string | any
	constraintInsets?: any | string
	constrainTo?: any
	contentEl?: string
	data?: any
	defaultAlign?: string
	disabled?: boolean
	disabledCls?: string
	dock?: string
	draggable?: boolean | any
	flex?: number
	floating?: boolean
	formBind?: boolean
	frame?: boolean
	height?: number | string
	hidden?: boolean
	hideMode?: string
	html?: string | any
	id?: string
	itemId?: string
	liquidLayout?: boolean
	liveDrag?: boolean
	loader?: any
	margin?: number | string
	maskElement?: string
	maxHeight?: number
	maxWidth?: number
	minHeight?: number
	minWidth?: number
	modelValidation?: boolean
	overCls?: string
	overflowX?: string
	overflowY?: string
	padding?: number | string
	plugins?: any | any[]
	region?: string
	renderData?: any
	renderSelectors?: any
	renderTo?: string | HTMLElement | any
	renderTpl?: any | string | string[]
	resizable?: boolean | any
	resizeHandles?: string
	scrollable?: boolean | string | any
	shrinkWrap?: boolean | number
	stateEvents?: string[]
	style?: string | any
	toFrontOnShow?: boolean
	touchAction?: any
	tpl?: any | string | string[]
	tplWriteMode?: string
	ui?: string
	userCls?: string | string[]
	weight?: number
	width?: number | string
	xtype?: any
}
declare class ButtonGroup extends React.Component<ButtonGroupProps, any> { }
export interface ButtonGroupProps {
	baseCls?: string
	columns?: number
	defaultButtonUI?: string
	frame?: boolean
	layout?: any
	titleAlign?: string
}
declare class Container extends React.Component<ContainerProps, any> { }
export interface ContainerProps {
	actions?: any
	activeItem?: string | number
	anchorSize?: number | any
	autoDestroy?: boolean
	bubbleEvents?: string[]
	defaultFocus?: string
	defaults?: any | Function
	defaultType?: string
	detachOnRemove?: boolean
	layout?: any
	suspendLayout?: boolean
}
declare class Viewport extends React.Component<ViewportProps, any> { }
export interface ViewportProps {
	maxUserScale?: number
}
declare class D3Canvas extends React.Component<D3CanvasProps, any> { }
export interface D3CanvasProps {
	hdpi?: boolean
	size?: any
}
declare class D3HeatMap extends React.Component<D3HeatMapProps, any> { }
export interface D3HeatMapProps {
	colorAxis?: any
	labels?: any | boolean
	legend?: any
	tiles?: any
	xAxis?: any
	yAxis?: any
}
declare class D3Pack extends React.Component<D3PackProps, any> { }
export interface D3PackProps {
	clipText?: boolean
	nodeValue?: any
	textPadding?: array
}
declare class D3Partition extends React.Component<D3PartitionProps, any> { }
export interface D3PartitionProps {
}
declare class D3Sunburst extends React.Component<D3SunburstProps, any> { }
export interface D3SunburstProps {
	nodeSelectTransition?: any | boolean
	nodeZoomTransition?: any | boolean
	textPadding?: array
	zoomParentDotRadius?: number
}
declare class D3Tree extends React.Component<D3TreeProps, any> { }
export interface D3TreeProps {
}
declare class D3HorizontalTree extends React.Component<D3HorizontalTreeProps, any> { }
export interface D3HorizontalTreeProps {
}
declare class D3TreeMap extends React.Component<D3TreeMapProps, any> { }
export interface D3TreeMapProps {
	busyLayoutText?: string
	leafTile?: any
	parentTile?: any
	sticky?: any
}
declare class D3SVG extends React.Component<D3SVGProps, any> { }
export interface D3SVGProps {
	clipScene?: boolean
	padding?: any | string | number
	size?: any
}
declare class D3 extends React.Component<D3Props, any> { }
export interface D3Props {
	clipScene?: boolean
	padding?: any | string | number
	size?: any
}
declare class DashboardColumn extends React.Component<DashboardColumnProps, any> { }
export interface DashboardColumnProps {
}
declare class Dashboard extends React.Component<DashboardProps, any> { }
export interface DashboardProps {
	columnWidths?: number[]
	defaultContent?: any[]
	maxColumns?: number
	parts?: any
}
declare class DashboardPanel extends React.Component<DashboardPanelProps, any> { }
export interface DashboardPanelProps {
}
declare class JsonPStore extends React.Component<JsonPStoreProps, any> { }
export interface JsonPStoreProps {
}
declare class Draw extends React.Component<DrawProps, any> { }
export interface DrawProps {
	engine?: string
	gradients?: any[]
	resizeHandler?: Function
	sprites?: any[]
}
declare class Surface extends React.Component<SurfaceProps, any> { }
export interface SurfaceProps {
	background?: any
	dirty?: boolean
	flipRtlText?: boolean
	rect?: array
}
declare class Editor extends React.Component<EditorProps, any> { }
export interface EditorProps {
	alignment?: string
	allowBlur?: boolean
	autoSize?: boolean | any
	cancelOnEsc?: boolean
	completeOnEnter?: boolean
	constrain?: boolean
	field?: any
	hideEl?: boolean
	ignoreNoChange?: boolean
	offsets?: number[]
	parentEl?: string | HTMLElement | any
	revertInvalid?: boolean
	shadow?: boolean | string
	swallowKeys?: boolean
	updateEl?: boolean
	value?: any
}
declare class Flash extends React.Component<FlashProps, any> { }
export interface FlashProps {
	backgroundColor?: string
	expressInstall?: boolean
	flashAttributes?: any
	flashParams?: any
	flashVars?: any
	flashVersion?: string
	swfHeight?: string | number
	swfWidth?: string | number
	url: string
	wmode?: string
}
declare class CheckboxGroup extends React.Component<CheckboxGroupProps, any> { }
export interface CheckboxGroupProps {
	allowBlank?: boolean
	blankText?: string
	columns?: string | number | number[]
	name?: string
	vertical?: boolean
}
declare class Field extends React.Component<FieldProps, any> { }
export interface FieldProps {
	checkChangeBuffer?: number
	checkChangeEvents?: string[]
	dirtyCls?: string
	fieldCls?: string
	fieldStyle?: string
	focusCls?: string
	formatText?: string
	inputAttrTpl?: string | array | any
	inputId?: string
	inputType?: string
	invalidText?: string
	name?: string
	readOnly?: boolean
	readOnlyCls?: string
	tabIndex?: number
	validateOnBlur?: boolean
}
declare class CheckBoxField extends React.Component<CheckBoxFieldProps, any> { }
export interface CheckBoxFieldProps {
	afterBoxLabelTextTpl?: string | array | any
	afterBoxLabelTpl?: string | array | any
	beforeBoxLabelTextTpl?: string | array | any
	beforeBoxLabelTpl?: string | array | any
	boxLabel?: string
	boxLabelAlign?: string
	boxLabelAttrTpl?: string | array | any
	boxLabelCls?: string
	checked?: boolean
	checkedCls?: string
	fieldCls?: string
	focusCls?: string
	handler?: Function | string
	inputValue?: string
	modelValue?: boolean | string | number
	modelValueUnchecked?: boolean | string | number
	scope?: any
	uncheckedValue?: string
}
declare class Checkbox extends React.Component<CheckboxProps, any> { }
export interface CheckboxProps {
	afterBoxLabelTextTpl?: string | array | any
	afterBoxLabelTpl?: string | array | any
	beforeBoxLabelTextTpl?: string | array | any
	beforeBoxLabelTpl?: string | array | any
	boxLabel?: string
	boxLabelAlign?: string
	boxLabelAttrTpl?: string | array | any
	boxLabelCls?: string
	checked?: boolean
	checkedCls?: string
	fieldCls?: string
	focusCls?: string
	handler?: Function | string
	inputValue?: string
	modelValue?: boolean | string | number
	modelValueUnchecked?: boolean | string | number
	scope?: any
	uncheckedValue?: string
}
declare class ComboBox extends React.Component<ComboBoxProps, any> { }
export interface ComboBoxProps {
	allQuery?: string
	anyMatch?: boolean
	autoLoadOnValue?: boolean
	autoSelect?: boolean
	autoSelectLast?: boolean
	caseSensitive?: boolean
	clearFilterOnBlur?: boolean
	collapseOnSelect?: boolean
	defaultListConfig?: any
	delimiter?: string
	displayField?: string
	displayTpl?: string | string[] | any
	enableRegEx?: boolean
	forceSelection?: boolean
	growToLongestValue?: boolean
	hiddenName?: string
	listConfig?: any
	minChars?: number
	multiSelect?: boolean
	pageSize?: number
	pinList?: boolean
	queryCaching?: boolean
	queryDelay?: number
	queryMode?: string
	queryParam?: string
	selection?: any
	selectOnTab?: boolean
	store: any | string | array
	transform?: string | HTMLElement | any
	transformInPlace?: boolean
	triggerAction?: string
	triggerCls?: string
	typeAhead?: boolean
	typeAheadDelay?: number
	valueField: string
	valueNotFoundText?: string
}
declare class Combo extends React.Component<ComboProps, any> { }
export interface ComboProps {
	allQuery?: string
	anyMatch?: boolean
	autoLoadOnValue?: boolean
	autoSelect?: boolean
	autoSelectLast?: boolean
	caseSensitive?: boolean
	clearFilterOnBlur?: boolean
	collapseOnSelect?: boolean
	defaultListConfig?: any
	delimiter?: string
	displayField?: string
	displayTpl?: string | string[] | any
	enableRegEx?: boolean
	forceSelection?: boolean
	growToLongestValue?: boolean
	hiddenName?: string
	listConfig?: any
	minChars?: number
	multiSelect?: boolean
	pageSize?: number
	pinList?: boolean
	queryCaching?: boolean
	queryDelay?: number
	queryMode?: string
	queryParam?: string
	selection?: any
	selectOnTab?: boolean
	store: any | string | array
	transform?: string | HTMLElement | any
	transformInPlace?: boolean
	triggerAction?: string
	triggerCls?: string
	typeAhead?: boolean
	typeAheadDelay?: number
	valueField: string
	valueNotFoundText?: string
}
declare class DateField extends React.Component<DateFieldProps, any> { }
export interface DateFieldProps {
	altFormats?: string
	ariaDisabledDatesText?: string
	ariaDisabledDaysText?: string
	ariaFormat?: string
	ariaMaxText?: string
	ariaMinText?: string
	disabledDates?: string[]
	disabledDatesText?: string
	disabledDays?: number[]
	disabledDaysText?: string
	format?: string
	formatText?: string
	invalidText?: string
	maxText?: string
	maxValue?: any | string
	minText?: string
	minValue?: any | string
	showToday?: boolean
	startDay?: number
	submitFormat?: string
	triggerCls?: string
	useStrict?: boolean
	valuePublishEvent?: string[] | string
}
declare class DisplayField extends React.Component<DisplayFieldProps, any> { }
export interface DisplayFieldProps {
	fieldCls?: string
	htmlEncode?: boolean
	renderer?: Function | string
	scope?: any
}
declare class FileField extends React.Component<FileFieldProps, any> { }
export interface FileFieldProps {
	accept?: string
	buttonConfig?: any
	buttonMargin?: number
	buttonOnly?: boolean
	buttonText?: string
	clearOnSubmit?: boolean
	editable?: boolean
	emptyText?: string
	readOnly?: boolean
}
declare class FileUploadField extends React.Component<FileUploadFieldProps, any> { }
export interface FileUploadFieldProps {
	accept?: string
	buttonConfig?: any
	buttonMargin?: number
	buttonOnly?: boolean
	buttonText?: string
	clearOnSubmit?: boolean
	editable?: boolean
	emptyText?: string
	readOnly?: boolean
}
declare class FileButton extends React.Component<FileButtonProps, any> { }
export interface FileButtonProps {
}
declare class HiddenField extends React.Component<HiddenFieldProps, any> { }
export interface HiddenFieldProps {
}
declare class Hidden extends React.Component<HiddenProps, any> { }
export interface HiddenProps {
}
declare class HtmlEditor extends React.Component<HtmlEditorProps, any> { }
export interface HtmlEditorProps {
	afterIFrameTpl?: string | array | any
	afterTextAreaTpl?: string | array | any
	beforeIFrameTpl?: string | array | any
	beforeTextAreaTpl?: string | array | any
	buttonDefaults?: any
	createLinkText?: string
	defaultButtonUI?: string
	defaultLinkValue?: string
	defaultValue?: string
	enableAlignments?: boolean
	enableColors?: boolean
	enableFont?: boolean
	enableFontSize?: boolean
	enableFormat?: boolean
	enableLinks?: boolean
	enableLists?: boolean
	enableSourceEdit?: boolean
	fontFamilies?: string[]
	iframeAttrTpl?: string | array | any
}
declare class NumberField extends React.Component<NumberFieldProps, any> { }
export interface NumberFieldProps {
	allowDecimals?: boolean
	allowExponential?: boolean
	autoStripChars?: boolean
	baseChars?: string
	decimalPrecision?: number
	decimalSeparator?: string
	maxText?: string
	maxValue?: number
	minText?: string
	minValue?: number
	nanText?: string
	negativeText?: string
	step?: number
	submitLocaleSeparator?: boolean
}
declare class PickerField extends React.Component<PickerFieldProps, any> { }
export interface PickerFieldProps {
	editable?: boolean
	matchFieldWidth?: boolean
	openCls?: string
	pickerAlign?: string
	pickerOffset?: number[]
	triggerCls?: string
}
declare class RadioField extends React.Component<RadioFieldProps, any> { }
export interface RadioFieldProps {
	modelValue?: boolean | string | number
	modelValueUnchecked?: boolean | string | number
}
declare class Radio extends React.Component<RadioProps, any> { }
export interface RadioProps {
	modelValue?: boolean | string | number
	modelValueUnchecked?: boolean | string | number
}
declare class SpinnerField extends React.Component<SpinnerFieldProps, any> { }
export interface SpinnerFieldProps {
	keyNavEnabled?: boolean
	mouseWheelEnabled?: boolean
	repeatTriggerClick?: boolean
	spinDownEnabled?: boolean
	spinUpEnabled?: boolean
}
declare class TagField extends React.Component<TagFieldProps, any> { }
export interface TagFieldProps {
	allowOnlyWhitespace?: any
	ariaAvailableListLabel?: string
	ariaDeselectedText?: string
	ariaHelpText?: string
	ariaHelpTextEditable?: string
	ariaNoneSelectedText?: string
	ariaSelectedListLabel?: string
	ariaSelectedText?: string
	clearOnBackspace?: boolean
	createNewOnBlur?: boolean
	createNewOnEnter?: boolean
	delimiter?: string
	encodeSubmitValue?: boolean
	filterPickList?: boolean
	forceSelection?: boolean
	grow?: boolean
	growAppend?: any
	growMax?: number | boolean
	growMin?: number | boolean
	growToLongestValue?: any
	labelTpl?: string | any
	multiSelect?: boolean
	selectOnFocus?: boolean
	stacked?: boolean
	tipTpl?: string | any
	triggerOnClick?: boolean
	valueParam?: string
}
declare class TextField extends React.Component<TextFieldProps, any> { }
export interface TextFieldProps {
	allowBlank?: boolean
	allowOnlyWhitespace?: boolean
	blankText?: string
	disableKeyFilter?: boolean
	editable?: boolean
	emptyCls?: string
	emptyText?: string
	enableKeyEvents?: boolean
	enforceMaxLength?: boolean
	grow?: boolean
	growAppend?: string
	growMax?: number
	growMin?: number
	hideTrigger?: boolean
	inputWrapCls?: string
	maskRe?: any
	maxLength?: number
	maxLengthText?: string
	minLength?: number
	minLengthText?: string
	readOnly?: boolean
	regex?: any
	regexText?: string
	repeatTriggerClick?: boolean
	requiredCls?: string
	selectOnFocus?: boolean
	size?: number
	stateEvents?: string[]
	stripCharsRe?: any
	triggers?: any
	triggerWrapCls?: string
	validateBlank?: boolean
	validator?: Function
	vtype?: string
	vtypeText?: string
}
declare class TextAreaField extends React.Component<TextAreaFieldProps, any> { }
export interface TextAreaFieldProps {
	enterIsSpecial?: boolean
	growAppend?: string
	growMax?: number
	growMin?: number
	preventScrollbars?: boolean
}
declare class TextArea extends React.Component<TextAreaProps, any> { }
export interface TextAreaProps {
	enterIsSpecial?: boolean
	growAppend?: string
	growMax?: number
	growMin?: number
	preventScrollbars?: boolean
}
declare class TimeField extends React.Component<TimeFieldProps, any> { }
export interface TimeFieldProps {
	altFormats?: string
	format?: string
	formatText?: string
	increment?: number
	invalidText?: string
	maxText?: string
	maxValue?: any | string
	minText?: string
	minValue?: any | string
	pickerMaxHeight?: number
	selectOnTab?: boolean
	snapToIncrement?: boolean
	submitFormat?: string
	triggerCls?: string
	valuePublishEvent?: string[] | string
}
declare class TriggerField extends React.Component<TriggerFieldProps, any> { }
export interface TriggerFieldProps {
	triggerCls?: string
}
declare class Trigger extends React.Component<TriggerProps, any> { }
export interface TriggerProps {
	triggerCls?: string
}
declare class FieldContainer extends React.Component<FieldContainerProps, any> { }
export interface FieldContainerProps {
	combineErrors?: boolean
	combineLabels?: boolean
	labelConnector?: string
}
declare class FieldSet extends React.Component<FieldSetProps, any> { }
export interface FieldSetProps {
	baseCls?: string
	checkbox?: any
	checkboxName?: string
	checkboxToggle?: boolean
	checkboxUI?: string
	collapsed?: boolean
	collapsible?: boolean
	descriptionText?: string
	expandText?: string
	layout?: any
	stateEvents?: string[]
	title?: string
	toggleOnTitleClick?: boolean
}
declare class Label extends React.Component<LabelProps, any> { }
export interface LabelProps {
	forId?: string
	html?: string
	text?: string
}
declare class Form extends React.Component<FormProps, any> { }
export interface FormProps {
	api?: any
	baseParams?: any
	errorReader?: any
	jsonSubmit?: boolean
	layout?: any
	method?: string
	paramOrder?: string | string[]
	paramsAsHash?: boolean
	pollForChanges?: boolean
	pollInterval?: number
	reader?: any
	standardSubmit?: boolean
	timeout?: number
	trackResetOnLoad?: boolean
	url?: string
	waitMsgTarget?: string | HTMLElement | any
	waitTitle?: string
}
declare class RadioGroup extends React.Component<RadioGroupProps, any> { }
export interface RadioGroupProps {
	allowBlank?: boolean
	blankText?: string
	local?: boolean
	simpleValue?: boolean
}
declare class ActionColumn extends React.Component<ActionColumnProps, any> { }
export interface ActionColumnProps {
	altText?: string
	disabled?: boolean
	getClass?: Function
	getTip?: Function
	glyph?: number | string
	handler?: Function | string
	icon?: string
	iconCls?: string
	isDisabled?: Function
	itemAriaRole?: string
	itemTabIndex?: number
	menuText?: string
	scope?: any
	stopSelection?: boolean
	tooltip?: string
}
declare class BooleanColumn extends React.Component<BooleanColumnProps, any> { }
export interface BooleanColumnProps {
	falseText?: string
	producesHTML?: boolean
	renderer?: any
	scope?: any
	trueText?: string
	undefinedText?: string
}
declare class CheckColumn extends React.Component<CheckColumnProps, any> { }
export interface CheckColumnProps {
	align?: any
	checkedTooltip?: string
	headerCheckbox?: boolean
	invert?: boolean
	stopSelection?: boolean
	tooltip?: string
	triggerEvent?: string
}
declare class GridColumn extends React.Component<GridColumnProps, any> { }
export interface GridColumnProps {
	align?: string
	cellFocusable?: boolean
	cellWrap?: boolean
	columns?: any[]
	dataIndex?: string
	dirtyText?: string
	draggable?: boolean
	editor?: any | string
	editRenderer?: Function | string
	emptyCellText?: string
	enableTextSelection?: boolean
	exportStyle?: any
	field?: any | string
	fixed?: boolean
	formatter?: string
	groupable?: boolean
	header?: string
	hideable?: boolean
	ignoreExport?: boolean
	lockable?: boolean
	locked?: boolean
	menuDisabled?: boolean
	menuText?: string
	producesHTML?: boolean
	renderer?: Function | string
	resizable?: boolean
	scope?: any
	sortable?: boolean
	sorter?: Function | string | any
	stateId?: string
	summaryRenderer?: Function | string
	tdCls?: string
	text?: string
	tooltip?: string
	tooltipType?: string
	updater?: Function | string
	variableRowHeight?: boolean
}
declare class DateColumn extends React.Component<DateColumnProps, any> { }
export interface DateColumnProps {
	format?: string
	producesHTML?: boolean
	renderer?: any
	scope?: any
}
declare class NumberColumn extends React.Component<NumberColumnProps, any> { }
export interface NumberColumnProps {
	format?: string
	producesHTML?: boolean
	renderer?: any
	scope?: any
}
declare class RowNumberer extends React.Component<RowNumbererProps, any> { }
export interface RowNumbererProps {
	draggable?: boolean
	producesHTML?: boolean
	sortable?: boolean
	text?: string
	width?: number
}
declare class TemplateColumn extends React.Component<TemplateColumnProps, any> { }
export interface TemplateColumnProps {
	renderer?: any
	scope?: any
	tpl?: string | any
}
declare class WidgetColumn extends React.Component<WidgetColumnProps, any> { }
export interface WidgetColumnProps {
	defaultWidgetUI?: any
	onWidgetAttach?: Function | string
	renderer?: any
	scope?: any
	sortable?: boolean
	stopSelection?: boolean
	widget?: any
}
declare class HeaderContainer extends React.Component<HeaderContainerProps, any> { }
export interface HeaderContainerProps {
	defaultWidth?: number
	enableColumnHide?: boolean
	sealed?: boolean
	sortable?: boolean
	weight?: number
}
declare class GridPanel extends React.Component<GridPanelProps, any> { }
export interface GridPanelProps {
	columns: any
	rowLines?: boolean
}
declare class Grid extends React.Component<GridProps, any> { }
export interface GridProps {
	columns: any
	rowLines?: boolean
}
declare class PropertyGrid extends React.Component<PropertyGridProps, any> { }
export interface PropertyGridProps {
	customEditors?: any
	customRenderers?: any
	inferTypes?: boolean
	nameColumnWidth?: number | string
	nameField?: string
	propertyNames?: any
	source?: any
	sourceConfig?: any
	valueField?: string
}
declare class RowEditor extends React.Component<RowEditorProps, any> { }
export interface RowEditorProps {
	removeUnmodified?: boolean
}
declare class RowEditorButtons extends React.Component<RowEditorButtonsProps, any> { }
export interface RowEditorButtonsProps {
}
declare class Image extends React.Component<ImageProps, any> { }
export interface ImageProps {
	alt?: string
	glyph?: number | string
	glyph?: number | string
	imgCls?: string
	src?: string
	title?: string
}
declare class ImageComponent extends React.Component<ImageComponentProps, any> { }
export interface ImageComponentProps {
	alt?: string
	glyph?: number | string
	glyph?: number | string
	imgCls?: string
	src?: string
	title?: string
}
declare class ColumnSplitter extends React.Component<ColumnSplitterProps, any> { }
export interface ColumnSplitterProps {
}
declare class TreeList extends React.Component<TreeListProps, any> { }
export interface TreeListProps {
	defaults?: any
	expanderOnly?: boolean
	highlightPath?: boolean
	micro?: boolean
	selection?: any
	selectOnExpander?: boolean
	singleExpand?: boolean
	store?: string | any
}
declare class TreeListItem extends React.Component<TreeListItemProps, any> { }
export interface TreeListItemProps {
	rowCls?: string
	rowClsProperty?: string
}
declare class LoadMask extends React.Component<LoadMaskProps, any> { }
export interface LoadMaskProps {
	msg?: string
	shim?: boolean
	store?: any
	target?: Component
	useMsg?: boolean
	useTargetEl?: boolean
}
declare class MenuBar extends React.Component<MenuBarProps, any> { }
export interface MenuBarProps {
	defaultMenuAlign?: string
}
declare class MenuCheckItem extends React.Component<MenuCheckItemProps, any> { }
export interface MenuCheckItemProps {
	checkChangeDisabled?: boolean
	checked?: boolean
	checkedCls?: string
	checkHandler?: Function | string
	group?: string
	groupCls?: string
	hideOnClick?: boolean
	scope?: any
	submenuText?: string
	uncheckedCls?: string
}
declare class ColorMenu extends React.Component<ColorMenuProps, any> { }
export interface ColorMenuProps {
	hideOnClick?: boolean
	pickerId?: string
}
declare class DateMenu extends React.Component<DateMenuProps, any> { }
export interface DateMenuProps {
	ariaLabel?: string
	hideOnClick?: boolean
	pickerCfg?: any
	pickerId?: string
}
declare class MenuItem extends React.Component<MenuItemProps, any> { }
export interface MenuItemProps {
	activeCls?: string
	canActivate?: boolean
	clickHideDelay?: number
	destroyMenu?: boolean
	disabledCls?: string
	glyph?: number | string
	handler?: Function | string
	hideOnClick?: boolean
	href?: string
	hrefTarget?: string
	icon?: string
	iconCls?: string
	menu?: Menu | any
	menuAlign?: string
	menuExpandDelay?: number
	menuHideDelay?: number
	plain?: boolean
	text?: string
	tooltip?: string | any
	tooltipType?: string
}
declare class Menu extends React.Component<MenuProps, any> { }
export interface MenuProps {
	allowOtherMenus?: boolean
	defaultAlign?: string
	enableKeyNav?: boolean
	floating?: boolean
	hidden?: boolean
	ignoreParentClicks?: boolean
	minWidth?: number
	mouseLeaveDelay?: number
	plain?: boolean
	showSeparator?: boolean
}
declare class MenuSeparator extends React.Component<MenuSeparatorProps, any> { }
export interface MenuSeparatorProps {
	separatorCls?: string
}
declare class Header extends React.Component<HeaderProps, any> { }
export interface HeaderProps {
	glyph?: number | string
	icon?: string
	iconAlign?: string
	iconCls?: string
	itemPosition?: number
	title?: string | Title
	titleAlign?: string
	titlePosition?: number
	titleRotation?: string | number
}
declare class Panel extends React.Component<PanelProps, any> { }
export interface PanelProps {
	animCollapse?: boolean | number
	bbar?: any | any[]
	bodyBorder?: boolean
	bodyCls?: string | string[]
	bodyPadding?: number | string
	bodyStyle?: string | any | Function
	border?: boolean
	buttonAlign?: string
	buttons?: any[]
	closable?: boolean
	closeAction?: string
	closeToolText?: string
	collapsed?: boolean
	collapsedCls?: string
	collapseDirection?: string
	collapseFirst?: boolean
	collapseMode?: string
	collapseToolText?: string
	collapsible?: boolean
	constrain?: boolean
	constrainHeader?: boolean
	defaultButton?: string
	defaultButtonTarget?: string
	draggable?: boolean | any
	expandToolText?: string
	fbar?: any | any[]
	floatable?: boolean
	frame?: boolean
	frameHeader?: boolean
	glyph?: number | string
	header?: boolean | any
	headerOverCls?: string
	headerPosition?: string
	hideCollapseTool?: boolean
	icon?: string
	iconAlign?: string
	iconCls?: string
	lbar?: any | any[]
	manageHeight?: boolean
	maskElement?: string
	minButtonWidth?: number
	overlapHeader?: boolean
	placeholder?: Component | any
	placeholderCollapseHideMode?: number
	preventHeader?: boolean
	rbar?: any | any[]
	shrinkWrap?: boolean | number
	shrinkWrapDock?: boolean | number
	simpleDrag?: boolean
	stateEvents?: string[]
	tbar?: any | any[]
	title?: string | any
	titleAlign?: string
	titleCollapse?: boolean
	titleRotation?: string | number
	tools?: any[] | any
}
declare class TablePanel extends React.Component<TablePanelProps, any> { }
export interface TablePanelProps {
	allowDeselect?: boolean
	autoLoad?: boolean
	bufferedRenderer?: boolean
	columnLines?: boolean
	columns?: any
	deferRowRender?: boolean
	disableSelection?: boolean
	emptyText?: string
	enableColumnHide?: boolean
	enableColumnMove?: boolean
	enableColumnResize?: boolean
	enableLocking?: boolean
	features?: any | any[]
	forceFit?: boolean
	headerBorders?: boolean
	hideHeaders?: boolean
	leadingBufferZone?: number
	multiColumnSort?: boolean
	multiSelect?: boolean
	numFromEdge?: number
	record?: any | number
	reserveScrollbar?: boolean
	rowLines?: boolean
	rowViewModel?: string | any
	scroll?: string | boolean
	sealedColumns?: boolean
	selection?: any
	selModel?: any | string
	selType?: string
	simpleSelect?: boolean
	sortableColumns?: boolean
	stateEvents?: string[]
	store: any | string
	trailingBufferZone?: number
	variableRowHeight?: boolean
	view?: any
	viewConfig?: any
	viewType?: string
}
declare class Title extends React.Component<TitleProps, any> { }
export interface TitleProps {
	glyph?: number | string
	icon?: string
	iconAlign?: string
	iconCls?: string
	rotation?: string | number
	text?: string
	textAlign?: string
}
declare class Tool extends React.Component<ToolProps, any> { }
export interface ToolProps {
	callback?: Function | string
	glyph?: number | string
	handler?: Function
	iconCls?: string
	scope?: any
	stopEvent?: boolean
	toolOwner?: Component
	tooltip?: string | any
	tooltipType?: string
	type?: string
}
declare class ColorPicker extends React.Component<ColorPickerProps, any> { }
export interface ColorPickerProps {
	allowReselect?: boolean
	clickEvent?: string
	componentCls?: string
	handler?: Function | string
	itemCls?: string
	scope?: any
	selectedCls?: string
	value?: string
}
declare class DatePicker extends React.Component<DatePickerProps, any> { }
export interface DatePickerProps {
	ariaDisabledDatesText?: string
	ariaDisabledDaysText?: string
	ariaMaxText?: string
	ariaMinText?: string
	ariaTitle?: string
	ariaTitleDateFormat?: string
	baseCls?: string
	dayNames?: string[]
	disableAnim?: boolean
	disabledCellCls?: string
	disabledDates?: string[]
	disabledDatesRE?: any
	disabledDatesText?: string
	disabledDays?: number[]
	disabledDaysText?: string
	footerButtonUI?: string
	format?: string
	handler?: Function
	keyNavConfig?: any
	longDayFormat?: string
	maxDate?: any
	maxText?: string
	minDate?: any
	minText?: string
	monthNames?: string[]
	monthYearFormat?: string
	monthYearText?: string
	nextText?: string
	prevText?: string
	renderTpl?: any | string | string[]
	scope?: any
	selectedCls?: string
	showToday?: boolean
	startDay?: number
	todayText?: string
	todayTip?: string
}
declare class MonthPicker extends React.Component<MonthPickerProps, any> { }
export interface MonthPickerProps {
	baseCls?: string
	cancelText?: string
	footerButtonUI?: string
	okText?: string
	selectedCls?: string
	showButtons?: boolean
	value?: any | number[]
}
declare class TimePicker extends React.Component<TimePickerProps, any> { }
export interface TimePickerProps {
	format?: string
	increment?: number
	maxValue?: any
	minValue?: any
	store?: any
}
declare class PivotD3Container extends React.Component<PivotD3ContainerProps, any> { }
export interface PivotD3ContainerProps {
}
declare class PivotHeatMap extends React.Component<PivotHeatMapProps, any> { }
export interface PivotHeatMapProps {
	defaultFormatter?: string
	matrix?: any
}
declare class PivotTreeMap extends React.Component<PivotTreeMapProps, any> { }
export interface PivotTreeMapProps {
	autoExpand?: boolean
	matrix?: any
}
declare class PivotGrid extends React.Component<PivotGridProps, any> { }
export interface PivotGridProps {
	aggregate?: any
	clsGrandTotal?: string
	clsGroupTotal?: string
	colGrandTotalsPosition?: string
	colSubTotalsPosition?: string
	columnLines?: boolean
	columns?: array
	enableColumnSort?: boolean
	enableLoadMask?: boolean
	enableLocking?: boolean
	leftAxis?: any
	matrix: any
	matrixConfig?: any
	rowGrandTotalsPosition?: string
	rowSubTotalsPosition?: string
	showZeroAsBlank?: boolean
	startColGroupsCollapsed?: boolean
	startRowGroupsCollapsed?: boolean
	stateEvents?: string[]
	store?: any
	textGrandTotalTpl?: string
	textTotalTpl?: string
	topAxis?: any
	viewLayoutType?: string
}
declare class MZPivotGrid extends React.Component<MZPivotGridProps, any> { }
export interface MZPivotGridProps {
	aggregate?: any
	clsGrandTotal?: string
	clsGroupTotal?: string
	colGrandTotalsPosition?: string
	colSubTotalsPosition?: string
	columnLines?: boolean
	columns?: array
	enableColumnSort?: boolean
	enableLoadMask?: boolean
	enableLocking?: boolean
	leftAxis?: any
	matrix: any
	matrixConfig?: any
	rowGrandTotalsPosition?: string
	rowSubTotalsPosition?: string
	showZeroAsBlank?: boolean
	startColGroupsCollapsed?: boolean
	startRowGroupsCollapsed?: boolean
	stateEvents?: string[]
	store?: any
	textGrandTotalTpl?: string
	textTotalTpl?: string
	topAxis?: any
	viewLayoutType?: string
}
declare class PivotConfigField extends React.Component<PivotConfigFieldProps, any> { }
export interface PivotConfigFieldProps {
	field?: any
	fieldType?: string
}
declare class PivotConfigContainer extends React.Component<PivotConfigContainerProps, any> { }
export interface PivotConfigContainerProps {
	fieldType?: any
}
declare class PivotConfigPanel extends React.Component<PivotConfigPanelProps, any> { }
export interface PivotConfigPanelProps {
	addToText?: string
	fieldSettingsText?: string
	moveBeginText?: string
	moveDownText?: string
	moveEndText?: string
	moveToText?: string
	moveUpText?: string
	panelAggFieldsText?: string
	panelAggFieldsTitle?: string
	panelAllFieldsText?: string
	panelAllFieldsTitle?: string
	panelLeftFieldsText?: string
	panelLeftFieldsTitle?: string
	panelTopFieldsText?: string
	panelTopFieldsTitle?: string
	removeFieldText?: string
}
declare class Progress extends React.Component<ProgressProps, any> { }
export interface ProgressProps {
	animate?: boolean
	baseCls?: string
	text?: string
}
declare class ProgressBarWidget extends React.Component<ProgressBarWidgetProps, any> { }
export interface ProgressBarWidgetProps {
	animate?: boolean
	baseCls?: string
	text?: string
}
declare class ProgressBar extends React.Component<ProgressBarProps, any> { }
export interface ProgressBarProps {
	animate?: boolean | any
	baseCls?: string
	id?: string
	text?: string
	textEl?: string | HTMLElement | any
}
declare class BorderSplitter extends React.Component<BorderSplitterProps, any> { }
export interface BorderSplitterProps {
}
declare class Splitter extends React.Component<SplitterProps, any> { }
export interface SplitterProps {
	collapsedCls?: string
	collapseOnDblClick?: boolean
	collapseTarget?: string | Panel
	collapsible?: boolean
	defaultSplitMax?: number
	defaultSplitMin?: number
	performCollapse?: boolean
	size?: number
	tracker?: any
}
declare class MultiSlider extends React.Component<MultiSliderProps, any> { }
export interface MultiSliderProps {
	animate?: any | boolean
	clickToChange?: boolean
	constrainThumbs?: boolean
	decimalPrecision?: number | boolean
	increment?: number
	keyIncrement?: number
	maxValue?: number
	minValue?: number
	pageSize?: number
	tipText?: Function | string
	useTips?: any | boolean
	value?: number
	values?: number[]
	vertical?: boolean
	zeroBasedSnapping?: boolean
}
declare class Slider extends React.Component<SliderProps, any> { }
export interface SliderProps {
	publishOnComplete?: boolean
}
declare class SliderField extends React.Component<SliderFieldProps, any> { }
export interface SliderFieldProps {
	publishOnComplete?: boolean
}
declare class SliderTip extends React.Component<SliderTipProps, any> { }
export interface SliderTipProps {
	align?: string
	offsets?: array
	position?: string
}
declare class SliderWidget extends React.Component<SliderWidgetProps, any> { }
export interface SliderWidgetProps {
	clickToChange?: boolean
	maxValue?: number
	minValue?: number
	publishOnComplete?: boolean
	twoWayBindable?: any
	value?: number | number[]
	vertical?: boolean
}
declare class SparkLineBar extends React.Component<SparkLineBarProps, any> { }
export interface SparkLineBarProps {
	barColor?: string
	barSpacing?: number
	barWidth?: number
	chartRangeClip?: boolean
	chartRangeMax?: number
	chartRangeMin?: number
	colorMap?: any
	negBarColor?: string
	nullColor?: string
	stackedBarColor?: string[]
	zeroAxis?: boolean
	zeroColor?: string
}
declare class SparkLine extends React.Component<SparkLineProps, any> { }
export interface SparkLineProps {
	disableTooltips?: boolean
	highlightColor?: string
	highlightLighten?: number
	lineColor?: string
	tipTpl?: string | any
	tooltipPrefix?: string
	tooltipSkipNull?: boolean
	tooltipSuffix?: string
	values?: number[]
}
declare class SparkLineBox extends React.Component<SparkLineBoxProps, any> { }
export interface SparkLineBoxProps {
	boxFillColor?: string
	boxLineColor?: string
	chartRangeMax?: number
	chartRangeMin?: number
	medianColor?: string
	outlierFillColor?: string
	outlierIQR?: number
	outlierLineColor?: string
	raw?: boolean
	showOutliers?: boolean
	spotRadius?: number
	target?: number
	targetColor?: string
	whiskerColor?: string
}
declare class SparkLineBullet extends React.Component<SparkLineBulletProps, any> { }
export interface SparkLineBulletProps {
	base?: number
	performanceColor?: string
	rangeColors?: string[]
	targetColor?: string
	targetWidth?: number
}
declare class SparkLineDiscrete extends React.Component<SparkLineDiscreteProps, any> { }
export interface SparkLineDiscreteProps {
	chartRangeClip?: boolean
	chartRangeMax?: number
	chartRangeMin?: number
	lineHeight?: number
	thresholdColor?: string
	thresholdValue?: number
}
declare class SparkLineline extends React.Component<SparkLinelineProps, any> { }
export interface SparkLinelineProps {
	chartRangeMax?: number
	chartRangeMaxX?: number
	chartRangeMin?: number
	chartRangeMinX?: number
	drawNormalOnTop?: boolean
	fillColor?: string
	highlightLineColor?: string
	highlightSpotColor?: string
	lineWidth?: number
	maxSpotColor?: string
	minSpotColor?: string
	normalRangeColor?: string
	normalRangeMax?: number
	normalRangeMin?: number
	spotColor?: string
	spotRadius?: number
	valueSpots?: any
}
declare class SparkLinePie extends React.Component<SparkLinePieProps, any> { }
export interface SparkLinePieProps {
	borderColor?: string
	borderWidth?: number
	offset?: number
	sliceColors?: string[]
}
declare class SparkLineTriState extends React.Component<SparkLineTriStateProps, any> { }
export interface SparkLineTriStateProps {
	barSpacing?: number
	barWidth?: number
	colorMap?: any
	negBarColor?: string
	posBarColor?: string
	zeroBarColor?: string
}
declare class TabBar extends React.Component<TabBarProps, any> { }
export interface TabBarProps {
	activateOnFocus?: boolean
	ensureActiveVisibleOnChange?: boolean
	maxTabWidth?: number
	minTabWidth?: number
	plain?: boolean
	tabRotation?: string | number
	tabStretchMax?: boolean
}
declare class TabPanel extends React.Component<TabPanelProps, any> { }
export interface TabPanelProps {
	activeItem?: string | number
	activeTab?: string | number | Component
	deferredRender?: boolean
	itemCls?: string
	layout?: any
	maxTabWidth?: number
	minTabWidth?: number
	plain?: boolean
	removePanelHeader?: boolean
	tabBar?: any
	tabBarHeaderPosition?: number
	tabPosition?: string
	tabRotation?: string | number
	tabStretchMax?: boolean
}
declare class Tab extends React.Component<TabProps, any> { }
export interface TabProps {
	closable?: boolean
	closeText?: string
	rotation?: string | number
	tabPosition?: string
}
declare class QuickTip extends React.Component<QuickTipProps, any> { }
export interface QuickTipProps {
	html?: any
	interceptTitles?: boolean
	target?: string | HTMLElement | any
	text?: string | any
	title?: string | Title
}
declare class Tip extends React.Component<TipProps, any> { }
export interface TipProps {
	closable?: boolean
	closeAction?: string
	constrainPosition?: boolean
	maxWidth?: number
	minWidth?: number
	shadow?: boolean | string
	width?: number
}
declare class ToolTip extends React.Component<ToolTipProps, any> { }
export interface ToolTipProps {
	anchor?: string
	anchorToTarget?: boolean
	autoHide?: boolean
	defaultAlign?: string
	delegate?: string
	dismissDelay?: number
	fadeOutDuration?: number
	hideAction?: string
	hideDelay?: number
	mouseOffset?: number[]
	showDelay?: number
	showOnTap?: boolean
	target?: HTMLElement | any | string
	targetOffset?: number[]
	trackMouse?: boolean
}
declare class Breadcrumb extends React.Component<BreadcrumbProps, any> { }
export interface BreadcrumbProps {
	buttonUI?: string
	displayField?: string
	overflowHandler?: string
	selection?: any | string
	showIcons?: boolean
	showMenuIcons?: boolean
	store?: any
	useSplitButtons?: boolean
}
declare class TBFill extends React.Component<TBFillProps, any> { }
export interface TBFillProps {
}
declare class TBItem extends React.Component<TBItemProps, any> { }
export interface TBItemProps {
	overflowText?: string
}
declare class PagingToolbar extends React.Component<PagingToolbarProps, any> { }
export interface PagingToolbarProps {
	afterPageText?: string
	beforePageText?: string
	displayInfo?: boolean
	displayMsg?: string
	emptyMsg?: string
	firstText?: string
	inputItemWidth?: number
	lastText?: string
	nextText?: string
	prependButtons?: boolean
	prevText?: string
	refreshText?: string
	store?: any | string
}
declare class TBSeparator extends React.Component<TBSeparatorProps, any> { }
export interface TBSeparatorProps {
}
declare class TBSpacer extends React.Component<TBSpacerProps, any> { }
export interface TBSpacerProps {
}
declare class TBText extends React.Component<TBTextProps, any> { }
export interface TBTextProps {
	text?: string
}
declare class Toolbar extends React.Component<ToolbarProps, any> { }
export interface ToolbarProps {
	defaultButtonUI?: string
	defaultFieldUI?: string
	defaultFooterButtonUI?: string
	defaultFooterFieldUI?: string
	enableOverflow?: boolean
	layout?: any
	overflowHandler?: string
	vertical?: boolean
}
declare class TreeColumn extends React.Component<TreeColumnProps, any> { }
export interface TreeColumnProps {
	renderer?: Function | string
}
declare class TreePanel extends React.Component<TreePanelProps, any> { }
export interface TreePanelProps {
	animate?: boolean
	checkPropagation?: string
	displayField?: string
	folderSort?: boolean
	lines?: boolean
	root?: any
	rootVisible?: boolean
	rowLines?: boolean
	singleExpand?: boolean
	store: any
	useArrows?: boolean
}
declare class TreeView extends React.Component<TreeViewProps, any> { }
export interface TreeViewProps {
	animate?: boolean
	loadMask?: boolean
	rootVisible?: boolean
	toggleOnDblClick?: boolean
}
declare class ColorButton extends React.Component<ColorButtonProps, any> { }
export interface ColorButtonProps {
}
declare class ColorPickerColorMap extends React.Component<ColorPickerColorMapProps, any> { }
export interface ColorPickerColorMapProps {
}
declare class ColorPickerColorPreview extends React.Component<ColorPickerColorPreviewProps, any> { }
export interface ColorPickerColorPreviewProps {
}
declare class ColorField extends React.Component<ColorFieldProps, any> { }
export interface ColorFieldProps {
}
declare class ColorSelector extends React.Component<ColorSelectorProps, any> { }
export interface ColorSelectorProps {
	fieldPad?: number
	fieldWidth?: number
	showOkCancelButtons?: boolean
	showPreviousColor?: boolean
}
declare class ColorPickerSlider extends React.Component<ColorPickerSliderProps, any> { }
export interface ColorPickerSliderProps {
}
declare class ColorPickerSliderAlpha extends React.Component<ColorPickerSliderAlphaProps, any> { }
export interface ColorPickerSliderAlphaProps {
}
declare class ColorPickerSliderHue extends React.Component<ColorPickerSliderHueProps, any> { }
export interface ColorPickerSliderHueProps {
}
declare class ColorPickerSliderSaturation extends React.Component<ColorPickerSliderSaturationProps, any> { }
export interface ColorPickerSliderSaturationProps {
}
declare class ColorPickerSliderValue extends React.Component<ColorPickerSliderValueProps, any> { }
export interface ColorPickerSliderValueProps {
}
declare class Desktop extends React.Component<DesktopProps, any> { }
export interface DesktopProps {
	shortcutItemSelector?: string
	shortcuts?: array | any
	shortcutTpl?: string
	taskbarConfig?: any
}
declare class TaskBar extends React.Component<TaskBarProps, any> { }
export interface TaskBarProps {
	startBtnText?: string
}
declare class TrayClock extends React.Component<TrayClockProps, any> { }
export interface TrayClockProps {
}
declare class Video extends React.Component<VideoProps, any> { }
export interface VideoProps {
}
declare class Wallpaper extends React.Component<WallpaperProps, any> { }
export interface WallpaperProps {
}
declare class EventRecorderManager extends React.Component<EventRecorderManagerProps, any> { }
export interface EventRecorderManagerProps {
}
declare class Explorer extends React.Component<ExplorerProps, any> { }
export interface ExplorerProps {
	breadcrumb?: any
	contentView?: any
	selection?: any
	store?: any
	tree?: any
}
declare class ItemSelectorField extends React.Component<ItemSelectorFieldProps, any> { }
export interface ItemSelectorFieldProps {
	buttons?: array
	buttonsText?: any
	hideNavIcons?: boolean
}
declare class ItemSelector extends React.Component<ItemSelectorProps, any> { }
export interface ItemSelectorProps {
	buttons?: array
	buttonsText?: any
	hideNavIcons?: boolean
}
declare class MultiSelectField extends React.Component<MultiSelectFieldProps, any> { }
export interface MultiSelectFieldProps {
	allowBlank?: boolean
	appendOnly?: string
	blankText?: string
	ddReorder?: boolean
	delimiter?: string
	displayField?: string
	dragGroup?: string
	dragText?: string
	dropGroup?: string
	listConfig?: any
	maxSelections?: number
	maxSelectionsText?: string
	minSelections?: number
	minSelectionsText?: string
	pageSize?: number
	store?: any | array
	tbar?: any | array
	title?: string
	valueField?: string
}
declare class MultiSelect extends React.Component<MultiSelectProps, any> { }
export interface MultiSelectProps {
	allowBlank?: boolean
	appendOnly?: string
	blankText?: string
	ddReorder?: boolean
	delimiter?: string
	displayField?: string
	dragGroup?: string
	dragText?: string
	dropGroup?: string
	listConfig?: any
	maxSelections?: number
	maxSelectionsText?: string
	minSelections?: number
	minSelectionsText?: string
	pageSize?: number
	store?: any | array
	tbar?: any | array
	title?: string
	valueField?: string
}
declare class Gauge extends React.Component<GaugeProps, any> { }
export interface GaugeProps {
	angleOffset?: number
	animation?: any | boolean
	clockwise?: boolean
	maxValue?: number
	minValue?: number
	padding?: number | string
	textAlign?: string
	textTpl?: any
	trackLength?: number
	trackStart?: number
	trackStyle?: any
	value?: number
	valueStyle?: any
}
declare class GMapPanel extends React.Component<GMapPanelProps, any> { }
export interface GMapPanelProps {
}
declare class GroupTabPanel extends React.Component<GroupTabPanelProps, any> { }
export interface GroupTabPanelProps {
}
declare class UXIframe extends React.Component<UXIframeProps, any> { }
export interface UXIframeProps {
}
declare class Rating extends React.Component<RatingProps, any> { }
export interface RatingProps {
	animate?: boolean | any
	family?: string
	glyphs?: string | string[] | number[]
	limit?: number
	minimum?: number
	overStyle?: string | any
	rounding?: number
	scale?: string
	selectedStyle?: string | any
	tooltip?: any | string | string[] | Function
	trackOver?: boolean
	value?: number
}
declare class StatusBar extends React.Component<StatusBarProps, any> { }
export interface StatusBarProps {
	autoClear?: number
	busyIconCls?: string
	busyText?: string
	cls?: string
	defaultIconCls?: string
	defaultText?: string
	emptyText?: string
	iconCls?: string
	statusAlign?: string
	text?: string
}
declare class TreePicker extends React.Component<TreePickerProps, any> { }
export interface TreePickerProps {
	columns?: array
	displayField?: string
	maxPickerHeight?: number
	minPickerHeight?: number
	selectOnTab?: boolean
	store?: any
}
declare class BoundList extends React.Component<BoundListProps, any> { }
export interface BoundListProps {
	displayField?: string
	pageSize?: number
	tpl?: string | any
}
declare class MultiSelector extends React.Component<MultiSelectorProps, any> { }
export interface MultiSelectorProps {
	addToolText?: string
	fieldName?: string
	fieldTitle?: string
	removeRowText?: string
	removeRowTip?: string
	search?: any
}
declare class MultiSelectorSearch extends React.Component<MultiSelectorSearchProps, any> { }
export interface MultiSelectorSearchProps {
	field?: string
	searchText?: string
	store?: any | string
}
declare class TableView extends React.Component<TableViewProps, any> { }
export interface TableViewProps {
	enableTextSelection?: boolean
	firstCls?: string
	lastCls?: string
	markDirty?: boolean
	stripeRows?: boolean
}
declare class GridView extends React.Component<GridViewProps, any> { }
export interface GridViewProps {
	enableTextSelection?: boolean
	firstCls?: string
	lastCls?: string
	markDirty?: boolean
	stripeRows?: boolean
}
declare class DataView extends React.Component<DataViewProps, any> { }
export interface DataViewProps {
}
declare class Widget extends React.Component<WidgetProps, any> { }
export interface WidgetProps {
	baseCls?: string | boolean
	border?: boolean
	cls?: string | string[]
	height?: number | string
	hidden?: boolean
	style?: string | any
	touchAction?: any
	ui?: string | string[]
	userCls?: string | string[]
	width?: number | string
}
declare class MessageBox extends React.Component<MessageBoxProps, any> { }
export interface MessageBoxProps {
}
declare class Toast extends React.Component<ToastProps, any> { }
export interface ToastProps {
	align?: string
	alwaysOnTop?: boolean | number
	anchor?: string | Component
	anchorAlign?: string
	animate?: boolean
	autoClose?: boolean
	autoCloseDelay?: number
	bodyPadding?: number | string
	closable?: boolean
	closeOnMouseDown?: boolean
	cls?: string | string[]
	draggable?: boolean
	hideDuration?: number
	plain?: boolean
	resizable?: boolean | any
	shadow?: string | boolean
	slideBackAnimation?: string
	slideBackDuration?: number
	slideInAnimation?: string
	slideInDuration?: number
	spacing?: number
	stickOnClick?: boolean
	stickWhileHover?: boolean
	useXAxis?: boolean
}
declare class Window extends React.Component<WindowProps, any> { }
export interface WindowProps {
	animateTarget?: string | any | Component | boolean
	autoRender?: boolean
	baseCls?: string
	closable?: boolean
	collapsed?: boolean
	constrain?: boolean
	constrainHeader?: boolean
	defaultFocus?: string | number | Component
	draggable?: boolean
	expandOnShow?: boolean
	floating?: boolean
	ghost?: boolean | Function
	hidden?: boolean
	hideMode?: string
	hideShadowOnDeactivate?: boolean
	maskClickAction?: string
	maximizable?: boolean
	maximized?: boolean
	minimizable?: boolean
	monitorResize?: boolean
	onEsc?: Function
	plain?: boolean
	resizable?: boolean | any
	simpleDrag?: any
	stateEvents?: string[]
	x?: number
	y?: number
}