import React from 'react';
import { FormPanel, UrlField } from '@extjs/reactor/modern';

export default function UrlFieldExample() {
    return (
        <FormPanel shadow={true}>
            <UrlField placeHolder="http://www.sencha.com" label="URL"/>
        </FormPanel>
    )
} 