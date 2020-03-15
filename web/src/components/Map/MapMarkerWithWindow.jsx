/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';

const CustomStyledMarker = styled.div`
    cursor: pointer;

    .pin {
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        background: #00cae9;
        position: absolute;
        transform: rotate(-45deg);
        left: 50%;
        top: 50%;
        margin: -20px 0 0 -20px;

        &:after {
            content: '';
            width: 14px;
            height: 14px;
            margin: 8px 0 0 8px;
            background: #e6e6e6;
            position: absolute;
            border-radius: 50%;
        }
    }
    .bounce {
        animation-name: bounce;
        animation-fill-mode: both;
        animation-duration: 1s;
    }
    .pulse {
        background: #d6d4d4;
        border-radius: 50%;
        height: 14px;
        width: 14px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: 11px 0px 0px -12px;
        transform: rotateX(55deg);
        z-index: -2;

        &:after {
            content: '';
            border-radius: 50%;
            height: 40px;
            width: 40px;
            position: absolute;
            margin: -13px 0 0 -13px;
            animation: pulsate 1s ease-out;
            animation-iteration-count: infinite;
            opacity: 0;
            box-shadow: 0 0 1px 2px #00cae9;
            animation-delay: 1.1s;
        }
    }
    .popup {
        z-index: 1;
        color: rgba(0, 0, 0, 0.54);
        font-size: 12px;
        background-color: white;
        font-weight: 500;
        min-width: 250px;
        font-family: ${({ theme }) => {
            return theme.roboto;
        }};
        padding: 15px 20px;
        left: -13px;
        bottom: 26px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 5px;
        max-width: 375px;
        position: absolute;

        .close {
            position: absolute;
            padding: 10px;
            right: 0px;
            top: 0px;
            width: 14px;
            height: 14px;
            opacity: 0.3;

            &:hover {
                opacity: 1;
            }
        }

        &__head {
            line-height: 20px;
            margin-bottom: 15px;
            font-weight: ${({ theme }) => {
                return theme.bold;
            }};

            span {
                color: rgba(0, 0, 0, 0.87);
                font-size: 20px;
            }
        }

        &__body {
            div {
                padding-top: 2px;
                padding-bottom: 3px;
            }

            .subtitle {
                font-size: 14px;
            }

            .contact {
                display: flex;
                align-items: center;

                .body {
                    padding-top: 9px;
                    margin-left: 7px;
                }
            }

            .svg__icon {
                width: 11px;
                height: 11px;
            }

            .coordinates {
                margin-top: 10px;
                border-top: 1px solid black;
                padding-top: 9px;
                display: flex;
                align-items: center;

                &__body {
                    margin-left: 7px;
                    margin-top: 3px;
                }
            }
        }
    }

    @keyframes pulsate {
        0% {
            transform: scale(0.1, 0.1);
            opacity: 0;
        }

        50% {
            opacity: 1;
        }

        100% {
            transform: scale(1.2, 1.2);
            opacity: 0;
        }
    }

    @keyframes bounce {
        0% {
            opacity: 0;
            transform: translateY(-2000px) rotate(-45deg);
        }

        60% {
            opacity: 1;
            transform: translateY(30px) rotate(-45deg);
        }

        80% {
            transform: translateY(-10px) rotate(-45deg);
        }

        100% {
            transform: translateY(0) rotate(-45deg);
        }
    }
`;

const MapMarker = ({
    lat,
    lng,
    personId,
    name,
    age,
    gender,
    address,
    town,
    phone,
    color,
    activeMarkerId,
    onMarkerClick,
}) => {
    return (
        <CustomStyledMarker>
            <div
                onClick={() => {
                    return onMarkerClick(personId);
                }}
                className="pin bounce"
                style={{ backgroundColor: color, cursor: 'pointer' }}
                title={personId}
            />
            {activeMarkerId === personId && (
                <>
                    <div className="pulse" />
                    <div className="popup">
                        <Icon
                            name="close"
                            onClick={() => {
                                return onMarkerClick('');
                            }}
                            className="close"
                        />
                        <div className="popup__head">
                            <span>{personId}</span>
                        </div>
                        <div className="popup__body">
                            <div className="subtitle">{name}</div>
                            <div>
                                {age} {gender}
                            </div>
                            <div>
                                {address} {town}
                            </div>
                            <div className="contact">
                                <Icon name="mobile" className="svg__icon" />
                                <div className="body">{phone}</div>
                            </div>
                            <div className="coordinates">
                                <Icon name="map_marker" className="svg__icon" />
                                <span className="coordinates__body">{`${lat}, ${lng}`}</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </CustomStyledMarker>
    );
};

export default MapMarker;
