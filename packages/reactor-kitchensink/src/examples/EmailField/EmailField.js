import React from 'react';
import { FormPanel, EmailField } from '@extjs/reactor/modern';

export default function EmailFieldExample() {
    return (
        <FormPanel shadow>
            <EmailField 
                width={250}
                placeholder="user@domain.com" 
                label="Email"
            />
        </FormPanel>
    )
}