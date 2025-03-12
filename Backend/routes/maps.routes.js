const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const { query } = require('express-validator')
const mapsController = require('../controllers/maps.controller')

router.get('/get-coordinates',
    query('address').isLength({ min: 3 }).withMessage('Address query must be atleast 3 characters long'),
    authMiddleware.authUser,
    mapsController.getAddressCoordinate)


router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapsController.getDistanceTime
)

module.exports = router;