import React from 'react';
import { FormPanel, URLField } from '@extjs/ext-react';

export default function UrlFieldExample() {
    return (
        <FormPanel shadow>
            <URLField placeholder="http://www.domain.com" label="URL" width="200"/>
        </FormPanel>
    )
} 