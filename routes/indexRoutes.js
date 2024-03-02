const express = require('express')
const router = express.Router()
var indexController = require('../controllers/indexController');


router.get('/checkout', function (req, res, next) {
    indexController.checkout(req, res);
});

router.get('/error', function (req, res, next) {
    indexController.error(req, res);
});

module.exports = router
