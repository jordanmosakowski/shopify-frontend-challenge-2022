import axios from 'axios';
const apiKey = "CKCzJJcDuyYhXA0YUw4NX97e8kfOqv4cRWFbsE58";

async function apiCall(endpoint,queryObject){
    queryObject.api_key = apiKey;
    const queryString = Object.keys(queryObject).map(key => `${key}=${encodeURIComponent(queryObject[key])}`).join('&');
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1${endpoint}?${queryString}`);
    return response.data;
} 

export default apiCall;