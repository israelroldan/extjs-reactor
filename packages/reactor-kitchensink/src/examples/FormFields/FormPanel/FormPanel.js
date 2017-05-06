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
} from '@extjs/ext-react';

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
                <FieldSet disabled={disabled} ref="personal" title="Personal Info" defaults={{labelAlign: "placeholder"}}>
                    <TextField label="Name" required placeholder="This field is required"/>
                    <PasswordField label="Password" required revealable/>
                    <EmailField label="Email" placeholder="me@sencha.com"/>
                    <TextField label="Phone Number" inputMask="(999) 999-9999" inputType="tel"/>
                    <UrlField label="URL" placeholder="http://sencha.com"/>
                    <SpinnerField label="Spinner" minValue={0} maxValue={1000} stepValue={1} cycle margin="15 0 0 0" labelAlign="top"/>
                    <DatePickerField label="Start Date"/>
                    <SelectField label="Rank"
                        options={[
                            { text: 'Master', value: 'master' },
                            { text: 'Journeyman', value: 'journeyman' },
                            { text: 'Apprentice', value: 'apprentice' }
                        ]}
                    />
                    <TextField label="With Error" errorMessage="This field is invalid" errorTarget="under"/>
                    <SliderField label="Slider"/>
                    <ToggleField label="Toggle"/>
                    <TextAreaField label="Bio" maxRows={5}/>
                </FieldSet>
                <FieldSet title="Roles" layout={{type: 'vbox', align: 'left'}} margin="15 0" defaults={{labelAlign: "placeholder"}}>
                    <CheckBoxField boxLabel="Admin"/>
                    <CheckBoxField boxLabel="Power User"/>
                </FieldSet>
                <FieldSet 
                    disabled={disabled} 
                    title="Favorite Color" 
                    layout={{ type: 'vbox', align: 'left' }} 
                    defaults={{
                        labelAlign: "placeholder",
                        name: 'color',
                        labelAlign: 'right',
                        labelWidth: 'auto'
                    }}
                >
                    <RadioField boxLabel="Red" value="red"/>
                    <RadioField boxLabel="Blue" value="blue"/>
                    <RadioField boxLabel="Green" value="green"/>
                    <RadioField boxLabel="Purple" value="purple"/>
                </FieldSet>
                <Toolbar docked="bottom">
                    <Button ui="action" text={disabled ? 'Enable All' : 'Disable All'} margin="0 10 0 0" handler={this.toggleDisabled.bind(this)}/>
                    <Button ui="action" text="Reset" handler={() => this.refs.form.reset()}/>
                </Toolbar>
            </FormPanel>
        );
    }
}