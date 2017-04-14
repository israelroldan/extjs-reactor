import React from 'react';
import { FormPanel, TextAreaField } from '@extjs/ext-react';

export default function TextAreaFieldExample() {
    return (
        <FormPanel shadow>
            <TextAreaField 
                label="Description"
                width="300"
                maxRows={10}
            />
        </FormPanel>
    )
}