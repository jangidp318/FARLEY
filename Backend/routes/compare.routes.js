const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const compareController = require('../controllers/compare.controller');


router.post('/campare-ride-fare',
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    authMiddleware.authUser,
    compareController.compareFares
);


module.exports = router;