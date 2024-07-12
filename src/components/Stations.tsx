import React, { useState } from 'react';
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
        { id: 'PAD', name: 'Paddington' },
        { id: 'LST', name: 'Liverpool Street' },
        { id: 'KGX', name: 'Kings Cross' },
        { id: 'KTN', name: 'Kentish Town' },
        { id: 'LBG', name: 'London Bridge' },
    ];

    const [departureStationChoice, setDepartureStationChoices] = useState('PAD');
    const [arrivalStationChoice, setArrivalStationChoices] = useState('PAD');

    return (
        <div className = "station-wrapper">
            <div className = "dropdown-selections">
                <div>
                    <label htmlFor = "departure stations">Select the departure station: </label>

                    <select value = { departureStationChoice } id = "departure-stations" onChange = { (e) => setDepartureStationChoices(e.target.value) }> 
                        { stationList.map( (stationObj: {id: string; name: string}, index: number) => (<Station key = { index } id = { stationObj.id } name = { stationObj.name }/>)) }
                    </select>
                </div>
                <div>
                    <label htmlFor = "arrival stations"> Select the arrival station: </label>

                    <select value = { arrivalStationChoice } id = "arrival-stations" onChange = { (e) => setArrivalStationChoices(e.target.value) }> 
                        { stationList.map( (stationObj: {id: string; name: string}) => (<Station key = { stationObj.id } id = { stationObj.id } name = { stationObj.name }/>)) }
                    </select>
                </div>
            </div>
            <button className = "button" type = "button" onClick = { handleOnClick } >Submit</button>
        </div>
    );
};

export default Stations;
