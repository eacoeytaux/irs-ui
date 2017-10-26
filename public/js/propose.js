
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
	document.getElementById('company').addEventListener('change', function () {
		if (this.value != '') {
			document.getElementById('companyInput').className = 'col-sm-10 has-success';
			checkInputs();
			return;
		}
		document.getElementById('companyInput').className = 'col-sm-10 has-error';
		checkInputs();

	});
}

if (document.getElementById('IRSValue')) {
	document.getElementById('IRSValue').addEventListener('change', function () {
		var val = this.value;
		val = parseFloat(val);
		if (!isNaN(val) && (val > 0)) {
			document.getElementById('IRSValueInput').className = 'col-sm-10 has-success';
			checkInputs();
			return;
		}
		document.getElementById('IRSValueInput').className = 'col-sm-10 has-error';
		checkInputs();

	});
}

if (document.getElementById('tenor')) {
	document.getElementById('tenor').addEventListener('change', function () {
		if (this.value != '') {
			document.getElementById('tenorInput').className = 'col-sm-10 has-success';
			checkInputs();
			return;
		}
		document.getElementById('tenorInput').className = 'col-sm-10 has-error';
		checkInputs();

	});
}

if (document.getElementById('effectiveDate')) {
	document.getElementById('effectiveDate').addEventListener('change', function () {
		var val = this.value;
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
	});
}

if (document.getElementById('maturityDate')) {
	document.getElementById('maturityDate').addEventListener('change', function () {
		var val = this.value;
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
	});
}

if (document.getElementById('interestRate1')) {
	document.getElementById('interestRate1').addEventListener('change', function () {
		if (this.value != '') {
			document.getElementById('interestRate1Input').className = 'col-sm-10 has-success';
			checkInputs();
			return;
		}
		document.getElementById('interestRate1Input').className = 'col-sm-10 has-error';
		checkInputs();

	});
}

if (document.getElementById('interestRate2')) {
	document.getElementById('interestRate2').addEventListener('change', function () {
		if (this.value != '') {
			document.getElementById('interestRate2Input').className = 'col-sm-10 has-success';
			checkInputs();
			return;
		}
		document.getElementById('interestRate2Input').className = 'col-sm-10 has-error';
		checkInputs();

	});
}

if (document.getElementById('allowUnwind')) {
	document.getElementById('allowUnwind').addEventListener('click', function () {
		if (this.checked) {
			document.getElementById('marketValue').disabled = false;

			if (document.getElementById('marketValue').value != '') {
				var val = document.getElementById('marketValue').value;
				val = parseFloat(val);
				if (!isNaN(val) && (val > 0)) {
					document.getElementById('marketValueInput').className = 'col-sm-10 has-success';
					checkInputs();
					return;
				}
				document.getElementById('marketValueInput').className = 'col-sm-10 has-error';
				checkInputs();
			} else {
				document.getElementById('marketValueInput').className = 'col-sm-10 is-empty';
				checkInputs();
			}
		} else {

			document.getElementById('marketValue').disabled = true;
			document.getElementById('marketValueInput').className = 'col-sm-10';
			checkInputs();
		}
	});
}

if (document.getElementById('marketValue')) {
	document.getElementById('marketValue').addEventListener('change', function () {
		var val = this.value;
		val = parseFloat(val);
		if (!isNaN(val) && (val > 0)) {
			document.getElementById('marketValueInput').className = 'col-sm-10 has-success';
			checkInputs();
			return;
		}
		document.getElementById('marketValueInput').className = 'col-sm-10 has-error';
		checkInputs();

	});
}

if ((document.getElementById('interestRate1Select')) && (document.getElementById('interestRate2Select'))) {
	var inputfields = document.getElementById('inputFields');

	var addInputFields = function (value, nextElement, num) {
		var ir1fields = document.getElementsByClassName('interestRate' + num + 'Fields');

		//remove all current input fields
		for (var i = 0; i < ir1fields.length; i++) {
			inputfields.removeChild(ir1fields[i]);
		}


		switch (value) {
			case 'Fixed':
				var newDiv = document.createElement('div');
				newDiv.className = 'form-group interestRate' + num + 'Fields';
				newDiv.innerHTML = '<label class="col-sm-2 control-label" for="fixedRate' + num + '">Value</label>' +
					'<div class="col-sm-10 is-empty" id="fixedRate' + num + 'Input"><input class="form-control" autocomplete="off" name="fixedRate' + num + '" id="fixedRate' + num + '" type="number" step="0.001"></div>';
				inputfields.insertBefore(newDiv, nextElement);
				document.getElementById('fixedRate' + num).addEventListener('change', function () {
					var val = this.value;
					val = parseFloat(val);
					if (!isNaN(val) && (val > 0)) {
						document.getElementById('fixedRate' + num + 'Input').className = 'col-sm-10 has-success';
						checkInputs();
						return;
					}
					document.getElementById('fixedRate' + num + 'Input').className = 'col-sm-10 has-error';
					checkInputs();

				});
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
				document.getElementById('liborTenor' + num).addEventListener('change', function () {
					if (this.value != '') {
						document.getElementById('liborTenor' + num + 'Input').className = 'col-sm-10 has-success';
						checkInputs();
						return;
					}
					document.getElementById('liborTenor' + num + 'Input').className = 'col-sm-10 has-error';
					checkInputs();
				});
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
		addInputFields(document.getElementById('interestRate2').value, document.getElementById('optionalParametersLabel'), 2);
	});
}
