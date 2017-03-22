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
    Container,
    Label,
    Toolbar
} from '@extjs/reactor/modern';

Ext.require('Ext.field.InputMask'); // need to require this specifically for inputMask props to work

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
            <FormPanel ref="form" shadow height="100%" width="100%">
                <FieldSet disabled={disabled} ref="personal" title="Personal Info">
                    <TextField {...defaults} label="Name" required placeholder="This field is required"/>
                    <PasswordField {...defaults} label="Password" required revealable/>
                    <EmailField {...defaults} label="Email" placeholder="me@sencha.com"/>
                    <TextField {...defaults} label="Phone Number" inputMask="(999) 999-9999" inputType="tel"/>
                    <UrlField {...defaults} label="URL" placeholder="http://sencha.com"/>
                    <SpinnerField label="Spinner" minValue={0} maxValue={0} stepValue={1} cycle margin="15 0 0 0"/>
                    <DatePickerField {...defaults} label="Start Date"/>
                    <SelectField {...defaults} label="Rank"
                        options={[
                            { text: 'Master', value: 'master' },
                            { text: 'Journeyman', value: 'journeyman' },
                            { text: 'Apprentice', value: 'apprentice' }
                        ]}
                    />
                    <TextField {...defaults} label="With Error" errorMessage="This field is invalid" errorTarget="under"/>
                    <SliderField label="Slider"/>
                    <ToggleField label="Toggle"/>
                    <TextAreaField label="Bio" maxRows={5}/>
                </FieldSet>
                <FieldSet title="Roles" layout={{type: 'vbox', align: 'left'}} margin="15 0">
                    <CheckBoxField boxLabel="Admin"/>
                    <CheckBoxField boxLabel="Power User"/>
                </FieldSet>
                <FieldSet disabled={disabled} title="Favorite Color" layout={{type: 'vbox', align: 'left'}}>
                    <RadioField {...radioProps} boxLabel="Red" value="red"/>
                    <RadioField {...radioProps} boxLabel="Blue" value="blue"/>
                    <RadioField {...radioProps} boxLabel="Green" value="green"/>
                    <RadioField {...radioProps} boxLabel="Purple" value="purple"/>
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