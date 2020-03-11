/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
    height: 35px;
    padding: 0px 10px;
    width: 100%;
    margin: 0px;
    border-radius: 5px;
    background-color: rgb(245, 245, 245);

    option {
        background-color: rgb(245, 245, 245);
    }
`;

export const SelectField = ({ options, label, field, form: { touched, errors }, ...props }) => {
    return (
        <>
            <label htmlFor={field.name}>{label}</label>
            <div style={{ padding: '0px' }}>
                <StyledSelect {...field} {...props}>
                    {options.map(({ option, value, disabled = false }, index) => {
                        return (
                            <option value={value} disabled={disabled} key={index}>
                                {option}
                            </option>
                        );
                    })}
                </StyledSelect>
            </div>

            {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
        </>
    );
};

const StyledInput = styled.input`
    height: 35px;
    width: 100%;
    margin: 0px;
    border-radius: 5px;
    padding: 0px 10px !important;
    background-color: #ebebeb;
`;

export const TextField = ({ label, field, form: { touched, errors }, ...props }) => {
    return (
        <>
            <label htmlFor={field.name}>{label}</label>
            <StyledInput {...field} {...props} />

            {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
        </>
    );
};

export const CheckBox = ({ label, field, form, ...props }) => {
    return (
        <>
            <label htmlFor={field.name}>{label}</label>
            <StyledInput
                type="checkbox"
                checked={field.value}
                onChange={(): void => {
                    form.setFieldValue(field.name, !field.value);
                }}
                {...field}
                {...props}
            />
        </>
    );
};
