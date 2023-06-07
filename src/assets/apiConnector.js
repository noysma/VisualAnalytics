import axios from 'axios';
const BASE_URL = 'http://kddrtserver3.isti.cnr.it:8000';

const apiConnector = axios.create({
    baseURL: BASE_URL,
    progress: true,
    withCredentials: true,
});

function getSingleEndpoint(parameters, endpoint){
    // set default parameters
    const options = {
        limit:1000,
        offset:0,
        ...parameters,
    }
    // transform parameters from object to string
    const args = Object.entries(options)
        .map(([key, value]) => `${key}=${value}`).join('&');

    return apiConnector.get(`${endpoint}?${args}`);
}

export {
    getSingleEndpoint,
    apiConnector
}
