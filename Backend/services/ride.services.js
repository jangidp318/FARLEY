const rideModel = require('../models/ride.model');
const mapsService = require('../services/maps.services')
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapsService.getDistanceAndTime(pickup, destination);

    const baseFare = {
        auto: 50,
        car: 100,
        moto: 30
    };

    const perKmRate = {
        auto: 15,
        car: 20,
        moto: 10
    };

    const perMinuteRate = {
        auto: 3,
        car: 5,
        moto: 2
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)).toFixed(2),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)).toFixed(2),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto)).toFixed(2)
    };

    return fare;
}
module.exports.getFare = getFare;

async function getOTP(num) {
    function generateOtp(mum) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString().padStart(num, '0');
        return otp
    }

    return generateOtp(num);
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    console.log("user => ", user, "pickup => ", pickup, "destination => ", destination, "vehicleType => ", vehicleType)
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);

    console.log(fare);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: await getOTP(6),
        fare: fare[vehicleType]
    });

    return ride;
}

module.exports.confirmRide = async ({
    rideId, captain
}) => {
    console.log("rideId => ", rideId)
    console.log("captain => ", captain)
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findByIdAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}




