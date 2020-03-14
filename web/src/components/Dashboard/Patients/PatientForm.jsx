import React from 'react';
import { withFormik, Field, Form } from 'formik';

import api from '../../../api';
import { TextField, SelectField, TextAreaField } from '../../Input';
import * as endpoints from '../../../api/constants';
import { isValidAge } from '../../../util/validators';
import LocationAutoComplete from '../LocationAutoComplete';

const InnerForm = props => {
    const { values, dirty, handleChange, handleBlur, handleSubmit, handleReset, isSubmitting } = props;

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <h4>Name</h4>
                <Field
                    name="name"
                    type="text"
                    spellCheck="false"
                    component={TextField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                />
            </div>

            <div>
                <h4>Gender</h4>
                <Field
                    name="gender"
                    options={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                        { label: 'Other', value: 'other' },
                    ]}
                    component={SelectField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            <div>
                <h4>Age</h4>
                <Field
                    name="age"
                    type="number"
                    component={TextField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                />
            </div>

            <div>
                <h4>Address</h4>
                <Field
                    name="address"
                    type="text"
                    spellCheck="false"
                    component={TextAreaField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            <div>
                <h4>Town</h4>
                <Field
                    name="town"
                    type="text"
                    spellCheck="false"
                    component={TextField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            <div>
                <h4>Phone</h4>
                <Field
                    name="phone"
                    type="number"
                    autoComplete="off"
                    component={TextField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            <div>
                <h4>Location</h4>
                <Field name="location" component={LocationAutoComplete} value={values.location} />
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
            gender: '',
            age: '',
            address: '',
            town: '',
            phone: '',
            location: {
                value: '',
                coordinates: null,
            },
        };
    },

    // Custom sync validation
    validate: values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Required';
        }
        if (!values.gender) {
            errors.gender = 'Required';
        }
        if (values.age) {
            if (!isValidAge(values.age)) {
                errors.age = 'Enter a valid age';
            }
        }
        if (!values.address) {
            errors.address = 'Required';
        }
        if (!values.town) {
            errors.town = 'Required';
        }
        if (!values.phone) {
            errors.phone = 'Required';
        }
        if (!values.location.value) {
            errors.location = 'Location Required';
        }

        // ToDo: add validator for `coordinates`

        return errors;
    },

    handleSubmit: async ({ name, gender, age, address, town, phone, location }, { setSubmitting, resetForm }) => {
        const apiBody = {
            name,
            gender: gender.value,
            age,
            address,
            town,
            phone,
            location,
        };

        try {
            const { data } = await api({
                method: 'POST',
                url: endpoints.SAVE_PATIENT_ENDPOINT,
                data: apiBody,
            });

            console.log('patient saved');

            // reset form
            resetForm();
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    //
                }
            }

            // error
        }

        setSubmitting(false);
    },

    displayName: 'PatientForm',
})(InnerForm);

export default PatientForm;
