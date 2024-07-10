import React, { useEffect, useState } from 'react';
import { fetchStations } from '../helpers/ApiCallHelper';
import Station from './Station';

const Stations: React.FC = () => {
    const getCurrentDate = () => {
        const datetimeString = (new Date()).toISOString();
        return datetimeString.substring(0, datetimeString.length-1);
    };

    const handleOnClick = async() => {
        const baseUrl = 'https://mobile-api-softwire2.lner.co.uk/v1/fares?';
        const trailingUrl = '&noChanges=false&numberOfAdults=1&numberOfChildren=0&journeyType=single&outboundDateTime=' + getCurrentDate() + '&outboundIsArriveBy=false';
        const url = baseUrl + 'originStation=' + departureStationChoice + '&destinationStation=' + arrivalStationChoice + trailingUrl;

        fetch(url, {
            headers: {
                'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
            }, 
        })
            .then(response => response.json())
            .then(data => data.outboundJourneys[0].tickets)
            .then((tickets: Array<{priceInPennies: number}>) => {
                setTicketPriceList([]);
                const tempList = [];
                for (const ticket of tickets) {
                    // const ticketPrice = ticket.priceInPennies;
                    tempList.push(ticket.priceInPennies);
                }
                setTicketPriceList(tempList);
            })
            .catch(error => {
                alert('Error fetching data:' + error);
            });
    };

    // const displayValues = (journeys: string) => {
    //     console.log(journeys);      
        
    // };

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
    const [ticketPriceList, setTicketPriceList] = useState([] as Array<number>);

    // useEffect(() => {
    //  fetchStations()
    // .then(response => response.json())
    // .then(list => list.stations[0].id)
    // .then((value) => alert(value))
    // .catch((err) => alert(err))
    // .finally(() => alert('finally'));
    // }, []);

    return (
        <div>
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
            <div>
                <ul id = "ticketPrice" className = "scrollable-ul">
                    { ticketPriceList.map( (price: number, index: number) => (<li key = { index }>{price}</li>)) }
                </ul>
            </div>
        </div>
        
    );
};

export default Stations;
