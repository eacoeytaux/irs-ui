var restServer = {};
var http = require('http');
var util = require('./util.js');

var namespace = 'fabric.hyperledger'

restServer.setServerConfig = function(config) {
	restServer.serverConfig = config;
}

restServer.getLIBORAuthorityInfo = function(participantID, cb) {
	var reqOptions = {
		host: restServer.serverConfig.host,
		port: restServer.serverConfig.port,
		path: '/api/LIBORAuthority/' + participantID + '?access_token=' + restServer.serverConfig.token,
		method: 'GET'
	};

	var req = http.request(reqOptions, (res) => {
		var data = '';

		res.setEncoding('utf8');

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			var dataObj = null;

			if (data.length > 0) {
				dataObj = JSON.parse(data);
			}

			var error = restServer.handleErrors(req, dataObj, null);
			cb(dataObj, error);
		});
	});

	req.on('error', (err) => {
		var error = restServer.handleErrors(req, null, err);
		cb(null, error);
	});

	req.end();
}

restServer.getCompanyInfo = function(participantID, cb) {
	var reqOptions = {
		host: restServer.serverConfig.host,
		port: restServer.serverConfig.port,
		path: '/api/Company/' + participantID + '?access_token=' + restServer.serverConfig.token,
		method: 'GET'
	};

	var req = http.request(reqOptions, (res) => {
		var data = '';

		res.setEncoding('utf8');

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			var dataObj = null;

			if (data.length > 0) {
				dataObj = JSON.parse(data);
			}

			var error = restServer.handleErrors(req, dataObj, null);
			cb(dataObj, error);
		});
	});

	req.on('error', (err) => {
		var error = restServer.handleErrors(req, null, err);
		cb(null, error);
	});

	req.end();
}

restServer.getAllCompanies = function(cb) {
	var reqOptions = {
		host: restServer.serverConfig.host,
		port: restServer.serverConfig.port,
		path: '/api/Company?access_token=' + restServer.serverConfig.token,
		method: 'GET'
	};

	var req = http.request(reqOptions, (res) => {
		var data = '';

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			var dataObj = null;

			if (data.length > 0) {
				dataObj = JSON.parse(data);
			}

			var error = restServer.handleErrors(req, dataObj, null);
			cb(dataObj, error);
		});
	});

	req.on('error', (err) => {
		var error = restServer.handleErrors(req, null, err);
		cb(null, error);
	});

	req.end();
}

restServer.getAllIRSs = function(cb) {
	var reqOptions = {
		host: restServer.serverConfig.host,
		port: restServer.serverConfig.port,
		path: '/api/InterestRateSwap?access_token=' + restServer.serverConfig.token,
		method: 'GET'
	};

	var req = http.request(reqOptions, (res) => {
		var data = '';

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			var dataObj = null;

			if (data.length > 0) {
				dataObj = JSON.parse(data);
			}

			var error = restServer.handleErrors(req, dataObj, null);
			cb(dataObj, error);
		});
	});

	req.on('error', (err) => {
		var error = restServer.handleErrors(req, null, err);
		cb(null, error);
	});

	req.end();
}

restServer.getIRS = function(id, cb) {
	var reqOptions = {
		host: restServer.serverConfig.host,
		port: restServer.serverConfig.port,
		path: '/api/InterestRateSwap/' + id + '?access_token=' + restServer.serverConfig.token,
		method: 'GET'
	};

	var req = http.request(reqOptions, (res) => {
		var data = '';

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			var dataObj = null;

			if (data.length > 0) {
				dataObj = JSON.parse(data);
			}

			var error = restServer.handleErrors(req, dataObj, null);
			cb(dataObj, error);
		});
	});

	req.on('error', (err) => {
		var error = restServer.handleErrors(req, null, err);
		cb(null, error);
	});

	req.end();
}

restServer.proposeIRS = function(irs, issuingCompanyName, cb) {
	var postParamsObj = {
		value: irs.value,
		effectiveDate: irs.effectiveDate,
		maturityDate: irs.maturityDate,
		tenor: irs.tenor,
		participant1: 'resource:' + namespace + '.Company#' + issuingCompanyName,
		participant2: 'resource:' + namespace + '.Company#' + irs.company,
		interestRate1: irs.interestRate1,
		interestRate2: irs.interestRate2,

		issuedTimestamp: new Date()
	};

	//optional params
	if (irs.marketValue) {
		postParamsObj.marketValue = irs.marketValue;
	}

	var postParams = JSON.stringify(postParamsObj);

	var reqOptions = {
		host: restServer.serverConfig.host,
		port: restServer.serverConfig.port,
		path: '/api/ProposeInterestRateSwap?access_token=' + restServer.serverConfig.token,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(postParams)
		}
	};

	var req = http.request(reqOptions, (res) => {
		var data = '';
		res.setEncoding('utf8');

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			var dataObj = null;

			if (data.length > 0) {
				dataObj = JSON.parse(data);
			}

			var error = restServer.handleErrors(req, dataObj, null);
			cb(dataObj, error);
		});
	});

	req.on('error', (err) => {
		var error = restServer.handleErrors(req, null, err);
		cb(null, error);
	});

	req.write(postParams);
	req.end();
}

restServer.approveIRS = function(irsID, cb) {
	var postParams = JSON.stringify({
		irs: 'resource:' + namespace + '.InterestRateSwap#' + irsID,

		issuedTimestamp: new Date()
	});

	var reqOptions = {
		host: restServer.serverConfig.host,
		port: restServer.serverConfig.port,
		path: '/api/ApproveInterestRateSwap?access_token=' + restServer.serverConfig.token,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(postParams)
		}
	};

	var req = http.request(reqOptions, (res) => {
		var data = '';
		res.setEncoding('utf8');

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			var dataObj = null;

			if (data.length > 0) {
				dataObj = JSON.parse(data);
			}

			var error = restServer.handleErrors(req, dataObj, null);
			cb(dataObj, error);
		});
	});

	req.on('error', (err) => {
		var error = restServer.handleErrors(req, null, err);
		cb(null, error);
	});

	req.write(postParams);
	req.end();
}

restServer.denyIRS = function(irsID, cb) {
	var postParams = JSON.stringify({
		irs: 'resource:' + namespace + '.InterestRateSwap#' + irsID,

		issuedTimestamp: new Date()
	});

	var reqOptions = {
		host: restServer.serverConfig.host,
		port: restServer.serverConfig.port,
		path: '/api/DenyInterestRateSwap?access_token=' + restServer.serverConfig.token,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(postParams)
		}
	};

	var req = http.request(reqOptions, (res) => {
		var data = '';
		res.setEncoding('utf8');

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			var dataObj = null;

			if (data.length > 0) {
				dataObj = JSON.parse(data);
			}

			var error = restServer.handleErrors(req, dataObj, null);
			cb(dataObj, error);
		});
	});

	req.on('error', (err) => {
		var error = restServer.handleErrors(req, null, err);
		cb(null, error);
	});

	req.write(postParams);
	req.end();
}

restServer.settleIRSPayment = function(id, index, cb) {
	var postParams = JSON.stringify({ "irs": id, "paymentIndex": parseInt(index) });
	console.log('postParams', postParams);
	
		var reqOptions = {
			host: restServer.serverConfig.host,
			port: restServer.serverConfig.port,
			path: '/api/SettleInterestRateSwap?access_token=' + restServer.serverConfig.token,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(postParams)
			}
		};
	
		var req = http.request(reqOptions, (res) => {
			var data = '';
			res.setEncoding('utf8');
	
			res.on('data', (chunk) => {
				data += chunk;
			});
	
			res.on('end', () => {
				var dataObj = null;
	
				if (data.length > 0) {
					dataObj = JSON.parse(data);
				}
	
				var error = restServer.handleErrors(req, dataObj, null);
				cb(dataObj, error);
			});
		});
	
		req.on('error', (err) => {
			var error = restServer.handleErrors(req, null, err);
			cb(null, error);
		});
	
		req.write(postParams);
		req.end();
}

restServer.getLIBOR = function(liborid, cb) {
	var reqOptions = {
		host: restServer.serverConfig.host,
		port: restServer.serverConfig.port,
		path: '/api/LIBORIndexValue/' + liborid + '?access_token=' + restServer.serverConfig.token,
		method: 'GET'
	};

	var req = http.request(reqOptions, (res) => {
		var data = '';

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			var dataObj = null;

			if (data.length > 0) {
				dataObj = JSON.parse(data);
			}

			var error = restServer.handleErrors(req, dataObj, null);
			cb(dataObj, error);
		});
	});

	req.on('error', (err) => {
		var error = restServer.handleErrors(req, null, err);
		cb(null, error);
	});

	req.end();
}

restServer.postLIBOR = function(libor, cb) {
	var postParams = JSON.stringify(libor);

	var reqOptions = {
		host: restServer.serverConfig.host,
		port: restServer.serverConfig.port,
		path: '/api/PostLIBORIndex?access_token=' + restServer.serverConfig.token,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(postParams)
		}
	};

	var req = http.request(reqOptions, (res) => {
		var data = '';
		res.setEncoding('utf8');

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			var dataObj = null;

			if (data.length > 0) {
				dataObj = JSON.parse(data);
			}

			var error = restServer.handleErrors(req, dataObj, null);
			cb(dataObj, error);
		});
	});

	req.on('error', (err) => {
		var error = restServer.handleErrors(req, null, err);
		cb(null, error);
	});

	req.write(postParams);
	req.end();
}

/** non-app specific functions **/

restServer.setDefaultIdentity = function(walletID, userID, cb) {
	var reqOptions = {
		host: restServer.serverConfig.host,
		port: restServer.serverConfig.port,
		path: '/api/wallets/' + walletID + '/identities/' + userID + '/setDefault?access_token=' + restServer.serverConfig.token,
		method: 'POST'
	};

	var req = http.request(reqOptions, (res) => {
		var data = '';

		res.setEncoding('utf8');

		res.on('data', (chunk) => {
			data += chunk;
		});
		
		res.on('end', () => {
			var dataObj = null;
			if (data.length > 0) {
				dataObj = JSON.parse(data);
			}

			var error = restServer.handleErrors(req, dataObj, null);
			cb(dataObj, error);
		});
	});

	req.on('error', (err) => {
		var error = restServer.handleErrors(req, null, err);
		cb(null, error);
	});
	
	req.end();
}

restServer.getWallets = function(cb) {
	var reqOptions = {
		host: restServer.serverConfig.host,
		port: restServer.serverConfig.port,
		path: '/api/wallets?access_token=' + restServer.serverConfig.token,
		method: 'GET'
	};

	var req = http.request(reqOptions, (res) => {
		var data = '';

		res.setEncoding('utf8');

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			var dataObj = null;

			if (data.length > 0) {
				dataObj = JSON.parse(data);
			}

			var error = restServer.handleErrors(req, dataObj, null);
			cb(dataObj, error);
		});		
	});

	req.on('error', (err) => {
		var error = restServer.handleErrors(req, null, err);
		cb(null, error);
	});

	req.end();
}

restServer.getIdentitiesInWallet = function(walletID, cb) {
	var reqOptions = {
		host: restServer.serverConfig.host,
		port: restServer.serverConfig.port,
		path: '/api/wallets/' + walletID + '/identities?access_token=' + restServer.serverConfig.token,
		method: 'GET'
	};

	var req = http.request(reqOptions, (res) => {
		var data = '';

		res.setEncoding('utf8');

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			var dataObj = null;

			if (data.length > 0) {
				dataObj = JSON.parse(data);
			}

			var error = restServer.handleErrors(req, dataObj, null);
			cb(dataObj, error);
		});
	});

	req.on('error', (err) => {
		var error = restServer.handleErrors(req, null, err);
		cb(null, error);
	});

	req.end();
}

restServer.getAllIdentities = function(cb) {
	var reqOptions = {
		host: restServer.serverConfig.host,
		port: restServer.serverConfig.port,
		path: '/api/system/identities?access_token=' + restServer.serverConfig.token,
		method: 'GET'
	};

	var req = http.request(reqOptions, (res) => {
		var data = '';

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.on('end', () => {
			var dataObj = null;

			if (data.length > 0) {
				dataObj = JSON.parse(data);
			}


			var error = restServer.handleErrors(req, dataObj, null);
			cb(dataObj, error);
		});
	});

	req.on('error', (err) => {
		var error = restServer.handleErrors(req, null, err);
		cb(null, error);
	});

	req.end();
}

restServer.handleErrors = function(req, res, httpErr) {
	var error = {};

	if (httpErr) {
		var httpErrMsg = "Could not " + req.method + " to " + req.host + ":" + req.port + req.path + " due to: " + httpErr.toString();

		error.type = util.ERROR_TYPES.COMPOSER_REST_HTTP_ERROR;
		error.msg = httpErrMsg;

		return error;
	}

	if (res && res.error) {
		var restErrMsg = "Could not " + req.method + " to " + req.originalURL + " due to: " + res.error.message;

		error.type = util.ERROR_TYPES.COMPOSER_REST_ERROR;

		if (res.error.statusCode == 401) {
			error.subtype = util.COMPOSER_REST_ERROR_TYPES.AUTH;
		}
		else if (res.error.statusCode == 500) {
			error.subtype = util.COMPOSER_REST_ERROR_TYPES.ENROLL;
		} else {
			error.subtype = util.COMPOSER_REST_ERROR_TYPES.OTHER;
		}
		error.msg = restErrMsg;

		return error;
	}

	return null;
}

module.exports = restServer;
