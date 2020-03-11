import React from 'react';

import PatientsForm from './PatientForm';

const PatientsView = () => {
    return (
        <>
            <div>Patients View Here you can add a patient using a button and view all the patients down below</div>

            <PatientsForm />
        </>
    );
};

export default PatientsView;
