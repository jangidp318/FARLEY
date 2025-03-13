const axios = require('axios');
const { listIndexes } = require('../models/user.model');
const captainModel = require('../models/captain.model')

module.exports.getAddressCoordinate = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`);
        console.log(response.data);
        if (response.data && response.data.results && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;

            return { ltd: location.lat, lng: location.lng };
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

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error("Input is required");
    }
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
        const response = await axios.get(url);
        if (response.data.status === 'OK' && response.data.predictions && response.data.predictions.length > 0) {
            return response.data.predictions;
        }
        throw new Error('No suggestions found');
    } catch (error) {
        console.error('Error in getAutoSuggestions:', error.message);
        throw error;
    }
};

module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {

    // radius in KM

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    })

    return captains

}