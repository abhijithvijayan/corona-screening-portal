import React from 'react';
import { withFormik, Field, Form } from 'formik';

import api from '../../../api';
import { TextField } from '../../Input';
import * as endpoints from '../../../api/constants';
import { isValidAge } from '../../../util/validators';
import LocationAutoComplete from '../LocationAutoComplete';

const InnerForm = props => {
    const { values, dirty, handleChange, handleBlur, handleSubmit, handleReset, isSubmitting } = props;

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <h4>Name</h4>
                <Field name="name" type="text" component={TextField} onChange={handleChange} onBlur={handleBlur} />
            </div>
            <div>
                <h4>Age</h4>
                <Field name="age" type="number" component={TextField} onChange={handleChange} onBlur={handleBlur} />
            </div>

            <div>
                <h4>District</h4>
                <Field name="district" type="text" component={TextField} onChange={handleChange} onBlur={handleBlur} />
            </div>

            <div>
                <h4>Town</h4>
                <Field name="town" type="text" component={TextField} onChange={handleChange} onBlur={handleBlur} />
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
            age: '',
            district: '',
            town: '',
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
        if (values.age) {
            if (!isValidAge(values.age)) {
                errors.age = 'Enter a valid age';
            }
        }
        if (!values.district) {
            errors.district = 'Required';
        }
        if (!values.town) {
            errors.town = 'Required';
        }
        if (!values.location.value) {
            errors.location = 'Location Required';
        }
        // ToDo: add validator for `coordinates`

        return errors;
    },

    handleSubmit: async ({ name, age, district, town, location }, { setSubmitting }) => {
        const apiBody = {
            name,
            age,
            district,
            town,
            location,
        };

        try {
            const { data } = await api({
                method: 'POST',
                url: endpoints.SAVE_PATIENT_ENDPOINT,
                data: apiBody,
            });

            alert(data);
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
