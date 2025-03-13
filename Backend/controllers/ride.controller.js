const rideServices = require('../services/ride.services');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.services');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model')

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Added user authentication check
    if (!req.user) {
        return res.status(401).json({ message: "User is not authenticated" });
    }

    const { pickup, destination, vehicleType } = req.body;
    try {
        // Perform all async operations first
        const ride = await rideServices.createRide({ user: req.user._id, pickup, destination, vehicleType });
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        console.log("pickupCoordinates => ", pickupCoordinates);
        const captainsInRadius = await mapService.getCaptainInTheRadius("31.1471305", "75.34121789999999", 2); // for Testing ltd: "31.1471305", lng: "75.34121789999999"
        console.log("captainsInRadius => ", captainsInRadius);

        ride.otp = ""

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map(async captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        });

        return res.status(201).json({ ride, pickupCoordinates, captainsInRadius });
    } catch (error) {
        console.log("error => ", error)
        return res.status(400).json({ message: error.message });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.body;
    try {
        const fare = await rideServices.getFare(pickup, destination);
        res.status(200).json(fare);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, captain } = req.body;

    try {
        const ride = await rideServices.confirmRide({ rideId, captain });


        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId, otp } = req.body;

    try {

        const ride = await rideServices.startRide({ rideId, otp });
        res.status(200).json(ride);

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, captain } = req.body;

    try {

        const ride = await rideServices.endRide({ rideId, captain });
        
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })
        
        res.status(200).json(ride);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}