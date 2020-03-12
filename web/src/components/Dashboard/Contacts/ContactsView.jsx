import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ContactsForm from './ContactsForm';
import * as endpoints from '../../../api/constants';
import api from '../../../api';

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;

    form {
        width: 100%;
        padding: 10vh;
    }
`;

const ContactsView = () => {
    const [loading, setLoading] = useState(true);
    const [patientsList, setPatientsList] = useState([]);
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        age: '',
        district: '',
        town: '',
        patient: '',
    });

    useEffect(() => {
        async function getPatients() {
            try {
                const {
                    data: { data },
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

                const patientSelectFormOptions = data.list.map(item => {
                    return {
                        label: item.name,
                        value: item.id,
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
                {!loading && <ContactsForm defaultValues={defaultValues} patientsList={patientsList} />}
            </StyledWrapper>
        </>
    );
};

export default ContactsView;
