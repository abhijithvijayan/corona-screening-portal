import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SuspectForm from './SuspectForm';
import * as endpoints from '../../../api/constants';
import api from '../../../api';

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

const ContactsView = () => {
    const [loading, setLoading] = useState(true);
    const [patientsList, setPatientsList] = useState([]);
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        age: '',
        gender: '',
        address: '',
        town: '',
        phone: '',
        location: {
            value: '',
            coordinates: null,
        },
        patient: '',
        startDate: '',
        endDate: '',
        category: '',
        severity: '',
    });

    useEffect(() => {
        async function getPatients() {
            try {
                const {
                    data: { persons },
                } = await api({
                    method: 'POST',
                    url: endpoints.GET_PERSONS_ENDPOINT,
                    data: {
                        category: 'patient',
                    },
                });

                // const defaultFormValues = {
                //     name: defaultValues.name,
                //     age: defaultValues.age,
                //     district: defaultValues.district,
                //     town: defaultValues.town,
                //     patient: defaultValues.patient,
                // };

                const patientSelectFormOptions = persons.map(item => {
                    return {
                        label: item.name,
                        value: item.id.replace(/Pta \/ cov \/ /g, ''),
                    };
                });

                setPatientsList(patientSelectFormOptions || []);
                // setDefaultValues(defaultFormValues);
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 404) {
                        //
                    }
                }
            } finally {
                setLoading(false);
            }
        }

        getPatients();
    }, [defaultValues.name, defaultValues.age, defaultValues.district, defaultValues.town, defaultValues.patient]);

    return (
        <>
            <StyledWrapper>
                <h2>CORONA Suspects</h2>

                {!loading && <SuspectForm defaultValues={defaultValues} patientsList={patientsList} />}
            </StyledWrapper>
        </>
    );
};

export default ContactsView;
