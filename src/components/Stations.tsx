import React, { useEffect, useState } from 'react';
import { fetchStations } from '../helpers/ApiCallHelper';
import Station from './Station';

const Stations: React.FC = () => {

    const stationURLs = {
        Paddington: 'url',
                            
    };

    // let stationChoice: string;
    const [stationChoice, setStationChoices] = useState();

    useEffect(() => {
        fetchStations()
            .then((value) => console.log(value))
            .catch((err) => console.log(err))
            .finally(() => console.log('finally'));
    }, []);

    console.log('hello world');

    return (
        <div>
            <label htmlFor = "stations">Select the station: </label>

            <select value = { stationChoice } name = "stations" id = "stations">
                <Station id = { 'PDT' } name = { 'Paddington' }/>
                <Station id = { 'LST' } name = { 'Liverpool Street' }/>
                <Station id = { 'KCX' } name = { 'Kings Cross' }/>
                <Station id = { 'KTN' } name = { 'Kentish Town' }/>
                <Station id = { 'LBG' } name = { 'London Bridge' }/>
            </select>
            <button type = "button" id = "submitStation">Submit</button>
        </div>
    );
};

export default Stations;
