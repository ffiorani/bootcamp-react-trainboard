import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { fetchQueryInformation } from '../helpers/ApiCallHelper';
import Station from './Station';
import { StationDropdown } from './StationDropdown';

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

    const [departureStationChoice, setDepartureStationChoices] = useState('');
    const [arrivalStationChoice, setArrivalStationChoices] = useState('');

    return (
        <div className = "station-wrapper">
            <div className = "dropdown-selections">
                <div>
                    <StationDropdown 
                        stationChoice = { departureStationChoice }
                        setStationChoice = { setDepartureStationChoices }
                        inputLabel = "Departure station"
                        id = "departure-stations"  
                    /> 
                </div>
                <div>
                    <StationDropdown 
                        stationChoice = { arrivalStationChoice }
                        setStationChoice = { setArrivalStationChoices }
                        inputLabel = "Arrival station"
                        id = "arrival-stations"                    
                    />
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
