declare class Button extends React.Component<ButtonProps, any> { }
export interface ButtonProps {
	allowDepress?: boolean
	autoEvent?: string
	badgeCls?: string
	badgeText?: string
	baseCls?: string | boolean
	enableToggle?: boolean
	handler?: Function
	html?: string
	icon?: string
	iconAlign?: string
	iconCls?: string
	labelCls?: string
	pressed?: boolean
	pressedCls?: string
	pressedDelay?: number | boolean
	pressingCls?: string
	scope?: any
	text?: string
	textAlign?: string
	ui?: string
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
	defaultType?: string
	defaultUI?: string
	forceSelection?: boolean
	layout?: any | string
	pressedButtons?: array
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
}
declare class Interaction extends React.Component<InteractionProps, any> { }
export interface InteractionProps {
	chart?: any
	enabled?: boolean
}
declare class Legend extends React.Component<LegendProps, any> { }
export interface LegendProps {
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
	axisLock?: boolean
	bottom?: number | string
	centered?: boolean
	contentEl?: any | HTMLElement | string
	data?: any
	disabled?: boolean
	docked?: string
	draggable?: any
	enterAnimation?: string | any
	exitAnimation?: string | any
	fullscreen?: boolean
	hideAnimation?: string | any
	hideOnMaskTap?: boolean
	html?: string | any | HTMLElement
	left?: number | string
	margin?: number | string
	maxHeight?: number | string
	maxWidth?: number | string
	minHeight?: number | string
	minWidth?: number | string
	modal?: boolean
	padding?: number | string
	record?: any
	renderTo?: any
	right?: number | string
	scrollable?: boolean | string | any
	showAnimation?: string | any
	styleHtmlCls?: string
	styleHtmlContent?: boolean
	tooltip?: string | any
	top?: number | string
	tpl?: string | string[] | any
	tplWriteMode?: string
	xtype?: string
	zIndex?: number
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
	activeItem?: any | string | number
	autoDestroy?: boolean
	cardSwitchAnimation?: string | any | boolean
	control?: any
	defaults?: any
	defaultType?: string
	layout?: any | string
	manageBorders?: boolean
	masked?: boolean | any | Mask | LoadMask
}
declare class Viewport extends React.Component<ViewportProps, any> { }
export interface ViewportProps {
	layout?: any | string
	preventZooming?: boolean
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
	yAxis?: any
}
declare class D3Pack extends React.Component<D3PackProps, any> { }
export interface D3PackProps {
	clipText?: boolean
}
declare class D3Partition extends React.Component<D3PartitionProps, any> { }
export interface D3PartitionProps {
}
declare class D3Sunburst extends React.Component<D3SunburstProps, any> { }
export interface D3SunburstProps {
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
	bodyAlign?: string
	clearIcon?: boolean
	component?: any
	fullscreen?: boolean
	inputCls?: string
	inputType?: string
	label?: string
	labelAlign?: string
	labelCls?: string
	labelTextAlign?: string
	labelWidth?: number | string
	labelWrap?: boolean
	name?: string
	required?: boolean
	tabIndex?: number
	value?: any
}
declare class CheckBoxField extends React.Component<CheckBoxFieldProps, any> { }
export interface CheckBoxFieldProps {
	checked?: boolean
	component?: any
	tabIndex?: number
	value?: string
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
	component?: any
	hidden?: any
	tabIndex?: number
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
	component?: any
	maxValue?: number
	minValue?: number
	stepValue?: number
}
declare class PickerField extends React.Component<PickerFieldProps, any> { }
export interface PickerFieldProps {
	clearIcon?: boolean
	component?: any
	usePicker?: string | boolean
}
declare class RadioField extends React.Component<RadioFieldProps, any> { }
export interface RadioFieldProps {
	component?: any
}
declare class Radio extends React.Component<RadioProps, any> { }
export interface RadioProps {
	modelValue?: boolean | string | number
	modelValueUnchecked?: boolean | string | number
}
declare class SpinnerField extends React.Component<SpinnerFieldProps, any> { }
export interface SpinnerFieldProps {
	accelerateOnTapHold?: boolean
	clearIcon?: boolean
	component?: any
	cycle?: boolean
	defaultValue?: number
	groupButtons?: boolean
	maxValue?: number
	minValue?: number
	stepValue?: number
	tabIndex?: number
	value?: number
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
	autoCapitalize?: boolean
	autoComplete?: boolean
	autoCorrect?: boolean
	clearIcon?: boolean
	component?: any
	labelAlign?: string
	maxLength?: number
	placeHolder?: string
	readOnly?: boolean
	textAlign?: string
	triggers?: any
}
declare class TextAreaField extends React.Component<TextAreaFieldProps, any> { }
export interface TextAreaFieldProps {
	autoCapitalize?: boolean
	component?: any
	maxRows?: number
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
	group?: string
	handler?: Function | string
	iconCls?: string
	repeat?: boolean | any
	scope?: any
	side?: string
}
declare class FieldContainer extends React.Component<FieldContainerProps, any> { }
export interface FieldContainerProps {
	combineErrors?: boolean
	combineLabels?: boolean
	labelConnector?: string
}
declare class FieldSet extends React.Component<FieldSetProps, any> { }
export interface FieldSetProps {
	baseCls?: string | boolean
	instructions?: string
	title?: string
}
declare class Label extends React.Component<LabelProps, any> { }
export interface LabelProps {
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
	trueText?: string
	undefinedText?: string
}
declare class CheckColumn extends React.Component<CheckColumnProps, any> { }
export interface CheckColumnProps {
	align?: string
	headerCheckbox?: boolean
	stopSelection?: boolean
}
declare class GridColumn extends React.Component<GridColumnProps, any> { }
export interface GridColumnProps {
	align?: string
	cell?: any
	cell?: any
	computedWidth?: number
	dataIndex?: string
	defaultEditor?: any | Field
	defaultWidth?: number
	editable?: boolean
	editor?: any | string
	exportStyle?: any
	formatter?: string
	groupable?: boolean
	ignore?: boolean
	ignoreExport?: boolean
	renderer?: Function | string
	resizable?: boolean
	scope?: any
	sortable?: boolean
	summaryFormatter?: string
	summaryRenderer?: string | Function
	summaryType?: string | Function
	text?: string
	tpl?: string | string[] | any
}
declare class DateColumn extends React.Component<DateColumnProps, any> { }
export interface DateColumnProps {
	format: string
}
declare class NumberColumn extends React.Component<NumberColumnProps, any> { }
export interface NumberColumnProps {
	format?: string
}
declare class RowNumberer extends React.Component<RowNumbererProps, any> { }
export interface RowNumbererProps {
}
declare class TemplateColumn extends React.Component<TemplateColumnProps, any> { }
export interface TemplateColumnProps {
	align?: string
	cell?: any
	cell?: any
	computedWidth?: number
	dataIndex?: string
	defaultEditor?: any | Field
	defaultWidth?: number
	editable?: boolean
	editor?: any | string
	exportStyle?: any
	formatter?: string
	groupable?: boolean
	ignore?: boolean
	ignoreExport?: boolean
	renderer?: Function | string
	resizable?: boolean
	scope?: any
	sortable?: boolean
	summaryFormatter?: string
	summaryRenderer?: string | Function
	summaryType?: string | Function
	text?: string
	tpl?: string | string[] | any
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
}
declare class GridPanel extends React.Component<GridPanelProps, any> { }
export interface GridPanelProps {
	columns: any
	rowLines?: boolean
}
declare class Grid extends React.Component<GridProps, any> { }
export interface GridProps {
	hideHeaders?: boolean
	striped?: boolean
	title?: string
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
	backgroundCls?: string
	baseCls?: string
	imageCls?: string
	mode?: string
	src?: string
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
	highlightPath?: boolean
	micro?: boolean
}
declare class TreeListItem extends React.Component<TreeListItemProps, any> { }
export interface TreeListItemProps {
	rowCls?: string
	rowClsProperty?: string
}
declare class LoadMask extends React.Component<LoadMaskProps, any> { }
export interface LoadMaskProps {
	cls?: string
	indicator?: boolean
	message?: string
	messageCls?: string
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
	baseCls?: string | boolean
	bottom?: number | string
	defaultType?: string
	height?: number | string
	left?: number | string
	right?: number | string
	width?: number | string
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
	anchor?: boolean
	bodyBorder?: boolean
	bodyPadding?: number | boolean | string
	border?: boolean
	closable?: boolean
	closeAction?: string
	closeToolText?: string
	header?: boolean | any
	icon?: string
	iconCls?: string
	title?: string | any
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
	baseCls?: string | boolean
	title?: string
}
declare class Tool extends React.Component<ToolProps, any> { }
export interface ToolProps {
	handler?: Function | string
	iconCls?: string
	scope?: any
	stopEvent?: boolean
	toolOwner?: Component
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
	dayText?: string
	doneButton?: string | any
	monthText?: string
	slotOrder?: array
	slots?: array
	value?: any
	yearFrom?: number
	yearText?: string
	yearTo?: number
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
	clsGrandTotal?: string
	clsGroupTotal?: string
	enableColumnSort?: boolean
	enableLoadMask?: boolean
	leftAxisCellConfig?: any
	matrix: any
	record?: any
	startColGroupsCollapsed?: boolean
	startRowGroupsCollapsed?: boolean
	topAxisCellConfig?: any
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
}
declare class PivotConfigContainer extends React.Component<PivotConfigContainerProps, any> { }
export interface PivotConfigContainerProps {
	fieldType?: any
}
declare class PivotConfigPanel extends React.Component<PivotConfigPanelProps, any> { }
export interface PivotConfigPanelProps {
	panelAggFieldsText?: string
	panelAggFieldsTitle?: string
	panelAllFieldsText?: string
	panelAllFieldsTitle?: string
	panelLeftFieldsText?: string
	panelLeftFieldsTitle?: string
	panelTopFieldsText?: string
	panelTopFieldsTitle?: string
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
	allowThumbsOverlapping?: boolean
	animation?: boolean | any
	increment?: number
	maxValue?: number
	minValue?: number
	readOnly?: boolean
	thumbDefaults?: any
	value?: number | number[]
	valueIsArray?: boolean
	values?: number | number[]
}
declare class SliderField extends React.Component<SliderFieldProps, any> { }
export interface SliderFieldProps {
	increment?: number
	liveUpdate?: boolean
	maxValue?: number
	minValue?: number
	readOnly?: boolean
	tabIndex?: number
	value?: number | number[]
	values?: number | number[]
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
	tipTpl?: string | any
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
	activeTab?: number | string | Component
	baseCls?: string | boolean
	defaultTabUI?: string
}
declare class TabPanel extends React.Component<TabPanelProps, any> { }
export interface TabPanelProps {
	cls?: string | string[]
	layout?: any | string
	scroll?: boolean | string | any
	scrollable?: boolean | string | any
	tabBar?: any
	tabBarPosition?: string
}
declare class Tab extends React.Component<TabProps, any> { }
export interface TabProps {
	active?: boolean
	activeCls?: string
	baseCls?: string | boolean
	pressedCls?: string
	title?: string
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
	align?: string
	alignDelegate?: string
	allowOver?: boolean
	anchorToTarget?: boolean
	autoHide?: boolean
	delegate?: string
	dismissDelay?: number
	hideDelay?: number
	mouseOffset?: number[]
	quickShowInterval?: number
	showDelay?: number
	showOnTap?: boolean | string[]
	target?: Component | any
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
	nextButton?: any
	prevButton?: any
	sliderField?: any
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
	defaultType?: string
	docked?: string
	layout?: any | string
	minHeight?: string
	title?: string | Title
}
declare class TreeColumn extends React.Component<TreeColumnProps, any> { }
export interface TreeColumnProps {
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
	baseCls?: string | boolean
	controls?: boolean
	posterUrl?: string
	url?: string | array
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
	animation?: any | boolean
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
	data?: any[]
	defaultType?: string
	deferEmptyText?: boolean
	deselectOnContainerClick?: boolean
	emptyText?: string
	inline?: boolean | any
	itemCls?: string
	itemConfig?: any
	itemTpl?: string | string[] | any
	loadingText?: string | boolean
	maxItemCache?: number
	pressedDelay?: number
	scrollable?: boolean | string | any
	scrollToTopOnRefresh?: boolean
	store?: any
	triggerCtEvent?: string
	triggerEvent?: string
	useComponents?: boolean
}
declare class Widget extends React.Component<WidgetProps, any> { }
export interface WidgetProps {
	alwaysOnTop?: boolean | number
	baseCls?: string | boolean
	border?: boolean
	cls?: string | string[]
	constrainTo?: any
	flex?: number
	floated?: boolean
	height?: number | string
	hidden?: boolean
	id?: string
	itemId?: string
	relative?: boolean
	shadow?: boolean
	shim?: boolean
	style?: string | any
	toFrontOnShow?: boolean
	touchAction?: any
	ui?: string | string[]
	userCls?: string | string[]
	width?: number | string
	x?: number
	y?: number
}
declare class MessageBox extends React.Component<MessageBoxProps, any> { }
export interface MessageBoxProps {
	baseCls?: string | boolean
	buttons?: array | any
	buttonToolbar?: any
	defaultTextHeight?: number
	hideAnimation?: string | any
	iconCls?: string
	layout?: any | string
	message?: string
	msg?: string
	prompt?: any
	showAnimation?: string | any
	title?: string
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
declare class ActionSheet extends React.Component<ActionSheetProps, any> { }
export interface ActionSheetProps {
	baseCls?: string | boolean
	bottom?: number | string
	left?: number | string
	right?: number | string
}
declare class Audio extends React.Component<AudioProps, any> { }
export interface AudioProps {
	cls?: string | string[]
	url?: string
}
declare class CalendarTimeField extends React.Component<CalendarTimeFieldProps, any> { }
export interface CalendarTimeFieldProps {
}
declare class Carousel extends React.Component<CarouselProps, any> { }
export interface CarouselProps {
	baseCls?: string | boolean
	direction?: string
	draggable?: any
	indicator?: boolean
	ui?: string
}
declare class Carouselindicator extends React.Component<CarouselindicatorProps, any> { }
export interface CarouselindicatorProps {
	baseCls?: string | boolean
}
declare class Chart extends React.Component<ChartProps, any> { }
export interface ChartProps {
	flipXY?: boolean
}
declare class DataItem extends React.Component<DataItemProps, any> { }
export interface DataItemProps {
}
declare class IndexBar extends React.Component<IndexBarProps, any> { }
export interface IndexBarProps {
	direction?: string
	letters?: array
	listPrefix?: string
}
declare class ItemHeader extends React.Component<ItemHeaderProps, any> { }
export interface ItemHeaderProps {
}
declare class List extends React.Component<ListProps, any> { }
export interface ListProps {
	bufferSize?: number
	container?: any
	defaultType?: string
	disclosureProperty?: string
	grouped?: boolean
	indexBar?: boolean | any
	infinite?: boolean
	itemHeight?: number
	onItemDisclosure?: boolean | Function | string | any
	refreshHeightOnUpdate?: boolean
	scrollDock?: string
	useComponents?: boolean
	useSimpleItems?: boolean
}
declare class ListItem extends React.Component<ListItemProps, any> { }
export interface ListItemProps {
}
declare class ListItemBody extends React.Component<ListItemBodyProps, any> { }
export interface ListItemBodyProps {
}
declare class ListItemDisclosure extends React.Component<ListItemDisclosureProps, any> { }
export interface ListItemDisclosureProps {
}
declare class NestedList extends React.Component<NestedListProps, any> { }
export interface NestedListProps {
	allowDeselect?: boolean
	backButton?: any
	backText?: string
	baseCls?: string | boolean
	cardSwitchAnimation?: string | any | boolean
	detailCard?: Component
	detailContainer?: Container
	displayField?: string
	emptyText?: string
	itemHeight?: number
	layout?: string
	listConfig?: any
	loadingText?: string
	onItemDisclosure?: boolean | Function
	store?: any | string
	title?: string
	toolbar?: Toolbar | any | boolean
	updateTitleText?: boolean
	useSimpleItems?: boolean
	useTitleAsBackText?: boolean
	useToolbar?: boolean
	variableHeights?: boolean
}
declare class SimpleListItem extends React.Component<SimpleListItemProps, any> { }
export interface SimpleListItemProps {
	record?: any
}
declare class CheckboxInput extends React.Component<CheckboxInputProps, any> { }
export interface CheckboxInputProps {
}
declare class DatePickerField extends React.Component<DatePickerFieldProps, any> { }
export interface DatePickerFieldProps {
	dateFormat?: string
	destroyPickerOnHide?: boolean
	picker?: any
	value?: any
}
declare class DatePickerNativeField extends React.Component<DatePickerNativeFieldProps, any> { }
export interface DatePickerNativeFieldProps {
}
declare class EmailField extends React.Component<EmailFieldProps, any> { }
export interface EmailFieldProps {
	autoCapitalize?: boolean
	component?: any
}
declare class FileInput extends React.Component<FileInputProps, any> { }
export interface FileInputProps {
	me?: any
	newValue?: string
	value?: any
	value?: boolean
}
declare class Input extends React.Component<InputProps, any> { }
export interface InputProps {
	autoCapitalize?: boolean
	autoComplete?: boolean
	autoCorrect?: boolean
	checked?: boolean
	disabled?: boolean
	fastFocus?: boolean
	isFocused?: boolean
	maxLength?: number
	maxRows?: number
	maxValue?: number
	minValue?: number
	name?: string
	pattern?: string
	placeHolder?: string
	readOnly?: boolean
	startValue?: any
	stepValue?: number
	tabIndex?: number
	type?: string
	value?: any
}
declare class PasswordField extends React.Component<PasswordFieldProps, any> { }
export interface PasswordFieldProps {
	autoCapitalize?: boolean
	component?: any
	revealable?: boolean
	revealed?: boolean
}
declare class PasswordInput extends React.Component<PasswordInputProps, any> { }
export interface PasswordInputProps {
}
declare class RadioInput extends React.Component<RadioInputProps, any> { }
export interface RadioInputProps {
}
declare class SearchField extends React.Component<SearchFieldProps, any> { }
export interface SearchFieldProps {
}
declare class SelectField extends React.Component<SelectFieldProps, any> { }
export interface SelectFieldProps {
	autoSelect?: boolean
	displayField?: string | number
	hiddenName?: string
	name?: string
	options?: array
	selection?: any
	store?: any | string
	useClearIcon?: boolean
	valueField?: string | number
}
declare class SingleSliderField extends React.Component<SingleSliderFieldProps, any> { }
export interface SingleSliderFieldProps {
	value?: number
}
declare class TextAreaInput extends React.Component<TextAreaInputProps, any> { }
export interface TextAreaInputProps {
}
declare class TextInput extends React.Component<TextInputProps, any> { }
export interface TextInputProps {
}
declare class ToggleField extends React.Component<ToggleFieldProps, any> { }
export interface ToggleFieldProps {
	activeLabel?: string
	inactiveLabel?: string
	value?: boolean
}
declare class ClearTrigger extends React.Component<ClearTriggerProps, any> { }
export interface ClearTriggerProps {
}
declare class DateTrigger extends React.Component<DateTriggerProps, any> { }
export interface DateTriggerProps {
}
declare class ExpandTrigger extends React.Component<ExpandTriggerProps, any> { }
export interface ExpandTriggerProps {
}
declare class RevealTrigger extends React.Component<RevealTriggerProps, any> { }
export interface RevealTriggerProps {
}
declare class SearchTrigger extends React.Component<SearchTriggerProps, any> { }
export interface SearchTriggerProps {
}
declare class SpindownTrigger extends React.Component<SpindownTriggerProps, any> { }
export interface SpindownTriggerProps {
}
declare class SpinupTrigger extends React.Component<SpinupTriggerProps, any> { }
export interface SpinupTriggerProps {
}
declare class URLField extends React.Component<URLFieldProps, any> { }
export interface URLFieldProps {
	autoCapitalize?: boolean
	component?: any
}
declare class FormPanel extends React.Component<FormPanelProps, any> { }
export interface FormPanelProps {
	api?: any
	baseParams?: any
	enableSubmissionForm?: boolean
	enctype?: string
	method?: string
	multipartDetection?: boolean
	paramOrder?: string | string[]
	paramsAsHash?: boolean
	record?: any
	scrollable?: boolean | string | any
	standardSubmit?: boolean
	submitOnAction?: any
	timeout?: number
	trackResetOnLoad?: boolean
	url?: string
}
declare class BooleanCell extends React.Component<BooleanCellProps, any> { }
export interface BooleanCellProps {
	falseText?: string
	trueText?: string
	undefinedText?: string
}
declare class GridCell extends React.Component<GridCellProps, any> { }
export interface GridCellProps {
	formatter?: string
	renderer?: Function | string
	scope?: any
	tpl?: string | string[] | any
}
declare class CheckCell extends React.Component<CheckCellProps, any> { }
export interface CheckCellProps {
	disabled?: boolean
}
declare class DateCell extends React.Component<DateCellProps, any> { }
export interface DateCellProps {
	format?: string
}
declare class ExpanderCell extends React.Component<ExpanderCellProps, any> { }
export interface ExpanderCellProps {
}
declare class NumberCell extends React.Component<NumberCellProps, any> { }
export interface NumberCellProps {
	format?: string
}
declare class RownumbererCell extends React.Component<RownumbererCellProps, any> { }
export interface RownumbererCellProps {
}
declare class SummaryCell extends React.Component<SummaryCellProps, any> { }
export interface SummaryCellProps {
}
declare class TextCell extends React.Component<TextCellProps, any> { }
export interface TextCellProps {
	encodeHtml?: boolean
	rawValue?: string
	zeroValue?: string
}
declare class TreeCell extends React.Component<TreeCellProps, any> { }
export interface TreeCellProps {
	iconCls?: string
	iconClsProperty?: string
}
declare class WidgetCell extends React.Component<WidgetCellProps, any> { }
export interface WidgetCellProps {
	forceWidth?: boolean
	widget: any
}
declare class Column extends React.Component<ColumnProps, any> { }
export interface ColumnProps {
	align?: string
	cell?: any
	cell?: any
	computedWidth?: number
	dataIndex?: string
	defaultEditor?: any | Field
	defaultWidth?: number
	editable?: boolean
	editor?: any | string
	exportStyle?: any
	formatter?: string
	groupable?: boolean
	ignore?: boolean
	ignoreExport?: boolean
	renderer?: Function | string
	resizable?: boolean
	scope?: any
	sortable?: boolean
	summaryFormatter?: string
	summaryRenderer?: string | Function
	summaryType?: string | Function
	text?: string
	tpl?: string | string[] | any
}
declare class SelectionColumn extends React.Component<SelectionColumnProps, any> { }
export interface SelectionColumnProps {
	stopSelection?: string
}
declare class HeaderGroup extends React.Component<HeaderGroupProps, any> { }
export interface HeaderGroupProps {
	columns?: any[]
	hidden?: any
	text?: string
}
declare class GridHeaderGroup extends React.Component<GridHeaderGroupProps, any> { }
export interface GridHeaderGroupProps {
	columns?: any[]
	hidden?: any
	text?: string
}
declare class GridRow extends React.Component<GridRowProps, any> { }
export interface GridRowProps {
	body?: any
}
declare class RowBody extends React.Component<RowBodyProps, any> { }
export interface RowBodyProps {
}
declare class RowHeader extends React.Component<RowHeaderProps, any> { }
export interface RowHeaderProps {
}
declare class Tree extends React.Component<TreeProps, any> { }
export interface TreeProps {
}
declare class Img extends React.Component<ImgProps, any> { }
export interface ImgProps {
	backgroundCls?: string
	baseCls?: string
	imageCls?: string
	mode?: string
	src?: string
}
declare class Mask extends React.Component<MaskProps, any> { }
export interface MaskProps {
	baseCls?: string | boolean
	bottom?: any
	left?: any
	right?: any
	top?: any
	transparent?: boolean
}
declare class Media extends React.Component<MediaProps, any> { }
export interface MediaProps {
	autoPause?: boolean
	autoResume?: boolean
	enableControls?: boolean
	loop?: boolean
	media?: any
	muted?: boolean
	preload?: boolean
	url?: string
	volume?: number
}
declare class NavigationView extends React.Component<NavigationViewProps, any> { }
export interface NavigationViewProps {
	baseCls?: string | boolean
	defaultBackButtonText?: string
	layout?: any
	navigationBar?: boolean | any
	useTitleForBackButtonText?: boolean
}
declare class PanelHeader extends React.Component<PanelHeaderProps, any> { }
export interface PanelHeaderProps {
	glyph?: number | string
	icon?: string
	iconAlign?: string
	iconCls?: string
	title?: string | Title
	titleAlign?: string
}
declare class PanelTitle extends React.Component<PanelTitleProps, any> { }
export interface PanelTitleProps {
	glyph?: number | string
	icon?: string
	iconAlign?: string
	iconCls?: string
	text?: string
	textAlign?: string
}
declare class PanelTool extends React.Component<PanelToolProps, any> { }
export interface PanelToolProps {
	handler?: Function | string
	iconCls?: string
	scope?: any
	stopEvent?: boolean
	toolOwner?: Component
	type?: string
}
declare class Picker extends React.Component<PickerProps, any> { }
export interface PickerProps {
	baseCls?: string | boolean
	bottom?: number | string
	cancelButton?: string | any
	centered?: any
	doneButton?: string | any
	height?: number
	layout?: any | string
	left?: number | string
	right?: number | string
	slots?: array
	useTitles?: boolean
	value?: string | number
}
declare class PickerSlot extends React.Component<PickerSlotProps, any> { }
export interface PickerSlotProps {
	align?: string
	displayField?: string
	itemTpl?: string
	name: string
	scrollable?: any
	title?: string
	value?: number
	valueField?: string
}
declare class PivotGridCell extends React.Component<PivotGridCellProps, any> { }
export interface PivotGridCellProps {
}
declare class PivotGridGroupCell extends React.Component<PivotGridGroupCellProps, any> { }
export interface PivotGridGroupCellProps {
}
declare class PivotConfigform extends React.Component<PivotConfigformProps, any> { }
export interface PivotConfigformProps {
	hideAnimation?: string | any
}
declare class PivotRangeEditor extends React.Component<PivotRangeEditorProps, any> { }
export interface PivotRangeEditorProps {
}
declare class PivotGridRow extends React.Component<PivotGridRowProps, any> { }
export interface PivotGridRowProps {
}
declare class Sheet extends React.Component<SheetProps, any> { }
export interface SheetProps {
	centered?: boolean
	enter?: string
	exit?: string
	hideAnimation?: string | any
	modal?: boolean
	showAnimation?: string | any
	stretchX?: boolean
	stretchY?: boolean
}
declare class Thumb extends React.Component<ThumbProps, any> { }
export interface ThumbProps {
	baseCls?: string | boolean
	draggable?: any
	fillCls?: string
	fillTrack?: boolean | string
}
declare class ToggleSlider extends React.Component<ToggleSliderProps, any> { }
export interface ToggleSliderProps {
}
declare class Spacer extends React.Component<SpacerProps, any> { }
export interface SpacerProps {
	flex?: number
	width?: number
}
declare class TableCell extends React.Component<TableCellProps, any> { }
export interface TableCellProps {
}
declare class TableRow extends React.Component<TableRowProps, any> { }
export interface TableRowProps {
}
declare class Table extends React.Component<TableProps, any> { }
export interface TableProps {
}
declare class TitleBar extends React.Component<TitleBarProps, any> { }
export interface TitleBarProps {
	cls?: string | string[]
	defaultButtonUI?: string
	defaultType?: string
	layout?: any
	maxButtonWidth?: string
	minHeight?: string
	title?: string
	titleAlign?: string
}
declare class Map extends React.Component<MapProps, any> { }
export interface MapProps {
	baseCls?: string
	geo?: any
	map?: any
	mapListeners?: any
	mapOptions?: any
	useCurrentLocation?: boolean | any
}
declare class GoogleMap extends React.Component<GoogleMapProps, any> { }
export interface GoogleMapProps {
	baseCls?: string
	geo?: any
	map?: any
	mapListeners?: any
	mapOptions?: any
	useCurrentLocation?: boolean | any
}