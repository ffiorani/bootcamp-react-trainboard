export const fetchStations = () => {
    return fetch('https://mobile-api-softwire2.lner.co.uk/v1/stations', {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    });
};

export const fetchQueryInformation = (params: URLSearchParams) => {
    const url = `https://mobile-api-softwire2.lner.co.uk/v1/fares?${params}`;

    // const trailingUrl = '&noChanges=false&numberOfAdults=' + params.numberOfAdults +'&numberOfChildren=' + params.numberOfChildren +'&journeyType=single&outboundDateTime=' + getCurrentDate() + '&outboundIsArriveBy=false';
    // const url = baseUrl + 'originStation=' + params.departureStationChoice + '&destinationStation=' + params.arrivalStationChoice + trailingUrl;

    return fetch(url, {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        }, 
    });
};
