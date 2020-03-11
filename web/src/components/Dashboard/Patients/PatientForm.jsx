import React from 'react';
import { withFormik, Field, Form } from 'formik';

import { TextField } from '../../Input';
import { isValidAge } from '../../../util/validators';

const InnerForm = props => {
    const { values, dirty, handleChange, handleBlur, handleSubmit, handleReset, isSubmitting } = props;
    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <h4>Name</h4>
                <Field name="name" type="text" component={TextField} />
            </div>
            <div>
                <h4>Age</h4>
                <Field name="age" type="number" component={TextField} onChange={handleChange} onBlur={handleBlur} />
            </div>

            <button type="button" className="outline" onClick={handleReset} disabled={!dirty || isSubmitting}>
                Reset
            </button>

            <button type="submit" disabled={isSubmitting}>
                Save
            </button>
        </Form>
    );
};

const PatientForm = withFormik({
    mapPropsToValues: props => {
        return {
            name: '',
            age: '',
        };
    },

    // Custom sync validation
    validate: values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Required';
        }
        if (values.age) {
            if (!isValidAge(values.age)) {
                errors.age = 'Enter a valid age';
            }
        }

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        const payload = {
            ...values,
        };

        setTimeout(() => {
            alert(JSON.stringify(payload, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'PatientForm',
})(InnerForm);

export default PatientForm;
