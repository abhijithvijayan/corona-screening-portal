import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledSidebar = styled.div`
    background-color: ${({ theme }) => {
        return theme.black;
    }};
    color: ${({ theme }) => {
        return theme.white;
    }};
    min-width: 17rem;
    width: 17rem;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.4s;

    .child__wrapper {
        padding: 15px;

        .main__head {
            font-size: 30px;
        }

        ul {
            li {
                padding-bottom: 10px;
            }
        }

        a {
            color: white;
            font-size: 20px;
        }
    }
`;

const Sidebar = () => {
    return (
        <>
            <StyledSidebar>
                <div className="child__wrapper">
                    <h4 className="main__head">corona-screening-portal</h4>
                    <p>Home</p>
                    <ul>
                        <li>
                            <Link to="/patients">Patients</Link>
                        </li>
                        <li>
                            <Link to="/suspects">Suspects</Link>
                        </li>
                    </ul>
                    <Link to="/view/map"> Map Visualisation</Link>
                </div>
            </StyledSidebar>
        </>
    );
};

export default Sidebar;
