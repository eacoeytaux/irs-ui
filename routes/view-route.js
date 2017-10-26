const express = require('express');
var router = express.Router();
var rest = require('../rest-interface.js');
var util = require('../util.js');

namespace = 'fabric.hyperledger'

function checkIdentitySelected(req, res, next) {
	if (!req.session.defaultIdentity) {
		var error = {};
		if (!rest.serverConfig.token || rest.serverConfig.token.length == 0) {
			error.type = util.ERROR_TYPES.COMPOSER_REST_ERROR;
			error.subtype = util.COMPOSER_REST_ERROR_TYPES.AUTH;
		} else {
			error.type = util.ERROR_TYPES.COMPOSER_REST_ERROR;
			error.subtype = util.COMPOSER_REST_ERROR_TYPES.ENROLL;
		}

		return next(error);
	}

	return next();
}

router.get('/', checkIdentitySelected, (req, res, next) => {
	res.render('view');
});

router.get('/getLIBOR', checkIdentitySelected, (req, res, next) => {

	var error = {
		type: util.ERROR_TYPES.VALIDATION_ERROR,
		renderPage: 'manage',
		msgs: []
	};

	var date = util.determineDate(req.query.date);
	var dateStr = date.getUTCFullYear() + '-' + ('0' + date.getUTCMonth()).slice(-2) + '-' + ('0' + (date.getUTCDate())).slice(-2);
	var tenorStr = req.query.tenor;

	var liborid = dateStr + ':' + tenorStr;

	console.log('~ libor id:', liborid);

	rest.getLIBOR(liborid, function(getLIBORres, getLIBORerr) {
		if (getLIBORerr) {
			res.render('view', { rate: "N/A", dateStr: dateStr, tenorStr: tenorStr });
		} else {
			res.render('view', { rate: getLIBORres.rate, dateStr: dateStr, tenorStr: tenorStr });
		}
	});
});


module.exports = router;
