import React from 'react';
import { FormPanel, PasswordField } from '@extjs/ext-react';

export default function PasswordFieldExample() {
    return (
        <FormPanel shadow>
            <PasswordField
                width={200} 
                label="Password" 
                required 
                revealable
            />
        </FormPanel>
    )
}