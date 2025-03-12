const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`);
        console.log(response.data);
        if (response.data && response.data.results && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return { lat: location.lat, long: location.lng };
        } else if (response.data.error_message) {
            throw new Error(response.data.error_message)
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and Destination are required')
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`
    try {
        const response = await axios.get(url);
        console.log(response.data);
        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found!')
            }
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and time data');
        }
    } catch (error) {
        console.error('Error in getDistanceAndTime:', error.message);
        throw error;
    }
};