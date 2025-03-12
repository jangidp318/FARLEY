const mapServices = require('../services/maps.services');

module.exports.getAddressCoordinate = async (req, res, next) => {
    const { address } = req.query;

    try {
        const coordinates = await mapServices.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.getDistanceTime = async (req, res, next) => {
    const { origin, destination } = req.query;

    try {
        const distanceTime = await mapServices.getDistanceAndTime(origin, destination);

        res.status(200).json(distanceTime);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}