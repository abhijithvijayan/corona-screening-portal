import React from 'react';
import styled from 'styled-components';

const StyledDashboard = styled.section`
    width: calc(100% - 17rem);
    margin-left: 17rem;
    transition: all 0.4s;
`;

const Dashboard = ({ children }) => {
    return (
        <div>
            <StyledDashboard>{children}</StyledDashboard>
        </div>
    );
};

export default Dashboard;
