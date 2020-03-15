import React from 'react';
import { withFormik, Field, Form } from 'formik';

import api from '../../../api';
import DatePicker from '../DatePicker';
import * as endpoints from '../../../api/constants';
import { isValidAge } from '../../../util/validators';
import LocationAutoComplete from '../LocationAutoComplete';
import { TextField, SelectField, TextAreaField } from '../../Input';

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
                <h4>Date of First Contact</h4>
                <Field name="startDate" maxDate={values.endDate} component={DatePicker} />
            </div>

            <div>
                <h4>Date of Last Contact</h4>
                <Field name="endDate" minDate={values.startDate} maxDate={new Date()} component={DatePicker} />
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

            <button type="button" className="outline" onClick={handleReset} disabled={!dirty || isSubmitting}>
                Reset
            </button>

            <button type="submit" disabled={isSubmitting}>
                Save
            </button>
        </Form>
    );
};

const SuspectForm = withFormik({
    mapPropsToValues: ({
        defaultValues: {
            name,
            age,
            gender,
            address,
            town,
            phone,
            location,
            patient,
            startDate,
            endDate,
            category,
            severity,
        },
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
            startDate,
            endDate,
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
        if (!values.startDate) {
            errors.startDate = 'Required';
            // ToDo: add more validation to date
        }
        if (!values.endDate) {
            errors.endDate = 'Required';
            // ToDo: add more validation to date
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
        { name, gender, age, address, town, phone, location, patient, startDate, endDate, category, severity },
        { setSubmitting, resetForm }
    ) => {
        const apiBody = {
            name,
            gender: gender.value,
            age,
            address,
            town,
            phone,
            location,
            patientId: patient.value,
            startDate,
            endDate,
            categoryOfSuspect: category.value,
            severity: severity.value,
        };

        try {
            const { data } = await api({
                method: 'POST',
                url: endpoints.SAVE_SUSPECT_ENDPOINT,
                data: apiBody,
            });

            console.log('suspect saved');

            // ToDo: fix react-select fields not resetting issue
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

    displayName: 'SuspectForm',
})(InnerForm);

export default SuspectForm;
