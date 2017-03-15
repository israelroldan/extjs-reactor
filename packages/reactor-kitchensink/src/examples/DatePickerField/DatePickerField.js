import React from 'react';
import { Container, FormPanel, DatePickerField } from '@extjs/reactor/modern';

export default function DatePickerFieldExample() {
    return (
        <Container layout="center">
            <FormPanel shadow>
                <DatePickerField 
                    width={150}
                    value={new Date()}
                    destroyPickerOnHide
                    label="Date"
                    picker={{
                        yearFrom: 1990
                    }}
                />
            </FormPanel>
        </Container>
    )
}