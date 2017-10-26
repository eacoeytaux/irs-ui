var util = {};

var namespace = 'fabric.hyperledger'

// Error types
util.ERROR_TYPES = {
	COMPOSER_REST_HTTP_ERROR: 0,
	COMPOSER_REST_ERROR: 1,
	VALIDATION_ERROR: 2
};

util.COMPOSER_REST_ERROR_TYPES = {
	AUTH: 0,
	ENROLL: 1,
	OTHER: 2
};

util.getEntityNameFromFullyQualifiedName = function(fqn) {
	var chunks = fqn.split('#');
	return chunks[chunks.length - 1];
}

util.mergeOwnershipsAndPapers = function(requestingCompany, paperMap, ownershipArray) {
	ownershipArray.forEach((ownership) => {
		var cusip = util.getEntityNameFromFullyQualifiedName(ownership.paper);
		var owner = util.getEntityNameFromFullyQualifiedName(ownership.owner);
		var paper = paperMap[cusip];

		if (!paper.purchaseableQuantity) {
			paper.purchaseableQuantity = paper.quantityIssued;
		}

		if (!paper.ownerships) {
			paper.ownerships = [];
		}

		paper.ownerships.push(ownership);

		if (requestingCompany == owner) {
			paper.purchaseableQuantity -= ownership.quantity;
		} else {
			paper.purchaseableQuantity -= (ownership.quantity - ownership.quantityForSale);
		}

		if (paper.purchaseableQuantity == 0) {
			paperMap[cusip] = null;
		}
	});
}


util.findIdentityByName = function(name, identities) {
	var identity = null;

	identities.every((item) => {
		if (item.name == name) {
			identity = item;
			return false;
		}

		return true;
	});

	return identity;
}

util.findIdentityByID = function(id, identities) {
	var identity = null;

	identities.every((item) => {
		if (item.id == id) {
			identity = item;
			return false;
		}

		return true;
	});

	return identity;
}

/**
 * Filters IRSs based on if the participant is participating in the IRS. If the exclude param is true,
 * papers by the specified issuer will be excluded from the final array;
 * otherwise, they will be included and all others excluded. Defaults
 * to false if the param is not included.
 */
util.filterIRSs = function(irss, companyName) {
	var filtered = {};

	if (irss.length == 0) {
		return filtered;
	}

	filtered.proposed = [];
	filtered.pending = [];
	filtered.inprogress = [];
	filtered.completed = [];
	
	irss.forEach((irs) => {
		//console.log(irs);
		if (irs.participant1 == 'resource:' + namespace + '.Company#' + companyName) {
			if (irs.participant1Approved) {
				if (irs.participant2Approved) {
					var completed = true;

					for (var i = 0; i < irs.payments.length; i++) {
						if (!irs.payments[i].completed) {
							completed = false;
							break;
						}
					}

					if (completed) {
						filtered.completed.push(irs);
					} else {
						filtered.inprogress.push(irs);
					}
				} else {
					filtered.proposed.push(irs);
				}
			} else {
				filtered.pending.push(irs);
			}
		} else if (irs.participant2 == 'resource:' + namespace + '.Company#' + companyName) {
			if (irs.participant2Approved) {
				if (irs.participant1Approved) {
					var completed = true;

					for (var i = 0; i < irs.payments.length; i++) {
						if (!irs.payments[i].completed) {
							completed = false;
							break;
						}
					}

					if (completed) {
						filtered.completed.push(irs);
					} else {
						filtered.inprogress.push(irs);
					}
				} else {
					filtered.proposed.push(irs);
				}
			} else {
				filtered.pending.push(irs);
			}
		}
	});

	return filtered;
}

util.determineDate = function (dateStr, error) {
	if (dateStr.length != 10) {
		error.msgs.push({ msg: "Invalid date format" });
		return new Date();
	}

	var month = parseInt(dateStr.substring(0, 2));
	var day = parseInt(dateStr.substring(3, 5));
	var year = parseInt(dateStr.substring(6, 10));

	var date = new Date();
	date.setUTCMonth(month);
	date.setUTCDate(day);
	date.setUTCFullYear(year);
	date.setUTCHours(0);
	date.setUTCMinutes(0);
	date.setUTCSeconds(0);
	date.setUTCMilliseconds(0);

	return date;
}

module.exports = util;
