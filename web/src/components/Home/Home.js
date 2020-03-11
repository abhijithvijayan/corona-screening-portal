import React from 'react';
import styled from 'styled-components';

const StyledHome = styled.section`
    height: 80vh;
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        flex-direction: column;
        p {
            color: ${({ theme }) => {
                return theme.pink;
            }};
            font-size: 2em;
            font-weight: ${({ theme }) => {
                return theme.bold;
            }};
        }
    }
`;

const HomePage = () => {
    return (
        <div>
            <StyledHome>
                <div className="text-center">
                    <p>Hello World!</p>
                </div>
            </StyledHome>
        </div>
    );
};

export default HomePage;
