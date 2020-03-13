import React from 'react';
import { withFormik, Field, Form } from 'formik';

import api from '../../../api';
import { TextField, SelectField, TextAreaField } from '../../Input';
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
                {/* change to textbox */}
                <Field
                    name="address"
                    type="text"
                    component={TextAreaField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            <div>
                <h4>Town</h4>
                <Field name="town" type="text" component={TextField} onChange={handleChange} onBlur={handleBlur} />
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

            <div>
                <h4>Category</h4>
                <Field
                    name="category"
                    options={[
                        { label: 'Primary', value: 1 },
                        { label: 'Secondary', value: 2 },
                    ]}
                    component={SelectField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            <div>
                <h4>Severity</h4>
                <Field
                    name="severity"
                    options={[
                        { label: 'High Risk', value: 1 },
                        { label: 'Low Risk', value: 0 },
                    ]}
                    component={SelectField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            {/* // ToDo: start date / end date // */}

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
    mapPropsToValues: ({
        defaultValues: { name, age, gender, address, town, phone, location, patient, category, severity },
    }) => {
        return {
            name,
            gender,
            age,
            address,
            town,
            phone,
            location,
            patient,
            category,
            severity,
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
        if (!values.patient) {
            errors.patient = 'Required';
        }
        if (!values.category) {
            errors.category = 'Required';
        }
        if (!values.severity) {
            errors.severity = 'Required';
        }

        // ToDo: add validator for `coordinates`

        return errors;
    },

    handleSubmit: async (
        { name, gender, age, address, town, phone, location, patient, category, severity },
        { setSubmitting, handleReset }
    ) => {
        const apiBody = {
            name,
            gender,
            age,
            address,
            town,
            phone,
            location,
            patientId: patient,
            category,
            severity,
            startDate: '2012-12-31T23:55:13Z',
            endDate: '2012-12-31T23:55:13Z',
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
