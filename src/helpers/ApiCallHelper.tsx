const baseUrl = 'https://mobile-api-softwire2.lner.co.uk/v1/';

export const fetchStations = () => {
    return fetch(`${baseUrl}stations`, {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        },
    });
};

export const fetchQueryInformation = (params: URLSearchParams) => {

    const url = `${baseUrl}fares?${params}`;

    return fetch(url, {
        headers: {
            'X-API-KEY': `${process.env.REACT_APP_X_API_KEY}`,
        }, 
    });
};
