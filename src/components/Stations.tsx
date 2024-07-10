import React, { useEffect, useState } from 'react';
import { fetchStations } from '../helpers/ApiCallHelper';
import Station from './Station';

const Stations: React.FC = () => {

    const handleOnClick = async() => {
        window.location.href = 'https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/' + 
        departureStationChoice + '/' +
        arrivalStationChoice + '/#LiveDepResults';
    };

    const stationList = [
        { id: 'PAD', name: 'Paddington' },
        { id: 'LST', name: 'Liverpool Street' },
        { id: 'KGX', name: 'Kings Cross' },
        { id: 'KTN', name: 'Kentish Town' },
        { id: 'LBG', name: 'London Bridge' },
    ];

    // let stationChoice: string;
    const [departureStationChoice, setDepartureStationChoices] = useState('PAD');
    const [arrivalStationChoice, setArrivalStationChoices] = useState('PAD');

    useEffect(() => {
        fetchStations()
            .then((value) => console.log(value))
            .catch((err) => console.log(err))
            .finally(() => console.log('finally'));
    }, []);

    return (
        <div className = "station-wrapper">
            <div className = "dropdown-selections">
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
            </div>
            <button className = "button" type = "button" id = "submitStation" onClick = { handleOnClick } >Submit</button>
        </div>
    );
};

export default Stations;
