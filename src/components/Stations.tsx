import React, { useEffect, useState } from 'react';
import { fetchStations } from '../helpers/ApiCallHelper';
import Station from './Station';

const Stations: React.FC = () => {

    const handleOnClick = async() => {
        // https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/EDB/KGX/#LiveDepResults
        alert(departureStationChoice + arrivalStationChoice);
    };

    const stationURLs = {
        Paddington: 'url',
                            
    };

    const stationList = [
        { id: 'PDT', name: 'Paddington' },
        { id: 'LST', name: 'Liverpool Street' },
        { id: 'KCX', name: 'Kings Cross' },
        { id: 'KTN', name: 'Kentish Town' },
        { id: 'LBG', name: 'London Bridge' },
    ];

    // let stationChoice: string;
    const [departureStationChoice, setDepartureStationChoices] = useState('');
    const [arrivalStationChoice, setArrivalStationChoices] = useState('');

    useEffect(() => {
        fetchStations()
            .then((value) => console.log(value))
            .catch((err) => console.log(err))
            .finally(() => console.log('finally'));
    }, []);

    return (
        <div className = "flex-container">
            <div>
                <label htmlFor = "departure stations">Select the departure station: </label>

                <select value = { departureStationChoice } name = "stations" id = "departure-stations" onChange = { (e) => setDepartureStationChoices(e.target.value) }> 
                    { stationList.map( (stationObj: {id: string; name: string}, index: number) => (<Station key = { index } id = { stationObj.id } name = { stationObj.name }/>)) }
                </select>
            </div>
            <div>
                <label htmlFor = "arrival stations"> Select the arrival station: </label>

                <select value = { arrivalStationChoice } name = "stations" id = "arrival-stations" onChange = { (e) => setArrivalStationChoices(e.target.value) }> 
                    { stationList.map( (stationObj: {id: string; name: string}) => (<Station key = { stationObj.id } id = { stationObj.id } name = { stationObj.name }/>)) }
                </select>
            </div>
            <br />
            <div>
                <button type = "button" id = "submitStation" onClick = { handleOnClick }>Submit</button>
            </div>
        </div>
    );
};

export default Stations;
