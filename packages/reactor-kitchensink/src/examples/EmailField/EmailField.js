import React from 'react';
import { FormPanel, EmailField } from '@extjs/reactor/modern';

export default function EmailFieldExample() {
    return (
        <FormPanel shadow={true}>
            <EmailField 
                placeHolder="me@sencha.com" 
                label="Email"
            />
        </FormPanel>
    )
}