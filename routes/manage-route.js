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

/** retrieves all IRSs from the REST server, then filters them to only show IRSs that involve the current participants and sorts them into categories:
- proposed (other participant has not yet approved)
- pending (current participant has not yet approved)
- in progress (both participants have approved but not all payments have been settled)
- completed (all payments have been settled)
*/
function loadIRS(req, res, next) {
	rest.getUserInfo(req.session.defaultIdentity.participant, (getUserInfoRes, getUserInfoErr) => {
		if (getUserInfoErr) {
			res.render('manage');
		} else {
			rest.getAllIRSs((getIRSres, getIRSerr) => {
				//confirm no errors
				if (getIRSerr) {
					getIRSerr.renderPage = 'manage';
					getIRSerr.renderPageData = {
						identities: req.session.identities
					};
					return next(getIRSerr);
				}

				var userType = getUserInfoRes.$class.substring(namespace.length + 1);

				//filter IRSs
				var filtered = util.filterIRSs(getIRSres, req.session.defaultIdentity.participant);
				var relevantIRSs = {};
				relevantIRSs.proposed = filtered.proposed;
				relevantIRSs.pending = filtered.pending;
				relevantIRSs.inprogress = filtered.inprogress;
				relevantIRSs.completed = filtered.completed;

				//load page
				res.render('manage', { userType: userType, userStr: getUserInfoRes.name, userBalance: getUserInfoRes.balance, IRSs: relevantIRSs });
			});
		}
	});
}

router.get('/', checkIdentitySelected, (req, res, next) => {
	loadIRS(req, res, next);
});

router.get('/view', checkIdentitySelected, (req, res, next) => {
	rest.getIRS(req.query.id, (getIRSres, getIRSerr) => {
		console.log('RES', getIRSres);
		res.render('irs', { userStr: req.session.defaultIdentity.participant, irs: getIRSres });
	});
});

router.get('/propose', checkIdentitySelected, (req, res, next) => {
	rest.getAllCompanies((getCompaniesRes, getCompaniesErr) => {
		res.render('propose', { userStr: req.session.defaultIdentity.participant, companies: getCompaniesRes });
	});
});

router.get('/approve', checkIdentitySelected, (req, res, next) => {
	rest.approveIRS(req.query.id, (approveIRSRes, approveIRSErr) => {
		res.redirect('/manage');
	});
});

router.get('/deny', checkIdentitySelected, (req, res, next) => {
	rest.denyIRS(req.query.id, (approveIRSRes, approveIRSErr) => {
		res.redirect('/manage');
	});
});

router.get('/settle', checkIdentitySelected, (req, res, next) => {

	rest.settleIRSPayment(req.query.id, req.query.index, (approveIRSRes, approveIRSErr) => {
		res.redirect('/manage/view?id=' + req.query.id);
	});
});

router.post('/propose', checkIdentitySelected, (req, res, next) => {

	//fill required fields
	var irs = {};
	irs.company = req.body.company;
	irs.value = parseFloat(req.body.IRSValue);
	irs.tenor = req.body.tenor; //TODO check is not blank

	var error = {
		type: util.ERROR_TYPES.VALIDATION_ERROR,
		renderPage: 'propose',
		msgs: []
	};

	if (isNaN(irs.value)) {
		error.msgs.push({ msg: "Interest rate swap value must be a number greater than 0" });
	}

	irs.effectiveDate = util.determineDate(req.body.effectiveDate, error);
	irs.effectiveDate.setUTCMonth(irs.effectiveDate.getUTCMonth() - 1);
	irs.maturityDate = util.determineDate(req.body.maturityDate, error);
	irs.maturityDate.setUTCMonth(irs.maturityDate.getUTCMonth() - 1);

	//determine interest rate depending on type user has selected
	var determineInterestRate = function (numStr) {
		var interestRateObj = {}
		interestRateObj.type = req.body["interestRate" + numStr].replace(/ /g, '');
		switch (req.body["interestRate" + numStr]) {
			case 'Fixed Rate':
				interestRateObj.rate = req.body["fixedRate" + numStr];
				//confirm rate is a valid number
				if (isNaN(interestRateObj.rate) || (interestRateObj.rate < 0)) {
					error.msgs.push({ msg: "Fixed rate must be a number greater than 0" });
				}
				break;
			case 'LIBOR Index':
				//value is selected from drop down so little error checking needs to be done
				interestRateObj.tenor = req.body["liborTenor" + numStr];
				break;
			default:
				throw new Error('Unrecognized interest rate type ' + req.body["interestRate" + numStr]);
				break;
		}
		return JSON.stringify(interestRateObj);
	}

	irs.interestRate1 = determineInterestRate("1");
	irs.interestRate2 = determineInterestRate("2");

	if (error.msgs.length > 0) {
		return next(error);
	}

	rest.proposeIRS(irs, req.session.defaultIdentity.participant, (proposeRes, proposeErr) => {
		if (proposeErr) {
			proposeErr.renderPage = 'propose';
			return next(proposeErr);
		}

		res.redirect('/manage');
	});
});

router.post('/postLIBOR', checkIdentitySelected, (req, res, next) => {

	//fill required fields
	var libor = {};
	libor.tenor = req.body.tenor;
	libor.rate = parseFloat(req.body.LIBORValue);

	var error = {
		type: util.ERROR_TYPES.VALIDATION_ERROR,
		renderPage: 'manage',
		msgs: []
	};

	if (isNaN(libor.rate)) {
		error.msgs.push({ msg: "LIBOR Index value must be a number greater than 0" });
	}

	libor.date = util.determineDate(req.body.date, error);
	libor.date.setUTCMonth(libor.date.getUTCMonth() - 1);


	if (error.msgs.length > 0) {
		return next(error);
	}

	rest.postLIBOR(libor, (postRes, postErr) => {
		if (postErr) {
			postErr.renderPage = 'manage';
			return next(postErr);
		}

		res.redirect('/manage');
	});
});

module.exports = router;
