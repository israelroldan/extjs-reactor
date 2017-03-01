import React from 'react';
import { FormPanel, PasswordField } from '@extjs/reactor/modern';

export default function PasswordFieldExample() {
    return (
        <FormPanel shadow>
            <PasswordField 
                label="Password" 
                required 
                revealable
            />
        </FormPanel>
    )
}