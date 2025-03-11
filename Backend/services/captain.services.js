const captainController = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname, lastname, email, password,
    color, plate, capacity, vehicleType
}) => {
    console.log("firstname => ", firstname,
        "email => ", email,
        "password => ", password,
        "color => ", color,
        "plate => ", plate,
        "capacity => ", capacity,
        "vehicleType => ", vehicleType,)
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const captain = captainController.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}