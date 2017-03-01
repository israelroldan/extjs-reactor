import React from 'react';
import { FormPanel, DatePickerField } from '@extjs/reactor/modern';

export default function DatePickerFieldExample() {
    return (
        <FormPanel shadow>
            <DatePickerField 
                value={new Date()}
                destroyPickerOnHide
                label="Date"
                picker={{
                    yearFrom: 1990
                }}
            />
        </FormPanel>
    )
}