import React, { Component } from 'react';
import { Dialog, TextField, Button, FormPanel } from '@extjs/reactor/modern';

export default class Person extends Component {
    
    state = {
        displayed: false,
        dirty: false
    }

    componentDidMount() {
        this.setState({ displayed: true });
    }

    save = () => {
        const { name, email } = this.form.getValues();

        this.props.onSave({ 
            id: this.props.person.id,
            name,
            email
        });
    }

    onClose = () => {
        this.props.onClose();
    }

    onCancel = () => {
        this.setState({ displayed: false });
    }

    onValueChange = () => {
        const dirty = !Ext.Object.equals(
            this.props.person,
            { id: this.props.person.id, ...this.form.getValues() }
        );

        this.setState({ dirty })
    }

    render() {
        const { person, onClose } = this.props;
        const { dirty } = this.state;

        return (
            <Dialog 
                displayed={this.state.displayed}
                title={`Edit ${person.name}`}
                closable
                closeAction="hide"
                maskTapHandler={this.onCancel}
                bodyPadding="20"
                width="350"
                onHide={this.onClose}
                iconCls="x-fa fa-user-o"
            >
                <FormPanel ref={form => this.form = form} padding={0}>
                    <TextField 
                        name="name" 
                        label="Name" 
                        value={person.name} 
                        onChange={this.onValueChange}
                    />
                    <TextField 
                        name="email" 
                        label="Email" 
                        value={person.email} 
                        onChange={this.onValueChange}
                    />
                </FormPanel>
                <Button text="Cancel" handler={this.onCancel} margin="0 10 0 0"/>
                <Button text="Save Changes" disabled={!dirty} ui="action" handler={this.save}/>
            </Dialog>
        )
    }

}