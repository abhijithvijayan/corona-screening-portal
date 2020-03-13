import React from 'react';
import styled from 'styled-components';

import PatientsForm from './PatientForm';

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;

    h2 {
        text-align: center;
    }

    form {
        width: 100%;
        padding-top: 5vh;
    }
`;

const PatientsView = () => {
    return (
        <StyledWrapper>
            <h2>CORONA Patients</h2>

            <PatientsForm />
        </StyledWrapper>
    );
};

export default PatientsView;
