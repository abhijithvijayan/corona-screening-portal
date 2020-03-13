import React from 'react';
import { withFormik, Field, Form } from 'formik';

import api from '../../../api';
import { TextField, SelectField } from '../../Input';
import { isValidAge } from '../../../util/validators';
import * as endpoints from '../../../api/constants';
import LocationAutoComplete from '../LocationAutoComplete';

// ToDo: add auto search location field

const InnerForm = props => {
    const { dirty, handleChange, handleBlur, handleSubmit, handleReset, isSubmitting, patientsList, values } = props;

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <h4>Name</h4>
                <Field
                    name="name"
                    type="text"
                    component={TextField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
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

            <div>
                <h4>Patient in contact with</h4>
                <Field
                    name="patient"
                    options={patientsList}
                    component={SelectField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
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

const ContactsForm = withFormik({
    mapPropsToValues: ({ defaultValues: { name, age, district, town, patient } }) => {
        return {
            name,
            age,
            district,
            town,
            patient,
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
        if (!values.patient) {
            errors.patient = 'Required';
        }
        if (!values.location.value) {
            errors.location = 'Location Required';
        }
        // ToDo: add validator for `coordinates`

        return errors;
    },

    handleSubmit: async ({ name, age, district, town, patient }, { setSubmitting, handleReset }) => {
        const apiBody = {
            name,
            age,
            district,
            town,
            patientId: patient,
            startDate: '2012-12-31T23:55:13Z',
            endDate: '2012-12-31T23:55:13Z',
            modeOfContact: 1,
            typeOfContact: 'Community',
            severity: 0,
        };

        try {
            const { data } = await api({
                method: 'POST',
                url: endpoints.SAVE_CONTACT_ENDPOINT,
                data: apiBody,
            });

            console.log('contact saved');

            // reset form
            handleReset();
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

    displayName: 'ContactsForm',
})(InnerForm);

export default ContactsForm;
