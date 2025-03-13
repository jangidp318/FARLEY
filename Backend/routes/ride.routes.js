const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/create',
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['car', 'auto', 'moto']).withMessage('Invalid vehicle type'),
    authMiddleware.authUser,
    rideController.createRide
)


router.get('/get-fare',
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    authMiddleware.authCaptain,
    rideController.getFare
)

router.get('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    body('captain').isObject().withMessage('Missing Captain'),
    rideController.confirmRide,
)


module.exports = router;