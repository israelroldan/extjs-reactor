import React from 'react';
import { FormPanel, PasswordField } from '@extjs/reactor/modern';

export default function PasswordFieldExample() {
    return (
        <FormPanel shadow={true}>
            <PasswordField 
                label="Password" 
                required={true} 
                revealable={true}
            />
        </FormPanel>
    )
}