/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import DatePickerCmp from 'react-datepicker';

const DatePicker = props => {
    const {
        maxDate = null,
        minDate = null,
        field: { name, value },
        form: { setFieldTouched, setFieldValue },
        ...rest
    } = props;

    const maxDateObject = typeof maxDate === 'string' || maxDate instanceof String ? new Date() : maxDate || new Date();
    const minDateObject = typeof minDate === 'string' || minDate instanceof String ? null : minDate;

    return (
        <>
            <DatePickerCmp
                name={name}
                selected={value || null}
                minDate={minDateObject}
                maxDate={maxDateObject}
                autoComplete="off"
                dateFormat={['dd/MM/yyyy']}
                onChange={(changed = null) => {
                    setFieldTouched(name, true);
                    return setFieldValue(name, changed);
                }}
                {...rest}
            />
        </>
    );
};

export default DatePicker;
