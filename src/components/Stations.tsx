import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { fetchQueryInformation } from '../helpers/ApiCallHelper';
import Station from './Station';

const Stations: React.FC = () => {

    const getCurrentDate = () => {
        const datetimeString = (new Date()).toISOString();
        return datetimeString.substring(0, datetimeString.length-1);
    };

    const handleOnClick = async() => {

        const params = new URLSearchParams({
            'originStation': departureStationChoice,
            'destinationStation': arrivalStationChoice,
            'noChanges': 'false',
            'numberOfAdults': '1',
            'numberOfChildren': '0',
            'journeyType': 'single',
            'outboundDateTime': getCurrentDate(),
            'outboundIsArriveBy': 'false',
        });

        fetchQueryInformation(params)
            .then(response => response.json())
            .then(data => data.outboundJourneys[0].tickets[0].priceInPennies)
            .then(value => alert(value))
            .then(() => alert(params.toString()))
            .catch(error => {
                alert('Error fetching data:' + error);
            })
            .finally(() => console.log(params.toString()));
    };

    const stationList = [
        { value: 'PAD', label: 'Paddington' },
        { value: 'LST', label: 'Liverpool Street' },
        { value: 'KGX', label: 'Kings Cross' },
        { value: 'KTN', label: 'Kentish Town' },
        { value: 'LBG', label: 'London Bridge' },
    ] as Array<{value: string; label: string}>;

    const [departureStationChoice, setDepartureStationChoices] = useState('');
    const [arrivalStationChoice, setArrivalStationChoices] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setDepartureStationChoices(event.target.value as string);
    };

    return (
        <div className = "station-wrapper">
            <div className = "dropdown-selections">
                <div>
                    <Box sx = { { minWidth: 180 } }>
                        <FormControl fullWidth>
                            <InputLabel id = "departure-stations-label" >Departure station</InputLabel>

                            <Select
                                labelId = "departure-stations-label"
                                id = "departure-stations"
                                value = { departureStationChoice }
                                label = "Departure station"
                                onChange = { (e: SelectChangeEvent) => (setDepartureStationChoices(e.target.value as string)) }
                            > 
                                { stationList.map((stationObj, index) => (
                                    // Station({ key: index, value: stationObj.value, label: stationObj.label })
                                    <MenuItem 
                                        key = { index } 
                                        value = { stationObj.value }
                                    >
                                        { stationObj.label }
                                    </MenuItem>
                                )) }
                            </Select>
                        </FormControl>
                    </Box>

                </div>
                <div>
                    <Box sx = { { minWidth: 180 } }>
                        <FormControl fullWidth>
                            <InputLabel id = "arrival-stations-label" >Arrival station</InputLabel>

                            <Select
                                labelId = "arrival-stations-label"
                                id = "arrival-stations"
                                value = { arrivalStationChoice }
                                label = "Arrival station"
                                onChange = { (e) => (setArrivalStationChoices(e.target.value as string)) }
                            > 
                                { stationList.map((stationObj, index) => (
                                    <MenuItem 
                                        key = { index } 
                                        value = { stationObj.value }
                                    >
                                        { stationObj.label }
                                    </MenuItem>
                                )) }
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>
            <button
                className = "button" 
                type = "button"
                onClick = { handleOnClick }
            >
                Submit
            </button>
        </div>
    );
};

export default Stations;
