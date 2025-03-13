const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain'
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'cancelled', 'ongoing'],
        default: 'pending'
    },
    duration: {
        type: Number,
    }, // In seconds
    distance: {
        type: Number,
    }, // In meters
    paymentId: {
        type: String,
    },
    orderId: {
        type: String
    },
    signature: {
        type: String
    },

    otp: {
        type: String,
        select: false,
        required: true
    }
})

const rideModel = mongoose.model('ride', rideSchema);

module.exports = rideModel;