
function checkInputs() {
	var emptyElems = document.getElementsByClassName('is-empty');
	var errorElems = document.getElementsByClassName('has-error');
	if ((emptyElems.length != 0) || (errorElems.length != 0)) {
		document.getElementById('proposeIRS').disabled = true;
	} else {
		document.getElementById('proposeIRS').disabled = false;
	}
}

if (document.getElementById('company')) {
	var checkInput = function () {
		if (document.getElementById('company').value != '') {
			document.getElementById('companyInput').className = 'col-sm-10 has-success';
			checkInputs();
			return;
		} else {
			document.getElementById('companyInput').className = 'col-sm-10 is-empty';
			checkInputs();
			return;
		}
		document.getElementById('companyInput').className = 'col-sm-10 has-error';
		checkInputs();
	}
	document.getElementById('company').addEventListener('change', checkInput);
	setInterval(checkInput, 1000);
}

if (document.getElementById('IRSValue')) {
	var checkInput = function () {
		if (document.getElementById('IRSValue').value == '') {
			document.getElementById('IRSValueInput').className = 'col-sm-10 is-empty';
			checkInputs();
			return;
		}

		var val = document.getElementById('IRSValue').value;
		val = parseFloat(val);
		if (!isNaN(val) && (val > 0)) {
			document.getElementById('IRSValueInput').className = 'col-sm-10 has-success';
			checkInputs();
			return;
		}
		document.getElementById('IRSValueInput').className = 'col-sm-10 has-error';
		checkInputs();
	}
	document.getElementById('IRSValue').addEventListener('change', checkInput);
	setInterval(checkInput, 1000);
}

if (document.getElementById('tenor')) {
	var checkInput = function () {
		if (document.getElementById('tenor').value != '') {
			document.getElementById('tenorInput').className = 'col-sm-10 has-success';
			checkInputs();
			return;
		} else {
			document.getElementById('tenorInput').className = 'col-sm-10 is-empty';
			checkInputs();
			return;
		}
		document.getElementById('tenorInput').className = 'col-sm-10 has-error';
		checkInputs();

	}
	document.getElementById('tenor').addEventListener('change', checkInput);
	setInterval(checkInput, 1000);
}

if (document.getElementById('effectiveDate')) {
	var checkInput = function () {
		if (document.getElementById('effectiveDate').value == '') {
			document.getElementById('effectiveDateInput').className = 'col-sm-10 is-empty';
			checkInputs();
			return;
		}

		var val = document.getElementById('effectiveDate').value;
		if (val.length == 10) {
			var month = parseInt(val.substring(0, 2));
			var day = parseInt(val.substring(3, 5));
			var year = parseInt(val.substring(6, 10));
			if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
				if ((month >= 1) && (month <= 12) && (day >= 0) && (year >= 0)) {
					if (
						(((month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) || (month == 10) || (month == 12)) && (day <= 31)) ||
						(((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day <= 30)) ||
						((month == 2) && (day <= (((year % 4 == 0) && (((year % 100 != 0) || (year % 400 == 0)))) ? 29 : 28)))
					) {
						document.getElementById('effectiveDateInput').className = 'col-sm-10 has-success';
						checkInputs();
						return;
					}
				}
			}
		}
		document.getElementById('effectiveDateInput').className = 'col-sm-10 has-error';
		checkInputs();
	}
	document.getElementById('effectiveDate').addEventListener('change', checkInput);
	setInterval(checkInput, 1000);
}

if (document.getElementById('maturityDate')) {
	var checkInput = function () {
		if (document.getElementById('maturityDate').value == '') {
			document.getElementById('maturityDateInput').className = 'col-sm-10 is-empty';
			checkInputs();
			return;
		} else {

		var val = document.getElementById('maturityDate').value;
		if (val.length == 10) {
			var month = parseInt(val.substring(0, 2));
			var day = parseInt(val.substring(3, 5));
			var year = parseInt(val.substring(6, 10));
			if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
				if ((month >= 1) && (month <= 12) && (day >= 0) && (year >= 0)) {
					if (
						(((month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) || (month == 10) || (month == 12)) && (day <= 31)) ||
						(((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day <= 30)) ||
						((month == 2) && (day <= (((year % 4 == 0) && (((year % 100 != 0) || (year % 400 == 0)))) ? 29 : 28)))
					) {
						document.getElementById('maturityDateInput').className = 'col-sm-10 has-success';
						checkInputs();
						return;
					}
				}
			}
		}
		document.getElementById('maturityDateInput').className = 'col-sm-10 has-error';
		checkInputs();
	}
	};
	document.getElementById('maturityDate').addEventListener('change', checkInput);
	setInterval(checkInput, 1000);
}

if (document.getElementById('interestRate1')) {
	var checkInput = function () {
		if (document.getElementById('interestRate1').value != '') {
			document.getElementById('interestRate1Input').className = 'col-sm-10 has-success';
			checkInputs();
			return;
		} else {
			document.getElementById('interestRate1Input').className = 'col-sm-10 is-empty';
			checkInputs();
			return;
		}
		document.getElementById('interestRate1Input').className = 'col-sm-10 has-error';
		checkInputs();

	}
	document.getElementById('interestRate1').addEventListener('change', checkInput);
	setInterval(checkInput, 1000);
}

if (document.getElementById('interestRate2')) {
	var checkInput = function () {
		if (document.getElementById('interestRate2').value != '') {
			document.getElementById('interestRate2Input').className = 'col-sm-10 has-success';
			checkInputs();
			return;
		} else {
			document.getElementById('interestRate2Input').className = 'col-sm-10 is-empty';
			checkInputs();
			return;
		}
		document.getElementById('interestRate2Input').className = 'col-sm-10 has-error';
		checkInputs();

	}
	document.getElementById('interestRate2').addEventListener('change', checkInput);
	setInterval(checkInput, 1000);
}

if ((document.getElementById('interestRate1Select')) && (document.getElementById('interestRate2Select'))) {
	var inputfields = document.getElementById('inputFields');

	var addInputFields = function (value, nextElement, num) {
		var irfields = document.getElementsByClassName('interestRate' + num + 'Fields');

		//remove all current input fields
		for (var i = 0; i < irfields.length; i++) {
			inputfields.removeChild(irfields[i]);
		}

		switch (value) {
			case 'Fixed Rate':
				var newDiv = document.createElement('div');
				newDiv.className = 'form-group interestRate' + num + 'Fields';
				newDiv.innerHTML = '<label class="col-sm-2 control-label" for="fixedRate' + num + '">Value</label>' +
					'<div class="col-sm-10 is-empty" id="fixedRate' + num + 'Input"><input class="form-control" autocomplete="off" name="fixedRate' + num + '" id="fixedRate' + num + '" type="number" step="0.001"></div>';
				inputfields.insertBefore(newDiv, nextElement);
				
				var checkInput = function () {
					var val = document.getElementById('fixedRate' + num).value;
					val = parseFloat(val);
					if (!isNaN(val) && (val > 0)) {
						document.getElementById('fixedRate' + num + 'Input').className = 'col-sm-10 has-success';
						checkInputs();
						return;
					} else {
						document.getElementById('fixedRate' + num + 'Input').className = 'col-sm-10 is-empty';
						checkInputs();
						return;
					}
					document.getElementById('fixedRate' + num + 'Input').className = 'col-sm-10 has-error';
					checkInputs();

				}
				document.getElementById('fixedRate' + num).addEventListener('change', checkInput);
				setInterval(checkInput, 1000);

				document.getElementById('interestRate' + num + 'Input').className = 'col-sm-10 has-success';
				checkInputs();
				break;
			case 'LIBOR Index':
				var newDiv = document.createElement('div');
				newDiv.className = 'form-group interestRate' + num + 'Fields';
				newDiv.innerHTML = '<label class="col-sm-2 control-label" for="liborTenor' + num + '">Tenor</label><div class="col-sm-10 is-empty" id="liborTenor' + num + 'Input">' +
					'<select class="form-control" type="select" name="liborTenor' + num + '" id="liborTenor' + num + '">' +
					'<option> </option>' +
					'<option>DAILY</option>' +
					'<option>WEEKLY</option>' +
					'<option>ONE_MONTH</option>' +
					'<option>TWO_MONTH</option>' +
					'<option>THREE_MONTH</option>' +
					'<option>SEMI_ANNUALLY</option>' +
					'<option>ANNUALLY</option>' +
					'</select></div>';
				inputfields.insertBefore(newDiv, nextElement);
				var checkInput = function () {
					if (document.getElementById('liborTenor' + num).value != '') {
						document.getElementById('liborTenor' + num + 'Input').className = 'col-sm-10 has-success';
						checkInputs();
						return;
					} else {
						document.getElementById('liborTenor' + num + 'Input').className = 'col-sm-10 is-empty';
						checkInputs();
						return;
					} 
					document.getElementById('liborTenor' + num + 'Input').className = 'col-sm-10 has-error';
					checkInputs();
				}
				document.getElementById('liborTenor' + num).addEventListener('change', checkInput);
				setInterval(checkInput, 1000);
				document.getElementById('interestRate' + num + 'Input').className = 'col-sm-10 has-success';
				checkInputs();
				break;
			default:
				document.getElementById('interestRate' + num + 'Input').className = 'col-sm-10 has-error';
				checkInputs();
				break;
		}
	}

	document.getElementById('interestRate1').addEventListener('change', function () {
		addInputFields(document.getElementById('interestRate1').value, document.getElementById('otherInterestRate'), 1);
	});
	document.getElementById('interestRate2').addEventListener('change', function () {
		addInputFields(document.getElementById('interestRate2').value, document.getElementById('proposeBtn'), 2);
	});
}
