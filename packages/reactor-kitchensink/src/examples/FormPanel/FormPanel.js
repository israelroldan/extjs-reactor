import React, { Component } from 'react';

import { 
    FieldSet,
    FormPanel, 
    UrlField, 
    TextField, 
    EmailField, 
    RadioField, 
    TextAreaField, 
    ToggleField, 
    SliderField, 
    DatePickerField, 
    PasswordField,
    SpinnerField,
    CheckBoxField,
    Button,
    SelectField,
    Toolbar
} from '@extjs/reactor/modern';

export default class FormPanelExample extends Component {
    constructor() {
        super();

        this.state = {
            disabled: false
        };
    }

    toggleDisabled() {
        this.setState({ disabled: !this.state.disabled });
    }

    render() {
        const { disabled } = this.state;
        
        return (
            <FormPanel ref="form" shadow={true}>
                <FieldSet disabled={disabled} ref="personal" title="Personal Info" layout={{ type: 'vbox', align: 'stretch' }} instructions="Please enter the information above.">
                    <TextField {...defaults} label="Name" required={true}/>
                    <PasswordField {...defaults} label="Password" required={true} revealable={true}/>
                    <EmailField {...defaults} label="Email" placeHolder="me@sencha.com"/>
                    <UrlField {...defaults} label="URL" placeHolder="http://sencha.com"/>
                    <SpinnerField label="Spinner" minValue={0} maxValue={0} stepValue={1} cycle={true} margin="15 0 0 0"/>
                    <CheckBoxField label="Active"/>
                    <DatePickerField {...defaults} label="Start Date"/>
                    <SelectField {...defaults} label="Rank"
                        options={[
                            { text: 'Master', value: 'master' },
                            { text: 'Journeyman', value: 'journeyman' },
                            { text: 'Apprentice', value: 'apprentice' }
                        ]}
                    />
                    <SliderField label="Slider"/>
                    <ToggleField label="Toggle"/>
                    <TextAreaField label="Bio" maxRows={5}/>
                </FieldSet>
                <FieldSet disabled={disabled} title="Favorite Color" layout={{type: 'vbox', align: 'left'}}>
                    <RadioField {...radioProps} label="Red" value="red"/>
                    <RadioField {...radioProps} label="Blue" value="blue"/>
                    <RadioField {...radioProps} label="Green" value="green"/>
                    <RadioField {...radioProps} label="Purple" value="purple"/>
                </FieldSet>
                <Toolbar docked="bottom">
                    <Button ui="action" text={disabled ? 'Enable All' : 'Disable All'} margin="0 10 0 0" handler={this.toggleDisabled.bind(this)}/>
                    <Button ui="action" text="Reset" handler={() => this.refs.form.reset()}/>
                </Toolbar>
            </FormPanel>
        );
    }
}

const defaults = {
    labelAlign: "placeholder"
};

const radioProps = {
    name: 'color',
    labelAlign: 'right',
    labelWidth: 'auto'
};