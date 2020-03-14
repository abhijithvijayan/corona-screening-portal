/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { TextField } from '../Input';
import useScript from '../../util/asyncScriptLoader';

const mapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

const LocationAutoComplete = props => {
    const {
        form: { setFieldTouched, setFieldValue, setFieldError },
    } = props;
    // asynchronously load google maps
    const [loaded, error] = useScript(`https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places`);
    const { value: defaultValueObj, ...otherFieldProps } = props.field;
    const [address, setAddress] = useState(defaultValueObj);

    return (
        <>
            {loaded && !error ? (
                <PlacesAutocomplete
                    name={otherFieldProps.name}
                    value={address.value}
                    onChange={changed => {
                        setFieldTouched(`${otherFieldProps.name}.value`, true, true);
                        // update formik state
                        setFieldValue(otherFieldProps.name, {
                            value: changed,
                        });
                        setAddress({ value: changed });
                    }}
                    onSelect={async selected => {
                        try {
                            const results = await geocodeByAddress(selected);
                            const latLng = await getLatLng(results[0]);
                            // update formik state
                            setFieldValue(otherFieldProps.name, {
                                value: selected,
                                coordinates: latLng,
                            });
                            // update local state
                            setAddress({ value: selected });
                        } catch (err) {
                            return setFieldError(otherFieldProps.name, err);
                        }
                    }}
                    onError={err => {
                        return setFieldError(otherFieldProps.name, err);
                    }}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                        return (
                            <div>
                                <TextField
                                    spellCheck="false"
                                    {...otherFieldProps}
                                    {...props}
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input form-control',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }}
                </PlacesAutocomplete>
            ) : (
                <div>Script for the Google maps API not loaded!</div>
            )}
        </>
    );
};

export default LocationAutoComplete;
