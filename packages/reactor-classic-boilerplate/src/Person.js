import React, { Component } from 'react';

Ext.require([
    'Ext.button.Button'
]);

export default class Person extends Component {
    
    save() {
        const { name, email } = this.refs;

        this.props.onSave({ 
            id: this.props.person.id,
            name: name.getValue(),
            email: email.getValue()
        });
    }

    render() {
        const { person, onClose } = this.props;

        return (
            <x-window 
                key={person.id}
                height={500} 
                width={700} 
                title="Edit Person"
                autoShow={true}
                modal={true}
                layout="anchor"
                bodyPadding={20}
                onClose={onClose}
                buttons={[{
                    text: 'Save',
                    handler: this.save.bind(this)
                }]}
            >
                <x-textfield ref="name" fieldLabel="Name" value={person.name} anchor="100%"/>
                <x-textfield ref="email" fieldLabel="Email" value={person.email} anchor="100%"/>
            </x-window>
        )
    }

}